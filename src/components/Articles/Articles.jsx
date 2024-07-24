import React from 'react';
import './Articles.scss'; 
import ar1 from '../../assets/ar1.png'
import ar2 from '../../assets/ar2.png'
import ar3 from '../../assets/ar3.png'


const articles = [
  {
    title: "7 ways to decorate your home",
    image:  ar1,
    link: "#",
  },
  {
    title: "Kitchen organization",
    image: ar2,
    link: "#",
  },
  {
    title: "Decor your bedroom",
    image: ar3,
    link: "#",
  },
];

const Articles = () => {
  return (
    <div className="articles-container container">
      <div className="articles-header">
        <h2 className="articles-title">Articles</h2>
        <a href="#" className="articles-more-link">More Articles →</a>
      </div>
      <div className="articles-grid">
        {articles.map((article, index) => (
          <div key={index} className="article-card">
            <div className="article-image">
              <img src={article.image} alt={article.title} />
            </div>
            <div className="article-info">
              <h3 className="article-heading">{article.title}</h3>
              <a href={article.link} className="article-read-more">Read More →</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
