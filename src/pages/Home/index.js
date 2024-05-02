import {useState, useEffect} from 'react'

import Header from '../../components/Header'
import MovieList from '../../components/MovieList'
import LoaderComponent from '../../components/Loader'
import FailureView from '../../components/FailureView'
import {getFormattedMovieListData} from '../../utils/utils'
import Pagination from '../../components/pagination'
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
  const [currentPage, setCurrentPage] = useState(1)
  const [moviesPerPage] = useState(12)
  const indexOfLastMovie = currentPage * moviesPerPage
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage
  const currentMovies = popularMovieData.slice(
    indexOfFirstMovie,
    indexOfLastMovie,
  )

  const paginate = pageNumber => setCurrentPage(pageNumber)
  const handleNextPage = () => setCurrentPage(prevPage => prevPage + 1)
  const handlePrevPage = () => setCurrentPage(prevPage => prevPage - 1)

  const getPopularMovieData = async () => {
    setHomeApiStatus(homeApiStatusConstants.in_progress)
    const popularMovieUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API}&language=en-US&page=1`
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
  }, [])

  const onRetry = () => {
    getPopularMovieData()
  }

  const renderPopularMovieListContainer = () => (
    <div className="popular-movie-list-container">
      <h1 className="popular-picks">Popular</h1>
      <ul className="popular-movie-list">
        {currentMovies.map(eachData => (
          <MovieList key={eachData.id} popularMovieDetails={eachData} />
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={moviesPerPage}
        totalItems={popularMovieData.length}
        paginate={paginate}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
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
