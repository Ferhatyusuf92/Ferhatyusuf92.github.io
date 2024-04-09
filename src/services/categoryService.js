import { useAxios } from '../api/useAxios';

export const getCategoryListService = async () => {
  const response = await useAxios.get(`/categories`);
  const data = await response.data;
  return data;
};

export const addCategoryService = async (pCategory) => {
  const response = await useAxios.post(`/categories`, pCategory);
  const data = await response.data;
  return data;
};

export const deleteCategoryService = async (pCategoryId) => {
  await useAxios.delete(`/categories/${pCategoryId}`);
};

export const updateCategoryService = async (pCategory) => {
  const { id, name, description } = pCategory;
  const response = await useAxios.put(`/categories/${id}`, { name, description });
  const data = await response.data;
  return data;
};
