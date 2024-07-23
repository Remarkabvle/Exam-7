import React, { useState, useEffect } from 'react';
import './HeroSection.scss';
import image from '../../assets/hero1.png'; 
import image1 from '../../assets/hero2.jpg';
import image2 from '../../assets/hero3.jpg';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [image, image1, image2]; 

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(timer); // Cleanup the timer on component unmount
  }, [currentIndex]); // Dependency on currentIndex to reset timer on index change

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="hero-section container">
      <div className="image-slider">
        <img src={images[currentIndex]} alt="Hero" className="hero-image" />
        <button className="arrow left-arrow" onClick={goToPrevious}>
          <FaArrowLeft />
        </button>
        <button className="arrow right-arrow" onClick={goToNext}>
          <FaArrowRight />
        </button>
      </div>
      <div className="dots">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${currentIndex === idx ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
