import store from '@/store'
class Utils {
  showToast(msg) {
    store.dispatch('setToastMsg', msg)
  }

  validPw(pw) {
    // at least one uppercase letter
    const containsUppercase = /[A-Z]/.test(pw)
    // lowercase letter at least
    const containsLowercase = /[a-z]/.test(pw)
    // number at least one
    const containsNumber = /[0-9]/.test(pw)
    // at least one of the following characters "#?! @ $% ^ & * -"
    const containsSpecial = /[#?!@$%^&*-]/.test(pw)
    return (
      containsUppercase &&
      containsLowercase &&
      containsNumber &&
      containsSpecial
    )
  }

  validEmail(email) {
    var reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(email)
  }

  telValid(tel) {
    const telValid = /^[0-9]{10}$/.test(tel)
    return telValid
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0GB'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + '' + sizes[i]
  }
  formatBytesToGb(bytes) {
    if (bytes === 0) return 0
    const k = 1024
    return parseFloat((bytes / Math.pow(k, 3)).toFixed(2))
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  convertDurationToHour(ms) {
    // ms < 35 -> 0.001; ms > 35 -> 0.01;
    let num = ms < 35 ? 3 : 2
    let base = 10 ** num
    let hours = +(Math.round((ms / 3600) * base) / base)
    return hours
  }

  calTranscriptPlan(duration) {
    let hour = this.convertDurationToHour(duration)

    // rounding: <= 10 = 1, > 20 = 2, > 30 = 3, ...
    let math = Math.ceil(hour * 0.1)
    let result = parseInt(math)

    return this.numberWithCommas(result * 50000)
  }

  /**
   * yyyymmdd -> yy年mm月dd日
   * @param {*} dateVal
   * @returns
   */
  convertDateToFormatJP(dateVal) {
    if (dateVal == undefined || dateVal == '') return ''
    const yearSub = dateVal.substring(0, 4)
    const monthSub = dateVal.substring(4, 6)
    const daySub = dateVal.substring(6, 8)
    const dateSub = yearSub + '/' + monthSub + '/' + daySub

    let date = new Date(dateSub)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${year}年${(month < 9 ? '0' : '') + month}月${
      (day < 9 ? '0' : '') + day
    }日`
  }
}

export default new Utils()
