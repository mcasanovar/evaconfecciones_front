import React from 'react'

const ProgressBarComponent = ({
  color = 'black',
  value = 0
}) => {
  return (
    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 text-center">
      {!value ?
        `${value}%` :
        <div className={`bg-${color}-600 text-md font-medium text-blue-100 text-center h-5 p-1 leading-none rounded-full`} style={{ width: `${value}%` }}>
          {`${value}%`}
        </div>
      }
    </div>
  )
}

export default ProgressBarComponent
