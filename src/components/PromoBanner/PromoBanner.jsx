import React from 'react';

const PromoBanner = () => {
  return (
    <div style={styles.container}>
      <div style={styles.imageSection}>
        <img
          src="your-image-url.jpg"
          alt="Living Room"
          style={styles.image}
        />
      </div>
      <div style={styles.textSection}>
        <p style={styles.saleText}>SALE UP TO 35% OFF</p>
        <h1 style={styles.title}>HUNDREDS of New lower prices!</h1>
        <p style={styles.description}>
          It’s more affordable than ever to give every room in your home a
          stylish makeover
        </p>
        <button style={styles.button}>Shop Now →</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    alignItems: 'center',
  },
  imageSection: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  textSection: {
    flex: 1,
    padding: '0 20px',
  },
  saleText: {
    color: '#007BFF',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  title: {
    fontSize: '36px',
    margin: '10px 0',
    fontWeight: 'bold',
  },
  description: {
    color: '#555',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default PromoBanner;
