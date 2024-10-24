import "regenerator-runtime/runtime.js";

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import router from './router';
import Vuetify from 'vuetify';
import VueI18n from 'vue-i18n';
import {i18n} from './plugins/localization/i18n';
import ECharts from 'vue-echarts';
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/boxplot';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';

import App from './components/App.vue';

import '@mdi/font/css/materialdesignicons.css'
import es from 'vuetify/es5/locale/es'
import en from 'vuetify/es5/locale/en'

import VueSyncersFeathers from 'vue-syncers-feathers';
import feathersClient from "./feathers-client";

Vue.config.productionTip = false;
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(pinia);

Vue.component('v-chart', ECharts);

// TODO: Upgrade vue when fixed https://github.com/vuetifyjs/vuetify/issues/9999
const ignoreWarnMessage = 'The .native modifier for v-on is only valid on components but it was used on <div>.';
Vue.config.warnHandler = function (msg, vm, trace) {
    // `trace` is the component hierarchy trace
    if (msg === ignoreWarnMessage) {
        msg = null;
        vm = null;
        trace = null;
    }
};

Vue.use(VueSyncersFeathers, {
    aliases: true,
    feathers: feathersClient
});

Vue.use(Vuetify);


let vuetify = new Vuetify({
    lang: {
        locales: { en, es },
        current: 'es',
    },
    icons: {
        iconfont: 'mdi',
    },
    theme: {
        options: {
            customProperties: true
        },
        themes: {
            "light": {
                "primary": "#005099",
                "surface-tint": "#3E5F90",
                "on-primary": "#FFFFFF",
                "primary-container": "#0074DA",
                "on-primary-container": "#FFFFFF",
                "secondary": "#5C5E62",
                "on-secondary": "#FFFFFF",
                "secondary-container": "#F6F7FB",
                "on-secondary-container": "#525457",
                "tertiary": "#954A00",
                "on-tertiary": "#FFFFFF",
                "tertiary-container": "#EC832B",
                "on-tertiary-container": "#200B00",
                "error": "#B81D27",
                "on-error": "#FFFFFF",
                "error-container": "#FF6D69",
                "on-error-container": "#260002",
                "background": "#F9F9FF",
                "on-background": "#191C20",
                "surface": "#F9F9FF",
                "on-surface": "#181C22",
                "surface-variant": "#E0E2EC",
                "on-surface-variant": "#414753",
                "outline": "#717785",
                "outline-variant": "#C0C6D5",
                "shadow": "#000000",
                "scrim": "#000000",
                "inverse-surface": "#2D3038",
                "inverse-on-surface": "#EEF0FA",
                "inverse-primary": "#A7C8FF",
                "primary-fixed": "#D5E3FF",
                "on-primary-fixed": "#001B3C",
                "primary-fixed-dim": "#A7C8FF",
                "on-primary-fixed-variant": "#004788",
                "secondary-fixed": "#E1E2E6",
                "on-secondary-fixed": "#191C1F",
                "secondary-fixed-dim": "#C5C6CA",
                "on-secondary-fixed-variant": "#44474A",
                "tertiary-fixed": "#FFDCC6",
                "on-tertiary-fixed": "#301400",
                "tertiary-fixed-dim": "#FFB785",
                "on-tertiary-fixed-variant": "#713700",
                "surface-fim": "#D7DAE3",
                "surface-bright": "#F9F9FF",
                "surface-container-lowest": "#FFFFFF",
                "surface-container-low": "#F1F3FD",
                "surface-container": "#EBEDF7",
                "surface-container-high": "#E6E8F1",
                "surface-container-highest": "#E0E2EB"
            },
            "dark": {
                "primary": "#A7C8FF",
                "surface-tint": "#A7C8FF",
                "on-primary": "#003060",
                "primary-container": "#0074DA",
                "on-primary-container": "#FFFFFF",
                "secondary": "#FFFFFF",
                "on-secondary": "#2E3134",
                "secondary-container": "#D3D4D8",
                "onSecondary-container": "#3D4043",
                "tertiary": "#FFB785",
                "on-tertiary": "#502500",
                "tertiary-container": "#B65C00",
                "on-tertiary-container": "#FFFFFF",
                "error": "#FFB3AE",
                "on-error": "#68000C",
                "error-container": "#D8363A",
                "on-error-container": "#FFFFFF",
                "background": "#10131A",
                "on-background": "#E0E2EB",
                "surface": "#10131A",
                "on-surface": "#E0E2EB",
                "surface-variant": "#43474E",
                "on-surface-variant": "#C0C6D5",
                "outline": "#8B919F",
                "outline-variant": "#414753",
                "shadow": "#000000",
                "scrim": "#000000",
                "inverse-surface": "#E0E2EB",
                "inverse-on-surface": "#2D3038",
                "inverse-primary": "#005EB2",
                "primary-fixed": "#D5E3FF",
                "on-primary-fixed": "#001B3C",
                "primary-fixed-dim": "#A7C8FF",
                "on-primary-fixed-variant": "#004788",
                "secondary-fixed": "#E1E2E6",
                "on-secondary-fixed": "#191C1F",
                "secondary-fixed-dim": "#C5C6CA",
                "on-secondary-fixed-variant": "#44474A",
                "tertiary-fixed": "#FFDCC6",
                "on-tertiary-fixed": "#301400",
                "tertiary-fixed-fim": "#FFB785",
                "on-tertiary-fixed-variant": "#713700",
                "surface-dim": "#10131A",
                "surface-bright": "#363940",
                "surface-container-lowest": "#0B0E15",
                "surface-container-low": "#181C22",
                "surface-container": "#1C2026",
                "surface-container-high": "#272A31",
                "surface-container-highest": "#31353C"
            },
        },
    },

});

// new Vue(App).$mount('#app');
const app = new Vue({
    i18n,
    vuetify,
    router,
    pinia,
    el: '#app',
    render: h => h(App)
});
