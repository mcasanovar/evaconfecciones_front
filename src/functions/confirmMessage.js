import Swal from 'sweetalert2'

const confirmMessage = async ({
  title = '',
  description = '',
  iconName = 'warning',
  confirmButtonText = ''
}) => {
  let result = false

  result = await Swal.fire({
    title,
    text: description,
    icon: iconName,
    showCancelButton: true,
    confirmButtonColor: 'green',
    cancelButtonColor: '#d33',
    confirmButtonText
  })

  if (result.isConfirmed) {
    Swal.fire(
      'Prenda eliminada!',
      'La prenda seleccionada ha sido eliminada de la tabla.',
      'success'
    )
  }

  return result
}

export default confirmMessage