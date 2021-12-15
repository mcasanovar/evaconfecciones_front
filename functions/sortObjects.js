const sortObjects = (data, option, type) => {
  const result = data.sort((first, second) => {
    if (first[option] < second[option]) {
      return type === 'asc' ? -1 : 1;
    }
    if (first[option] > second[option]) {
      return type === 'asc' ? 1 : -1;
    }
    return 0;
  })

  return result
}

const sortOptions = (data, type) => {
  const result = data.sort((first, second) => {
    if (first < second) {
      return type === 'asc' ? -1 : 1;
    }
    if (first > second) {
      return type === 'asc' ? 1 : -1;
    }
    return 0;
  })

  return result
}

export default {
  sortObjects,
  sortOptions
}