import './index.css'

const Pagination = props => {
  const {pageNumber, onPrev, onNext} = props
  const onClickPrevBtn = () => onPrev()
  const onClickNextBtn = () => onNext()
  return (
    <div className="pagination-container">
      <button type="button" onClick={onClickPrevBtn} className="pagination-btn">
        Prev
      </button>
      <p className="page-number">{pageNumber}</p>
      <button type="button" onClick={onClickNextBtn} className="pagination-btn">
        Next
      </button>
    </div>
  )
}

export default Pagination
