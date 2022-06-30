export default function (
  str: string | null,
): boolean {
  if (str) {
    const regLat = /^[a-zA-Z0-9<>(){}!?.,:;+=~_"^*@#$%|-]{5,}$/
    return regLat.test(str)
  }
  return false
}