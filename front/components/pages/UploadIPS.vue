<template>
  <v-card elevation="0" class="ma-0 pa-4 remove-error surface">
    <v-card-text class="ma-0 pa-0">
      <v-row class="pa-0" justify="center">
        <v-col cols='10' class="pa-5 pt-0" v-if="this.alertWarning">
          <v-alert class="pa-3 size-font-alert" closable dense type="warning" icon="mdi-alert" style="color: black;">
            {{ $t('viewer.alerts.immunization_warning') }}
          </v-alert>
        </v-col>
        <v-col cols="6" class="pa-5 pb-0" v-if="!this.validate || this.edit">
          <v-responsive class="mx-auto">
            <v-textarea outlined v-model="localIps" :label="$t('viewer.input.ips_input')" :error-messages="warnings"
              auto-grow clearable rows="25" @blur="validateIPS(localIps)"></v-textarea>
          </v-responsive>
        </v-col>
        <v-col cols="6" class="pa-5 pb-0" v-else-if="jsonData != undefined">
          <div class="ma-1 pa-3" style="border: 1px solid; border-radius: 5px;">
            <div class="float-button">
              <v-btn small icon @click="toggleEditing">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </div>
            <json-viewer :value="jsonData" :expand-depth="4"
              :class="{ 'jv-dark': darkMode, 'jv-light': !darkMode }"></json-viewer>
          </div>
        </v-col>
        <v-col cols="6" class="pa-5 pb-0" v-if="!this.validate">
          <v-card class="d-flex align-center justify-center" outlined
            style="height: 95%; width: 100%; background-color: transparent;">
            <div>
              <div>
                <svg width="192" height="160" viewBox="0 0 192 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M32.3055 159.57L32.3974 159.078L32.4892 158.586C33.3656 158.748 34.2889 158.744 35.2189 158.545L41.0909 157.289L41.1942 157.778L41.2975 158.267L35.4256 159.523C34.3648 159.75 33.3088 159.755 32.3055 159.57ZM146.994 135.659L146.89 135.17L146.787 134.681L152.659 133.424C153.589 133.226 154.434 132.851 155.169 132.345L155.452 132.757L155.735 133.168C154.893 133.748 153.926 134.176 152.866 134.403L146.994 135.659ZM135.26 12.5536L134.814 12.649L134.325 12.7536L133.076 6.83999C132.879 5.90954 132.507 5.06431 132.003 4.3296L132.415 4.0456L132.827 3.7616C133.405 4.60269 133.829 5.56951 134.054 6.63082L135.214 12.1259L140.835 13.0217L140.757 13.5156L140.68 14.0096L135.389 13.1663L135.26 12.5536ZM13.0092 24.341L7.13725 25.5971C6.07651 25.8239 5.1097 26.2515 4.26814 26.8315L4.55088 27.2434L4.83362 27.6552C5.56875 27.1485 6.41396 26.7744 7.34391 26.5755L13.2159 25.3195L13.1126 24.8302L13.0092 24.341ZM24.7001 147.456L25.1891 147.351L25.678 147.246L26.9271 153.16C27.1236 154.09 27.4954 154.936 27.9998 155.67L27.5878 155.954L27.1757 156.238C26.5983 155.397 26.1734 154.43 25.9492 153.369L24.7001 147.456ZM22.202 135.628L22.6909 135.524L23.1798 135.419L20.6817 123.592L20.1927 123.697L19.7038 123.801L22.202 135.628ZM17.2056 111.974L17.6946 111.87L18.1835 111.765L15.6853 99.9378L15.1964 100.042L14.7074 100.147L17.2056 111.974ZM12.2093 88.3198L12.6982 88.2153L13.1872 88.1107L10.689 76.2835L10.2001 76.3881L9.71111 76.4927L12.2093 88.3198ZM7.21294 64.6656L7.70188 64.561L8.19082 64.4564L5.69265 52.6292L5.20371 52.7338L4.71477 52.8384L7.21294 64.6656ZM2.2166 41.0113L2.70554 40.9067L3.19448 40.8021L1.9454 34.8885C1.74886 33.9581 1.74688 33.0337 1.91072 32.1561L1.4195 32.0653L0.928268 31.9745C0.740703 32.9792 0.743344 34.0364 0.967518 35.0977L2.2166 41.0113ZM24.7532 21.829L24.8566 22.3182L24.9599 22.8074L36.7039 20.2954L36.6006 19.8062L36.4972 19.317L24.7532 21.829ZM48.2412 16.805L48.3446 17.2942L48.4479 17.7834L60.1919 15.2714L60.0886 14.7822L59.9852 14.293L48.2412 16.805ZM71.7292 11.7809L71.8326 12.2702L71.9359 12.7594L83.6799 10.2473L83.5766 9.75813L83.4732 9.26892L71.7292 11.7809ZM95.2172 6.75691L95.3206 7.24611L95.4239 7.73532L107.168 5.2233L107.065 4.73409L106.961 4.24489L95.2172 6.75691ZM118.705 1.73287L118.809 2.22207L118.912 2.71128L124.784 1.45527C125.714 1.25636 126.637 1.25221 127.514 1.41417L127.605 0.922219L127.697 0.430266C126.694 0.244855 125.638 0.249967 124.577 0.476857L118.705 1.73287ZM137.801 24.3715L137.312 24.4761L136.823 24.5807L139.321 36.4079L139.81 36.3033L140.299 36.1987L137.801 24.3715ZM142.797 48.0258L142.308 48.1304L141.819 48.235L144.317 60.0621L144.806 59.9576L145.295 59.853L142.797 48.0258ZM147.794 71.6801L147.305 71.7847L146.816 71.8893L149.314 83.7164L149.803 83.6119L150.292 83.5073L147.794 71.6801ZM152.79 95.3344L152.301 95.439L151.812 95.5436L154.31 107.371L154.799 107.266L155.288 107.162L152.79 95.3344ZM157.786 118.989L157.297 119.093L156.808 119.198L158.057 125.111C158.254 126.042 158.256 126.966 158.092 127.844L158.583 127.935L159.075 128.025C159.262 127.021 159.259 125.964 159.035 124.902L157.786 118.989ZM135.25 138.171L135.146 137.682L135.043 137.193L123.299 139.705L123.402 140.194L123.506 140.683L135.25 138.171ZM111.762 143.195L111.658 142.706L111.555 142.217L99.8109 144.729L99.9142 145.218L100.018 145.707L111.762 143.195ZM88.2735 148.219L88.1702 147.73L88.0669 147.241L76.3229 149.753L76.4262 150.242L76.5295 150.731L88.2735 148.219ZM64.7855 153.243L64.6822 152.754L64.5789 152.265L52.8349 154.777L52.9382 155.266L53.0415 155.755L64.7855 153.243ZM97.9041 45.5065L83.1109 48.9434C79.8191 43.8563 73.0783 42.4214 68.1211 45.6737C65.3226 47.4492 63.5969 50.326 63.1507 53.5806L48.3575 57.0175C46.4803 57.4536 44.8521 58.6223 43.8311 60.2665C42.8102 61.9106 42.4801 63.8956 42.9135 65.7847L54.3522 115.644C54.7856 117.533 55.947 119.172 57.5809 120.199C59.2147 121.226 61.1872 121.559 63.0644 121.122L112.611 109.611C114.488 109.175 116.117 108.007 117.137 106.362C118.158 104.718 118.488 102.733 118.055 100.844L106.616 50.9849C106.183 49.0958 105.022 47.4574 103.388 46.43C101.754 45.4026 99.7814 45.0704 97.9041 45.5065ZM73.1308 51.262C74.0694 51.0439 75.0557 51.21 75.8726 51.7237C76.6895 52.2374 77.2702 53.0566 77.4869 54.0012C77.7036 54.9457 77.5386 55.9382 77.0281 56.7603C76.5176 57.5824 75.7035 58.1667 74.7649 58.3848C73.8263 58.6028 72.8401 58.4368 72.0231 57.9231C71.2062 57.4094 70.6255 56.5901 70.4088 55.6456C70.1921 54.7011 70.3572 53.7086 70.8676 52.8865C71.3781 52.0644 72.1922 51.4801 73.1308 51.262ZM58.7038 69.6186L94.0943 61.3965L92.4602 54.2737L99.5382 52.6293L110.977 102.489L61.4303 114L49.9916 64.1403L57.0697 62.4958L58.7038 69.6186ZM97.3625 75.642L61.972 83.8641L60.3379 76.7414L95.7284 68.5193L97.3625 75.642ZM93.5526 91.532L65.2402 98.1097L63.6061 90.9869L91.9185 84.4092L93.5526 91.532ZM162.257 110.944L162.335 110.45L162.413 109.957L168.402 110.911C169.609 111.103 170.795 111.046 171.91 110.779L172.027 111.265L172.145 111.752C170.904 112.049 169.585 112.112 168.246 111.899L162.257 110.944ZM190.128 37.1924L189.634 37.1137L189.14 37.035L190.09 30.9984C190.28 29.7911 190.221 28.6041 189.952 27.4881L190.438 27.3716L190.923 27.2551C191.223 28.4967 191.288 29.8164 191.078 31.1558L190.128 37.1924ZM152.813 14.9308L152.735 15.4247L152.657 15.9186L164.635 17.8277L164.713 17.3338L164.79 16.8399L152.813 14.9308ZM176.768 18.7489L176.691 19.2428L176.613 19.7368L182.602 20.6913C183.809 20.8836 184.919 21.3068 185.897 21.9077L186.158 21.4816L186.419 21.0555C185.331 20.3869 184.096 19.9169 182.757 19.7034L176.768 18.7489ZM188.227 49.2655L187.734 49.1868L187.24 49.1081L185.34 61.1812L185.833 61.2599L186.327 61.3386L188.227 49.2655ZM184.427 73.4117L183.933 73.333L183.439 73.2543L181.539 85.3274L182.033 85.4061L182.527 85.4848L184.427 73.4117ZM180.627 97.5579L180.133 97.4792L179.639 97.4005L178.689 103.437C178.499 104.644 178.078 105.755 177.479 106.733L177.906 106.994L178.332 107.256C178.998 106.169 179.466 104.934 179.676 103.594L180.627 97.5579Z"
                    fill="#A7C8FF" />
                </svg>
              </div>
              <div color="surface" class="d-flex justify-space-around">
                {{ $t('viewer.input.no_ips') }}
              </div>

            </div>
          </v-card>
        </v-col>
        <v-col cols="6" v-else>
          <viewer ref="viewerValidate" />
        </v-col>
      </v-row>
      <div class="text-center">
        <v-dialog v-model="dialogErrors" width="500">
          <v-responsive class="mx-auto">
            <v-card>
              <v-card-title class="text-h5 primary">
                {{ $t('viewer.dialogs.ips_problems') }}
              </v-card-title>
              <v-card-text>
                <v-card-subtitle class="pa-0 py-3" v-if="missingErrors.length > 0">
                  {{ $t('viewer.dialogs.missing_fields') }}
                </v-card-subtitle>
                <v-list-item v-for="error in missingErrors" :key="error">
                  <v-list-item-content class="py-2">
                    <v-list-item-title>- {{ error }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-card-subtitle class="pa-0 py-3" v-if="cardErrors.length > 0">
                  {{ cardErrors }}
                  {{ $t('viewer.dialogs.cardinality_errors') }}
                </v-card-subtitle>
                <v-list-item v-for="error in cardErrors" :key="error">
                  <v-list-item-content class="py-2">
                    <v-list-item-title>- {{ error }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-card-subtitle class="pa-0 py-3" v-if="formatErrors.length > 0">
                  {{ $t('viewer.dialogs.format_errors') }}
                </v-card-subtitle>
                <v-list-item v-for="error in formatErrors" :key="error">
                  <v-list-item-content class="py-2">
                    <v-list-item-title>- {{ error }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" class="on-primary--text" @click="dialogErrors = false">
                  OK
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-responsive>
        </v-dialog>
        <v-responsive class="mx-auto">
          <v-snackbar v-model="dialogValid" :timeout="2000" color="blue-gray" rounded="pill">
            {{ $t('viewer.dialogs.valid_ips') }}
          </v-snackbar>
        </v-responsive>
      </div>

    </v-card-text>
  </v-card>
</template>


<script>
import { getStore, setStore } from "../../services/store.service";
import Viewer from '../pages/Viewer.vue';
import JsonViewer from 'vue-json-viewer';
export default {
  name: "IPS",
  components: { Viewer, JsonViewer },
  props: {
    ips: {
      type: String,
      default: ''
    },
    darkMode: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      jsonData: undefined,
      validate: false,
      bundleNumber: "",
      missingErrors: [],
      cardErrors: [],
      formatErrors: [],
      modelErrors: false,
      dialogErrors: false,
      dialogValid: false,
      alertWarning: false,
      FHIRUrl: "http://localhost:8080/fhir/",
      localIps: this.ips,
      edit: false
    };
  },
  mounted() {
  },
  watch: {
    ips(newVal) {
      this.localIps = newVal;
    }
  },
  methods: {
    isArray(myArray) {
      return myArray.constructor === Array;
    },
    isObject(myObj) {
      return myObj.constructor === Object;
    },
    async validateIPS(ipsBundle) {
      console.log(ipsBundle);
      console.log(this.ips);
      if (ipsBundle == null) {
        ipsBundle = this.ips;
      }
      if (ipsBundle == "" || ipsBundle == null) {
        return;
      }
      setStore("ips", null);
      this.validate = false;
      this.cardErrors = [];
      this.formatErrors = [];
      this.missingErrors = [];
      this.warnings = [];
      this.alertWarning = false;
      let ips;
      try {
        ips = JSON.parse(ipsBundle);
        if (!this.isObject(ips)) {
          this.formatErrors.push(this.$t('viewer.dialogs.json_format'));
          this.dialogErrors = true;
          return;
        }
      } catch (e) {
        console.log("catch", e);
        this.formatErrors.push(this.$t('viewer.dialogs.json_format'));
        this.dialogErrors = true;
        return;
      }
      let res = await this.$service("api/ips-validator").create({ 'ips': ips });
      console.log(res);
      if (res.validate == false) {
        this.validate = false;
        this.cardErrors = res.cardinalErrors
        this.formatErrors = res.formatErrors;
        this.warnings = res.warnings;
        this.missingErrors = res.missingErrors;
        this.dialogErrors = true;
      }
      else {
        console.log("PERFECT");
        this.jsonData = ips;
        this.dialogValid = true;
        setStore("ips", ips);
        this.validate = true;
        this.edit = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      if (res.warnings.length > 0) {
        console.log('INMU')
        this.alertWarning = true;
      }

    },
    clearInput() {
      this.localIps = "";
      setStore("ips", null);
      this.validate = false;
      this.alertWarning = false;
      this.jsonData = undefined;
    },
    fetchFromHapiFhir(bundleNumber) {
      // Simple GET request using fetch from Hapi Fhir server
      let ipsBundle;
      fetch(`/api/proxy-ips?url=${this.FHIRUrl}Bundle/${bundleNumber}?_format=json`)
        .then((response) => {
          if (response.status == 200) {
            return response.json()
          }
          else {
            this.$toast("Error al cargar el IPS");
            throw new Error("Not status");
          }
        })
        .then((result) => {
          console.log("Success:", result);
          ipsBundle = JSON.stringify(result);
          this.validateIPS(ipsBundle)
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    toggleEditing() {
      this.edit = true;
    }
  },
  computed: {
    user: getStore("user"),
  },
  watch: {

  },
};
</script>

<style>
.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.points {
  align-items: flex-start !important;
}

.size-font-alert {
  font-size: 14px;
}

.json-viewer-scroll {
  overflow: auto;
  height: 100%;
}

.full-height {
  height: calc(100vh - 276px);
}

.remove-error {
  margin: 0px !important;
}

.border-left {
  border-right: 1px solid #999;
}

.jv-light {
  background-color: var(--v-surface-base) !important;
}

.jv-dark {
  background-color: var(--v-surface-base) !important;
  color: #fff !important;
}

.jv-dark .jv-item {
  color: #fff !important;
}

.jv-dark .jv-key {
  color: #fff !important;
}

.jv-dark .jv-number {
  color: #fff !important;
}

.jv-dark .jv-string {
  color: var(--v-primary-container-base) !important;
}

.jv-string {
  color: var(--v-primary-container-base) !important;
}

.mdi-alert {
  color: black !important;
}

.jv-container .jv-code {
  padding: 2px;
}

.float-button {
  position: absolute;
  right: calc(50vw + 40px);
  z-index: 2;
}
</style>
