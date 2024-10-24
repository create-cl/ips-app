<template>
  <v-app id="inspire">
    <v-app-bar clipped-left dense color="primary-container" app fixed dark>
      <v-toolbar-title class="ml-0">
        <div style="width: 14rem;">
            <svg width="168" height="34" viewBox="0 0 168 34" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect y="0.5" width="168" height="33" fill="url(#pattern0_291_2126)"/>
            <defs>
            <pattern id="pattern0_291_2126" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlink:href="#image0_291_2126" transform="matrix(0.00257732 0 0 0.0131209 0 -0.0773196)"/>
            </pattern>
            <image id="image0_291_2126" width="388" height="88" xlink:href="data:image/png;base64,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"/>
            </defs>
            </svg>
        </div>
      </v-toolbar-title>
      <v-tabs v-model="selectedTab" background-color="primary-container" slider-color="primary-container" color="on-primary">
        <v-tab 
          :to="{ path: '/ips/viewer' }"
          :class="{'tab-selected': selectedTab === '/ips/viewer'}">
          {{ $t("nav.viewer") }}
        </v-tab>
        <v-tab 
          :to="{ path: '/ips/find-ips' }"
          :class="{'tab-selected': selectedTab === '/ips/find-ips'}">
          {{ $t("nav.search_ips") }}
        </v-tab>
        <v-tab 
          :to="{ path: '/ips/health-check'}"
          :class="{'tab-selected': selectedTab === '/ips/health-check'}">
          {{ $t("nav.health_check") }}
        </v-tab>
        <v-tab :to="{ path: '/ips/vhl'}" :class="{'tab-selected': selectedTab === '/ips/vhl'}">VHL</v-tab>
        <v-tab :to="{ path: '/ips/dvc'}" :class="{'tab-selected': selectedTab === '/ips/dvc'}">DVC</v-tab>
      </v-tabs>
      <v-spacer/>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" class="mr-3">
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="setLanguage('en')">
            <v-list-item-title>English</v-list-item-title>
          </v-list-item>
          <v-list-item @click="setLanguage('es')">
            <v-list-item-title>Español</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-icon @click="toggleDarkMode">mdi-theme-light-dark</v-icon>
    </v-app-bar>
    <v-main>

      <v-container fluid class="min-height-100 pa-0 surface">
        <router-view ref="UploadIPS" :ips="ips" @view-document="handleViewDocument" :darkMode="darkMode" @get-vhl="handleGetVHL" :server="server" :id="id" :country="country" @get-dvc="handleGetDVC"></router-view>
      </v-container>
      <global-toast/>
    </v-main>
  </v-app>
</template>

<script>
  import GlobalToast from "./utils/GlobalToast";
  import UploadIPS from "./pages/UploadIPS";
  import SearchIPS from "./pages/SearchIPS";
  import HealthCheck from "./pages/HealthCheck";
  import GenerateVHL from "./pages/GenerateVHL.vue";
  import {useConfigStore} from '../stores/config.js';

  export default {
    components: {GlobalToast, UploadIPS, SearchIPS, HealthCheck, GenerateVHL},
    data() {
      return {
        /**
         *  Number that represents the current view selected.
         */
        selectedTab: 0,
        /**
         *  Used when loading the role of the user.
         */
        loading: false,
        /**
         * Knows when a user is already logged in.
         **/
        loggedIn: false,
        darkMode: false,
        ips: "",
        country: process.env.COUNTRY_CODE
      }
    },
    mounted() {
    },
    created() {
      const store = useConfigStore();
      this.$vuetify.theme.dark = store.options['darkMode'];
      this.darkMode = this.$vuetify.theme.dark;
      this.setLanguage(store.options['lang'])
    },
    methods: {
      toggleDarkMode(){
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        this.darkMode = this.$vuetify.theme.dark;
        const store = useConfigStore();
        store.changeTheme(this.darkMode);
        
      },
      handleViewDocument(data) {
        this.ips = JSON.stringify(data);; // Asignar el JSON a ips
        this.$router.push('/ips/viewer'); // Cambiar la URL a la pestaña de Upload IPS
        this.$nextTick(() => {
          if (this.$refs.UploadIPS){
            this.$refs.UploadIPS.validateIPS(this.ips);
          }
        });
      },
      handleGetVHL(data){
        this.server = data.server;
        this.id = data.id;
        this.$router.push('/ips/vhl');
      },
      handleGetDVC(data){
        this.server = data.server;
        this.id = data.id;
        this.$router.push('/ips/dvc');
      },
      setLanguage(lang){
        const newLocale = lang
        this.$i18n.locale = newLocale;
        this.$vuetify.lang.current = newLocale;
        const store = useConfigStore();
        store.changeLang(lang);
      }
    },
    computed: {

    }
  }
</script>

<style scoped>

  .navigation-text {
    font-weight: bold;
    color: white;
    line-height: 26px;
  }

  .min-height-100{
    min-height: 100%;
    background-color: #F5F6FA;
  }

  .footer-app {
    width: 100%;
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 10px;
  }

  .footer-text {
    font-size: xx-small;
    font-weight: 500;
  }

  .color-primary {
    color: var(--v-primary-base);
  }
  .message-content {
    width: 100%;
  }

  .img-white{
    filter: saturate(0) brightness(10);
  } 

  .tab-selected{
    background-color: var(--v-primary-base);
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
    height: 70%;
    align-self: center;
  }
</style>
