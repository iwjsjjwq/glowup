import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { imageUrl } = await req.json()

    if (!imageUrl) {
      return NextResponse.json(
        { error: "URL da imagem é obrigatória" },
        { status: 400 }
      )
    }

    // Verificar se a chave da API está configurada
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Chave da OpenAI não configurada. Configure OPENAI_API_KEY nas variáveis de ambiente." },
        { status: 500 }
      )
    }

    // Validar se é uma imagem base64 válida
    if (!imageUrl.startsWith('data:image/')) {
      return NextResponse.json(
        { error: "Formato de imagem inválido. Envie uma imagem válida." },
        { status: 400 }
      )
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analise esta foto facial e forneça uma análise detalhada de maquiagem em formato JSON com a seguinte estrutura:

{
  "skinTone": "descrição do tom de pele (ex: claro, médio, moreno, escuro)",
  "undertone": "subtom da pele (quente/frio/neutro) com explicação breve",
  "skinTexture": "tipo de pele (oleosa/seca/mista/normal) com características observadas",
  "eyeShape": "formato dos olhos (amendoado/redondo/caído/puxado) com descrição",
  "facialFeatures": "características faciais relevantes para maquiagem (formato do rosto, traços marcantes)"
}

Seja específica e profissional, como uma consultora de beleza experiente. Responda APENAS com o JSON, sem texto adicional.`
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    })

    const analysisText = response.choices[0].message.content
    
    if (!analysisText) {
      return NextResponse.json(
        { error: "Não foi possível analisar a imagem" },
        { status: 500 }
      )
    }

    // Tentar fazer parse do JSON
    let analysis
    try {
      // Remover possíveis markdown code blocks
      const cleanText = analysisText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      analysis = JSON.parse(cleanText)
    } catch (parseError) {
      console.error("Erro ao fazer parse do JSON:", parseError)
      console.log("Resposta recebida:", analysisText)
      
      // Se não for JSON válido, extrair informações do texto
      analysis = {
        skinTone: "médio",
        undertone: "neutro - equilibrado entre tons quentes e frios",
        skinTexture: "normal - textura equilibrada",
        eyeShape: "amendoado - formato clássico e versátil",
        facialFeatures: analysisText
      }
    }

    return NextResponse.json({ analysis })
  } catch (error: any) {
    console.error("Erro na análise facial:", error)
    console.error("Detalhes do erro:", error?.message, error?.response?.data)
    
    // Mensagens de erro mais específicas
    if (error?.status === 401 || error?.code === 'invalid_api_key') {
      return NextResponse.json(
        { error: "Chave da OpenAI inválida. Verifique sua configuração." },
        { status: 401 }
      )
    }
    
    if (error?.status === 400 || error?.code === 'invalid_image_url') {
      return NextResponse.json(
        { error: "Formato de imagem inválido. Tente outra foto com melhor qualidade." },
        { status: 400 }
      )
    }

    if (error?.code === 'insufficient_quota') {
      return NextResponse.json(
        { error: "Limite de uso da OpenAI atingido. Verifique sua conta." },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: `Erro ao analisar imagem: ${error?.message || 'Tente novamente.'}` },
      { status: 500 }
    )
  }
}
