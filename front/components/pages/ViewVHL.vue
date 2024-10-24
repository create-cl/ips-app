<template>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="10">
        <v-card elevation="0" class="pa-4 d-flex flex-column align-center surface mt-5">
          <v-card-text>
            <q-r-input @qr-code-parsed="handleQRCodeParsed"></q-r-input>
          </v-card-text>
          <v-card-text>
            <v-text-field
              v-model="password"
              :label="$t('vhl.view.passcode_label')"
              class="pl-2"
              outlined
              type="password"
            ></v-text-field>
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
          <v-card-text v-if="this.ips">
            <v-alert type="success">{{ $t('vhl.view.valid_link') }}</v-alert>
            <v-card-title>
              {{ this.name }} - {{ this.identifier }} - {{ this.country }}
            </v-card-title>
            <v-textarea v-model="this.ips"
            outlined
            rows="10">
            </v-textarea>
            <v-card-actions class="d-flex justify-center">
              <v-btn
              color="primary"
              class="on-primary--text"
              rounded
              width="10rem"
              @click="viewIPS"
              >
              {{ $t('vhl.view.view_ips_button') }}
              </v-btn>
            </v-card-actions>
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
        name: "ViewVHL",
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
              query: { url: "http://lacpass.create.cl:8182/v2/vshcValidation" }
            }; 
            const body = {
              "qrCodeContent": this.qrCode
            }
            this.$service("api/proxy-ips").create(body, params)
            .then(async response => {
              const res = JSON.parse(response);
              if(res.shLinkContent){
                this.retrieveContent(res.shLinkContent.url);
              }
              else{
                this.error = this.$t('vhl.view.invalid_qr')
                this.loading = false;
              }
            })
            .catch(error => {
              console.error('Error en el proxy:', error);
              this.loading = false;
            })
          },
          retrieveContent(shLinkContentUrl){
              const params = {
                query: { url: shLinkContentUrl}
              };
              const body = {
                "recipient": process.env.VHL_RECIPIENT_NAME,
                "passcode": this.password
              };
              this.$service("api/proxy-ips").create(body, params)
              .then(async response => {
                const res = JSON.parse(response)
                const ipsUrl = res.files[0].location;
                fetch(`/api/proxy-ips?url=${ipsUrl}`)
                .then((response) => {
                  if(response.status == 200) {
                    return response.json()
                  }
                  else {
                    this.$toast("Error al cargar el IPS");
                    throw new Error("Not status");
                  }
                })
                .then((result) => {
                  for (let res of result.entry){
                    if(res.resource.resourceType == "Patient"){
                      let resource = res.resource;
                      let name = resource.name[0].given[0];
                      let lastName = resource.name[0].family;
                      let country = resource.address ? resource.address[0].country : null;
                      let identifier = resource.identifier ? resource.identifier[0].value : null;
                      this.name = name + ", " + lastName;
                      this.country = country ? country : "";
                      this.identifier = identifier ? identifier : "";
                    }
                  }
                  this.ips = JSON.stringify(result);
                  this.loading = false;
                })
                .catch((error) => {
                  console.error("Error: ", error),
                  this.loading = false;
                })
              })
              .catch((error) => {
                console.error("Error: ", error);
                this.error = "Clave incorrecta"
                this.loading = false;
              })
            },
          viewIPS(){
            this.$emit('view-document', JSON.parse(this.ips));
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
</style>