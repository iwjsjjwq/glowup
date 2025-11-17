"use client"

import { useState } from "react"
import { Camera, Sparkles, Upload, Crown, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ImageUpload } from "./components/ImageUpload"
import { AnalysisResult } from "./components/AnalysisResult"
import { StyleSelector } from "./components/StyleSelector"
import { MakeupRecommendations } from "./components/MakeupRecommendations"

export type SkinAnalysis = {
  skinTone: string
  undertone: string
  skinTexture: string
  eyeShape: string
  facialFeatures: string
}

export type StylePreferences = {
  occasion: string
  style: string
}

export type MakeupRecommendation = {
  foundation: string
  lipstick: string
  eyeshadow: string
  tutorial: {
    steps: string[]
    products: string[]
    tips: string[]
  }
}

export default function Home() {
  const [step, setStep] = useState<"upload" | "analysis" | "style" | "recommendations">("upload")
  const [imageUrl, setImageUrl] = useState<string>("")
  const [analysis, setAnalysis] = useState<SkinAnalysis | null>(null)
  const [stylePrefs, setStylePrefs] = useState<StylePreferences | null>(null)
  const [recommendations, setRecommendations] = useState<MakeupRecommendation | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")

  const handleImageUpload = async (url: string) => {
    setImageUrl(url)
    setIsLoading(true)
    setError("")
    
    try {
      const response = await fetch("/api/analyze-face", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: url })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        // Mensagem de erro mais específica baseada no status
        if (response.status === 401) {
          throw new Error("🔑 Chave da OpenAI inválida ou não configurada. Clique no banner laranja acima para configurar sua chave da API.")
        } else if (response.status === 500 && data.error?.includes("não configurada")) {
          throw new Error("⚙️ Configure sua chave da OpenAI no banner laranja acima para usar a análise facial com IA.")
        } else if (response.status === 429) {
          throw new Error("⏰ Limite de uso da OpenAI atingido.\n\nIsso acontece quando:\n• Você excedeu a cota mensal da sua conta OpenAI\n• Há muitas requisições em pouco tempo\n\nO que fazer:\n1. Aguarde alguns minutos e tente novamente\n2. Verifique sua conta em platform.openai.com/usage\n3. Considere adicionar créditos ou fazer upgrade do plano")
        } else {
          throw new Error(data.error || "Erro ao analisar imagem. Tente novamente.")
        }
      }
      
      if (!data.analysis) {
        throw new Error("Resposta inválida da análise. Tente novamente.")
      }
      
      setAnalysis(data.analysis)
      setStep("analysis")
    } catch (error: any) {
      console.error("Erro na análise:", error)
      setError(error.message || "Erro ao analisar imagem. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleStyleSelection = async (prefs: StylePreferences) => {
    setStylePrefs(prefs)
    setIsLoading(true)
    setError("")
    
    try {
      const response = await fetch("/api/generate-recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          analysis,
          preferences: prefs
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        // Mensagem de erro mais específica
        if (response.status === 401) {
          throw new Error("🔑 Chave da OpenAI inválida. Configure no banner laranja acima.")
        } else if (response.status === 500 && data.error?.includes("não configurada")) {
          throw new Error("⚙️ Configure sua chave da OpenAI no banner laranja acima.")
        } else if (response.status === 429) {
          throw new Error("⏰ Limite de uso da OpenAI atingido.\n\nIsso acontece quando:\n• Você excedeu a cota mensal da sua conta OpenAI\n• Há muitas requisições em pouco tempo\n\nO que fazer:\n1. Aguarde alguns minutos e tente novamente\n2. Verifique sua conta em platform.openai.com/usage\n3. Considere adicionar créditos ou fazer upgrade do plano")
        } else {
          throw new Error(data.error || "Erro ao gerar recomendações.")
        }
      }
      
      if (!data.recommendations) {
        throw new Error("Resposta inválida das recomendações. Tente novamente.")
      }
      
      setRecommendations(data.recommendations)
      setStep("recommendations")
    } catch (error: any) {
      console.error("Erro ao gerar recomendações:", error)
      setError(error.message || "Erro ao gerar recomendações. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const resetApp = () => {
    setStep("upload")
    setImageUrl("")
    setAnalysis(null)
    setStylePrefs(null)
    setRecommendations(null)
    setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                GlowUp AI
              </h1>
              <p className="text-xs text-gray-600">Sua consultora de beleza pessoal</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/pricing">
              <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-90 transition-opacity">
                <Crown className="w-4 h-4 mr-2" />
                Ver Planos
              </Button>
            </Link>
            {step !== "upload" && (
              <Button onClick={resetApp} variant="outline" size="sm">
                Nova Análise
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Error Message */}
        {error && (
          <Card className="p-4 mb-6 bg-red-50 border-red-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-900 mb-1">Atenção</h3>
                <p className="text-sm text-red-700 whitespace-pre-line">{error}</p>
                {(error.includes("OpenAI") || error.includes("🔑") || error.includes("⚙️")) && !error.includes("⏰") && (
                  <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-900 font-medium mb-2">
                      📌 Como configurar:
                    </p>
                    <ol className="text-xs text-amber-800 space-y-1 list-decimal list-inside">
                      <li>Clique no banner laranja que aparece no topo da página</li>
                      <li>Adicione a variável <code className="bg-amber-100 px-1 rounded">OPENAI_API_KEY</code></li>
                      <li>Cole sua chave da API da OpenAI</li>
                      <li>Salve e tente novamente</li>
                    </ol>
                    <p className="text-xs text-amber-700 mt-2">
                      💡 Não tem uma chave? Crie em: <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline font-medium">platform.openai.com/api-keys</a>
                    </p>
                  </div>
                )}
                {error.includes("⏰") && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-900 font-medium mb-2">
                      💡 Dicas para resolver:
                    </p>
                    <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
                      <li>Aguarde 2-3 minutos antes de tentar novamente</li>
                      <li>Verifique seu uso em: <a href="https://platform.openai.com/usage" target="_blank" rel="noopener noreferrer" className="underline font-medium">platform.openai.com/usage</a></li>
                      <li>Considere adicionar créditos à sua conta OpenAI</li>
                      <li>Se necessário, faça upgrade do seu plano</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}

        {step === "upload" && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 py-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Descubra a Maquiagem
                <span className="block bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Perfeita para Você
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Tire uma foto e receba recomendações personalizadas de maquiagem baseadas no seu tom de pele, formato do rosto e estilo pessoal
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 text-center space-y-3 border-pink-200 bg-white/50 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mx-auto">
                  <Camera className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Análise Facial com IA</h3>
                <p className="text-sm text-gray-600">
                  OpenAI identifica seu tom de pele, subtom e formato dos olhos
                </p>
              </Card>

              <Card className="p-6 text-center space-y-3 border-purple-200 bg-white/50 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Recomendações</h3>
                <p className="text-sm text-gray-600">
                  Produtos ideais para seu tipo de pele e ocasião
                </p>
              </Card>

              <Card className="p-6 text-center space-y-3 border-rose-200 bg-white/50 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Tutorial Passo a Passo</h3>
                <p className="text-sm text-gray-600">
                  Aprenda a aplicar cada produto com dicas profissionais
                </p>
              </Card>
            </div>

            {/* Upload Component */}
            <ImageUpload onImageUpload={handleImageUpload} isLoading={isLoading} error={error} />

            {/* Pricing Teaser */}
            <Card className="p-8 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-center space-y-4 border-0">
              <Crown className="w-12 h-12 mx-auto" />
              <h3 className="text-2xl font-bold">Análises Ilimitadas por Apenas R$ 14,99/mês</h3>
              <p className="text-purple-100 max-w-2xl mx-auto">
                Acesso completo a todas as funcionalidades, tutoriais exclusivos e suporte prioritário
              </p>
              <Link href="/pricing">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                  Ver Planos e Preços
                </Button>
              </Link>
            </Card>
          </div>
        )}

        {step === "analysis" && analysis && (
          <AnalysisResult 
            analysis={analysis}
            imageUrl={imageUrl}
            onContinue={() => setStep("style")}
          />
        )}

        {step === "style" && (
          <StyleSelector 
            onStyleSelect={handleStyleSelection}
            isLoading={isLoading}
          />
        )}

        {step === "recommendations" && recommendations && analysis && stylePrefs && (
          <MakeupRecommendations 
            recommendations={recommendations}
            analysis={analysis}
            preferences={stylePrefs}
            imageUrl={imageUrl}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
          <p>Powered by OpenAI • Recomendações personalizadas para você</p>
        </div>
      </footer>
    </div>
  )
}
