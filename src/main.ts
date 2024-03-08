import App from "./App.vue";
import router from "./router";
import store from "./store";
import ArcoVue from "@arco-design/web-vue";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import "@arco-design/web-vue/dist/arco.css";
import "@/plugins/axios";
import "./access";
import "bytemd/dist/index.css";
import "highlight.js/styles/stackoverflow-light.css";
import hljs from "highlight.js/lib/core";
import java from "highlight.js/lib/languages/java";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import { createApp } from "vue";

hljs.registerLanguage("java", java);

createApp(App)
  .use(ArcoVue)
  .use(ArcoVueIcon)
  .use(store)
  .use(router)
  .use(hljsVuePlugin)
  .mount("#app");
