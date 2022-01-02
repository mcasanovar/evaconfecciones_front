const getPercentageOrder = (detailsOrder) => {
  if(!detailsOrder || !detailsOrder.length) return 0

  const total = detailsOrder.length
  const completed = detailsOrder.reduce((acc, current) => {
    if(current.completed){
      acc = acc + 1
    }
    return acc
  }, 0)

  return Math.round((completed / total) * 100, 0)
}

export default getPercentageOrder