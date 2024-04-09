import { useContext, useState } from 'react';
import TableCategoryRow from './TableCategoryRow';
import { CategoryContext } from '../../contexts/CategoryContext';
import AddCategoryModal from './AddCategoryModal';
import UpdateCategoryModal from './UpdateCategoryModal';
import Alert from '../../components/Alert';
import Loading from '../../components/Loading';

const Categories = () => {
  const { categoryList, loading, error } = useContext(CategoryContext);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const openUpdateModal = (pId, pName, pDescription) => {
    setId(pId);
    setName(pName);
    setDescription(pDescription);
  };

  const categoryListTemplate = categoryList.map((category) => {
    return (
      <TableCategoryRow
        key={category.id}
        category={category}
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
                  data-bs-target='#addCategory'
                >
                  Add Category
                </button>
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col'>
                {categoryList.length === 0 ? (
                  <Alert
                    message='No found category!'
                    type='primary'
                  />
                ) : (
                  <table className='table table-bordered table-hover table-striped'>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>{categoryListTemplate}</tbody>
                  </table>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add Modal */}
      <AddCategoryModal />

      {/* Update Modal */}
      <UpdateCategoryModal
        id={id}
        name={name}
        description={description}
        setName={setName}
        setDescription={setDescription}
      />
    </>
  );
};

export default Categories;
