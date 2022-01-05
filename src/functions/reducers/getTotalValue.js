const getTotalValue = (items, value) => {
  if(!items.length) return 0
  if(!value) return 0

  console.log(items)
  
  return items.reduce((acc, current) => acc + current[value], 0)
}

export default getTotalValue