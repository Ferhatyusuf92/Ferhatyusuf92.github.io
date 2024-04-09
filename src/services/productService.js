import { useAxios } from '../api/useAxios';

export const getProductListService = async () => {
  const response = await useAxios.get(`/products`);
  const data = await response.data;
  return data;
};

export const addProductService = async (pProduct) => {
  const response = await useAxios.post(`/products`, pProduct);
  const data = await response.data;
  return data;
};

export const deleteProductService = async (pProductId) => {
  await useAxios.delete(`/products/${pProductId}`);
};

export const updateProductService = async (pProduct) => {
  const { id, name, price, description, imageUrl, categoryId } = pProduct;
  const response = await useAxios.put(`/products/${id}`, { name, price, description, imageUrl, categoryId });
  const data = await response.data;
  return data;
};
