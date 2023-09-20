import parse from 'html-react-parser';
import RadarChart from '@components/charts/RadarChart';

const LargeDescription = ({ descriptionHtml, metaobject }: { descriptionHtml: string, metaobject }) => {

  if (!descriptionHtml && !metaobject) {
    return <></>
  }

  return (
    <div id="Description" className="p-5">
      <h2 className="text-2xl font-bold mb-5">Más Información</h2>
      <div className='flex flex-col gap-5 lg:gap-10'>
        <div className='flex flex-col-reverse items-center xl:flex-row gap-10 justify-between '>
          <table className='w-full lg:w-3/5'>
            <tbody >
              <tr>
                <td>
                  <h6>Región</h6>
                  <p>Monte Verde, Ocotlán, Oaxaca</p>
                </td>
                <td>
                  <h6>Altura</h6>
                  <p>1,600 MSNM</p>
                </td>
                <td>
                  <h6>Productora</h6>
                  <p>Isabel Dolores</p>
                </td>
              </tr>

              <tr>
                <td>
                  <h6>Varietal</h6>
                  <p>Bourbon</p>
                </td>

                <td>
                  <h6>Proceso</h6>
                  <p>Lavado tradicional</p>
                </td>

                <td>
                  <h6>Notas</h6>
                  <p>Chocolate, nuez</p>
                </td>
              </tr>

              <tr>
                <td>
                  <h6>Aroma</h6>
                  <p>Caramelo, zacate limón, miel, clavo de olor</p>
                </td>
                <td>
                  <h6>Acidez</h6>
                  <p>Cítrica viva, maracuyá</p>
                </td>
                <td>
                  <h6>Cosecha</h6>
                  <p>2023 | Lote #9</p>
                </td>
              </tr>

              <tr>
                <td>
                  <h6>Puntaje de catador</h6>
                  <p>87.75 puntos</p>
                </td>
              </tr>
            </tbody>
          </table>

          {
            metaobject &&
            <div className='w-full lg:w-2/5 max-w-[400px]'>
              <RadarChart metaobject={metaobject} />
            </div>
          }
        </div>
        {
          descriptionHtml &&
          <div className="prose w-full  max-w-full">
            {parse(descriptionHtml)}
          </div>
        }

      </div>
    </div>
  )
}

export default LargeDescription