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
              Ejele está diseñado con privacidad como prioridad. Recopilamos únicamente la información mínima necesaria:
            </p>
            <ul className="list-disc ml-5 mb-4 space-y-2">
              <li>
                <strong className="text-white">Correo electrónico:</strong> Solo solicitamos tu correo electrónico para comunicarnos contigo sobre actualizaciones del software y servicios premium.
              </li>
              <li>
                <strong className="text-white">Estado de servicios premium:</strong> Registramos si has adquirido algún servicio premium (KDS, inventario, facturación) para habilitar las funcionalidades correspondientes.
              </li>
            </ul>
            <p className="mb-2 mt-4">
              <strong className="text-white">Importante:</strong> No solicitamos contraseñas, no creamos cuentas de usuario tradicionales, y no recopilamos información personal adicional. Toda la información de tu restaurante (menú, clientes, meseros, comandas, inventario) se almacena <strong className="text-white">únicamente en tu computadora local</strong>. Esta información nunca se envía a nuestros servidores.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">2. Uso de la Información</h2>
            <p className="mb-2">
              La información recopilada (correo electrónico y estado de servicios premium) se utiliza únicamente para:
            </p>
            <ul className="list-disc ml-5 mb-4 space-y-2">
              <li>Enviarte notificaciones sobre actualizaciones del software.</li>
              <li>Comunicarnos contigo sobre servicios premium disponibles.</li>
              <li>Habilitar las funcionalidades premium que hayas adquirido.</li>
            </ul>
            <p className="mb-2 mt-4">
              <strong className="text-white">No utilizamos tu correo para:</strong> marketing no solicitado, compartir con terceros, o crear perfiles de usuario. Tu correo se utiliza exclusivamente para comunicación esencial relacionada con el software.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">
              3. Bases Legales para el Tratamiento de Datos
            </h2>
            <p className="mb-2">El tratamiento de tu información (correo electrónico) se realiza con base en:</p>
            <ul className="list-disc ml-5 mb-4 space-y-2">
              <li>Tu consentimiento al proporcionar tu correo electrónico.</li>
              <li>La necesidad de comunicarnos contigo sobre el software y servicios premium.</li>
            </ul>
            <p className="mb-2 mt-4">
              <strong className="text-white">Datos locales:</strong> Toda la información de tu restaurante se almacena localmente en tu computadora. No procesamos, almacenamos ni tenemos acceso a esta información, ya que nunca se transmite a nuestros servidores.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">4. Compartición de Información</h2>
            <p className="mb-2">
              <strong className="text-white">No compartimos tu información con terceros.</strong> Tu correo electrónico y el estado de tus servicios premium se mantienen privados y no se comparten con ninguna empresa, organización o individuo.
            </p>
            <p className="mb-2 mt-4">
              <strong className="text-white">Datos locales:</strong> Como toda la información de tu restaurante se almacena localmente en tu computadora, no hay datos que compartir. Esta información nunca sale de tu dispositivo.
            </p>
            <p className="mb-2 mt-4">
              La única excepción sería si fuéramos requeridos por ley o autoridades competentes, en cuyo caso solo compartiríamos tu correo electrónico si fuera estrictamente necesario.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">5. Seguridad de la Información</h2>
            <p className="mb-2">
              <strong className="text-white">Privacidad por diseño:</strong> Ejele está diseñado para maximizar tu privacidad:
            </p>
            <ul className="list-disc ml-5 mb-4 space-y-2">
              <li><strong className="text-white">Almacenamiento local:</strong> Toda la información de tu restaurante se guarda únicamente en tu computadora. No se transmite a servidores externos.</li>
              <li><strong className="text-white">Mínima recopilación:</strong> Solo guardamos tu correo electrónico y el estado de servicios premium en nuestros servidores.</li>
              <li><strong className="text-white">Sin cuentas tradicionales:</strong> No creamos cuentas de usuario con contraseñas, eliminando riesgos de filtración de credenciales.</li>
              <li><strong className="text-white">Control total:</strong> Tú tienes control completo sobre tus datos. Puedes hacer respaldos locales y eliminar toda la información cuando desees.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">6. Derechos de los Usuarios</h2>
            <p className="mb-2">Tienes derecho a:</p>
            <ul className="list-disc ml-5 mb-4 space-y-2">
              <li>
                <strong className="text-white">Acceso:</strong> Solicitar qué información tenemos sobre ti (solo tu correo electrónico y estado de servicios premium).
              </li>
              <li>
                <strong className="text-white">Corrección:</strong> Actualizar o corregir tu correo electrónico en cualquier momento.
              </li>
              <li>
                <strong className="text-white">Eliminación:</strong> Solicitar la eliminación de tu correo electrónico de nuestros registros. Esto no afectará tus datos locales.
              </li>
              <li>
                <strong className="text-white">Control de datos locales:</strong> Como toda la información de tu restaurante está en tu computadora, tienes control total. Puedes eliminar, modificar o hacer respaldos cuando desees.
              </li>
              <li>
                <strong className="text-white">Retiro del consentimiento:</strong> Puedes solicitar que eliminemos tu correo de nuestros registros en cualquier momento.
              </li>
            </ul>
            <p className="mb-2 mt-4">
              Para ejercer estos derechos, puedes contactarnos a través del correo electrónico que proporcionaste o mediante los canales de contacto disponibles en el software.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">7. Retención de Información</h2>
            <p className="mb-2">
              <strong className="text-white">Correo electrónico:</strong> Conservamos tu correo electrónico mientras uses el software o hasta que solicites su eliminación. Si tienes servicios premium activos, conservaremos tu correo mientras estos estén vigentes.
            </p>
            <p className="mb-2 mt-4">
              <strong className="text-white">Datos locales:</strong> Como toda la información de tu restaurante se almacena localmente en tu computadora, tú decides cuánto tiempo conservarla. Nosotros no tenemos acceso a esta información.
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
