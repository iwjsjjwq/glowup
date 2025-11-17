"use client"

import { useState } from "react"
import { Sparkles, Briefcase, Heart, PartyPopper, GraduationCap, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { StylePreferences } from "../page"

type StyleSelectorProps = {
  onStyleSelect: (prefs: StylePreferences) => void
  isLoading: boolean
}

const occasions = [
  { id: "trabalho", label: "Trabalho", icon: Briefcase, color: "blue" },
  { id: "date", label: "Date", icon: Heart, color: "rose" },
  { id: "festa", label: "Festa", icon: PartyPopper, color: "purple" },
  { id: "formatura", label: "Formatura", icon: GraduationCap, color: "indigo" },
]

const styles = [
  { id: "natural", label: "Natural", emoji: "🌿", description: "Leve e fresco" },
  { id: "glow", label: "Glow", emoji: "✨", description: "Iluminado e radiante" },
  { id: "sexy", label: "Sexy", emoji: "💋", description: "Marcante e sedutor" },
  { id: "dramatico", label: "Dramático", emoji: "🎭", description: "Intenso e impactante" },
]

export function StyleSelector({ onStyleSelect, isLoading }: StyleSelectorProps) {
  const [selectedOccasion, setSelectedOccasion] = useState<string>("")
  const [selectedStyle, setSelectedStyle] = useState<string>("")

  const handleSubmit = () => {
    if (selectedOccasion && selectedStyle) {
      onStyleSelect({
        occasion: selectedOccasion,
        style: selectedStyle
      })
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">
          Personalize seu Look
        </h2>
        <p className="text-gray-600">
          Escolha a ocasião e o estilo desejado
        </p>
      </div>

      {/* Ocasião */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-pink-600" />
          Qual a ocasião?
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {occasions.map((occasion) => {
            const Icon = occasion.icon
            const isSelected = selectedOccasion === occasion.id
            
            return (
              <Card
                key={occasion.id}
                onClick={() => setSelectedOccasion(occasion.id)}
                className={`p-6 cursor-pointer transition-all hover:scale-105 ${
                  isSelected 
                    ? `border-2 border-${occasion.color}-500 bg-${occasion.color}-50` 
                    : "border-gray-200 bg-white/50 backdrop-blur-sm hover:border-gray-300"
                }`}
              >
                <div className="text-center space-y-2">
                  <div className={`w-12 h-12 rounded-full bg-${occasion.color}-100 flex items-center justify-center mx-auto`}>
                    <Icon className={`w-6 h-6 text-${occasion.color}-600`} />
                  </div>
                  <p className="font-medium text-gray-900">{occasion.label}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Estilo */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          Qual estilo você quer?
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {styles.map((style) => {
            const isSelected = selectedStyle === style.id
            
            return (
              <Card
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`p-6 cursor-pointer transition-all hover:scale-105 ${
                  isSelected 
                    ? "border-2 border-purple-500 bg-purple-50" 
                    : "border-gray-200 bg-white/50 backdrop-blur-sm hover:border-gray-300"
                }`}
              >
                <div className="text-center space-y-2">
                  <div className="text-4xl mb-2">{style.emoji}</div>
                  <p className="font-medium text-gray-900">{style.label}</p>
                  <p className="text-xs text-gray-600">{style.description}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Botão */}
      <div className="flex justify-center pt-4">
        <Button 
          onClick={handleSubmit}
          disabled={!selectedOccasion || !selectedStyle || isLoading}
          size="lg"
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 min-w-[250px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Gerando Recomendações...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Ver Recomendações
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
