// Components
import RadarChart from '@components/charts/RadarChart';
import Box from '@components/Box';

// Utils
import { groupArrayObjectsByGroupSize } from '@utils/arrays';

// Libs
import parse from 'html-react-parser';
import { TbFileSpreadsheet } from 'react-icons/tb';

const MoreInfo = ({
  descriptionHtml, metaobject, generalInfoMetaobject
}: {
  descriptionHtml: string, metaobject, generalInfoMetaobject
}) => {
  const { fields } = generalInfoMetaobject || []
  const groupedGeneralFields = groupArrayObjectsByGroupSize(fields, 4)

  if (!descriptionHtml && !metaobject) {
    return <></>
  }

  return (
    <Box id="Description" className="p-5 flex flex-col gap-10">
      <h4>Más Información</h4>
      <Box className='flex flex-col gap-5 lg:gap-10'>
        <Box className='flex flex-col items-center md:flex-row-reverse gap-10 justify-between '>
          {
            groupedGeneralFields?.length > 0 &&
            <table className="table-auto">
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
                            return <td key={index}></td>
                          }
                          if (field.key === "altura") {
                            return (
                              <td key={index}>
                                <h6>{field.key.replaceAll("_", " ")}</h6>
                                <p className="mb-0">{JSON.parse(field.value).value} m s. n. m.</p>
                              </td>
                            )
                          }
                          else {
                            return (
                              <td key={index}>
                                <h6>{field.key.replaceAll("_", " ")}</h6>
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
            <div className='min-h-[400px] min-w-[400px]'>
              <RadarChart metaobject={metaobject} />
            </div>
          }
        </Box>
        {
          descriptionHtml &&
          <Box className="prose w-full  max-w-full">
            {parse(descriptionHtml)}
          </Box>
        }
      </Box>
    </Box>
  )
}

export default MoreInfo