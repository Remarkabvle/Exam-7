import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProductById,
  updateProduct,
  selectAllProducts,
  getProductsStatus,
  getProductsError,
} from "../../../features/products/productsSlice";
// import './ManageProduct.scss';

const ManageProduct = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector(getProductsStatus);
  const error = useSelector(getProductsError);

  const [editingProduct, setEditingProduct] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleDelete = async (productId) => {
    try {
      await dispatch(deleteProductById(productId)).unwrap();
      alert("Product deleted successfully!");
    } catch (error) {
      alert("Failed to delete product");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setTitle(product.title);
    setPrice(product.price);
    setImage(product.image);
    setCategory(product.category);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        ...editingProduct,
        title,
        price,
        image,
        category,
      };
      await dispatch(updateProduct(updatedProduct)).unwrap();
      await dispatch(fetchProducts());
      setEditingProduct(null);
      setTitle("");
      setPrice("");
      setImage("");
      setCategory("");
      alert("Product updated successfully!");
    } catch (error) {
      alert("Failed to update product");
    }
  };

  const closeModal = () => {
    setEditingProduct(null);
    setTitle("");
    setPrice("");
    setImage("");
    setCategory("");
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const categories = [
    ...new Set(products.map((product) => product.category)),
    "All",
  ];

  return (
    <div className="products-section">
      <div className="products-section__header">
        <h2 className="products-section__header__title">Manage Products</h2>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="products-section__grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="products-section__card">
            <div className="products-section__card__image-container">
              <img src={product.images[0]} alt={product.title} />
              <div className="products-section__card__icons">
                <span className="icon" onClick={() => handleEdit(product)}>
                  ✏️
                </span>
                <span
                  className="icon filled"
                  onClick={() => handleDelete(product.id)}
                >
                  🗑️
                </span>
              </div>
            </div>
            <div className="products-section__card__info">
              <h3 className="products-section__card__info__title">
                {product.title}
              </h3>
              <p className="products-section__card__info__price">
                ${product.price}
              </p>
              <p className="products-section__card__info__category">
                {product.category}
              </p>
            </div>
          </div>
        ))}
      </div>

      {editingProduct && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <form onSubmit={handleUpdate}>
              <h3>Edit Product</h3>
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                <label>Image URL:</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div>
                <label>Category:</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <button type="submit">Update Product</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProduct;
