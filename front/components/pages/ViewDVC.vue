<template>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="10">
        <v-card elevation="0" class="pa-4 d-flex flex-column align-center surface mt-5">
          <v-card-text>
            <q-r-input @qr-code-parsed="handleQRCodeParsed"></q-r-input>
          </v-card-text>
          <v-card-actions>
            <v-btn 
            :loading="loading"
            color="primary"
            class="on-primary--text"
            :disabled="!img"
            @click="verifyQR"
            rounded 
            width="10rem"
            >{{ $t('vhl.view.verify_button') }}
            </v-btn>
          </v-card-actions>
          <v-card-text v-if="this.valid">
            <v-alert type="success">{{ $t('dvc.view.valid_link') }}</v-alert>
            <v-card-text style="border: 1px solid var(--v-outline-variant-base); border-radius: 1rem; margin-bottom: 3%;">
              <v-card-title>
                {{ this.name }}
              </v-card-title>
              <v-card-subtitle>
                {{ this.vaccineCode }} - {{  this.status }}
              </v-card-subtitle>
            </v-card-text>
            <v-textarea v-model="this.ips"
            outlined
            rows="10">
            </v-textarea>
          </v-card-text>
          <v-card-text v-if="this.error">
            <v-alert type="warning"> {{ this.error }}</v-alert>
          </v-card-text>
          
        </v-card>
      </v-col>
    </v-row>
  </template>
<script>
import QRInput from '../utils/QRInput'
export default {
        components: {QRInput},
        name: "ViewDVC",
        data(){
            return{
            loading: false,
            results: [],
            searched: false,
            img: false,
            qrCode: "",
            password: "",
            ips: "",
            name: "",
            identifier: "",
            country: "",
            error: "",
            name: "",
            vaccineCode: "",
            status: "",
            valid: false

          };
          },
      mounted() {
      },
      methods: {
          handleQRCodeParsed(data){
              if (data){
                  this.qrCode = data.data;
                  this.img = true;
              }
          },
          verifyQR(){
            this.error= "";
            this.ips = "";
            this.loading = true;
            this.qrCode = this.qrCode.replace(/:\s/, ":");
            const params = {
              query: { url: "http://gdhcn-validator.vitorpamplona.com/verify" }
            }; 
            const body = {
              "uri": this.qrCode
            }
            this.$service("api/proxy-ips").create(body, params)
            .then(async response => {
              const res = JSON.parse(response);
              if (res.status == 'VERIFIED'){
                this.valid = true;
                const ans  = JSON.parse(res.contents);
                this.ips = res.contents;
                for (let entry of ans.entry){
                  if (entry.resource.resourceType == "Patient"){
                    this.name = entry.resource.name[0].text;
                  } else if(entry.resource.resourceType == "Immunization"){
                    this.vaccineCode = entry.resource.vaccineCode.coding[0].code;
                    this.status = entry.resource.status;
                  }
                }
              }
              else {
                this.valid = false;
                this.error = this.$t('vhl.view.invalid_qr')
              }
              this.loading = false;
            })
            .catch(error => {
              console.error('Error en el proxy:', error);
              this.valid = false;
              this.error = this.$t('vhl.view.invalid_qr')
              this.loading = false;
            })
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
</style>