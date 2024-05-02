import './index.css'

const Pagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  paginate,
  handleNextPage,
  handlePrevPage,
}) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i += 1) {
    pageNumbers.push(i)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleClick = pageNumber => {
    scrollToTop()
    paginate(pageNumber)
  }
  const handlePrevClick = () => {
    handlePrevPage()
    setTimeout(scrollToTop, 100)
  }
  const handleNextClick = () => {
    handleNextPage()
    setTimeout(scrollToTop, 100)
  }
  return (
    <nav className="pagination-container">
      <ul className="pagination-list">
        <li className="pagination-list-item">
          <button
            onClick={handlePrevClick}
            disabled={currentPage === 1}
            type="button"
            className={
              currentPage === 1
                ? 'pagination-next-and-prev-btn pagination-next-and-prev-active'
                : 'pagination-next-and-prev-btn'
            }
          >
            Prev
          </button>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className="pagination-list-item">
            <button
              onClick={() => handleClick(number)}
              type="button"
              className={
                currentPage === number
                  ? 'pagination-page-number-btn pagination-page-number-btn-active'
                  : 'pagination-page-number-btn'
              }
            >
              {number}
            </button>
          </li>
        ))}
        <li className="pagination-list-item">
          <button
            onClick={handleNextClick}
            disabled={currentPage === pageNumbers.length}
            type="button"
            className={
              currentPage === pageNumbers.length
                ? 'pagination-next-and-prev-btn pagination-next-and-prev-active'
                : 'pagination-next-and-prev-btn'
            }
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
