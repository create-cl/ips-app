<template>
  <v-row justify="center">
    <v-col cols="12" md="10" lg="10">
      <v-card elevation="0" class="pa-4 d-flex flex-column align-center surface mt-5">
        <v-row style="width: 100%;">
          <v-col cols="6">
            <v-card-text class="mb-6">
              <v-text-field v-model="id" :label="$t('vhl.generate.id_label')" class="pl-2" hide-details outlined
                clearable></v-text-field>
            </v-card-text>
          </v-col>
          <v-col cols="6">
            <v-card-text>
              <v-select v-model="server" :label="$t('vhl.generate.server_label')" class="pl-2" outlined clearable
                :items="servers">
              </v-select>
            </v-card-text>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-btn rounded width="10rem" color="primary" class="on-primary--text" :disabled="!server"
            @click="getBundle">{{ $t('vhl.generate.search_button') }}
          </v-btn>
        </v-card-actions>
        <v-card-text v-if="results.length > 0"
          style="border: 1px solid var(--v-outline-variant-base); border-radius: 1rem; margin-bottom: 3%;">
          <v-card-title>
            {{ this.name }} - {{ this.country }}
          </v-card-title>
          <v-card-subtitle>
            {{ $t('vhl.generate.results_select') }}:
          </v-card-subtitle>
          <v-list two-line class="surface">
            <template v-for="(item, index) in results">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.type }}</v-list-item-title>
                  <v-list-itme-subtitle>{{ item.code }}</v-list-itme-subtitle>
                </v-list-item-content>
                <v-checkbox v-model="selectedResults[index]"></v-checkbox>
              </v-list-item>
            </template>
          </v-list>
          <v-text-field v-model="password" :label="$t('vhl.generate.passcode_label')" class="pl-2" outlined
            type="password"></v-text-field>
          <v-select v-model="selectedPeriod" :label="$t('vhl.generate.period_label')" class="pl-2" outlined clearable
            :items="periods">
          </v-select>
          <v-card-actions class="d-flex justify-center">
            <v-btn rounded width="10rem" color="primary" class="on-primary--text" :disabled="!selectedPeriod"
              :loading="loading" @click="generateVHL()">{{ $t('vhl.generate.generate_button') }}
            </v-btn>
          </v-card-actions>
        </v-card-text>
        <v-card-text v-else-if="searched && results.length === 0">
          <v-card-subtitle>
            {{ $t('vhl.generate.no_results_found') }}
          </v-card-subtitle>
        </v-card-text>
        <v-card-text v-else class="d-flex align-center flex-md-column mt-8">
          <svg width="166" height="151" viewBox="0 0 166 151" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M94.7722 45.1965L32.0973 58.6627L29.4708 46.172L92.1457 32.7058L94.7722 45.1965ZM37.3503 83.644L68.9512 76.8543C66.857 81.231 65.4754 85.9315 64.9093 90.7778L39.9768 96.1347L42.6033 108.625L65.3683 103.734C65.6063 104.989 65.9021 106.243 66.2574 107.494C68.4632 115.257 72.6847 121.91 78.2245 127.082L35.3214 136.3C31.9969 137.014 28.5318 136.383 25.6885 134.546C22.8452 132.709 20.8565 129.815 20.1599 126.503L1.77434 39.0678C1.07775 35.755 1.73033 32.2942 3.58853 29.4467C5.44673 26.5992 8.35833 24.5981 11.6828 23.8838L37.8809 18.255C38.9899 10.4448 44.781 3.71743 52.9288 1.96683C61.0765 0.21622 69.0739 3.98103 73.2296 10.66L99.4277 5.03117C102.752 4.31688 106.217 4.94782 109.061 6.7852C111.904 8.62257 113.893 11.5159 114.589 14.8286L122.39 51.9262C114.686 49.973 106.308 49.9903 98.0263 52.3871C91.7108 54.2149 86.0748 57.2457 81.3119 61.1435L34.7238 71.1533L37.3503 83.644ZM55.5553 14.4575C57.2175 14.1004 58.95 14.4158 60.3717 15.3345C61.7934 16.2532 62.7877 17.6999 63.136 19.3562C63.4843 21.0126 63.158 22.743 62.2289 24.1668C61.2998 25.5905 59.844 26.591 58.1818 26.9482C56.5195 27.3053 54.787 26.9899 53.3653 26.0712C51.9437 25.1525 50.9493 23.7058 50.601 22.0495C50.2527 20.3931 50.579 18.6627 51.5081 17.2389C52.4372 15.8152 53.893 14.8147 55.5553 14.4575ZM133.148 69.9875C126.895 63.6947 118.413 60.1595 109.57 60.1595C100.726 60.1595 92.2445 63.6947 85.9911 69.9875C79.7376 76.2803 76.2245 84.8152 76.2245 93.7146C76.2245 102.614 79.7376 111.149 85.9911 117.442C92.2445 123.734 100.726 127.27 109.57 127.27C117.829 127.27 125.421 124.224 131.27 119.217L132.655 120.61V124.689L158.305 150.5L166 142.757L140.35 116.945H136.297L134.912 115.551C139.888 109.666 142.915 102.026 142.915 93.7146C142.915 84.8152 139.402 76.2803 133.148 69.9875ZM86.4845 93.7146C86.4845 80.8088 96.7446 70.4841 109.57 70.4841C122.395 70.4841 132.655 80.8088 132.655 93.7146C132.655 106.62 122.395 116.945 109.57 116.945C96.7446 116.945 86.4845 106.62 86.4845 93.7146Z"
              fill="#A7C8FF" />
          </svg>
          <v-card-subtitle>{{ $t('vhl.generate.no_data_loaded') }}.</v-card-subtitle>
        </v-card-text>

        <v-card-text v-if="qrCode">
          <div class="d-flex justify-center">
            <img :src="qrCode" :alt="$t('vhl.generate.qr_code')" />
          </div>
          <v-card-actions class="d-flex justify-center">
            <v-btn color="primary" class="on-primary--text" @click="downloadQRCode">
              {{ $t('vhl.generate.download_button') }}
            </v-btn>
          </v-card-actions>
          <div class="mt-8">
            <pre class="pre-box">{{ this.stringQR }}</pre>
          </div>
        </v-card-text>

      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import QRCode from 'qrcode'

export default {
  name: "GenerateVHL",
  components: {},
  props: {
    server: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      results: [],
      searched: false,
      servers: JSON.parse(process.env.FHIR_SERVERS),
      imgSrc: null,
      password: "",
      periods: [this.$t('vhl.generate.period.day'), this.$t('vhl.generate.period.week'), this.$t('vhl.generate.period.month'), this.$t('vhl.generate.period.no_expiration')],
      selectedPeriod: "",
      selectedResults: [],
      completeResults: [],
      ips: "",
      indexes: [],
      qrCode: "",
      stringQR: "",
      name: "",
      country: ""
    };
  },
  mounted() {
  },
  watch: {
    '$i18n.locale': function (newLocale) {
      this.updateLocale();
    }
  },
  methods: {
    updateLocale() {
      this.periods = [this.$t('vhl.generate.period.day'), this.$t('vhl.generate.period.week'), this.$t('vhl.generate.period.month'), this.$t('vhl.generate.period.no_expiration')]
    },
    getBundle() {
      this.searched = true;
      fetch(this.server + '/Bundle/' + this.id)
        .then((response) => {
          if (response.status == 200) {
            return response.json()
          }
          else {
            this.$toast("Error buscar ips");
            throw new Error("Not status");
          }
        })
        .then((result) => {
          this.results = [];
          this.ips = result;
          result.entry.forEach((obj, index) => {
            if (this.isValidResource(obj.resource.resourceType)) {
              if (obj.resource.resourceType == 'Patient') {
                let resource = obj.resource;
                let name = resource.name[0].given[0];
                let lastName = resource.name[0].family;
                let country = resource.address ? resource.address[0].country : null;
                this.name = name + ", " + lastName;
                this.country = country ? country : "";
              } else {
                const type = obj.resource.resourceType;
                const icon = this.getIconForResourceType(type);
                let code = "";
                if (obj.resource.resourceType == 'Immunization') {
                  code = obj.resource.vaccineCode.coding[0].code + ' - ' + obj.resource.vaccineCode.coding[0].display;
                } else {
                  code = obj.resource.code.coding[0].code + ' - ' + obj.resource.code.coding[0].display;
                }
                this.results = this.results.concat({ "type": type, "code": code, "icon": icon })
                this.indexes.push(index)
                this.selectedResults.push(true);
              }
            }
          })
        })
    },
    getIconForResourceType(type) {
      const iconMap = {
        'Immunization': 'mdi-needle',
        'Condition': 'mdi-bacteria',
        'AllergyIntolerance': 'mdi-allergy',
        'Medication': 'mdi-pill',
      };

      return iconMap[type] || '';
    },
    isValidResource(resourceType) {
      const validResources = ['Composition', 'Practitioner', 'Organization', 'MedicationStatement', 'PractitionerRole'];
      return !validResources.includes(resourceType);
    },
    async generateVHL() {
      this.loading = true;
      //get expiration date
      let expirationDate = "";
      if (this.selectedPeriod != this.$t('vhl.generate.period.no_expiration')) {
        expirationDate = this.getExpirationDate(this.selectedPeriod).toISOString();
      }


      //get selected resources
      const checkedResources = this.indexes.filter((_, index) => !this.selectedResults[index]);

      //copy of ips
      const filteredIps = JSON.parse(JSON.stringify(this.ips));

      //delete not selected resources and save there fullUrl
      const urlToDelete = new Set();
      const filteredEntries = this.ips.entry.filter((entry, index) => {
        if (checkedResources.includes(index)) {
          urlToDelete.add(entry.fullUrl);
          return false;
        }
        return true;
      });
      filteredIps.entry = filteredEntries;

      //delete resources that have a reference to deleted resources
      filteredIps.entry = filteredIps.entry.filter(obj => {
        if (obj.resource.resourceType !== 'Composition' && this.resourceHasReference(obj, urlToDelete)) {
          urlToDelete.add(obj.fullUrl);
          return false;
        }
        return true;
      });

      //delete references to deleted resources in composition
      const composition = JSON.parse(JSON.stringify(filteredIps.entry.find(entry => entry.resource.resourceType === 'Composition')));
      if (composition) {
        composition.resource.section.forEach(sec => {
          sec.entry = sec.entry.filter(ref => !urlToDelete.has(ref.reference));
        })
      }
      filteredIps.entry[0] = composition;
      const body = {
        expiresOn: expirationDate,
        jsonContent: JSON.stringify(filteredIps),
        passCode: this.password
      };
      const params = {
        query: { url: "http://lacpass.create.cl:8182/v2/vshcIssuance" }
      };

      this.$service("api/proxy-ips").create(body, params)
        .then(async response => {
          console.log(response);
          var opts = {
            errorCorrectionLevel: 'H',
            type: 'image/jpeg',
            quality: 0.3,
            margin: 1,

          }
          this.stringQR = response;
          QRCode.toDataURL(response, opts, (err, url) => {
            if (err) throw err
            this.qrCode = url;
            this.loading = false;
          })
        })
        .catch(error => {
          console.error('Error en el proxy:', error);
          this.loading = false;
        });
    },
    resourceHasReference(resource, urlSet) {
      const stringifiedResource = JSON.stringify(resource);
      for (let url of urlSet) {
        if (stringifiedResource.includes(`${url}`)) {
          return true;
        }
      }
      return false;
    },
    getExpirationDate() {
      const todayDate = new Date()
      if (this.selectedPeriod === this.$t('vhl.generate.period.day')) {
        todayDate.setDate(todayDate.getDate() + 1)
        return todayDate;
      }
      if (this.selectedPeriod === this.$t('vhl.generate.period.week')) {
        todayDate.setDate(todayDate.getDate() + 7)
        return todayDate;
      }
      if (this.selectedPeriod === this.$t('vhl.generate.period.month')) {
        todayDate.setDate(todayDate.getDate() + 30)
        return todayDate;
      }
      return null;
    },
    downloadQRCode() {
      const link = document.createElement('a');
      link.href = this.qrCode;
      link.download = 'QRCode.png';
      link.click();
    },
  }
};
</script>
<style>
.styled-table {
  border-collapse: collapse;
  border: 1px solid rgba(44, 137, 236, 0.3);
}

.styled-table th,
.styled-table td {
  padding: 12px;
  border: 1px solid rgba(44, 137, 236, 0.3);
  text-align: center !important;

}

.link-column {
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.row-odd {
  background-color: rgb(30, 133, 241, 0.3);
}

.pre-box {
  border: 1px solid grey;
  padding: 8px 16px;
  text-wrap: wrap;
  border-radius: 8px;
}
</style>