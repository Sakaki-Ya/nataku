import { toast, Slide } from "react-toastify";

const greenAlert = (message: string) =>
  toast.success(message, {
    position: "bottom-center",
    autoClose: 1500,
    transition: Slide,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });

const orangeAlert = (message: string) =>
  toast.info(message, {
    position: "bottom-center",
    autoClose: 1500,
    transition: Slide,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });

const blueAlert = (message: string) =>
  toast(message, {
    position: "bottom-center",
    autoClose: 1500,
    transition: Slide,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });

const blackAlert = (message: string) =>
  toast.warning(message, {
    position: "bottom-center",
    autoClose: 1500,
    transition: Slide,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });

const redAlert = (message: string) =>
  toast.error(message, {
    position: "bottom-center",
    autoClose: 1500,
    transition: Slide,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });

export { greenAlert, orangeAlert, blueAlert, blackAlert, redAlert };
