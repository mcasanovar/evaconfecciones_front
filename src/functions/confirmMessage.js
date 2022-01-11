import Swal from 'sweetalert2'

const confirmMessage = async ({
  title = '',
  description = '',
  iconName = 'warning',
  confirmButtonText = '',
  finalText = {
    title: 'Prenda eliminada!',
    desciption: "La prenda seleccionada ha sido eliminada de la tabla.",
    type: "success"
  }
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
      finalText.title,
      finalText.desciption,
      finalText.type
    )
  }

  return result
}

export default confirmMessage