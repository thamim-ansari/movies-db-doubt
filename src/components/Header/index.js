import {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'

import SearchContext from '../../context/SearchContext'
import './index.css'

const Header = () => {
  const [searchInput, setSearchInput] = useState('')
  const {setSearchContextInput} = useContext(SearchContext)

  const onClickSearchBtn = () => {
    setSearchContextInput(searchInput)
    setSearchInput('')
  }
  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }
  return (
    <>
      <nav className="header-container">
        <div className="header-responsive-container">
          <Link to="/" className="link-style">
            <h1 className="app-name">movieDB</h1>
          </Link>
          <div className="header-content-container">
            <ul className="header-nav-list">
              <Link to="/" className="link-style">
                <li className="header-nav-items">
                  <h1>Popular</h1>
                </li>
              </Link>
              <Link to="/top-rated" className="link-style">
                <li className="header-nav-items">
                  <h1>Top Rated</h1>
                </li>
              </Link>
              <Link to="/upcoming" className="link-style">
                <li className="header-nav-items">
                  <h1>Upcoming</h1>
                </li>
              </Link>
            </ul>
            <input
              type="text"
              placeholder="Search"
              onChange={onChangeSearchInput}
              value={searchInput}
            />
            <Link to="/search-result" className="link-style">
              <button
                type="button"
                className="search-btn"
                onClick={onClickSearchBtn}
                disabled={!searchInput.length > 0}
              >
                search
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
