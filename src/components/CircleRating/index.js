import './index.css'

const CircleRating = ({rating}) => {
  const ratingColor = rating < 5 ? 'rating-red' : 'rating-orange'
  const ratingClass = rating < 7 ? ratingColor : 'rating-green'
  return (
    <div className="circular-progress-bar-container">
      <p className={ratingClass}>{rating}</p>
    </div>
  )
}

export default CircleRating
