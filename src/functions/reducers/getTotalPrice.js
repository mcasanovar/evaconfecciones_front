const getTotalPrice = (items, value) => {
  if(!items.length) return 0
  if(!value) return 0

  return items.reduce((acc, current) => acc + current[value], 0)
}

export default getTotalPrice