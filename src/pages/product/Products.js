import React, { useContext, useState } from 'react';
import TableProductRow from './TableProductRow';
import Alert from '../../components/Alert';
import AddProductModal from './AddProductModal';
import UpdateProductModal from './UpdateProductModal';
import { ProductContext } from '../../contexts/ProductContext';
import Loading from '../../components/Loading';

const Products = () => {
  const { productList, loading, error } = useContext(ProductContext);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const openUpdateModal = (pId, pName, pPrice, pDescription, pImageUrl, pCategoryId) => {
    setId(pId);
    setName(pName);
    setPrice(pPrice);
    setDescription(pDescription);
    setImageUrl(pImageUrl);
    setCategoryId(pCategoryId);
  };

  const productListTemplate = productList.map((product) => {
    return (
      <TableProductRow
        key={product.id}
        product={product}
        openUpdateModal={openUpdateModal}
      />
    );
  });

  if (error) {
    return (
      <div className='container'>
        <div className='row mt-5'>
          <Alert
            message={error}
            type='danger'
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='container'>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className='row mt-5'>
              <div className='col'>
                <button
                  className='btn btn-primary'
                  data-bs-toggle='modal'
                  data-bs-target='#addProduct'
                >
                  Add Product
                </button>
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col'>
                {productList.length === 0 ? (
                  <Alert
                    message='No found product!'
                    type='primary'
                  />
                ) : (
                  <table className='table table-bordered table-hover table-striped'>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>{productListTemplate}</tbody>
                  </table>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add Modal */}
      <AddProductModal />

      {/* Update Modal */}
      <UpdateProductModal
        id={id}
        name={name}
        price={price}
        description={description}
        imageUrl={imageUrl}
        categoryId={categoryId}
        setName={setName}
        setPrice={setPrice}
        setDescription={setDescription}
        setImageUrl={setImageUrl}
        setCategoryId={setCategoryId}
      />
    </>
  );
};

export default Products;
