/**
 * cookie操作工具类
 */

class cookie {
  setCookie(key: string, value: any, days: number) {
    const exp = new Date();
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = key + "=" + value + ";expires=" + exp.toTimeString() + ";path=/";
  }

  getCookie(key: string): any {
    let arr: any;
    const reg = new RegExp("(^|)" + key + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    else return null;
  }

  delCookie(key: string): void {
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const cval = this.getCookie(key);
    if (cval != null) document.cookie = key + "=" + cval + ";expires=" + exp.toTimeString() + ";path=/";
  }
}

export default new cookie();
