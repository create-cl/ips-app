import {defineStore} from 'pinia';

export const useConfigStore = defineStore('config', {
    state: () => ({
        options: {
            lang: 'es',
            darkMode: true,
            country: 'XL'
        },
    }),
    actions: {
        changeLang(lang){
            this.options['lang'] = lang;
        },
        changeTheme(theme) {
            this.options['darkMode'] = theme;
        }
    },
    persist: true,
});