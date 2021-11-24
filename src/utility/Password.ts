export const Password = (
  str: string | null,
): boolean => {
  if (str) {
    // const regLat = /^[a-zA-Z0-9]|[<>(){}!?.,:;-+=~_"^*@#$%|]{5,}$/i
    const regLat = /^[a-zA-Z0-9\-\]\[<>(){}!?.,:;+=~_"^*@#$%|]{6,}$/i
    return regLat.test(str)
  }
  return false
}