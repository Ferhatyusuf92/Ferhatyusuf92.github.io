import { createContext, useEffect, useState } from 'react';
import { swalToDelete } from '../utils/swalToDelete';
import showToast from '../utils/showToast';
import {
  addProductService,
  deleteProductService,
  getProductListService,
  updateProductService,
} from '../services/productService';

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getProductList = async () => {
      setLoading(true);

      try {
        const data = await getProductListService();
        setProductList(data);
      } catch (error) {
        console.log(error);
        setError('An error occurred while fetching products!');
        showToast('An error occurred while fetching products!', 'error');
      }

      setLoading(false);
    };

    getProductList();
  }, []);

  const addProduct = async (pProduct) => {
    setLoading(true);
    try {
      const data = await addProductService(pProduct);
      setProductList([...productList, data]);

      showToast('Product successfully added!');
    } catch (error) {
      console.log(error);
      setError('An error occurred while adding product!');

      showToast('An error occurred while adding product!', 'error');
    }
    setLoading(false);
  };

  const deleteProduct = async (pProductId) => {
    const status = await swalToDelete();

    if (status) {
      setLoading(true);

      try {
        await deleteProductService(pProductId);
        const filteredProductList = productList.filter((product) => product.id !== pProductId);

        setProductList(filteredProductList);
        showToast('Product successfully deleted!');
      } catch (error) {
        console.log(error);
        setError('An error occurred while deleting product!');

        showToast('An error occurred while deleting product!', 'error');
      }
      setLoading(false);
    }
  };

  const updateProduct = async (pProduct) => {
    const { id } = pProduct;
    setLoading(true);

    try {
      const data = await updateProductService(pProduct);

      const filteredProductList = productList.filter((product) => product.id !== id);

      setProductList([...filteredProductList, data]);
      showToast('Product successfully updated!');
    } catch (error) {
      console.log(error);
      setError('An error occurred while updating product!');

      showToast('An error occurred while updating product!', 'error');
    }
    setLoading(false);
  };

  return (
    <ProductContext.Provider value={{ productList, addProduct, deleteProduct, updateProduct, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
