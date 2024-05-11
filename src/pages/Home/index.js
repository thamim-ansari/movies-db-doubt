import {useState, useEffect} from 'react'

import Header from '../../components/Header'
import MovieList from '../../components/MovieList'
import LoaderComponent from '../../components/Loader'
import FailureView from '../../components/FailureView'
import {getFormattedMovieListData} from '../../utils/utils'
import Pagination from '../../components/Pagination'
import Footer from '../../components/Footer'

import './index.css'

const homeApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  in_progress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

const Home = () => {
  const [popularMovieData, setPopularMovie] = useState([])
  const [homeApiStatus, setHomeApiStatus] = useState(
    homeApiStatusConstants.initial,
  )
  const [pageNumber, setPageNumber] = useState(1)

  const getPopularMovieData = async () => {
    setHomeApiStatus(homeApiStatusConstants.in_progress)
    const popularMovieUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&page=${pageNumber}`
    const popularMovieResponse = await fetch(popularMovieUrl)
    if (popularMovieResponse.ok) {
      const popularMovieResponseData = await popularMovieResponse.json()

      const formattedPopularMovieData = popularMovieResponseData.results.map(
        data => getFormattedMovieListData(data),
      )
      setPopularMovie(formattedPopularMovieData)
      setHomeApiStatus(homeApiStatusConstants.success)
    } else {
      setHomeApiStatus(homeApiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getPopularMovieData()
  }, [pageNumber])

  const onRetry = () => {
    getPopularMovieData()
  }

  const onPrev = () => {
    if (pageNumber > 1) {
      setPageNumber(prev => prev - 1)
    }
  }

  const onNext = () => {
    setPageNumber(prev => prev + 1)
  }

  const renderPopularMovieListContainer = () => (
    <div className="popular-movie-list-container">
      <h1 className="popular-picks">Popular</h1>
      <ul className="popular-movie-list">
        {popularMovieData.map(eachData => (
          <MovieList key={eachData.id} popularMovieDetails={eachData} />
        ))}
      </ul>
      <Pagination pageNumber={pageNumber} onPrev={onPrev} onNext={onNext} />
    </div>
  )

  const renderMainContainer = () => (
    <div className="home-container">{renderPopularMovieListContainer()}</div>
  )

  const popularMoviePageView = () => {
    switch (homeApiStatus) {
      case homeApiStatusConstants.in_progress:
        return <LoaderComponent />
      case homeApiStatusConstants.success:
        return renderMainContainer()
      case homeApiStatusConstants.failure:
        return <FailureView onClickRetry={onRetry} />
      default:
        return null
    }
  }

  return (
    <div className="home-bg-container">
      <Header />
      {popularMoviePageView()}
      <Footer />
    </div>
  )
}

export default Home
