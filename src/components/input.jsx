import React from 'react'

const InputComponent = ({
  id,
  type = "text",
  placeholder = "",
  width = '80',
  height = 'full',
  value,
  ...props
}) => {
  return (
    <input 
      className={`shadow w-${width} h-${height} bg-gray-200 border-slate-800 rounded-sm appearance-none text-gray-700 leading-tight border-2 rounded-md border-gray-900 py-2 px-3 font-bold focus:outline-none focus:shadow-outline`}
      id={id}
      type={type}
      // placeholder={placeholder}
      value={value}
      {...props}
    />
  )
}

export default InputComponent
