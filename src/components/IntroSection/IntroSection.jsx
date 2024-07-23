// IntroSection.js
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
    <div>
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
      <div className="card-container container">
        {data.map((item, index) => (
          <div key={index} className="card" style={{ backgroundImage: `url(${item.image})` }}>
            <div className="card-content">
              <h2 className="card-title">{item.title}</h2>
              <a href={item.link} className="card-button">
                Shop Now →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntroSection;
