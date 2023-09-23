// Icons
import { TbStar, TbStarHalfFilled, TbStarFilled } from "react-icons/tb";

// Components
import Box from "@components/global/Box";

interface RatingStarsProps {
  currentRating: number
  onSelectRate: (starPosition: number) => void
}

const calculateStarsCount = (currentRating: number, onSelectRate) => {
  const stars = []
  let fullStars = Math.floor(currentRating)
  let halfStars = Math.ceil(currentRating - fullStars)

  for (let i = 0; i < 6;) {
    if (fullStars > i) {
      stars.push(<TbStarFilled onClick={() => onSelectRate(i - 1)} size={20} className="text-yellow-500" />)
      i++
    } else if (halfStars >= 1) {
      stars.push(<TbStarHalfFilled onClick={() => onSelectRate(i - 1)} size={20} className="text-yellow-500 " />)
      halfStars--
      i++
    } else {
      stars.push(<TbStar onClick={() => onSelectRate(i - 1)} size={20} className="text-yellow-500 " />)
      i++
    }
  }
  return stars.slice(0, 5).map((star, index) => <span key={index} aria-description="Rating star">{star}</span>)
}

const RatingStars = ({ currentRating = 0, onSelectRate }: RatingStarsProps) => {

  return (
    <div className="flex items-center gap-2">
      <ul className="flex gap-2">
        {calculateStarsCount(currentRating, onSelectRate)}
      </ul>
      <p className="mb-0 font-bold text-secondary">({currentRating.toFixed(1)})</p>
    </div>
  )
}

export default RatingStars