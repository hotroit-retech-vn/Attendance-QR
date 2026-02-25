import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import { useAppUpdater } from "./composables/useUpdater";

useAppUpdater()
createApp(App).mount("#app");
