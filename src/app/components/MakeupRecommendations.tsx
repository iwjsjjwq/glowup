"use client"

import { CheckCircle2, ShoppingBag, Video, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MakeupRecommendation, SkinAnalysis, StylePreferences } from "../page"

type MakeupRecommendationsProps = {
  recommendations: MakeupRecommendation
  analysis: SkinAnalysis
  preferences: StylePreferences
  imageUrl: string
}

export function MakeupRecommendations({ 
  recommendations, 
  analysis, 
  preferences,
  imageUrl 
}: MakeupRecommendationsProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">
          Seu Look Personalizado
        </h2>
        <p className="text-gray-600">
          {preferences.style.charAt(0).toUpperCase() + preferences.style.slice(1)} • {preferences.occasion.charAt(0).toUpperCase() + preferences.occasion.slice(1)}
        </p>
      </div>

      {/* Resumo da Análise */}
      <Card className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img src={imageUrl} alt="Você" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-gray-900">Seu Perfil</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-600">Tom:</span>{" "}
                <span className="font-medium text-gray-900">{analysis.skinTone}</span>
              </div>
              <div>
                <span className="text-gray-600">Subtom:</span>{" "}
                <span className="font-medium text-gray-900">{analysis.undertone}</span>
              </div>
              <div>
                <span className="text-gray-600">Textura:</span>{" "}
                <span className="font-medium text-gray-900">{analysis.skinTexture}</span>
              </div>
              <div>
                <span className="text-gray-600">Olhos:</span>{" "}
                <span className="font-medium text-gray-900">{analysis.eyeShape}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Produtos Recomendados */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-pink-600" />
          Produtos Ideais para Você
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Base */}
          <Card className="p-6 bg-white/50 backdrop-blur-sm space-y-3">
            <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Base</h4>
              <p className="text-sm text-gray-700">{recommendations.foundation}</p>
            </div>
          </Card>

          {/* Batom */}
          <Card className="p-6 bg-white/50 backdrop-blur-sm space-y-3">
            <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Batom</h4>
              <p className="text-sm text-gray-700">{recommendations.lipstick}</p>
            </div>
          </Card>

          {/* Sombra */}
          <Card className="p-6 bg-white/50 backdrop-blur-sm space-y-3">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Sombra</h4>
              <p className="text-sm text-gray-700">{recommendations.eyeshadow}</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Tutorial Passo a Passo */}
      <Card className="p-6 bg-white/50 backdrop-blur-sm space-y-6">
        <div className="flex items-center gap-2">
          <Video className="w-6 h-6 text-purple-600" />
          <h3 className="text-2xl font-bold text-gray-900">
            Tutorial Passo a Passo
          </h3>
        </div>

        <div className="space-y-4">
          {recommendations.tutorial.steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0 text-white font-semibold">
                {index + 1}
              </div>
              <div className="flex-1 pt-1">
                <p className="text-gray-900">{step}</p>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Dicas Profissionais */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            Dicas Profissionais
          </h4>
          <ul className="space-y-2">
            {recommendations.tutorial.tips.map((tip, index) => (
              <li key={index} className="flex gap-2 text-sm text-gray-700">
                <span className="text-amber-600">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Lista de Produtos */}
      <Card className="p-6 bg-white/50 backdrop-blur-sm space-y-4">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-pink-600" />
          <h3 className="text-2xl font-bold text-gray-900">
            Lista de Compras
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {recommendations.tutorial.products.map((product, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200"
            >
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm text-gray-900">{product}</span>
            </div>
          ))}
        </div>

        <Button 
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          size="lg"
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          Salvar Lista de Produtos
        </Button>
      </Card>
    </div>
  )
}
