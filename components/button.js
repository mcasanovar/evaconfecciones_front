import React from 'react'
//svg
import DetailsIcon from '../svg/detailsIcon'
import DeleteIcon from '../svg/deleteIcon'
import LoadingIcon from '../svg/loadingIcon'

const ButtonComponent = ({
  color = "gray",
  text = "",
  width = "full",
  height = "full",
  icon = "",
  disabled = false,
  onClick
}) => {
  return (
    <button
      className={`w-${width} h-${height} flex justify-center items-center bg-${color}-700 rounded-md p-2 text-white font-bold uppercase text-sm hover:shadow-md`}
      onClick={() => onClick()}
      type="button"
      disabled={disabled}
    >
      {icon === "details" && <DetailsIcon style="w-6 h-6 mr-2" />}
      {icon === "delete" && <DeleteIcon style="w-6 h-6 mr-2" />}
      {icon === "loading" && <LoadingIcon style="animate-spin w-6 h-6 mr-2"/>}
      {text}
    </button>
  ) 
}

export default ButtonComponent