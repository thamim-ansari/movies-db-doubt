import {useState, useEffect} from 'react'

import Header from '../../components/Header'
import CastSlider from '../../components/CastSlider'
import {
  getFormattedMovieDetails,
  getFormattedCastDetails,
} from '../../utils/utils'
import Footer from '../../components/Footer'

import './index.css'

const movieDetailsPageApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const MovieDetails = props => {
  const {match} = props
  const {params} = match
  const {id} = params
  const [movieDetails, setMovieDetails] = useState({
    movieData: [],
    castData: [],
  })
  const [movieDetailsPageApiStatus, setMovieDetailsPageApiStatus] = useState({
    movieDetailsApiStatus: movieDetailsPageApiStatusConstants.initial,
    castDetailsApiStatus: movieDetailsPageApiStatusConstants.initial,
  })
  const {movieData, castData} = movieDetails
  const {
    title,
    tagline,
    posterImg,
    backdropImage,
    genres,
    rating,
    overview,
    status,
    releaseDate,
    runtime,
  } = movieData
  const {cast, director, writers} = castData
  const moviePosterImage =
    posterImg && posterImg.slice(-4) === 'null'
      ? 'https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg'
      : posterImg

  const getMovieDetails = async () => {
    const movieDetailsApiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_API}&append_to_response=videos&language=en-US`
    const movieDetailsResponse = await fetch(movieDetailsApiUrl)
    if (movieDetailsResponse.ok) {
      const fetchedMovieDetailsResponse = await movieDetailsResponse.json()
      const formattedMovieDetails = getFormattedMovieDetails(
        fetchedMovieDetailsResponse,
      )
      setMovieDetails(prevState => ({
        ...prevState,
        movieData: formattedMovieDetails,
      }))
      setMovieDetailsPageApiStatus(prevState => ({
        ...prevState,
        movieDetailsApiStatus: movieDetailsPageApiStatusConstants.success,
      }))
    } else {
      setMovieDetailsPageApiStatus(prevState => ({
        ...prevState,
        movieDetailsApiStatus: movieDetailsPageApiStatusConstants.failure,
      }))
    }
  }

  const getCastDetails = async () => {
    const castDetailsApiUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US`
    const castDetailsResponse = await fetch(castDetailsApiUrl)
    if (castDetailsResponse.ok) {
      const fetchedCastDetailsResponse = await castDetailsResponse.json()
      const formattedCastDetails = getFormattedCastDetails(
        fetchedCastDetailsResponse,
      )
      setMovieDetails(prevState => ({
        ...prevState,
        castData: formattedCastDetails,
      }))
      setMovieDetailsPageApiStatus(prevState => ({
        ...prevState,
        castDetailsApiStatus: movieDetailsPageApiStatusConstants.success,
      }))
    } else {
      setMovieDetailsPageApiStatus(prevState => ({
        ...prevState,
        castDetailsApiStatus: movieDetailsPageApiStatusConstants.failure,
      }))
    }
  }

  useEffect(() => {
    getMovieDetails()
    getCastDetails()
  }, [])

  const renderMoviePosterContainer = () => (
    <div className="movie-image-container">
      <img
        src={moviePosterImage}
        alt={`${title}-movie-poster`}
        className="movie-image"
      />
    </div>
  )

  const renderCircularRating = () => {
    const ratingColor = rating < 5 ? 'rating-red' : 'rating-orange'
    const ratingClass = rating < 7 ? ratingColor : 'rating-green'
    return (
      <div className="movie-detail-circular-progress-bar-container">
        <p className={ratingClass}>{rating}</p>
      </div>
    )
  }

  const renderMovieDetailsContainer = () => (
    <div className="movie-detail-container">
      {title && (
        <p className="movie-title">{`${title} (${releaseDate.slice(-4)})`}</p>
      )}

      <p className="movie-tag-line">{tagline}</p>

      <ul className="movie-genre-list">
        {genres &&
          genres.map(eachItem => (
            <li key={eachItem.id} className="movie-genre">
              {eachItem.name}
            </li>
          ))}
      </ul>

      <div className="movie-rating-and-video-container">
        {renderCircularRating()}
      </div>

      <div className="movie-overview-container">
        <p className="movie-overview-heading">Overview</p>
        <p className="movie-overview">{overview}</p>
      </div>

      <div className="movie-info-container">
        <div className="movie-stats-container">
          <p className="movie-infos-heading">Status:</p>
          <p className="movie-infos">{status}</p>
        </div>

        <div className="movie-stats-container">
          <p className="movie-infos-heading">Release Date: </p>
          <p className="movie-infos">{releaseDate}</p>
        </div>

        <div className="movie-stats-container">
          <p className="movie-infos-heading">Runtime: </p>
          <p className="movie-infos">{runtime}</p>
        </div>
      </div>

      {director && (
        <div className="movie-info-container">
          <p className="movie-infos-heading">Director:</p>
          <p className="movie-infos">
            {director?.map((d, i) => (
              <span key={d.id}>
                {d.name}
                {director.length - 1 !== i && ', '}
              </span>
            ))}
          </p>
        </div>
      )}

      {writers && (
        <div className="movie-info-container">
          <p className="movie-infos-heading">Writer: </p>
          <p className="movie-infos">
            {writers?.map((d, i) => (
              <span key={d.id}>
                {d.name}
                {writers.length - 1 !== i && ', '}
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  )

  const renderMovieCastList = () => <CastSlider castDetails={cast} />

  const renderMoviePosterAndDetails = () => (
    <div className="movie-image-and-detail-container">
      <div className="back-drop-container">
        <img
          src={backdropImage}
          alt={`${title}-movie-backdrop-img`}
          className="back-drop-img"
        />
      </div>
      {renderMoviePosterContainer()}
      {renderMovieDetailsContainer()}
    </div>
  )

  const onMovieRetry = () => {
    getMovieDetails()
  }

  const onCastRetry = () => {
    getCastDetails()
  }

  const renderMovieDetailsFailureView = () => (
    <div className="movie-details-failure-view-container">
      <div className="movie-details-failure-view-content-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="cake-list-failure-img"
          className="movie-details-failure-view-image"
        />
        <p className="movie-details-failureV-view-heading">
          Oops Something Went Wrong
        </p>
        <p className="movie-details-failure-view-description">
          We are having some trouble processing your request. Please try again.
        </p>
        <button
          type="button"
          onClick={onMovieRetry}
          className="failure-view-btn"
        >
          Retry
        </button>
      </div>
    </div>
  )

  const renderCastDetailsFailureView = () => (
    <div className="cast-details-failure-view-container">
      <div className="movie-details-failure-view-content-container">
        <p className="movie-details-failureV-view-heading">
          Oops Something Went Wrong
        </p>
        <p className="movie-details-failure-view-description">
          We are having some trouble processing your request. Please try again.
        </p>
        <button
          type="button"
          onClick={onCastRetry}
          className="failure-view-btn"
        >
          Retry
        </button>
      </div>
    </div>
  )

  const renderMovieDetailsView = () => {
    const {movieDetailsApiStatus} = movieDetailsPageApiStatus
    switch (movieDetailsApiStatus) {
      case movieDetailsPageApiStatusConstants.success:
        return renderMoviePosterAndDetails()
      case movieDetailsPageApiStatusConstants.failure:
        return renderMovieDetailsFailureView()
      default:
        return null
    }
  }

  const renderCastDetailsView = () => {
    const {castDetailsApiStatus} = movieDetailsPageApiStatus
    switch (castDetailsApiStatus) {
      case movieDetailsPageApiStatusConstants.success:
        return renderMovieCastList()
      case movieDetailsPageApiStatusConstants.failure:
        return renderCastDetailsFailureView()
      default:
        return null
    }
  }

  return (
    <div className="movie-details-bg-container">
      <Header />
      <div className="movie-details-container">
        <div className="movie-detail-responsive-container">
          {renderMovieDetailsView()}
          <div className="movie-cast-container">
            <p className="cast-container-heading">Cast</p>
            {renderCastDetailsView()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MovieDetails
