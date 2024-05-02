import {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'

import SearchContext from '../../context/SearchContext'
import './index.css'

const Header = () => {
  const [navItemState, setNavItemStatus] = useState({
    isMenuOpen: false,
  })
  const [searchInput, setSearchInput] = useState('')
  const {setSearchContextInput} = useContext(SearchContext)
  const {isMenuOpen} = navItemState
  const mobileNavListClass = isMenuOpen
    ? 'mobile-nav-list-container'
    : 'mobile-nav-list-container-hide'

  const onClickMenu = () =>
    setNavItemStatus(prevState => ({
      ...prevState,
      isMenuOpen: !prevState.isMenuOpen,
    }))

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
                <li className="header-nav-items">Popular</li>
              </Link>
              <Link to="/top-rated" className="link-style">
                <li className="header-nav-items">Top Rated</li>
              </Link>
              <Link to="/upcoming" className="link-style">
                <li className="header-nav-items">Upcoming</li>
              </Link>
            </ul>
            <input
              type="search"
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
            <button
              type="button"
              className="mobile-nav-button"
              onClick={onClickMenu}
            >
              menu
            </button>
          </div>
        </div>
      </nav>
      <div className={mobileNavListClass}>
        <ul className="mobile-nav-list">
          <Link to="/" className="link-style">
            <li className="mobile-nav-items">Popular</li>
          </Link>
          <Link to="/top-rated" className="link-style">
            <li className="mobile-nav-items">Top Rated</li>
          </Link>
          <Link to="/upcoming" className="link-style">
            <li className="mobile-nav-items">Upcoming</li>
          </Link>
        </ul>
      </div>
    </>
  )
}

export default Header
