import React from 'react'
import DatePicker, { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';

registerLocale('es', es)

import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({
  startDate,
  onChangeDate
}) => {
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => onChangeDate(date)}
      locale="es"
      dateFormat="dd-MMMM-yyyy"
    />
  )
}

export default DatePickerComponent
