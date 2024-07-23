
import React from 'react';
import './Articles.scss'; 
const articles = [
  {
    title: "7 ways to decorate your home",
    image: "path_to_image_1.jpg",
    link: "#",
  },
  {
    title: "Kitchen organization",
    image: "path_to_image_2.jpg",
    link: "#",
  },
  {
    title: "Decor your bedroom",
    image: "path_to_image_3.jpg",
    link: "#",
  },
];

const Articles = () => {
  return (
    <div className="articles">
      <h2>Articles</h2>
      <div className="articles-list">
        {articles.map((article, index) => (
          <div key={index} className="article">
            <img src={article.image} alt={article.title} />
            <h3>{article.title}</h3>
            <a href={article.link}>Read More →</a>
          </div>
        ))}
      </div>
      <a href="#" className="more-articles">More Articles →</a>
    </div>
  );
};

export default Articles;
