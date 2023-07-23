/**
 * 操作localstorage工具类
 */

class Storage {
  // 设置
  setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  // 获取
  getStorage(key) {
    const v = localStorage.getItem(key);
    if (v) {
      return JSON.parse(v);
    }
  }
  // 移除一条
  delStorage(key) {
    localStorage.removeItem(key);
  }
  // 清空所有
  clear() {
    localStorage.clear();
  }
}

export default new Storage();
