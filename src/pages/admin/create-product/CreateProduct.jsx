import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct, fetchProducts } from '../../../features/products/productsSlice';

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [rating, setRating] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState(''); // Kategoriya uchun yangi holat
  const [categoriesError, setCategoriesError] = useState(null);

  const categories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Toys']; // Kategoriyalar ro‘yxati

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = { title, description, price, oldPrice, rating, stock, image, category };

    try {
      await dispatch(createProduct(newProduct)).unwrap();
      await dispatch(fetchProducts()); // Mahsulot ro‘yxatini yangilash
      setTitle('');
      setDescription('');
      setPrice('');
      setOldPrice('');
      setRating('');
      setStock('');
      setImage('');
      setCategory(''); // Kategoriya maydonini tozalash
      alert('Product created successfully!');
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Old Price:</label>
          <input
            type="text"
            value={oldPrice}
            onChange={(e) => setOldPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Rating:</label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            {[...Array(10)].map((_, index) => {
              const value = (index + 1) * 0.5;
              return (
                <option key={value} value={value}>
                  {value} star(s)
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="text"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateProduct;
