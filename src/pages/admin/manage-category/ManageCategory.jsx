import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchCategories, 
  createCategory, 
  deleteCategoryById, 
  updateCategory, 
  selectAllCategories, 
  getCategoriesStatus, 
  getCategoriesError 
} from '../../../features/categories/categoriesSlice';

const ManageCategory = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const status = useSelector(getCategoriesStatus);
  const error = useSelector(getCategoriesError);

  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const handleAddCategory = async () => {
    if (newCategoryName.trim() === '') return;
    try {
      await dispatch(createCategory({ name: newCategoryName })).unwrap();
      setNewCategoryName('');
      alert('Category added successfully!');
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Failed to add category');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await dispatch(deleteCategoryById(categoryId)).unwrap();
      alert('Category deleted successfully!');
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category');
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setEditingCategoryName(category.name);
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory) return;
    try {
      await dispatch(updateCategory({ ...editingCategory, name: editingCategoryName })).unwrap();
      setEditingCategory(null);
      setEditingCategoryName('');
      alert('Category updated successfully!');
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Failed to update category');
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="categories-section">
      <div className="categories-section__header">
        <h2 className="categories-section__header__title">Manage Categories</h2>
        <input
          type="text"
          placeholder="New category"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>
      <div className="categories-section__list">
        {Array.isArray(categories) && categories.map((category) => (
          <div key={category.id} className="categories-section__item">
            {editingCategory && editingCategory.id === category.id ? (
              <div>
                <input
                  type="text"
                  value={editingCategoryName}
                  onChange={(e) => setEditingCategoryName(e.target.value)}
                />
                <button onClick={handleUpdateCategory}>Update</button>
                <button onClick={() => setEditingCategory(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <span>{category.name}</span>
                <button onClick={() => handleEditCategory(category)}>Edit</button>
                <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ManageCategory;
