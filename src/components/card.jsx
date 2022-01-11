import React from 'react'

const CardComponent = ({children, borderColor = "white"}) => {
  return (
    <div className={`bg-gray-200 w-full h-auto rounded-md shadow-md hover:shadow-lg p-4 border-4 border-${borderColor}-400 hover:bg-white`}>
      {children}
    </div>
  )
}

export default CardComponent
