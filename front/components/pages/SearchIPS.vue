<template>
  <v-row justify="center">
    <v-col cols="12" md="10" lg="10">
      <v-card elevation="0" class="d-flex flex-column align-center surface mt-5">
        <v-card-text>
          <v-card-title>{{ $t('search_ips.title') }}</v-card-title>
        </v-card-text>
        <v-card-text>
          <v-text-field
            v-model="id"
            :label="$t('search_ips.patient_id_label')"
            class="pl-2"
            hide-details
            outlined
            clearable
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn 
          width="10rem"
          :loading="loading"
          rounded
          color="primary" class="on-primary--text"
          @click="findDocumentReferences(id)">{{ $t('search_ips.search_button') }}
          </v-btn>
        </v-card-actions>
        <v-card-text v-if="results.length > 0">
          <v-card-title>
            {{ $t('search_ips.results_found') }}
          </v-card-title>
        </v-card-text>
        <v-card-text v-else-if="searched && results.length === 0" class="d-flex align-center flex-column mt-12">
          <svg width="124" height="144" viewBox="0 0 124 144" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M88.1412 40.978L28.9384 53.5188L26.4401 41.8056L85.643 29.2648L88.1412 40.978ZM33.935 76.9452L68.3124 69.6631C65.5379 73.7892 63.5086 78.3624 62.3488 83.1687L36.4333 88.6583L38.9316 100.372L61.3384 95.6251C61.5425 98.296 62.0194 100.982 62.7873 103.651C64.3639 109.13 67.0184 114.021 70.4699 118.176L32.0876 126.306C28.9473 126.971 25.6723 126.375 22.9833 124.649C20.2942 122.923 18.4113 120.208 17.7487 117.101L0.260738 35.1088C-0.401848 32.0022 0.210188 28.7587 1.9622 26.0917C3.71422 23.4246 6.46271 21.5526 9.60302 20.8874L34.3498 15.6454C35.3873 8.32502 40.8503 2.026 48.5467 0.395701C56.2431 -1.2346 63.8047 2.30545 67.7402 8.57238L92.487 3.33034C95.6273 2.66513 98.9022 3.26124 101.591 4.98751C104.28 6.71379 106.163 9.42883 106.826 12.5354L115.132 51.4774C108.024 49.7937 100.338 49.8615 92.7404 52.0326C92.0227 52.2377 91.3144 52.4591 90.6157 52.6963L31.4367 65.232L33.935 76.9452ZM51.045 12.1089C52.6151 11.7763 54.2526 12.0743 55.5971 12.9375C56.9417 13.8006 57.8831 15.1581 58.2144 16.7114C58.5457 18.2647 58.2397 19.8864 57.3637 21.2199C56.4877 22.5534 55.1134 23.4895 53.5433 23.8221C51.9731 24.1547 50.3357 23.8566 48.9911 22.9935C47.6466 22.1303 46.7051 20.7728 46.3739 19.2195C46.0426 17.6663 46.3486 16.0445 47.2246 14.711C48.1006 13.3775 49.4748 12.4415 51.045 12.1089ZM99.6896 132.293L86.8427 131.398L86.0212 143.105L98.8681 144L99.6896 132.293ZM116.685 104.734C131.411 89.879 122.912 68.1115 100.062 65.6564C93.2476 65.1815 86.5392 67.1929 81.4126 71.248C76.286 75.3031 73.1611 81.0698 72.7254 87.2794L85.5723 88.1747C85.7901 85.0699 87.3526 82.1865 89.9159 80.159C92.4792 78.1314 95.8334 77.1258 99.2406 77.3632C113.387 79.3685 115.088 91.9178 104.112 99.9366C102.918 100.68 101.504 101.381 100.031 102.11C96.8924 103.664 93.4862 105.351 91.3766 107.872C88.2336 111.575 87.8475 117.077 87.3903 123.593L100.237 124.489C100.511 120.586 100.785 116.684 103.881 113.645C105.376 112.139 107.555 110.848 109.84 109.496C112.227 108.083 114.729 106.602 116.685 104.734Z" fill="#A7C8FF"/>
          </svg>
          <v-card-subtitle>
            {{ $t('search_ips.no_results_found') }}
          </v-card-subtitle>
        </v-card-text>


        <v-card-text v-if="results.length > 0">
          <v-list two-line class="surface">
            <template v-for="(item, index) in results">
              <v-list-item style="border: 1px solid var(--v-outline-variant-base); border-radius: 1rem; margin-bottom: 3%;">
                <v-list-item-content>
                  <v-list-item-subtitle class="secondary--text">{{ item.name }} {{ countryCodeToFlag(item.name) ? countryCodeToFlag(item.name) : ''}}</v-list-item-subtitle>
                  <v-list-item-subtitle class="secondary--text">{{ item.link }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-btn color="primary"
                class="on-primary--text"
                rounded
                @click="viewDocument(item.link)">{{ $t('search_ips.table.view') }}</v-btn>
                <v-btn 
                color="primary"
                class="on-primary--text ml-4"
                rounded
                @click="generateVHL(item.link)" v-if="country==item.name">
                  VHL
                </v-btn>
                <v-btn 
                color="primary"
                class="on-primary--text ml-4"
                rounded
                @click="generateDVC(item.link)" v-if="country==item.name">
                  DVC
                </v-btn>
              </v-list-item>
            </template>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>


<script>
  export default {
    name: "SearchIPS",
    components: {},
    props: {
      country: {
        type: String,
        default: ''
      }
    },
    data(){
      return{
        identifier: "",
        result: null,
        loading: false,
        results: [],
        searched: false,
        trustedParties: []
    	};
  	},
  mounted() {
    this.fetchTrustedParties();
  },
  methods: {
    fetchTrustedParties() {
      const broadcastServer = process.env.BROADCAST_URL; 
      const url = `${broadcastServer}/trusted-parties`;
      fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          this.$toast("Error al obtener lista de servidores");
          throw new Error("Not status");
        }
      })
      .then((result) => {
        this.trustedParties = result;
      });
    },
    findDocumentReferences(identifier) {
      this.results = [];
      this.loading = true;
      const broadcastServer = process.env.BROADCAST_URL; 
      const url = `${broadcastServer}/fhir/DocumentReference/?patient.identifier=${identifier}&_format=json&status=current&_profile=http://hl7.org/fhir/uv/ips/StructureDefinition/Bundle-uv-ips`;
      fetch(url)
      .then((response) => {
        this.loading = false;
        this.searched = true;
        if (response.status === 200) {
          return response.json()
        } else {
          this.$toast("Error al consultar el IPS");
          throw new Error("Not status");
        }
      })
      .then((result) => {
        this.results = result.entry.map(entry => ({
          name: this.matchUrl(entry.fullUrl),
          link: entry.resource.content[0].attachment.url
        }));
        
      })
    },
    matchUrl(url){
      const urlSplit = url.split('/');
      const countryDomain = urlSplit[2];
      const res = this.trustedParties.find((party) => {
        const partyUrlSplit = party.url.split('/');
        const partyDomain = partyUrlSplit[2];
        return countryDomain === partyDomain;
      });
      return res.country;
    },

    viewDocument(link) {
      fetch(link)
      .then((response) => {
        if (response.status == 200) {
          return response.json()
        }
      })
      .then((result) => {
        this.$emit('view-document', result);
      })
    },
    generateVHL(link){
      const index = link.lastIndexOf('fhir/') + 4;
      const server = link.substring(0, index);
      const id = link.substring(index).replace('/Bundle/', '');
      this.$emit('get-vhl', {"server": server, "id": id});

    },
    generateDVC(link){
      const index = link.lastIndexOf('fhir/') + 4;
      const server = link.substring(0, index);
      const id = link.substring(index).replace('/Bundle/', '');
      this.$emit('get-dvc', {"server": server, "id": id});

    },
    countryCodeToFlag(code){
        let codePoints = code.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0));
        let flag = String.fromCodePoint(...codePoints);
        return flag;
      }

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

.v-card__title {
    color: var(--v-secondary-base)
  }

</style>
