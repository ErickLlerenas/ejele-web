import { Helmet } from "react-helmet-async";

import Header from "@/pages/landing/components/header";
import ReferidosTeaser from "@/pages/landing/components/referidos-teaser";
import Footer from "@/pages/landing/components/footer";

export default function ReferidosPromoPage() {
  return (
    <div className="landing-premium min-h-screen overflow-x-hidden bg-black">
      <Helmet>
        <title>Programa de referidos — Ejele</title>
        <meta
          name="description"
          content="Gana el 30% de la primera compra de cada restaurante premium que recomiendes en Ejele."
        />
      </Helmet>
      <Header />
      <main className="pt-24">
        <ReferidosTeaser />
      </main>
      <Footer />
    </div>
  );
}
