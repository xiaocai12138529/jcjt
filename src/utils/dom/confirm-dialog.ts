import { App, createApp } from "vue";

import ConfirmDialog from "@/components/confirm-dialog/index.vue";
// import { Modal } from "ant-design-vue";
import { Button, Modal } from "ant-design-vue";

// 调用confirm方法 弹出一个模态框 返回promise
export function confirm(text: string): Promise<void> {
  const container = document.createElement("div");

  document.body.appendChild(container);
  let app: App;

  return new Promise((resolve, reject) => {
    const destroy = () => {
      app?.unmount();
      document.body.removeChild(container);
    };
    // 确定
    const onOk = () => {
      resolve();
      destroy();
    };
    // 取消
    const onCancel = () => {
      reject();
      destroy();
    };

    app = createApp(ConfirmDialog, { visible: true, text, onOk: onOk, onCancel: onCancel });
    app.component(Button.name, Button);
    app.component(Modal.name, Modal);
    app.mount(container);
  });
}
