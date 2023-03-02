import { defineNuxtPlugin } from '#app';
import ElementPlus from 'element-plus/dist/index.full';
import zhTw from 'element-plus/dist/locale/zh-tw.mjs';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(ElementPlus, { locale: zhTw });
});
