import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { analysis, preferences } = await req.json()

    if (!analysis || !preferences) {
      return NextResponse.json(
        { error: "Análise e preferências são obrigatórias" },
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

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Você é uma consultora de beleza especializada em maquiagem. Forneça recomendações detalhadas e profissionais em português do Brasil."
        },
        {
          role: "user",
          content: `Com base nesta análise facial e preferências, crie recomendações de maquiagem em formato JSON:

ANÁLISE FACIAL:
- Tom de pele: ${analysis.skinTone}
- Subtom: ${analysis.undertone}
- Textura: ${analysis.skinTexture}
- Formato dos olhos: ${analysis.eyeShape}
- Características: ${analysis.facialFeatures}

PREFERÊNCIAS:
- Ocasião: ${preferences.occasion}
- Estilo: ${preferences.style}

Retorne um JSON com esta estrutura EXATA:
{
  "foundation": "descrição detalhada da base ideal (tom, acabamento, cobertura)",
  "lipstick": "descrição da cor e tipo de batom ideal",
  "eyeshadow": "descrição das cores e técnica de sombra",
  "tutorial": {
    "steps": [
      "passo 1 detalhado",
      "passo 2 detalhado",
      "passo 3 detalhado",
      "passo 4 detalhado",
      "passo 5 detalhado"
    ],
    "products": [
      "produto específico 1",
      "produto específico 2",
      "produto específico 3",
      "produto específico 4",
      "produto específico 5"
    ],
    "tips": [
      "dica profissional 1",
      "dica profissional 2",
      "dica profissional 3"
    ]
  }
}

Seja específica com nomes de produtos reais disponíveis no Brasil e técnicas profissionais.`
        },
      ],
      max_tokens: 2000,
    })

    const recommendationsText = response.choices[0].message.content
    
    if (!recommendationsText) {
      return NextResponse.json(
        { error: "Não foi possível gerar recomendações" },
        { status: 500 }
      )
    }

    // Tentar fazer parse do JSON
    let recommendations
    try {
      recommendations = JSON.parse(recommendationsText)
    } catch {
      // Se não for JSON válido, criar estrutura padrão
      recommendations = {
        foundation: "Base de cobertura média com acabamento natural",
        lipstick: "Batom nude rosado para um look versátil",
        eyeshadow: "Tons neutros marrons e dourados",
        tutorial: {
          steps: [
            "Prepare a pele com primer",
            "Aplique a base uniformemente",
            "Finalize com pó translúcido",
            "Aplique a sombra nos olhos",
            "Finalize com batom"
          ],
          products: [
            "Primer facial",
            "Base líquida",
            "Pó translúcido",
            "Paleta de sombras",
            "Batom"
          ],
          tips: [
            "Use boa iluminação ao aplicar",
            "Misture bem os produtos",
            "Finalize com spray fixador"
          ]
        }
      }
    }

    return NextResponse.json({ recommendations })
  } catch (error: any) {
    console.error("Erro ao gerar recomendações:", error)
    
    // Mensagens de erro mais específicas
    if (error?.status === 401) {
      return NextResponse.json(
        { error: "Chave da OpenAI inválida. Verifique sua configuração." },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: "Erro ao gerar recomendações. Tente novamente." },
      { status: 500 }
    )
  }
}
