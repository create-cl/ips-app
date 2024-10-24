<template>
  <div class="page-container">
    <router-view v-if="isReady"></router-view>
    <span v-else>Loading...</span>
  </div>
</template>

<script>
  // import Navigation from "./Navigation.vue";

  import {setStore} from "../services/store.service";

  export default {
    created() {
      this.checkAuth();
    },
    data() {
      return {
        isReady: false,
      }
    },
    methods: {
      async checkAuth() {
        try {
          let auth = await this.$feathers.reAuthenticate();
          console.log(auth);
          setStore("user", auth.user);
        }
        catch (e) {
        }
        this.isReady = true;
      }
    }
  }
</script>

<style>
  .v-btn {
    font-weight: 600;
    letter-spacing: .03em;
  }
</style>
