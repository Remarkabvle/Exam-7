import React from "react";
import "./IntroSection.css";
import sofa1 from '../../assets/s.png';
import sofa2 from '../../assets/s2.png';
import sofa3 from '../../assets/s3.png';

const data = [
  {
    title: "Living Room",
    image: sofa1,
    link: "#",
  },
  {
    title: "Bedroom",
    image: sofa2,
    link: "#",
  },
  {
    title: "Kitchen",
    image: sofa3,
    link: "#",
  },
];

const IntroSection = () => {
  return (
    <div className="intro">
      <div className="container intro-container">
        <div>
          <p className="intro-title">Simply Unique Simply Better.</p>
        </div>
        <div>
          <p className="intro-description">
            <strong style={{ color: "black" }}>3legant</strong> is a gift &
            decorations store based in HCMC, Vietnam. Est since 2019.
          </p>
        </div>
      </div>
      <div className="room__cards container">
        {data.map((item, index) => (
          <div key={index} className={`room__card room__card--${index + 1}`} style={{ backgroundImage: `url(${item.image})` }}>
            <div className="room__card__info">
              <h3>{item.title}</h3>
              <p>
                <a href={item.link} className="card-button">Shop Now →</a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntroSection;
