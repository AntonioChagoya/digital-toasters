// GraphQL
import { gql, useMutation } from "@apollo/client";

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
  let emptyStars = 5 - fullStars - halfStars

  console.log("currentRating", currentRating);
  console.log("fullStars", fullStars);
  console.log("halfStars", halfStars);
  console.log("emptyStars", emptyStars);
  console.log("---");
  for (let i = 0; i < 6;) {
    if (fullStars > i) {
      stars.push(<TbStarFilled onClick={() => onSelectRate(i - 1)} size={25} className="text-yellow-500 hover:opacity-50 cursor-pointer" />)
      i++
    } else if (halfStars >= 1) {
      stars.push(<TbStarHalfFilled onClick={() => onSelectRate(i - 1)} size={25} className="text-yellow-500 hover:opacity-50 cursor-pointer" />)
      halfStars--
      i++
    } else {
      stars.push(<TbStar onClick={() => onSelectRate(i - 1)} size={25} className="text-yellow-500 hover:opacity-50 cursor-pointer" />)
      i++
    }
  }


  return (
    <>
      {stars.slice(0, 5).map((star) => star)}
    </>
  )
}

export default RatingStars