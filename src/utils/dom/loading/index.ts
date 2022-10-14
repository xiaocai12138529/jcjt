import { App, createApp } from "vue";
import temp from "./template.vue";

const container = document.createElement("div");
let loadingApp: App;
export function showBoot(): void {
  loadingApp = createApp(temp);
  loadingApp.mount(container);
  document.body.appendChild(container);
}

export function hideBoot(): void {
  loadingApp?.unmount();
  document.body.removeChild(container);
}
