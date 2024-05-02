import {Link} from 'react-router-dom'
import CircleRating from '../CircleRating'
import './index.css'

const MovieList = props => {
  const {popularMovieDetails} = props
  const {id, posterImage, title, rating, releaseDate} = popularMovieDetails
  const posterImg =
    posterImage.slice(-4) === 'null'
      ? 'https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg'
      : posterImage
  return (
    <li className="movie-card">
      <div className="movie-card-image-and-rating-container">
        <img
          src={posterImg}
          alt={`${title}-movie-poster`}
          className="movie-card-image"
        />
        <CircleRating rating={rating} />
      </div>
      <h1 className="movie-card-title">{title}</h1>
      <p className="movie-card-release-date">{releaseDate}</p>
      <Link to={`/movie-details/${id}`}>
        <button type="button" className="movie-card-view-details-btn">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MovieList
