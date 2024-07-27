import React from 'react';
import './Blog.scss';
import background from "../../assets/background.png";
import Product from '../../components/product/Product'
import Newsletter from '../../components/Newsletter/Newsletter';

const Blog = () => {
  return (
    <div className="blog cintauner">
      <section className="blog__header" style={{ backgroundImage: `url(${background})` }}>
        <div className="container">
          <p className="breadcrumb">Home  Blog</p>
          <h1 className="blog__title">Our Blog</h1>
          <p className="blog__subtitle">Home ideas and design inspiration</p>
        </div>
      </section>
      <Product/>
      <Newsletter/>
    </div>
  );
};

export default Blog;
