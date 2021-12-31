import React from 'react'

const TextareaInputComponent = ({
  id,
  type = "text",
  placeholder = "",
  width = '80',
  height = 'full',
  value,
  rows,
  ...props
}) => {
  return (
    <textarea 
      className={`shadow w-${width} h-${height} bg-gray-200 border-slate-800 rounded-sm appearance-none text-gray-700 leading-tight py-2 px-3 font-bold focus:outline-none focus:shadow-outline`}
      id={id}
      type="text"
      placeholder={placeholder}
      value={value}
      rows={rows}
      {...props}
    />
  )
}

export default TextareaInputComponent
