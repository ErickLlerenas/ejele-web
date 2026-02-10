import { Link } from 'react-router-dom';
import Header from '../landing/components/header';

export default function TermsAndConditions() {
  return (
    <div className="landing-premium min-h-screen">
      <Header />
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-screen-lg mx-auto glass-card p-10 rounded-2xl">
          <h1 className="text-4xl font-bold mb-6 text-white">Términos y Condiciones</h1>
          <div className="text-slate-400 space-y-4">
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">1. Introducción</h2>
            <p className="mb-2">
              Bienvenido a Ejele. Este documento establece los términos y condiciones que regulan el uso
              de nuestro software para restaurantes. A continuación, encontrarás información relevante
              sobre tus derechos y responsabilidades al utilizar Ejele.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">2. Definiciones</h2>
            <p className="mb-2">
              En estos términos y condiciones, los siguientes términos tendrán los significados
              indicados:
            </p>
            <ul className="list-disc ml-5 mb-4 space-y-2">
              <li>
                <strong className="text-white">Usuario:</strong> Persona que utiliza Ejele, ya sea como dueño de un restaurante
                o empleado autorizado.
              </li>
              <li>
                <strong className="text-white">Servicio:</strong> La plataforma digital Ejele y todas sus funcionalidades.
              </li>
              <li>
                <strong className="text-white">Cuenta:</strong> Registro creado por el usuario para acceder al software.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">3. Uso del Servicio</h2>
            <p className="mb-2">
              Para utilizar Ejele, solo necesitas proporcionar tu correo electrónico. No se requiere registro tradicional con contraseña ni creación de cuenta. El software funciona de forma local en tu computadora, y toda la información de tu restaurante se almacena únicamente en tu dispositivo.
            </p>
            <p className="mb-2 mt-4">
              Eres responsable de mantener la seguridad de tu computadora y de hacer respaldos regulares de tu información local.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">4. Obligaciones del Usuario</h2>
            <p className="mb-2">El usuario se compromete a:</p>
            <ul className="list-disc ml-5 mb-4 space-y-2">
              <li>Utilizar el software de manera lícita y conforme a su propósito.</li>
              <li>Asegurar que la información ingresada en el sistema sea precisa y actualizada.</li>
              <li>
                Mantener la seguridad de su computadora y hacer respaldos regulares de su información local.
              </li>
              <li>
                Proporcionar un correo electrónico válido para recibir comunicaciones importantes sobre el software.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">5. Propiedad Intelectual</h2>
            <p className="mb-2">
              Todos los derechos sobre el software, el nombre, los logotipos y los íconos utilizados en
              Ejele son propiedad exclusiva de Ejele. Algunos elementos visuales pueden ser de libre uso
              y no creados por nosotros, pero se utilizan conforme a sus licencias respectivas.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">6. Modelo Freemium</h2>
            <p className="mb-2">
              Ejele ofrece un modelo freemium: todas las funciones básicas (comandas, app para meseros, reportes básicos) son completamente gratuitas y sin límites. Las funciones avanzadas como Pantallas de Cocina (KDS), Control de Inventarios y Facturación CFDI están disponibles mediante planes premium opcionales.
            </p>
            <p className="mb-2 mt-4">
              No hay costos ocultos ni suscripciones obligatorias. Puedes usar el software básico de forma gratuita indefinidamente.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">7. Limitación de Responsabilidad</h2>
            <p className="mb-2">Ejele no será responsable por:</p>
            <ul className="list-disc ml-5 mb-4 space-y-2">
              <li>Pérdida de datos ocasionada por errores del usuario.</li>
              <li>Interrupciones en el servicio debido a fallos en la conexión a Internet.</li>
              <li>
                Daños directos o indirectos derivados del uso o la imposibilidad de usar el software.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">8. Modificaciones al Servicio</h2>
            <p className="mb-2">
              Ejele se reserva el derecho de modificar, actualizar o descontinuar funciones del software
              en cualquier momento, garantizando que los cambios sean comunicados oportunamente a los
              usuarios.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">9. Política de Privacidad</h2>
            <p className="mb-2">
              El manejo de la información personal se rige por nuestra política de privacidad, que
              puedes consultar aquí:
              <Link to="/politica-de-privacidad" className="text-blue-400 hover:text-blue-300 underline ml-1">
                Política de Privacidad
              </Link>
              .
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">10. Legislación Aplicable</h2>
            <p className="mb-2">
              Estos términos y condiciones se rigen por las leyes de México. Cualquier disputa
              relacionada con este documento será resuelta en los tribunales competentes de dicho país.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">11. Cambios a los Términos y Condiciones</h2>
            <p className="mb-2">
              Ejele puede actualizar estos términos y condiciones en cualquier momento. Las
              modificaciones serán publicadas en esta página y notificadas a los usuarios registrados.
              Te recomendamos revisarlos periódicamente.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
