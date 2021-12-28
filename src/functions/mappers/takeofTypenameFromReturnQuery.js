const takeofTypename = (data) => {
  //sacar de la data el campo __typename que retorna graphql
  if(!data.length) return []
  return data.map((element) => {
    const { __typename, ...restOfData } = element
    return restOfData
  })
}

export default takeofTypename