// Utils
import { parseString } from "@utils/stringParse"

// Components
import Box from "@components/Box"

interface HeadingProps {
  title: string
  subTitle: string
  renderHeading?: (title: string, subTitle: string) => React.ReactNode
}

const Heading = ({ title, subTitle, renderHeading }: HeadingProps) => {

  return (
    <>
      {renderHeading &&
        renderHeading(parseString(title), parseString(subTitle))
      }
      {!renderHeading &&
        <Box>
          <p className="text-center text-accent">{parseString(subTitle)}</p>
          <h3 className="text-center text-secondary">{parseString(title)}</h3>
        </Box>
      }
    </>
  )
}

export default Heading