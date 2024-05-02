import React from 'react'

const SearchContext = React.createContext({
  searchValue: '',
  setSearchContextInput: () => {},
})

export default SearchContext
