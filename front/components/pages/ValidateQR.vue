<template>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="2" class="pa-4 d-flex flex-column align-center secondary mt-5">
          <v-card-text>
            <v-card-title>Verificar DDCC</v-card-title>
          </v-card-text>
          <v-card-text>
            <q-r-input @qr-code-parsed="handleQRCodeParsed"></q-r-input>
          </v-card-text>
          <v-card-actions>
            <v-btn 
            :loading="loading"
            color="primary"
            class="on-primary--text"
            :disabled="!img"
            >Verificar
            </v-btn>
          </v-card-actions>
          <v-card-text v-if="results.length > 0">
            <v-card-subtitle>
            El certificado es válido
            </v-card-subtitle>
          </v-card-text>
          <v-card-text v-else-if="searched && results.length === 0">
            <v-card-subtitle>
            No se encontraron resultados
            </v-card-subtitle>
          </v-card-text>
          <v-card-text v-if="results.length > 0">
            <v-simple-table
            class="styled-table">
              <thead class="primary ">
                <tr>
                  <th>Atributo</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, index) in results"
                  :key="item.name"
                  :class="{'row-even': index % 2 === 0, 'row-odd': index % 2 !== 0}">
                  <td>{{ item.id }}</td> 
                  <td>{{ item.type }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </template>
<script>
import QRInput from '../utils/QRInput'
export default {
        components: {QRInput},
        name: "ValidateQR",
        data(){
            return{
            loading: false,
            results: [],
            searched: false,
            img: false,
            qrCode: ""
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