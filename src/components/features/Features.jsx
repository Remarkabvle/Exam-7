import React from "react";
import { FiPhone } from "react-icons/fi";
import { LiaShippingFastSolid, LiaMoneyBillSolid } from "react-icons/lia";
import { IoLockClosedOutline } from "react-icons/io5";
import "./Features.scss";

const Features = () => {
  const features = [
    {
      icon: <LiaShippingFastSolid />,
      title: "Free Shipping",
      description: "Order above $200",
    },
    {
      icon: <LiaMoneyBillSolid />,
      title: "Money-back",
      description: "30 days guarantee",
    },
    {
      icon: <IoLockClosedOutline />,
      title: "Secure Payments",
      description: "Secured by Stripe",
    },
    {
      icon: <FiPhone />,
      title: "24/7 Support",
      description: "Phone and Email support",
    },
  ];

  return (
    <div>
      <div className="container features__cards-container">
        {features.map((feature, index) => (
          <div key={index} className="features__card">
            <div className="features__card__icon">{feature.icon}</div>
            <div className="features__card__info">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
