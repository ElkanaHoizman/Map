import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "../src/assets/styles/css/tailwind.css";
import router from "./router";

createApp(App).use(router).use(store).mount("#app");

