import { Icon } from "@iconify/react";

export default function Questions() {
  const faqs = [
    {
      question: "¿Por qué es gratis?",
      answer:
        "Ejele corre en tu computadora, no en la nube ni en apps de terceros. Sin rentas que pagar de nuestra parte, podemos ofrecerte la versión gratuita de por vida y un premium a un precio muy bajo.",
      icon: "solar:gift-bold-duotone",
      color: "emerald",
    },
    {
      question: "¿Qué incluye el plan premium?",
      answer:
        "Incluye acceso a pantallas en cocina (KDS), la app para meseros y la opción de conectar todos los dispositivos que necesites. También llevas inventario y recibes por correo un PDF con el reporte de ventas cada vez que cierras caja.",
      icon: "solar:star-bold-duotone",
      color: "orange",
    },
    {
      question: "¿Cuánto cuesta el plan premium?",
      answer:
        "Tenemos tres planes: Plan mensual por $299, plan anual por $2,999 y plan de por vida por $5,999. Todos incluyen acceso completo a todas las funciones premium.",
      icon: "solar:wallet-money-bold-duotone",
      color: "yellow",
    },
    {
      question: "¿Cómo funciona?",
      answer:
        "Una computadora o laptop es la central. El resto (tablets, celulares, pantallas de cocina) se conecta a ella por tu red WiFi.",
      icon: "solar:laptop-bold-duotone",
      color: "blue",
    },
    {
      question: "¿Cuántos dispositivos puedo conectar?",
      answer:
        "Un dispositivo incluido gratis. Con premium, conecta todos los que necesites — tablets, computadoras, celulares — sin límite.",
      icon: "solar:users-group-two-rounded-bold-duotone",
      color: "green",
    },
    {
      question:
        "¿Tienen integración con plataformas como Uber Eats, Didi Food o Rappi?",
      answer:
        "No. Integrar esas plataformas no es gratis, ya no podríamos ofrecer la versión gratuita y el premium tendría que ser más caro.",
      icon: "solar:delivery-bold-duotone",
      color: "pink",
    },
    {
      question: "¿Puedo gestionar múltiples restaurantes?",
      answer:
        "Sí, puedes registrar múltiples restaurantes o sucursales con tu misma cuenta, gratis. El plan premium se paga por cada restaurante individualmente.",
      icon: "solar:shop-2-bold-duotone",
      color: "teal",
    },
    {
      question: "¿Cómo funciona la facturación?",
      answer:
        "Tus clientes se facturan solos. Solo tienen que escanear el código QR que sale en su ticket de venta, ingresar sus datos y listo. El CFDI les llega al instante. Compras folios y cada folio te permite hacer una factura.",
      icon: "solar:document-text-bold-duotone",
      color: "indigo",
    },
    {
      question: "¿Necesito internet para usarlo?",
      answer:
        "Ejele funciona completamente offline. Todo se guarda localmente en tu computadora. Solo necesitas internet para registrarte, para comprar los planes premium y para enviar el reporte en PDF por correo al hacer corte de caja.",
      icon: "solar:wi-fi-router-bold-duotone",
      color: "purple",
    },
    {
      question: "¿Qué impresoras puedo usar?",
      answer:
        "Cualquier impresora térmica (ESC/POS) que se conecte a tu red (Ethernet o WiFi). Te recomendamos usar conexión por cable Ethernet. No es compatible con impresoras USB o Bluetooth.\n\nModelos recomendados:",
      icon: "solar:printer-bold-duotone",
      color: "pink",
      badges: [
        { text: "Económica", href: "https://a.co/d/0hOdySGy" },
        { text: "Estándar", href: "https://a.co/d/07YhykMp" },
        { text: "Gama alta", href: "https://a.co/d/0ddGizVo" },
      ],
    },
  ];

  return (
    <section id="faq" className="py-24 md:py-36 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Preguntas frecuentes
          </h2>
          <p className="text-gray-400 text-lg">
            Todo lo que necesitas saber sobre Ejele.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => {
            const cardBgColors = {
              blue: "bg-blue-900",
              green: "bg-green-900",
              indigo: "bg-indigo-900",
              orange: "bg-orange-900",
              purple: "bg-purple-900",
              pink: "bg-pink-900",
              yellow: "bg-yellow-900",
              teal: "bg-teal-900",
              emerald: "bg-emerald-900",
            };

            const iconColors = {
              blue: "text-blue-300",
              green: "text-green-300",
              indigo: "text-indigo-300",
              orange: "text-orange-300",
              purple: "text-purple-300",
              pink: "text-pink-300",
              yellow: "text-yellow-300",
              teal: "text-teal-300",
              emerald: "text-emerald-300",
            };

            return (
              <div
                key={index}
                className={`p-6 rounded-lg ${cardBgColors[faq.color as keyof typeof cardBgColors]} reveal transition-all hover:scale-[1.02]`}
              >
                <div
                  className={`mb-4 ${iconColors[faq.color as keyof typeof iconColors]}`}
                >
                  <Icon icon={faq.icon} className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3">
                  {faq.question}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </p>
                {"badges" in faq && (faq.badges?.length ?? 0) > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {(faq.badges ?? []).map((b, i) => (
                      <a
                        key={i}
                        href={b.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/15 text-white hover:bg-white/25 transition-colors"
                      >
                        {b.text}
                        <Icon
                          icon="fa6-brands:amazon"
                          className="w-3.5 h-3.5"
                        />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
