// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import store, { initializeAuth } from './store';
import Navbar from './components/header/Header';
import Home from './pages/home/Home';
import Shop from './pages/shop/Shop';
import Blog from './pages/blog/Blog';
import Contact from './pages/contact/Contact';
import SingleProduct from './pages/product/SingleProduct';
import Footer from './components/Footer/Footer';
import Wishlist from './pages/wishlist/Wishlist';
import Cart from './pages/cart/Cart';
import Checkout from './pages/cart/Checkout';
import Login from './pages/login/Login';
import Admin from './pages/admin/Admin';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ManageCategory from './pages/admin/manage-category/ManageCategory';
import CreateCategory from './pages/admin/create-category/CreateCategory';
import ManageProduct from './pages/admin/manage-product/ManageProduct';
import CreateProduct from './pages/admin/create-product/CreateProduct';
// import CreateProduct from './pages/admin/CreateProduct';
// import ManageProduct from './pages/admin/ManageProduct';
// import CreateCategory from './pages/admin/CreateCategory';
// import ManageCategory from './pages/admin/manage-category';

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:productId" element={<SingleProduct />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        >
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="manage-product" element={<ManageProduct />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="manage-category" element={<ManageCategory />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <Router>
      <AppContent />
    </Router>
  </Provider>
);

export default App;
