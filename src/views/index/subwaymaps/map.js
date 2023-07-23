export function MP() {
  return new Promise(function (resolve, reject) {
    // 如果已加载直接返回
    if (typeof BMapGL !== "undefined") {
      resolve(BMapGL);
      return true;
    }
    window.onBMapCallback = function () {
      resolve(BMapGL);
    };
    const ak = "7kmp5Mz5CZFdni1NVkIGiFt8ZgUOzUze";
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `http://api.map.baidu.com/api?type=webgl&v=1.0&ak=${ak}&callback=onBMapCallback`;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}