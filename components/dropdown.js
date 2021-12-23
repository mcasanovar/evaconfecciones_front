import React from 'react'

const DropDownComponent = ({
  options,
  title,
  fieldValue,
  keyValue,
  onSelect,
  defaultValue = ""
}) => {
  return (
    <label className="block text-left">
      <span className="text-gray-700">{title}</span>
      <select value={defaultValue} onChange={(e) => onSelect(e)} className="form-select block w-full mt-1 p-2 rounded-md">
        <option className="font-bold uppercase">Seleccionar...</option>
        {!!options.length && options.map((option) => {
            return typeof option === 'object' ?
            (<option key={option[keyValue]} value={option[fieldValue]} className="font-bold uppercase">{option[fieldValue]}</option>) :
            (<option key={option[keyValue]} value={option} className="font-bold uppercase">{option}</option>)
          })
        }
      </select>
    </label>
  )
}

export default DropDownComponent
