import React from 'react';
import Header from '../landing/components/header';

export default function Policy() {
  return (
    <div className="landing-premium min-h-screen">
      <Header />
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-screen-lg mx-auto glass-card p-10 rounded-2xl">
          <h1 className="text-4xl font-bold mb-6 text-white">Política de Privacidad</h1>
          <div className="text-slate-400 space-y-4">
            <p className="mb-4">
              En <b className="text-white">Ejele</b>, nos comprometemos a proteger tu privacidad y la seguridad de tu
              información personal. Esta política describe cómo recopilamos, utilizamos, protegemos y
              gestionamos tus datos. Al usar nuestro software, aceptas los términos descritos en esta
              política.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">1. Información que Recopilamos</h2>
            <p className="mb-2">
              Recopilamos información personal y empresarial necesaria para brindarte nuestros
              servicios. Esto incluye:
            </p>
            <ul className="list-disc ml-5 mb-4 space-y-2">
              <li>
                <strong className="text-white">Datos del restaurante:</strong> Nombre, ubicación y RFC.
              </li>
              <li>
                <strong className="text-white">Información del usuario:</strong> Correo electrónico y contraseña (almacenada
                encriptada).
              </li>
              <li>
                <strong className="text-white">Detalles del menú:</strong> Información sobre los platillos ofrecidos.
              </li>
              <li>
                <strong className="text-white">Información de clientes:</strong> Nombre, ciudad, calle, colonia y número de
                casa.
              </li>
              <li>
                <strong className="text-white">Información de meseros:</strong> Nombre.
              </li>
              <li>
                <strong className="text-white">Comandas y tickets:</strong> Datos relacionados con los pedidos y los tickets
                generados.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">2. Uso de la Información</h2>
            <p className="mb-2">
              La información recopilada se utiliza únicamente para los siguientes fines:
            </p>
            <ul className="list-disc ml-5 mb-4 space-y-2">
              <li>Registrar y gestionar tu restaurante.</li>
              <li>Emitir facturas y cumplir con obligaciones legales.</li>
              <li>Proporcionar funcionalidades personalizadas y mejorar tu experiencia de usuario.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">
              3. Bases Legales para el Tratamiento de Datos
            </h2>
            <p className="mb-2">El tratamiento de tu información se realiza con base en:</p>
            <ul className="list-disc ml-5 mb-4 space-y-2">
              <li>Tu consentimiento explícito al registrarte y usar el software.</li>
              <li>La necesidad de procesar datos para proporcionarte los servicios solicitados.</li>
              <li>El cumplimiento de nuestras obligaciones legales, como la emisión de facturas.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">4. Compartición de Información</h2>
            <p className="mb-2">
              No compartimos tu información personal con terceros, salvo en los siguientes casos:
            </p>
            <ul className="list-disc ml-5 mb-4 space-y-2">
              <li>
                <strong className="text-white">Proveedores de servicios:</strong> Utilizamos servicios de almacenamiento de datos
                en la nube. Estos proveedores procesan tu información únicamente para cumplir con sus funciones.
              </li>
              <li>
                <strong className="text-white">Cumplimiento legal:</strong> Podremos compartir tu información si es requerido
                por ley o para responder a solicitudes legales.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">5. Seguridad de la Información</h2>
            <p className="mb-2">
              Adoptamos medidas técnicas y organizativas para proteger tu información, tales como:
            </p>
            <ul className="list-disc ml-5 mb-4 space-y-2">
              <li>Encriptación de contraseñas y datos sensibles.</li>
              <li>Uso de proveedores confiables y seguros.</li>
              <li>Acceso restringido a la información, disponible solo para usuarios autorizados.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">6. Derechos de los Usuarios</h2>
            <p className="mb-2">De acuerdo con las normativas aplicables, tienes derecho a:</p>
            <ul className="list-disc ml-5 mb-4 space-y-2">
              <li>
                <strong className="text-white">Acceso:</strong> Solicitar una copia de tu información personal.
              </li>
              <li>
                <strong className="text-white">Corrección:</strong> Actualizar o corregir tu información.
              </li>
              <li>
                <strong className="text-white">Eliminación:</strong> Solicitar la eliminación de tu información, salvo en casos
                donde debamos conservarla por obligaciones legales.
              </li>
              <li>
                <strong className="text-white">Restricción:</strong> Limitar el uso de tus datos en ciertas circunstancias.
              </li>
              <li>
                <strong className="text-white">Retiro del consentimiento:</strong> Retirar tu consentimiento para el
                tratamiento de datos en cualquier momento.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">7. Retención de Información</h2>
            <p className="mb-2">
              Tu información se conservará mientras mantengas una cuenta activa con nosotros o según lo
              requiera la ley.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">8. Cambios en la Política de Privacidad</h2>
            <p className="mb-2">
              Nos reservamos el derecho de actualizar esta política para reflejar cambios en nuestras
              prácticas o en la legislación aplicable. Publicaremos las actualizaciones en esta página y
              notificaremos cualquier cambio significativo.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">9. Ley Aplicable</h2>
            <p className="mb-2">
              Esta política de privacidad se rige por las leyes de México. Cualquier controversia
              relacionada será resuelta bajo la jurisdicción aplicable en el territorio mexicano.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
