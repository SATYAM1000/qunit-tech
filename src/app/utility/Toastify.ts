import { toast } from "react-toastify";
type MessageType = {
    message: string
}
const ToastError = ({ message }: MessageType) => {
    toast.dismiss()
    toast.error(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

}
const ToastSuccess = ({ message }: MessageType) => {
    toast.dismiss()
    toast.success(message, {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}
const ToastWorn = ({ message }: MessageType) => {
    toast.dismiss()
    toast.warn(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

}
export default ToastError
export { ToastSuccess, ToastWorn };