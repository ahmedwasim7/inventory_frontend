import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const option = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
}

export const toster = (text, status = 'success') => {
  if (status === 'fail') {
    toast.error(text, option)
  } else {
    toast(text, option)
  }
}
