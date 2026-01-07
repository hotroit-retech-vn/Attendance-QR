import { createApp } from "vue";
import App from "./App.vue";
import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';

async function checkPatch() {
  const update = await check();
  if (update?.available) {
    const yes = confirm(`Có bản vá mới v${update.version}. Cập nhật ngay?`);
    if (yes) {
      await update.downloadAndInstall();
      await relaunch();
    }
  }
}
checkPatch();

createApp(App).mount("#app");
