import React from 'react';
import { FaShippingFast, FaMoneyBillAlt, FaLock, FaPhone } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaShippingFast />,
      title: 'Free Shipping',
      description: 'Order above $200',
    },
    {
      icon: <FaMoneyBillAlt />,
      title: 'Money-back',
      description: '30 days guarantee',
    },
    {
      icon: <FaLock />,
      title: 'Secure Payments',
      description: 'Secured by Stripe',
    },
    {
      icon: <FaPhone />,
      title: '24/7 Support',
      description: 'Phone and Email support',
    },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px', backgroundColor: '#f9f9f9' }}>
      {features.map((feature, index) => (
        <div key={index} style={{ textAlign: 'center', padding: '10px' }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>{feature.icon}</div>
          <h3 style={{ margin: '5px 0' }}>{feature.title}</h3>
          <p style={{ color: '#555' }}>{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;
