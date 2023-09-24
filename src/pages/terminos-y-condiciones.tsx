import { LayoutType } from "types/app"

const TermsAndConditions = () => {

  return (
    <section className="container mx-auto max-w-2xl my-20 p-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Términos y condiciones</h1>

      <ol>
        <li className="font-bold">Aceptación de Términos</li>
        <p>Al utilizar nuestro Sitio web, afirmas que tienes al menos 18 años de edad y la capacidad legal para celebrar este Acuerdo. Si estás utilizando el Sitio web en nombre de una entidad, declaras y garantizas que tienes la autoridad para vincular a esa entidad a estos Términos.</p>

        <li className="font-bold">Información de Productos</li>
        <p>Nos esforzamos por proporcionar información precisa y actualizada sobre nuestros productos, incluidas descripciones, imágenes y precios. Sin embargo, no garantizamos la precisión, integridad o confiabilidad de ninguna información de producto mostrada en el Sitio web. Nos reservamos el derecho de modificar, actualizar o discontinuar cualquier producto sin previo aviso.</p>

        <li className="font-bold">Pedidos y Pagos</li>
        <p>Realizar un pedido a través de nuestro Sitio web constituye una oferta de compra de productos. Todos los pedidos están sujetos a la aceptación por parte de Digital Toasters. Nos reservamos el derecho de rechazar o cancelar cualquier pedido por cualquier motivo, incluida, entre otras, la disponibilidad del producto, errores en los precios o sospecha de fraude.</p>
        <p>El pago de los pedidos debe realizarse a través de los métodos de pago proporcionados. Aceptas proporcionar información de pago precisa y completa. Los precios se indican en la moneda especificada en el Sitio web y pueden excluir impuestos, aranceles y tarifas de envío.</p>


        <li className="font-bold">Envío y Entrega</li>
        <p>Realizaremos esfuerzos razonables para garantizar la entrega oportuna de los productos; sin embargo, no garantizamos tiempos de entrega específicos. Los costos de envío y los plazos de entrega estimados se proporcionan durante el proceso de pago. Cualquier arancel aduanero o impuesto de importación es responsabilidad del cliente.</p>

        <li className="font-bold">Devoluciones y Reembolsos</li>
        <p>Nuestra Política de Devoluciones y Reembolsos rige el proceso de devolución de productos y solicitud de reembolsos. Consulta la política proporcionada en nuestro Sitio web para obtener información detallada sobre cómo iniciar devoluciones y reembolsos.</p>

        <li className="font-bold">Propiedad Intelectual</li>
        <p>Todo el contenido del Sitio web, incluido texto, imágenes, gráficos, logotipos, marcas comerciales y software, es propiedad de Digital Toasters o sus licenciantes y está protegido por las leyes de propiedad intelectual. No puedes usar, reproducir, distribuir o modificar ningún contenido sin el consentimiento previo por escrito de Digital Toasters.</p>

        <li className="font-bold">Privacidad y Seguridad de Datos</li>
        <p>Tu uso del Sitio web está sujeto a nuestra Política de Privacidad, que describe cómo recopilamos, usamos y protegemos tu información personal. Al usar el Sitio web, aceptas las prácticas descritas en la Política de Privacidad.</p>

        <li className="font-bold">Limitación de Responsabilidad</li>
        <p>En la medida permitida por la ley, Digital Toasters no será responsable por daños directos, indirectos, incidentales, especiales, consecuentes o punitivos derivados de tu uso del Sitio web o productos comprados a través del Sitio web.</p>

        <li className="font-bold">Indemnización</li>
        <p>Aceptas indemnizar, defender y eximir de responsabilidad a Digital Toasters, sus directivos, empleados y agentes, por cualquier reclamo, responsabilidad, daño, pérdida y gasto derivados de tu uso del Sitio web o incumplimiento de estos Términos.</p>

        <li className="font-bold">Modificaciones a los Términos</li>
        <p>Nos reservamos el derecho de modificar, actualizar o reemplazar estos Términos en cualquier momento y sin previo aviso. Tu uso continuado del Sitio web después de cualquier cambio constituye tu aceptación de los términos modificados.</p>

      </ol>
    </section>
  )
}
TermsAndConditions.layout = LayoutType.PUBLIC
export default TermsAndConditions