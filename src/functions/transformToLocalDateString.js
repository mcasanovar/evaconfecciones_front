const transformToLocalDateString = (timestampDate) => {
  return new Date(Number(timestampDate)).toString("dd-MM-yyyy HH:mm")
}

export default transformToLocalDateString