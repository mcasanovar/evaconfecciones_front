export const ERROR = 'Error'
export const WARNING = 'Cudiado'
export const REQUIRED = 'Requerido'
export const TERMINATED = 'Entregado'
export const PENDING = 'Pendiente'
export const READY = 'Listo para entrega'

export const SELECTIONS_FILTER_ITEMS = [
  {
    _id: 'collage',
    name: 'Colegio'
  },
  {
    _id: 'clothes',
    name: 'Prenda'
  },
  {
    _id: 'size',
    name: 'Talla'
  }
]

export const FORMAT_DATE = "d-M-yyyy"

export const LOCAL_DATE_COUNTRY = 'es-CL'

export const URI_GRAPHQL = process.env.NEXT_PUBLIC_URI_GRAPHQL

export const HEADER_TABLE_ORDERS = [
  "Completado",
  "Colegio",
  "Prenda",
  "Talla",
  "Precio",
  "Cantidad",
  "Total",
  ""
]

export const HEADER_TABLE_PREVIUSPAYMENTS = [
  "Fecha",
  "Abono",
  ""
]

export const HEADER_TABLE_COLLAGES = [
  "COLEGIO",
  ""
]

export const HEADER_TABLE_CLOTHES = [
  "PRENDA",
  ""
]

export const HEADER_TABLE_SIZE = [
  "TALLA",
  ""
]

export const HEADER_TABLE_ITEMS = [
  "COLEGIO",
  "PRENDA",
  "TALLA",
  "PRECIO",
  ""
]

export const STATES_COLORS_ORDERS = {
  Pendiente: 'yellow',
  Entregado: 'green',
  "Listo para entrega": 'blue'
}

export const STATES_FILTER = [
  "Entregado",
  "Pendiente",
  "Listo para entrega"
]

export const YEARS_FILTERS = [
  "2020",
  "2021",
  "2022",
  "2023",
  "2024"
]