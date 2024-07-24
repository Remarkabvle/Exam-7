import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/header/Header';
import Home from './pages/home/Home';
import Shop from './pages/shop/Shop';
import Blog from './pages/blog/Blog';
import Contact from './pages/contact/Contact';
import SingleProduct from './pages/product/SingleProduct';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<SingleProduct />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
