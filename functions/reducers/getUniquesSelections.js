const getUniqueSelection = (data, option) => {
  const setObj = new Set();

  const result = data.reduce((acc, current) => {
    if(!setObj.has(current[option])){
      setObj.add(current[option], current)
      acc.push(current[option])
    }
    return acc;
  }, []);

  return result;
}

export default getUniqueSelection