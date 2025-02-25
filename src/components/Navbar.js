import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary'>
      <div className='container'>
        <Link
          className='navbar-brand'
          to='/'
        >
          ECommerce
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse'
          id='navbarNav'
        >
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <NavLink
                to='/categories'
                className='nav-link active'
              >
                Categories
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/products'
                className='nav-link'
              >
                Products
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
