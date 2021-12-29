import React from 'react'
//functions
import { formattedPrices } from '../functions/index'
//component
import ButtonComponent from '../components/button';

const TableComponent = ({
  headers,
  data,
  onDeleteClick,
  idItem = null
}) => {

  const handleFormattedValue = (key, value) => {
    if (key === 'uniquePrice'
      || key === 'total'
      || key === 'price') {
      return formattedPrices(value)
    }

    return value
  }

  return (
    <table className="table-auto shadow-md mt-10 w-full w-lg rounded-md">
      <thead className="bg-gray-800">
        <tr className="text-white">
          {!!headers && headers.map((header, index) => (
            <th key={index} className="w-1/6 py-2">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white">
        {!!data && data.map((item, index) => (
          <tr key={index} className="text-center">
            {Object.entries(item).map((objectItem, indexObject) => {
              return objectItem[0] !== '_id'
                && <td key={indexObject} className="border px-4 py-2">{handleFormattedValue(objectItem[0], objectItem[1])}</td>
            })}
            <td className="border px-4 py-2">
              {(!!idItem && idItem === item._id) ?
                <ButtonComponent
                  color="gray"
                  text="ELiminando..."
                  width="full"
                  icon="loading"
                  disabled={true}
                  onClick={() => onDeleteClick(item._id)}
                /> :
                <ButtonComponent
                  color="red"
                  text="Eliminar"
                  width="full"
                  icon=""
                  onClick={() => onDeleteClick(item._id)}
                />
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableComponent