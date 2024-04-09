import React, { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { CategoryContext } from '../../contexts/CategoryContext';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextError from '../../components/TextError';

const AddProductModal = () => {
  const { addProduct } = useContext(ProductContext);
  const { categoryList } = useContext(CategoryContext);

  const initialValues = {
    name: '',
    price: '',
    description: '',
    imageUrl: '',
    categoryId: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required!'),
    price: Yup.number().required('Price is required!'),
    description: Yup.string().required('Description is required!'),
    imageUrl: Yup.string().required('Image is required!'),
    categoryId: Yup.string().required('Category is required!'),
  });

  const onSubmit = (values, { resetForm }) => {
    console.log('values', values);
    const { name, price, description, imageUrl, categoryId } = values;
    addProduct({ name, price, description, imageUrl, categoryId });
    resetForm();
    // TODO: close the modal
  };

  const categorySelectOptions = categoryList.map((category) => {
    return (
      <option
        key={category.id}
        value={category.id}
      >
        {category.name}
      </option>
    );
  });

  return (
    <div
      className='modal fade'
      id='addProduct'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <>
                  <Form>
                    <div className='modal-header'>
                      <h1 className='modal-title fs-5'>Add Product</h1>
                      <button
                        type='button'
                        className='btn-close'
                        data-bs-dismiss='modal'
                        aria-label='Close'
                      ></button>
                    </div>
                    <div className='modal-body'>
                      <div className='mb-3'>
                        <Field
                          as='select'
                          className='form-select'
                          name='categoryId'
                        >
                          <option value=''>Select Category</option>

                          {categorySelectOptions}
                        </Field>
                        <ErrorMessage name='categoryId'>{(error) => <TextError error={error} />}</ErrorMessage>
                      </div>
                      <div className='mb-3'>
                        <Field
                          type='text'
                          className='form-control'
                          placeholder='Name'
                          name='name'
                        />
                        <ErrorMessage name='name'>{(error) => <TextError error={error} />}</ErrorMessage>
                      </div>
                      <div className='mb-3'>
                        <Field
                          type='number'
                          className='form-control'
                          placeholder='Price'
                          name='price'
                        />
                        <ErrorMessage name='price'>{(error) => <TextError error={error} />}</ErrorMessage>
                      </div>
                      <div className='mb-3'>
                        <Field
                          type='text'
                          className='form-control'
                          placeholder='Description'
                          name='description'
                        />
                        <ErrorMessage name='description'>{(error) => <TextError error={error} />}</ErrorMessage>
                      </div>
                      <div className='mb-3'>
                        <Field
                          type='file'
                          className='form-control'
                          name='imageUrl'
                        />
                        <ErrorMessage name='imageUrl'>{(error) => <TextError error={error} />}</ErrorMessage>
                      </div>
                    </div>
                    <div className='modal-footer'>
                      <button
                        type='button'
                        className='btn btn-secondary'
                        data-bs-dismiss='modal'
                      >
                        Close
                      </button>
                      <button
                        type='submit'
                        className='btn btn-primary'
                        // data-bs-dismiss='modal'
                      >
                        Save
                      </button>
                    </div>
                  </Form>
                </>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
