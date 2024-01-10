import { createApp } from "vue";
import "./style.css";
import "./assets/js/voice9.sdk.min.js";
import App from "./App.vue";
import { VueQueryPlugin } from "vue-query";

const app = createApp(App);
app.use(VueQueryPlugin);
app.mount("#app");
