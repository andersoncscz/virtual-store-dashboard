import { toast } from 'react-toastify';

const initializeToastfy = () => {
    toast.configure({
        autoClose: 3000,
        draggable: false,
    })    
}

export default initializeToastfy;