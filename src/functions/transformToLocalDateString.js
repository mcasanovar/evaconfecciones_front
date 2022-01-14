const transformToLocalDateString = (timestampDate) => {
  return new Date(Number(timestampDate)).toString("dd-MM-yyyy HH:mm")
}

const transformToLocalDateWithoutHour = (timestampDate) => {
  return new Date(Number(timestampDate)).toString('dd-MM-yyyy')
}

export default { transformToLocalDateString, transformToLocalDateWithoutHour}