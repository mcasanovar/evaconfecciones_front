const formatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  minimumFractionDigits: 0
})

const formattedPrices = (amount) => {
  return formatter.format(amount)
};

export default formattedPrices