import { useEffect, useState } from 'react';
import '../componentStyles/ImageSlider.css';
const images = [
  "./images/banner1.png",
  "./images/banner2.png",
  "./images/banner3.png",
  "./images/banner4.png"
]

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      // React supplies the latest state (index) as prev.

    }, 5000)
    return () => clearInterval(interval);
    //prevents emmory leaks, if we go to another component, the timer will keep on running in the background.
    //the interval will be cleared when the component unmounts
  }, [])
  return (
    <div className="image-slider-container">
      <div className="slider-images" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) =>
        (<div className="slider-item" key={index}>
          <img src={image} alt={`Slide ${index + 1}`} />
        </div>))
        }
        {/* array.map((element, index, array) => {}) */}
      </div>

      <div className="slider-dots">
        {images.map((_, index) => (
          <span className={`dot ${index === currentIndex ? 'active' : ''}`} onClick={() => setCurrentIndex(index)} key={index} />
        ))}
      </div>
    </div>
  )
}

export default ImageSlider

/*
Uswe of key-->

You receive:
banner1
banner2
banner3
React creates three DOM elements.
Position 0 → banner1

Position 1 → banner2

Position 2 → banner3

Later

The array becomes:

newBanner
banner1
banner2
banner3
everytime new dom created, inside of only once.
*/
