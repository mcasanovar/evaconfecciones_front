import React from 'react'

const checkInputComponent = ({
  checked = false,
  onChangeChecked
}) => {
  return (
    <label className="inline-flex items-center mt-3">
      <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600 cursor-pointer" onChange={() => onChangeChecked()} checked={checked} /><span className="ml-2 text-gray-700"></span>
    </label>
  )
}

export default checkInputComponent
