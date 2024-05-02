import './index.css'

const FailureView = props => {
  const {onClickRetry} = props
  const onClickRetryBtn = () => {
    onClickRetry()
  }
  return (
    <div className="failure-view-container">
      <div className="failure-view-content-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="cake-list-failure-img"
          className="failure-view-image"
        />
        <p className="failure-view-heading">Oops Something Went Wrong</p>
        <p className="failure-view-description">
          We are having some trouble processing your request. Please try again.
        </p>
        <button
          type="button"
          className="failure-view-btn"
          onClick={onClickRetryBtn}
        >
          Retry
        </button>
      </div>
    </div>
  )
}

export default FailureView
