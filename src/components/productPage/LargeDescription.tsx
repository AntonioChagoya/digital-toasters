import parse from 'html-react-parser';
import RadarChart from '@components/charts/RadarChart';

const LargeDescription = ({ descriptionHtml, metaobject }: { descriptionHtml: string, metaobject }) => {

  if (!descriptionHtml && !metaobject) {
    return <></>
  }

  return (
    <div id="Description" className="p-5">
      <h2 className="text-2xl font-bold mb-5">Más Información</h2>

      <div className='flex flex-col-reverse items-center xl:flex-row gap-10 justify-between '>
        {
          descriptionHtml &&
          <div className="prose w-full xl:w-2/3 max-w-full">
            {parse(descriptionHtml)}
          </div>
        }
        {
          metaobject &&
          <div className='w-full lg:w-2/5'>
            <RadarChart metaobject={metaobject} />
          </div>
        }
      </div>
    </div>
  )
}

export default LargeDescription