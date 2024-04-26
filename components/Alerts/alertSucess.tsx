import { Bounce, toast } from 'react-toastify'; //importando lib React-Toastify (notificação)
import 'react-toastify/dist/ReactToastify.css'; //importando estilo da lib


const alertSucess = (menssage: string) => {
    toast.success(menssage, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });
}

export { alertSucess }