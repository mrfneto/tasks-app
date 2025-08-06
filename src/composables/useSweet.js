// composables/useSweet.js
import Swal from 'sweetalert2'

export function useSweet() {
  const toast = (title, text = '', type = 'info') => {
    return Swal.fire({
      title,
      text,
      icon: type,
      toast: true,
      timer: 3000,
      showConfirmButton: false,
      position: 'top-end'
    })
  }

  const confirm = async (title, text = '') => {
    const result = await Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    })
    return result.isConfirmed
  }

  return { toast, confirm }
}
