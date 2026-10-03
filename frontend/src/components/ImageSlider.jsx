import { useEffect, useState } from 'react';
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
    <div className="relative mt-24 h-[250px] w-full overflow-hidden md:h-[300px] lg:h-[450px]">
      <div className="flex h-full transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) =>
        (<div className="h-full min-w-full" key={index}>
          <img src={image} alt={`Slide ${index + 1}`} className="h-full w-full object-cover" />
        </div>))
        }
        {/* array.map((element, index, array) => {}) */}
      </div>

      <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <span className={`h-2.5 w-2.5 cursor-pointer rounded-full transition-colors duration-300 hover:bg-white ${index === currentIndex ? 'bg-white' : 'bg-white/70'}`} onClick={() => setCurrentIndex(index)} key={index} />
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
