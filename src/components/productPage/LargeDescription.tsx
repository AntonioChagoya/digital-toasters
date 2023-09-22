// Components
import RadarChart from '@components/charts/RadarChart';

// Utils
import { groupArrayObjectsByGroupSize } from '@utils/arrays';

// Libs
import parse from 'html-react-parser';
import { TbFileSpreadsheet } from 'react-icons/tb';

const LargeDescription = ({
  descriptionHtml, metaobject, generalInfoMetaobject
}: {
  descriptionHtml: string, metaobject, generalInfoMetaobject
}) => {
  const { fields } = generalInfoMetaobject || []
  const groupedGeneralFields = groupArrayObjectsByGroupSize(fields, 3)

  if (!descriptionHtml && !metaobject) {
    return <></>
  }

  console.log("fields", fields);


  return (
    <div id="Description" className="p-5">
      <h2 className="text-2xl font-bold mb-5">Más Información</h2>
      <div className='flex flex-col gap-5 lg:gap-10'>
        <div className='flex flex-col-reverse items-center xl:flex-row gap-10 justify-between '>
          {
            groupedGeneralFields?.length > 0 &&
            <table className="table-fixed">
              <tbody className="text-left">
                {
                  groupedGeneralFields?.map((group, index) => {
                    if (!group) {
                      return <></>
                    }

                    return (
                      <tr key={index}>
                        {group.map((field, index) => {
                          if (!field) {
                            return <></>
                          }
                          if (field.key === "altura") {
                            return (
                              <td key={index}>
                                <h6>{field.key}</h6>
                                <p className="mb-0">{JSON.parse(field.value).value} m s. n. m.</p>
                              </td>
                            )
                          }
                          else {
                            return (
                              <td key={index}>
                                <h6>{field.key}</h6>
                                <p className="mb-0">{field.value}</p>
                              </td>
                            )
                          }

                        })}
                      </tr>
                    )
                  })
                }
              </tbody>

              <caption className='caption-bottom text-right cursor-pointer'>
                <p className='text-accent'>Saber más <TbFileSpreadsheet size={18} className="inline-block mb-1" /></p>
              </caption>
            </table>
          }
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