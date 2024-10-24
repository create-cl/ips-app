<template>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="10">
        <v-card elevation="0" class="pa-4 d-flex flex-column align-center surface mt-5">
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-card-text>
                  <v-card-title>{{ $t('health_check.title') }}</v-card-title>
                </v-card-text>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <v-card-actions v-if="trustedParties.length > 0">
                  <v-btn
                  rounded
                  width="10rem"
                  color="primary"
                  class="on-primary--text"
                  :loading="loading"
                  @click="fetchTrustedPartiesStatus()">
                    {{ $t('health_check.buttons.update') }}
                  </v-btn>

                </v-card-actions>
              </v-col>
            </v-row>
          </v-container>



          <v-card-text v-if="trustedParties.length > 0">
            <v-simple-table
            class="styled-table">
              <thead class="primary-container">
                <tr>
                  <th class="on-primary-container--text">{{ $t('health_check.table.country') }}</th>
                  <th class="on-primary-container--text">{{ $t('health_check.table.server') }}</th>
                  <th class="on-primary-container--text">{{ $t('health_check.table.available') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, index) in trustedParties"
                  :key="item.name"
                  :class="{'row-even': index % 2 === 0, 'row-odd': index % 2 !== 0}">
                  <td>{{ item.country }} {{ countryCodeToFlag(item.country) ? countryCodeToFlag(item.country) : ''}}</td> 
                  <td class="link-column">{{ item.url }}</td>
                  <td v-if="item.status == 'ok'">
                    <v-icon color="primary">mdi-check</v-icon>
                  </td>
                  <td v-else>
                    <v-icon color="primary">mdi-close-box</v-icon>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
          <v-card-text v-else class="d-flex justify-center align-center">
            <v-progress-circular indeterminate></v-progress-circular>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </template>
  
  
  <script>
    export default {
      name: "HealthCheck",
      components: {},
      data(){
        return{
          identifier: "",
          result: null,
          loading: false,
          trustedParties: []
          };
        },
    mounted() {
      this.fetchTrustedPartiesStatus();
    },
    methods: {
      fetchTrustedPartiesStatus() {
        this.loading = true;
        const broadcastServer = process.env.BROADCAST_URL; 
        const url = `${broadcastServer}/trusted-parties/status`;
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
            this.loading = false;
            this.trustedParties = result;
        });
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

  .v-card__text .styled-table{
    color: var(--v-on-surface-variant-base);
  }

  .v-card__title {
    color: var(--v-secondary-base)
  }
  
  </style>
  