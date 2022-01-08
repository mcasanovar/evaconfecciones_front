import React from 'react'
//components
import InputComponent from './input'
import ButtonComponent from './button'
//functions
import { formattedPrices } from '../functions'

const PreviusPaymentComponent = ({
  previusPayment = 0,
  totalPreviusPayment = 0,
  setPreviusPayment,
  plusMinus
}) => {
  return (
    <>
      <div className="w-full flex justify-end items-start pr-4">
        <h1 className="font-bold text-black pr-4 flex justify-end uppercase">abono</h1>
        <div className="">
          <InputComponent
            id="previusPayment"
            type="number"
            placeholder="Pago de Abono"
            width="40"
            value={previusPayment}
            onChange={(e) => setPreviusPayment(e.target.value)}
          />
          <h1 className="font-bold text-black pr-4 flex justify-start uppercase pl-1 pt-1">{formattedPrices(previusPayment)}</h1>
        </div>
        <ButtonComponent
          color="green"
          text="+"
          width="20"
          height="9"
          icon=""
          onClick={() => plusMinus("plus")}
        />
        <ButtonComponent
          color="red"
          text="-"
          width="20"
          height="9"
          icon=""
          onClick={() => plusMinus("minus")}
        />
        <h1 className="font-bold text-green-900 pl-1 text-2xl flex justify-end uppercase">{`${formattedPrices(totalPreviusPayment)}`}</h1>
      </div>
    </>
  )
}

export default PreviusPaymentComponent
