"use client"

import { useState, useRef } from "react"
import { Camera, Upload, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

type ImageUploadProps = {
  onImageUpload: (url: string) => void
  isLoading: boolean
  error?: string
}

export function ImageUpload({ onImageUpload, isLoading, error }: ImageUploadProps) {
  const [preview, setPreview] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Criar preview local
    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      setPreview(result)
      onImageUpload(result)
    }
    reader.readAsDataURL(file)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card className="p-8 border-2 border-dashed border-pink-300 bg-white/50 backdrop-blur-sm">
      <div className="space-y-6">
        {error && (
          <Alert variant="destructive" className="bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {!preview ? (
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mx-auto">
              <Camera className="w-10 h-10 text-white" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Envie sua foto
              </h3>
              <p className="text-gray-600 text-sm">
                Tire uma selfie com boa iluminação para melhores resultados
              </p>
            </div>

            <Button 
              onClick={handleClick}
              disabled={isLoading}
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analisando...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2" />
                  Escolher Foto
                </>
              )}
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden max-w-md mx-auto">
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-auto"
              />
              {isLoading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Loader2 className="w-12 h-12 animate-spin mx-auto mb-2" />
                    <p className="text-sm">Analisando sua foto...</p>
                  </div>
                </div>
              )}
            </div>

            {!isLoading && (
              <div className="text-center">
                <Button 
                  onClick={handleClick}
                  variant="outline"
                >
                  Escolher Outra Foto
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl mb-1">✨</div>
            <p className="text-xs text-gray-600">Boa iluminação</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">📸</div>
            <p className="text-xs text-gray-600">Rosto visível</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">🎯</div>
            <p className="text-xs text-gray-600">Sem maquiagem</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
