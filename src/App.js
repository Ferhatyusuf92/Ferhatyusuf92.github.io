import './App.css';
import Categories from './pages/category/Categories';
import Products from './pages/product/Products';
import Home from './pages/home/Home';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/categories'
          element={<Categories />}
        />
        <Route
          path='/products'
          element={<Products />}
        />
      </Routes>

      <ToastContainer />
    </>
  );
};

export default App;
