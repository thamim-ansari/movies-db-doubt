import {useState, useEffect} from 'react'

import Header from '../../components/Header'
import MovieList from '../../components/MovieList'
import FailureView from '../../components/FailureView'
import LoaderComponent from '../../components/Loader'
import {getFormattedMovieListData} from '../../utils/utils'
import Footer from '../../components/Footer'
import Pagination from '../../components/Pagination'

import './index.css'

const topRatedApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  in_progress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

const TopRated = () => {
  const [topRatedMovieData, setTopRatedMovieData] = useState([])
  const [topRatedApiStatus, setTopRatedApiStatus] = useState(
    topRatedApiStatusConstants.initial,
  )
  const [pageNumber, setPageNumber] = useState(1)

  const getTopRatedMovieData = async () => {
    setTopRatedApiStatus(topRatedApiStatusConstants.in_progress)
    const topRatedMovieUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&page=${pageNumber}`
    const topRatedMovieResponse = await fetch(topRatedMovieUrl)
    if (topRatedMovieResponse.ok) {
      const topRatedMovieResponseData = await topRatedMovieResponse.json()
      const formattedTopRatedMovieData = topRatedMovieResponseData.results.map(
        data => getFormattedMovieListData(data),
      )
      setTopRatedMovieData(formattedTopRatedMovieData)
      setTopRatedApiStatus(topRatedApiStatusConstants.success)
    } else {
      setTopRatedApiStatus(topRatedApiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getTopRatedMovieData()
  }, [pageNumber])

  const onRetry = () => {
    getTopRatedMovieData()
  }
  const onPrev = () => {
    if (pageNumber > 1) {
      setPageNumber(prev => prev - 1)
    }
  }

  const onNext = () => {
    setPageNumber(prev => prev + 1)
  }
  const renderTopRatedMovies = () => (
    <div className="top-rated-container">
      <div className="top-rated-movie-list-container">
        <h1 className="top-rated-heading">Top Rated</h1>
        <ul className="top-rated-movie-list">
          {topRatedMovieData.map(eachData => (
            <MovieList key={eachData.id} popularMovieDetails={eachData} />
          ))}
        </ul>
        <Pagination pageNumber={pageNumber} onPrev={onPrev} onNext={onNext} />
      </div>
    </div>
  )

  const renderTopRatedMoviesView = () => {
    switch (topRatedApiStatus) {
      case topRatedApiStatusConstants.in_progress:
        return <LoaderComponent />
      case topRatedApiStatusConstants.success:
        return renderTopRatedMovies()
      case topRatedApiStatusConstants.failure:
        return <FailureView onClickRetry={onRetry} />
      default:
        return null
    }
  }

  return (
    <div className="top-rated-page-container">
      <Header />
      {renderTopRatedMoviesView()}
      <Footer />
    </div>
  )
}

export default TopRated
