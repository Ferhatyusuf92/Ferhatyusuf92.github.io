import { createContext, useEffect, useState } from 'react';
import { swalToDelete } from '../utils/swalToDelete';
import showToast from '../utils/showToast';
import {
  addCategoryService,
  deleteCategoryService,
  getCategoryListService,
  updateCategoryService,
} from '../services/categoryService';

export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategoryList = async () => {
      setLoading(true);
      try {
        const data = await getCategoryListService();
        setCategoryList(data);
      } catch (error) {
        console.log(error);
        setError('An error occurred while fetching categories!');
        showToast('An error occurred while fetching categories!', 'error');
      }
      setLoading(false);
    };
    getCategoryList();
  }, []);

  const addCategory = async (pCategory) => {
    setLoading(true);
    try {
      const data = await addCategoryService(pCategory);
      setCategoryList([...categoryList, data]);
      showToast('Category successfully added!');
    } catch (error) {
      console.log(error);
      setError('An error occurred while adding category!');
      showToast('An error occurred while adding category!', 'error');
    }
    setLoading(false);
  };

  const deleteCategory = async (pCategoryId) => {
    const status = await swalToDelete();

    if (status) {
      setLoading(true);
      try {
        await deleteCategoryService(pCategoryId);
        const filteredCategoryList = categoryList.filter((category) => category.id !== pCategoryId);
        setCategoryList(filteredCategoryList);
        showToast('Category successfully deleted!');
      } catch (error) {
        console.log(error);
        setError('An error occurred while deleting category!');
        showToast('An error occurred while deleting category!', 'error');
      }
      setLoading(false);
    }
  };

  const updateCategory = async (pCategory) => {
    const { id } = pCategory;
    setLoading(true);
    try {
      const data = await updateCategoryService(pCategory);
      const filteredCategoryList = categoryList.filter((category) => category.id !== id);
      setCategoryList([...filteredCategoryList, data]);
      showToast('Category successfully updated!');
    } catch (error) {
      console.log(error);
      setError('An error occurred while updating category!');
      showToast('An error occurred while updating category!', 'error');
    }
    setLoading(false);
  };

  const getCategoryNameById = (pCategoryId) => {
    const category = categoryList.find((category) => category.id === pCategoryId);
    return category.name;
  };

  return (
    <CategoryContext.Provider
      value={{ categoryList, addCategory, deleteCategory, updateCategory, loading, error, getCategoryNameById }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
