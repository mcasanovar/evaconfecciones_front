const getItemFromItems = (items, filters = {}) => {
  if (!!filters.length) return null
  if (!items || !Object.entries(filters).length) return 

  const filterKeys = Object.keys(filters)

  return items.filter(item => {
    return filterKeys.every(key => {
      if (typeof filters[key] !== 'function') return true;
      return filters[key](item[key]);
    })
  })
}

export default getItemFromItems