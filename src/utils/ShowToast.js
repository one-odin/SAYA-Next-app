import {toast} from "react-toastify";
import "../../node_modules/react-toastify/dist/ReactToastify.css";

const showToastError = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    bodyClassName: "text-center",
  });
};
const showToastSuccess = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    bodyClassName: "text-center",
  });
};
const showToastWarning = (message) => {
  toast.warn(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    bodyClassName: "text-center",
  });
};

export {showToastError, showToastSuccess, showToastWarning};
