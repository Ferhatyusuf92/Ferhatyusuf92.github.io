import { toast } from 'react-toastify';

/**
 *
 * @param {String} pMessage
 * // options: success, error, info, warn
 * @param {String} pType
 */
const showToast = (pMessage, pType = 'success') => {
  toast[pType](pMessage, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

export default showToast;
