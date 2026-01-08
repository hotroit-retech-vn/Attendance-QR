import { createApp } from "vue";
import App from "./App.vue";
import { useAppUpdater } from "./composables/useUpdater";

useAppUpdater()
createApp(App).mount("#app");
