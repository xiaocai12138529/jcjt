import { App, createApp } from "vue";

import Template from "./template.vue";
// import { Modal } from "ant-design-vue";
import { Button, Modal, Input } from "ant-design-vue";

// 调用方法弹出带有一个输入框的模态框 返回promise  resolve中传入用户输入的文字
// label: 输入框的label placeholder: 输入框占位符 defaultValue: 输入框中的默认值
export default function (label: string, placeholder?: string, defaultValue?: string): Promise<string> {
  const container = document.createElement("div");

  document.body.appendChild(container);
  let app: App;

  return new Promise((resolve, reject) => {
    const destroy = () => {
      app?.unmount();
      document.body.removeChild(container);
    };
    // 确定
    const onOk = (val: string) => {
      resolve(val);
      destroy();
    };
    // 取消
    const onCancel = () => {
      reject();
      destroy();
    };
    app = createApp(Template, { label, placeholder, onOk: onOk, defaultValue: defaultValue, onCancel: onCancel });
    app.component(Button.name, Button);
    app.component(Modal.name, Modal);
    app.component(Input.name, Input);
    app.mount(container);
  });
}
