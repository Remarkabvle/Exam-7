import React from "react";
import "./Shop.scss";
import shopBackground from "../../assets/shop.png";
import Product from "../../components/product/Product";
import Newsletter from "../../components/Newsletter/Newsletter";

const ShopPage = () => {
  const backgroundImageStyle = {
    backgroundImage: `url(${shopBackground})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="shop container">
      <section className="shop__header container" style={backgroundImageStyle}>
        <div className="container">
          <p className="breadcrumb">Home &gt; Shop</p>
          <h1 className="shop__titl">Shop Page</h1>
          <p className="shop__subtitle">
            Let's design the place you always imagined.
          </p>
        </div>
      </section>
      <div className="container">
        <Product />
      </div>
      <Newsletter/>
    </div>
  );
};

export default ShopPage;
