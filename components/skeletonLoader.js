import React from 'react'

const SkeletonLoaderComponent = () => {
  return (
    <div className="bg-white shadow rounded-md p-4 max-w-xl w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-300 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-4 bg-gray-300 rounded col-span-2"></div>
              <div className="h-4 bg-gray-300 rounded col-span-1"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  )
}

export default SkeletonLoaderComponent
