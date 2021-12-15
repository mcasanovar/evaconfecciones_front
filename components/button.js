import React from 'react'
//svg
import DetailsIcon from '../svg/detailsIcon'
import DeleteIcon from '../svg/deleteIcon'

const ButtonComponent = ({ 
  color = "gray", 
  text = "",
  width = "full",
  height = "full",
  icon = "",
  onClick 
}) => {
  return (
    <button 
      className={`w-${width} h-${height} flex justify-center items-center bg-${color}-700 rounded-md p-2 text-white font-bold uppercase text-sm hover:shadow-md`}
      onClick={() => onClick()}
    >
      {text}
      {icon === "details" && <DetailsIcon style="w-6 h-6 ml-2"/>}
      {icon === "delete" && <DeleteIcon style="w-6 h-6 ml-2"/>}
    </button>
  )
}

export default ButtonComponent