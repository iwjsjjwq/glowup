"use client"

import { CheckCircle2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SkinAnalysis } from "../page"

type AnalysisResultProps = {
  analysis: SkinAnalysis
  imageUrl: string
  onContinue: () => void
}

export function AnalysisResult({ analysis, imageUrl, onContinue }: AnalysisResultProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">
          Análise Completa
        </h2>
        <p className="text-gray-600">
          Identificamos suas características únicas
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Imagem */}
        <Card className="p-6 bg-white/50 backdrop-blur-sm">
          <div className="aspect-square rounded-lg overflow-hidden">
            <img 
              src={imageUrl} 
              alt="Sua foto" 
              className="w-full h-full object-cover"
            />
          </div>
        </Card>

        {/* Resultados */}
        <div className="space-y-4">
          <Card className="p-6 bg-white/50 backdrop-blur-sm space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-pink-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Tom de Pele</h3>
                <p className="text-gray-700">{analysis.skinTone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Subtom</h3>
                <p className="text-gray-700">{analysis.undertone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-rose-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Textura da Pele</h3>
                <p className="text-gray-700">{analysis.skinTexture}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Formato dos Olhos</h3>
                <p className="text-gray-700">{analysis.eyeShape}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Características Faciais</h3>
                <p className="text-gray-700">{analysis.facialFeatures}</p>
              </div>
            </div>
          </Card>

          <Button 
            onClick={onContinue}
            size="lg"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          >
            Continuar para Estilo
          </Button>
        </div>
      </div>
    </div>
  )
}
