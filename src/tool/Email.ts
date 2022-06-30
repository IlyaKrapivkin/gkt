export default function (
  val: string | number | null,
): string {
  if (val) {
    const regIsEmail = /(^[\w\+\-\*\&]+)((\.[\w\+\-\*\&]+)*)(@\w+)(([\.-]?\w+)*)((\.\w{2,32})+$)/
    const str = val.toString().toLowerCase().trim()
    if(regIsEmail.test(str)) {
      return str
    }
  }
  return null
}