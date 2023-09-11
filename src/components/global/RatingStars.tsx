// Icons
import { TbStar, TbStarHalfFilled, TbStarFilled } from "react-icons/tb";

interface RatingStarsProps {
  currentRating: number
  onSelectRate: (starPosition: number) => void
}

const RatingStars = ({ currentRating, onSelectRate }: RatingStarsProps) => {
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

  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-1 items-center">
        {stars.slice(0, 5).map((star) => star)}
      </div>
      <p className="mb-0 font-bold">{currentRating.toFixed(1)}</p>
    </div>
  )
}

export default RatingStars