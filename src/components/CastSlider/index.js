import {useState} from 'react'

import './index.css'

const CastSlider = props => {
  const {castDetails} = props
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = e => {
    setIsMouseDown(true)
    setStartX(e.pageX - e.currentTarget.offsetLeft)
    setScrollLeft(e.currentTarget.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsMouseDown(false)
  }

  const handleMouseMove = e => {
    if (!isMouseDown) return
    e.preventDefault()
    const x = e.pageX - e.currentTarget.offsetLeft
    const walk = (x - startX) * 2
    e.currentTarget.scrollLeft = scrollLeft - walk
  }
  return (
    <>
      {castDetails && castDetails.length > 0 ? (
        <ul
          className="cast-card-container"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {castDetails.map(Cast => (
            <li key={Cast.castId} className="cast-card-item">
              <div className="cast-image-container">
                {Cast.castImage.slice(-4) === 'null' ? (
                  <img
                    src="https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"
                    alt="cast-pic"
                    className="cast-image"
                  />
                ) : (
                  <img
                    src={Cast.castImage}
                    alt="cast-pic"
                    className="cast-image"
                  />
                )}
              </div>

              <p className="cast-name">{Cast.name}</p>
              <p className="cast-character-name">{Cast.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="cast-details-unavailable">Cast Details Unavailable</p>
      )}
    </>
  )
}

export default CastSlider
