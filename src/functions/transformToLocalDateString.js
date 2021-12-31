const transformToLocalDateString = (timestampDate) => {
  return new Date(Number(timestampDate)).toString("dd-M-yyyy HH:mm")
}

export default transformToLocalDateString