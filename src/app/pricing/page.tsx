"use client"

import { Check, Sparkles, Crown, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Plano Mensal",
      price: "14,99",
      period: "/mês",
      description: "Perfeito para quem quer experimentar",
      icon: Sparkles,
      color: "from-pink-500 to-rose-500",
      features: [
        "Análise facial ilimitada com IA",
        "Recomendações personalizadas",
        "Tutoriais passo a passo",
        "Lista de produtos ideais",
        "Suporte por email",
        "Acesso a todos os estilos",
      ],
      popular: false,
    },
    {
      name: "Plano Anual",
      price: "159,99",
      period: "/ano",
      description: "Economize 33% com o plano anual",
      savings: "Economize R$ 19,89",
      icon: Crown,
      color: "from-purple-500 to-indigo-600",
      features: [
        "Tudo do plano mensal",
        "Análise facial ilimitada com IA",
        "Recomendações personalizadas",
        "Tutoriais passo a passo",
        "Lista de produtos ideais",
        "Suporte prioritário 24/7",
        "Acesso antecipado a novos recursos",
        "Consultoria mensal ao vivo",
        "Biblioteca de vídeos exclusivos",
      ],
      popular: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                GlowUp AI
              </h1>
              <p className="text-xs text-gray-600">Sua consultora de beleza pessoal</p>
            </div>
          </Link>
          
          <Link href="/">
            <Button variant="outline" size="sm">
              Voltar
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Oferta Especial de Lançamento
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Escolha Seu
            <span className="block bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Plano Perfeito
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Acesso completo à consultoria de beleza com IA. Cancele quando quiser, sem compromisso.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon
            return (
              <Card
                key={plan.name}
                className={`relative p-8 ${
                  plan.popular
                    ? "border-2 border-purple-500 shadow-2xl scale-105"
                    : "border-pink-200"
                } bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Mais Popular
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Header */}
                  <div className="space-y-2">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold text-gray-900">R$ {plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                    {plan.savings && (
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                        <Check className="w-4 h-4" />
                        {plan.savings}
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={`w-full h-12 text-base font-semibold bg-gradient-to-r ${plan.color} hover:opacity-90 transition-opacity`}
                  >
                    Começar Agora
                  </Button>

                  {/* Features */}
                  <div className="space-y-3 pt-6 border-t">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Perguntas Frequentes
          </h2>
          <div className="space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <h3 className="font-semibold text-lg mb-2 text-gray-900">
                Posso cancelar a qualquer momento?
              </h3>
              <p className="text-gray-600">
                Sim! Você pode cancelar sua assinatura a qualquer momento, sem taxas ou multas. Seu acesso continuará até o fim do período pago.
              </p>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <h3 className="font-semibold text-lg mb-2 text-gray-900">
                Como funciona a análise com IA?
              </h3>
              <p className="text-gray-600">
                Nossa IA analisa sua foto identificando tom de pele, subtom, textura e formato dos olhos. Com base nisso, gera recomendações personalizadas de produtos e tutoriais.
              </p>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <h3 className="font-semibold text-lg mb-2 text-gray-900">
                Quantas análises posso fazer?
              </h3>
              <p className="text-gray-600">
                Análises ilimitadas! Você pode fazer quantas análises quiser, experimentar diferentes estilos e ocasiões sem restrições.
              </p>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <h3 className="font-semibold text-lg mb-2 text-gray-900">
                Qual a diferença entre os planos?
              </h3>
              <p className="text-gray-600">
                O plano anual oferece economia de 33%, suporte prioritário, consultoria mensal ao vivo e acesso antecipado a novos recursos. O plano mensal tem todas as funcionalidades principais.
              </p>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-20 text-center space-y-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Pronta para Transformar sua Rotina de Beleza?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Junte-se a milhares de mulheres que já descobriram a maquiagem perfeita com nossa IA
            </p>
            <Link href="/">
              <Button size="lg" className="h-14 px-8 text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
                Começar Gratuitamente
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              Pagamento seguro • Cancele quando quiser • Suporte dedicado
            </p>
            <p className="text-xs text-gray-500">
              © 2024 GlowUp AI. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
