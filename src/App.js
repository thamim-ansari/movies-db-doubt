import {Switch, Route, Redirect} from 'react-router-dom'
import {useState} from 'react'
import Home from './pages/Home'
import Search from './pages/Search'
import MovieDetails from './pages/MovieDetails'
import TopRated from './pages/TopRated'
import Upcoming from './pages/Upcoming'
import NotFound from './pages/NotFound'
import SearchContext from './context/SearchContext'
import './App.css'

const App = () => {
  const [searchInput, setSearchInput] = useState('')
  const onChangeSearchInput = input => {
    setSearchInput(input)
  }
  console.log(searchInput)
  return (
    <SearchContext.Provider
      value={{
        searchValue: searchInput,
        setSearchContextInput: onChangeSearchInput,
      }}
    >
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search-result" component={Search} />
        <Route exact path="/movie-details/:id" component={MovieDetails} />
        <Route exact path="/top-rated" component={TopRated} />
        <Route exact path="/upcoming" component={Upcoming} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="./not-found" />
      </Switch>
    </SearchContext.Provider>
  )
}

export default App
