
export const getTimestamp = () => {
  return Math.round(new Date() / 1000);
}

export const getNumberAlias = (text) => {
  const len = text.length
  
  switch (true) {
    case (len%2 == 0):
      return 2

    case (len%3 == 0):
      return 3
  
    case (len%5 == 0):
      return 4
  
    default:
      return 1
  }

}
