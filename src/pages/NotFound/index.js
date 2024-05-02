import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-page-container">
    <img
      src="https://img.freepik.com/free-vector/404-error-web-template-flat-style_23-2147756791.jpg?t=st=1713531187~exp=1713534787~hmac=806d204995f55ce4d12cd9d4c800adec6119e107e3a3b69e340aefcf91e37023&w=740"
      alt="not-found-img"
      className="not-found-image"
    />
    <Link to="/">
      <button type="button" className="not-found-btn">
        Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
