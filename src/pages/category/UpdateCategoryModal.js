import { useContext } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import TextError from "../../components/TextError";

const UpdateCategoryModal = () => {
  const { updateCategory } = useContext(CategoryContext);

  const initialValues = {
    name: "",
    description: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required!"),
    description: Yup.string().required("Description is required!"),
  });
  const onSubmit = (values, { resetForm }) => {
    console.log("values", values);
    const { name, description } = values;
    updateCategory({ name, description });
    resetForm();
    return (
      <div className='modal fade' id='updateCategory'>
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
                        <h1 className='modal-title fs-5'>Update Category</h1>
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
                            type='text'
                            className='form-control'
                            placeholder='Name'
                            name='name'
                          />
                          <ErrorMessage name='name'>
                            {(error) => <TextError error={error} />}
                          </ErrorMessage>
                        </div>
                        <div className='mb-3'>
                          <Field
                            type='text'
                            className='form-control'
                            placeholder='Description'
                            name='description'
                          />
                          <ErrorMessage name='description'>
                            {(error) => <TextError error={error} />}
                          </ErrorMessage>
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
                          data-bs-dismiss='modal'
                          onClick={() =>
                            updateCategory({ id, name, description })
                          }
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
};

export default UpdateCategoryModal;
