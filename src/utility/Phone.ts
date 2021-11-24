export const Phone = (
  val: string | number | null,
  format: number,
) => {
  if (val) {
    const regIsPhoneMobRus = /^(\+7|7|8)?[\s\-]?\(?[9][\d]{2}\)?[\s\-]?[\d]{3}[\s\-]?[\d]{2}[\s\-]?[\d]{2}$/
    const str = val.toString().toLowerCase().replace(/\s/g, '')
    if(regIsPhoneMobRus.test(str)) {
      //9003002010
      const strDef = str.replace(/[^\d]/g, '').slice(-10)
      //+79003002010
      const strPlus = `+7${strDef}`
      //+7 (900) 300-20-10
      const strPret = ``.concat(
        `+7 `,
        `(${strDef.slice(0, 3)}) `,
        `${strDef.slice(3, 6)}-`,
        `${strDef.slice(6, 8)}-`,
        `${strDef.slice(8, 10)}`,
      )
      switch (format) {
        case 0: return strDef
        case 1: return strPlus
        case 2: return strPret
        default: return strDef
      }
    }
  }
  return null
}