import { LayoutType } from "types/app"

const PrivacyPolicy = () => {

  return (
    <section className="container mx-auto max-w-2xl my-20">
      <h1 className="text-2xl font-bold mb-4 text-center">Aviso de Privacidad</h1>

      <p>En cumplimiento con la legislación vigente en materia de protección de datos personales, ponemos a tu disposición el siguiente aviso de privacidad:</p>

      <h2 className="text-xl font-bold mb-4">1. Responsable de los datos personales</h2>
      <p>Digital Toasters SA. de CV.<br />
        {/* Dirección de contacto<br /> */}
        soporte@digitaltoasters.com<br />
        +52 222 739 092
      </p>

      <h2 className="text-xl font-bold mb-4">2. Datos recopilados</h2>
      <p>Recopilamos los siguientes datos personales:<br />
        - Nombre y apellidos.<br />
        - Dirección de correo electrónico.<br />
        - Número de teléfono.<br />
        - Información de facturación y envío.<br />
        - Historial de compras y preferencias.<br />
        - Otros datos relevantes para (para análisis de uso del sitio).</p>

      <h2 className="text-xl font-bold mb-4">3. Uso de los datos</h2>
      <p>Utilizamos los datos recopilados para: <br />
        - Procesar y entregar pedidos <br />
        - Enviar comunicaciones y boletines informativos <br />
        - Personalizar la experiencia del usuario <br />
        - Realizar análisis y mejoras en nuestros servicios <br />
        - Cumplir con obligaciones legales y contractuales</p>


      <h2 className="text-xl font-bold mb-4">4. Compartir datos con terceros</h2>
      <p>Compartimos datos con los siguientes terceros: <br />
        - Proveedores de servicios de pago y envío <br />
        - Socios comerciales para [explicar el propósito] <br />
        - Autoridades legales cuando sea necesario cumplir con la ley</p>

      <h2 className="text-xl font-bold mb-4">5. Derechos del titular de los datos</h2>
      <p>Los usuarios tienen derecho a:<br />
        - Acceder, corregir y suprimir sus datos personales<br />
        - Oponerse al procesamiento de sus datos<br />
        - Revocar su consentimiento en cualquier momento<br />
        Para ejercer estos derechos, pueden contactarnos a través de los datos de contacto proporcionados.</p>

      <h2 className="text-xl font-bold mb-4">6. Seguridad de los datos</h2>
      <p>Implementamos medidas de seguridad para proteger los datos personales de los usuarios, incluida la encriptación y el acceso restringido.</p>

      <h2 className="text-xl font-bold mb-4">7. Cambios al aviso de privacidad</h2>
      <p>Notificaremos cualquier cambio al aviso de privacidad a través de correo electrónico. Los cambios entrarán en vigor a partir de su publicación.</p>

    </section>
  )
}

PrivacyPolicy.layout = LayoutType.PUBLIC
export default PrivacyPolicy