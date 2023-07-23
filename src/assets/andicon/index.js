// 自动注册 antd 图标
// 自定义icon 用@ant-design/icons-vue/createFromIconfontCN 在iconfont.cn

// 添加icon  在ant-design中引入 加入到icons中

import icons from "./icons";

export default function (app) {
  icons.forEach((item) => {
    Object.keys(item).forEach((key) => {
      app.component(key, item[key]);
    });
  });
}
