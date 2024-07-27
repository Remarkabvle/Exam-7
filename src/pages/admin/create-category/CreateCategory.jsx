// components/CreateCategory.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCategory } from '../../../features/categories/categoriesSlice';

const CreateCategory = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCategory({ name }));
    setName('');
  };

  return (
    <div>
      <h2>Create Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          required
        />
        <button type="submit">Create Category</button>
      </form>
    </div>
  );
};

export default CreateCategory;
