import React from 'react'

const DropDownComponent = ({
  options,
  title,
  onSelect
}) => {
  return (
    <label className="block text-left">
      <span className="text-gray-700">{title}</span>
      <select onChange={(e) => onSelect(e)} className="form-select block w-60 mt-1 p-2 rounded-md ">
        <option className="font-bold uppercase">Seleccionar...</option>
        {!!options.length && options.map((option, index) => (
          <option key={index} value={option} className="font-bold uppercase">{option}</option>
        ))
        }
      </select>
    </label>
  )
}

export default DropDownComponent
