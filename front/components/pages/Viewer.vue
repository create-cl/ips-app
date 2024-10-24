<template class="ma-0">
  <v-container class="pa-0">
    <v-row class="ma-1 px-3 py-2">
      <v-col cols="12" class="pa-0 ma-0">
        <v-card class="mb-1 px-4 py-2 surface-container info-card" elevation="0">
          <v-row class="pa-0 ma-0">
            <v-card-title class="ma-0 pa-2 justify-center">
              {{ patient.name }}, {{ patient.lastName }}
            </v-card-title>
          </v-row>
          <v-row class="ma-0 pa-0">
            <v-card-text class="ma-0 pa-2">
              <v-row class="pa-2">
                {{ $t('ipsviewer.patient.birthdate') }}: {{ patient.birthDate }} ({{ patient.yearsOld }} {{
                  $t('ipsviewer.patient.years_old') }})
              </v-row>
            </v-card-text>
          </v-row>
          <v-row class="ma-0 pa-0">
            <v-card-text class="ma-0 pa-2">
              <v-row class="pa-2">
                {{ $t('ipsviewer.domain') }}: {{ composition.organizationAddress }}
              </v-row>
            </v-card-text>
          </v-row>
          <v-row class="ma-0 pa-0">
            <v-card-text class="ma-0 pa-2">
              <v-row class="pa-2 justify-end text-caption text--secondary">
                {{ $t('ipsviewer.summary_date') }}: {{ composition.date }}
              </v-row>
            </v-card-text>
          </v-row>
          <v-row class="ma-0 pa-0">
            <v-card-text class="ma-0 pa-2">
              <v-row class="pa-2 justify-end text-caption text--secondary">
                {{ $t('ipsviewer.author.title') }}: {{ author.name }}, {{ $t('ipsviewer.custodian.title') }}:
                {{ custodian.name }}
              </v-row>
            </v-card-text>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="ma-1">
      <v-col cols="12" class="ma-0">
        <v-card elevation="0" class="surface-container info-card">
          <v-card-title>
            <v-icon class="mr-2">mdi-allergy</v-icon>
            {{ $t('ipsviewer.sections.allergies') }}
            <v-spacer></v-spacer>
            <v-scale-transition>
              <v-btn @click="allergiesDetails = true" v-if="!allergiesDetails">
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
              <v-btn @click="allergiesDetails = false" v-else>
                <v-icon>mdi-chevron-up</v-icon>
              </v-btn>
            </v-scale-transition>
          </v-card-title>
          <v-card-text v-if="allergiesDetails">
            <v-list subheader two-line class="surface-container">
              <v-list-item v-for="allergy in allergies" :key="allergy.name">
                <v-list-item-content>
                  <v-list-item-title> {{ allergy.name }} ({{ allergy.code }}) </v-list-item-title>
                  <v-list-item-subtitle>{{ allergy.type }} - {{ $t('ipsviewer.criticality') }}:
                    {{ allergy.criticality }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="ma-1">
      <v-col cols="12">
        <v-card elevation="0" class="surface-container info-card">
          <v-card-title>
            <v-icon class="mr-2">mdi-bacteria</v-icon>
            {{ $t('ipsviewer.sections.active_conditions') }}
            <v-spacer></v-spacer>
            <v-scale-transition>
              <v-btn @click="conditionsDetails = true" v-if="!conditionsDetails">
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
              <v-btn @click="conditionsDetails = false" v-else>
                <v-icon>mdi-chevron-up</v-icon>
              </v-btn>
            </v-scale-transition>
          </v-card-title>
          <v-card-text v-if="conditionsDetails">
            <v-list subheader two-line class="surface-container">
              <v-list-item v-for="condition in conditions" :key="condition.name">
                <v-list-item-content>
                  <v-list-item-title> {{ condition.name }} ({{ condition.code }}) </v-list-item-title>
                  <v-list-item-subtitle>{{ condition.year }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="ma-1">
      <v-col cols="12">
        <v-card elevation="0" class="surface-container info-card">
          <v-card-title>
            <v-icon class="mr-2">mdi-bacteria</v-icon>
            {{ $t('ipsviewer.sections.past_conditions') }}
            <v-spacer></v-spacer>
            <v-scale-transition>
              <v-btn @click="pastConditionsDetails = true" v-if="!pastConditionsDetails">
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
              <v-btn @click="pastConditionsDetails = false" v-else>
                <v-icon>mdi-chevron-up</v-icon>
              </v-btn>
            </v-scale-transition>
          </v-card-title>
          <v-card-text v-if="pastConditionsDetails">
            <v-list subheader two-line class="surface-container">
              <v-list-item v-for="pastCondition in pastConditions" :key="pastCondition.name">
                <v-list-item-content>
                  <v-list-item-title>{{ pastCondition.year }}: {{ pastCondition.name }}
                    ({{ pastCondition.code }})</v-list-item-title>
                  <v-list-item-subtitle>{{ pastCondition.explanation }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="ma-1">
      <v-col cols="12">
        <v-card elevation="0" class="surface-container info-card">
          <v-card-title>
            <v-icon class="mr-2">mdi-pill</v-icon>
            {{ $t('ipsviewer.sections.medications') }}
            <v-spacer></v-spacer>
            <v-scale-transition>
              <v-btn @click="medicationsDetails = true" v-if="!medicationsDetails">
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
              <v-btn @click="medicationsDetails = false" v-else>
                <v-icon>mdi-chevron-up</v-icon>
              </v-btn>
            </v-scale-transition>
          </v-card-title>
          <v-card-text v-if="medicationsDetails">
            <v-list subheader two-line class="surface-container">
              <v-list-item v-for="medication in medications" :key="medication.name">
                <v-list-item-content>
                  <v-list-item-title> {{ medication.name }} ({{ medication.code }}) </v-list-item-title>
                  <v-data-table v-if="medication.dosage != false" dense :headers="dosageHeaders"
                    :items="medication.dosage" item-key="unit" class="elevation-0 surface-container"></v-data-table>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="ma-1">
      <v-col cols="12">
        <v-card elevation="0" class="surface-container info-card">
          <v-card-title>
            <v-icon class="mr-2">mdi-needle</v-icon>
            {{ $t('ipsviewer.sections.immunizations') }}
            <v-spacer></v-spacer>
            <v-scale-transition>
              <v-btn @click="immunizationsDetails = true" v-if="!immunizationsDetails">
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
              <v-btn @click="immunizationsDetails = false" v-else>
                <v-icon>mdi-chevron-up</v-icon>
              </v-btn>
            </v-scale-transition>
          </v-card-title>
          <v-card-text v-if="immunizationsDetails">
            <v-list subheader two-line class="surface-container">
              <v-list-item v-for="immunization in immunizations" :key="immunization.id">
                <v-list-item-content>
                  <v-list-item-title v-if="isDoseQuantityUndefined(immunization.doseQuantity)">
                    {{ immunization.vaccineCode }}, {{ immunization.doseQuantity }} - ({{ immunization.status }})
                  </v-list-item-title>
                  <v-list-item-title v-else> {{ immunization.vaccineCode }} - ({{ immunization.status }})
                  </v-list-item-title>
                  <v-list-item-subtitle> {{ $t('ipsviewer.date') }}: {{ immunization.date }} - {{
                    $t('ipsviewer.route') }}: {{ immunization.route }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="ma-1">
      <v-col cols="12">
        <v-card elevation="0" class="surface-container info-card">
          <v-card-title>
            <v-icon class="mr-2">mdi-clipboard-search-outline</v-icon>
            {{ $t('ipsviewer.sections.observations') }}
            <v-spacer></v-spacer>
            <v-scale-transition>
              <v-btn @click="observationsDetails = true" v-if="!observationsDetails">
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
              <v-btn @click="observationsDetails = false" v-else>
                <v-icon>mdi-chevron-up</v-icon>
              </v-btn>
            </v-scale-transition>
          </v-card-title>
          <v-card-text v-if="observationsDetails">
            <v-data-table :headers="observationHeaders" :items="observations" :items-per-page="10"
              class="elevation-1"></v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getStore } from "../../services/store.service";
import * as dayjs from 'dayjs';
export default {
  name: "Viewer",
  data() {
    return {
      patient: {
        name: undefined,
        lastName: undefined,
        gender: undefined,
        birthDate: undefined,
        yearsOld: undefined,
        country: undefined,
      },
      author: {
        name: undefined,
        id: undefined,
        address: undefined
      },
      custodian: {
        name: undefined,
        address: undefined
      },
      composition: {},
      allergies: [],
      allergiesDetails: true,
      allergyLevels: {
        'low': 'bajo',
        'high': 'alto',
        'unable-to-assess': 'incapaz de evaluar',
        'undefined': 'undefined'
      },
      conditions: [],
      conditionsDetails: true,
      pastConditions: [],
      pastConditionsDetails: true,
      conditionsStatus: {
        'active': 'activo',
        'remission': 'remisión',
        'recurrence': 'recurrencia',
        'relapse': 'recaída',
        'inactive': 'inactivo',
        'resolved': 'resuelto',
        'undefined': 'undefined'
      },
      conditionsSeverity: {
        'severe': 'severo',
        'moderate': 'moderado',
        'mild': 'leve',
        'undefined': 'undefined'
      },
      medications: [],
      dosages: {},
      medicationsDetails: true,
      immunizations: [],
      immunizationsDetails: true,
      observations: [],
      observationsDetails: true,
      observationHeaders: [
        {
          text: 'Nombre',
          align: 'start',
          sorteable: false,
          value: 'name',
        },
        { text: 'Fecha', value: 'date' },
        { text: 'Valor', value: 'value' },
        { text: 'Categoría', value: 'category' }
      ],
      dosageHeaders: [
        {
          //text: 'Vía de administración',
          align: 'start',
          sorteable: false,
          //value: 'route'
        },
        { text: 'Vía de administración', value: 'route' },
        { text: 'Cantidad', value: 'count' },
        { text: 'Unidad', value: 'unit' },
        { text: 'Frecuencia cantidad', value: 'doseQuantity' },
        { text: 'Frecuencia período', value: 'periodUnit' },
      ],
    }
  },
  watch: {
    '$i18n.locale': function (newLocale) {
      this.refreshData();
    }
  },
  created() {
    this.updateValuesLang();
  },
  mounted() {
    this.refreshData();
  },
  methods: {
    updateValuesLang() {
      this.allergyLevels = {
        'low': this.$t('ipsviewer.allergy_levels.low'),
        'high': this.$t('ipsviewer.allergy_levels.high'),
        'unable-to-assess': this.$t('ipsviewer.allergy_levels.unable-to-assess'),
        'undefined': this.$t('ipsviewer.allergy_levels.undefined')
      };
      this.conditionsStatus = {
        'active': this.$t('ipsviewer.conditions_status.active'),
        'remission': this.$t('ipsviewer.conditions_status.remission'),
        'recurrence': this.$t('ipsviewer.conditions_status.recurrence'),
        'relapse': this.$t('ipsviewer.conditions_status.relapse'),
        'inactive': this.$t('ipsviewer.conditions_status.inactive'),
        'resolved': this.$t('ipsviewer.conditions_status.resolved'),
        'undefined': this.$t('ipsviewer.conditions_status.undefined')
      };
      this.conditionsSeverity = {
        'severe': this.$t('ipsviewer.conditions_severity.severe'),
        'moderate': this.$t('ipsviewer.conditions_severity.moderate'),
        'mild': this.$t('ipsviewer.conditions_severity.mild'),
        'undefined': this.$t('ipsviewer.conditions_severity.undefined')
      };
      this.observationHeaders = [
        {
          text: this.$t('ipsviewer.observation_headers.name'),
          align: 'start',
          sorteable: false,
          value: 'name',
        },
        { text: this.$t('ipsviewer.observation_headers.date'), value: 'date' },
        { text: this.$t('ipsviewer.observation_headers.value'), value: 'value' },
        { text: this.$t('ipsviewer.observation_headers.category'), value: 'category' }
      ];
      this.dosageHeaders = [
        {
          //text: 'Vía de administración',
          align: 'start',
          sorteable: false,
          //value: 'route'
        },
        { text: this.$t('ipsviewer.dosage_headers.route'), value: 'route' },
        { text: this.$t('ipsviewer.dosage_headers.count'), value: 'count' },
        { text: this.$t('ipsviewer.dosage_headers.unit'), value: 'unit' },
        { text: this.$t('ipsviewer.dosage_headers.dose_quantity'), value: 'doseQuantity' },
        { text: this.$t('ipsviewer.dosage_headers.period_unit'), value: 'periodUnit' },
      ];
    },
    refreshData() {
      this.updateValuesLang();
      this.allergies = [];
      this.conditions = [];
      this.pastConditions = [];
      this.medications = [];
      this.immunizations = [];
      this.observations = [];
      this.getComposition();
      this.getPatient();
      this.getAllergies();
      this.getConditions();
      this.getDosages();
      this.getMedications();
      this.getImmunizations();
      this.getObservations();
    },
    parser() {
      this.IPSvalidated = getStore("ips");
      this.getComposition();
      this.getPatient();
      this.getAllergies();
      this.getConditions();
      this.getDosages();
      this.getMedications();
      this.getImmunizations();
      this.getObservations();
    },
    getComposition() {
      let address = this.$t('ipsviewer.undefined');
      for (let obj of this.IPSvalidated.entry) {
        if (obj.resource.resourceType == 'Composition') {
          let resource = obj.resource;
          let date = this.$t('ipsviewer.undefined');
          let title = this.$t('ipsviewer.undefined');
          let authorReference = resource.author[0].reference;
          let custodianReference = resource.custodian.reference;
          let author = this.getAuthor(authorReference);
          let custodian = this.getCustodian(custodianReference);
          try {
            date = resource.date;
          }
          catch (e) { }
          try {
            title = resource.title;
          }
          catch (e) { }
          this.composition = {
            date: date,
            title: title,
          }
        }
        if (obj.resource.resourceType == 'Organization' && address == this.$t('ipsviewer.undefined')) {
          let resource = obj.resource;
          try {
            let city = resource.address[0].city ? resource.address[0].city : "";
            let country = resource.address[0].country;
            address = city + ' ' + country;
          }
          catch (e) { }
          this.composition.organizationAddress = address;
        }
      }
    },
    getPatient() {
      for (let obj of this.IPSvalidated.entry) {
        if (obj.resource.resourceType == 'Patient') {
          let resource = obj.resource;
          let name = resource.name[0].given[0];
          let lastName = resource.name[0].family;
          let gender = resource.gender;
          let birthDate = resource.birthDate;
          let yearsOld = dayjs().diff(birthDate, 'year');
          let country = resource.address ? resource.address[0].country : null;
          let patient = {
            name: name,
            lastName: lastName,
            gender: gender,
            birthDate: birthDate,
            yearsOld: yearsOld,
            country: country,
          }
          this.patient = patient;
        }
      }

    },
    getAllergies() {
      for (let obj of this.IPSvalidated.entry) {
        if (obj.resource.resourceType == 'AllergyIntolerance') {
          let resource = obj.resource;
          let type = resource.type || 'undefined';
          let category = resource.category ? resource.category[0] : this.$t('ipsviewer.undefined');
          let criticality = resource.criticality || 'undefined';
          let name = resource.code.coding[0].display;
          let code = resource.code.coding[0].code;

          if (type == 'allergy') {
            type = this.$t('ipsviewer.allergy_types.allergy')
          }
          else if (type == 'intolerance'){
            if (type.length > 13) {
              let underlyingMechanism = type.substring(11);
              type = this.$t('ipsviewer.allergy_types.intolerance') + underlyingMechanism
            }
            else {
              type = this.$t('ipsviewer.allergy_types.intolerance')
            }
          }
          criticality = this.allergyLevels[criticality]
          let allergy = {
            type: type,
            category: category,
            criticality: criticality,
            name: name,
            code: code
          }
          this.allergies.push(allergy);
        }
      }
    },
    getConditions() {
      for (let obj of this.IPSvalidated.entry) {
        if (obj.resource.resourceType == 'Condition') {
          let resource = obj.resource;
          let name = resource.code.coding[0].display;
          let code = resource.code.coding[0].code;
          let status = (resource.clinicalStatus && resource.clinicalStatus.coding[0] && resource.clinicalStatus.coding[0].code) || 'undefined'; //active, remission, recurrence, relapse, inactive, resolved
          //let category = resource.category[0].coding[0].display; //'Problem'
          let severity = (resource.severity && resource.severity.coding[0] && resource.severity.coding[0].display) || 'undefined'; //severe, moderate, mild
          let year = resource.onsetDateTime || this.$t('ipsviewer.undefined');
          let explanation = this.$t('ipsviewer.undefined');


          try {
            explanation = resource.code.coding[0].extension[0].extension[1].valueString;
          }
          catch (e) { }

          status = this.conditionsStatus[status];
          severity = this.conditionsSeverity[severity];
          let condition = {
            name: name,
            code: code,
            status: status,
            severity: severity,
            year: year,
            explanation: explanation
          }
          if (status == this.$t('ipsviewer.conditions_status.active')) {
            this.conditions.push(condition);
          }
          else {
            this.pastConditions.push(condition);
          }
        }
      }
    },
    getMedications() {
      for (let obj of this.IPSvalidated.entry) {
        if (obj.resource.resourceType == 'Medication') {
          let resource = obj.resource;
          let medication = {}
          let id = resource.id;
          let dosage = false;
          for (let med of resource.code.coding) {
            let name = med.display;
            let code = med.code;
            medication = {
              name: name,
              code: code,
              dosage: dosage,
            }
            this.medications.push(medication);
          }
          if (id in this.dosages) {
            //cambiamos el valor de dosage a true en el ultimo med agregado
            medication.dosage = [this.dosages[id]];
            this.medications[this.medications.length - 1] = medication;
          }

        }
      }
    },
    getDosages() {
      for (let obj of this.IPSvalidated.entry) {
        if (obj.resource.resourceType == 'MedicationStatement') {
          let resource = obj.resource;
          let medicationReference = resource.medicationReference.reference;
          const re = /(http.*\/)/;
          medicationReference = medicationReference.replace(re, "");
          try {
            let count = resource.dosage[0].timing.repeat.count;
            let periodUnit = resource.dosage[0].timing.repeat.periodUnit;
            let route = resource.dosage[0].route.coding[0].display;
            let doseQuantity = resource.dosage[0].doseAndRate[0].doseQuantity.value;
            let unit = resource.dosage[0].doseAndRate[0].doseQuantity.unit;
            let dosage = {
              count: count,
              periodUnit: periodUnit,
              route: route,
              doseQuantity: doseQuantity,
              unit: unit,
            }
            this.dosages[medicationReference] = dosage;
          }
          catch (e) {
          }
        }
      }
    },
    getObservations() {
      for (let obj of this.IPSvalidated.entry) {
        if (obj.resource.resourceType == 'Observation') {
          let resource = obj.resource;
          let name = this.$t('ipsviewer.undefined')
          let date = this.$t('ipsviewer.undefined')
          let value = this.$t('ipsviewer.undefined')
          let category = this.$t('ipsviewer.undefined')
          let code = ''
          try {
            name = resource.code.coding[0].display;
          }
          catch (e) { }
          try {
            date = resource.effectiveDateTime;
          }
          catch (e) { }
          try {
            value = resource.valueCodeableConcept.coding[0].display;
          }
          catch (e) { }
          try {
            category = resource.category[0].coding[0].code;
          }
          catch (e) { }
          try {
            code = resource.code.coding[0].code;
          }
          catch (e) {
            try {
              code = resource.code.text;
            }
            catch (e) { }
          }
          let observation = {
            name: name + ' (' + code + ')',
            category: category,
            date: date,
            value: value,
            code: code,
          }
          this.observations.push(observation);

        }
      }
    },
    getImmunizations() {
      for (let obj of this.IPSvalidated.entry) {
        if (obj.resource.resourceType == 'Immunization') {
          let resource = obj.resource;
          let id = 0;
          let status = this.$t('ipsviewer.undefined');
          let vaccineCode = this.$t('ipsviewer.undefined');
          let date = this.$t('ipsviewer.undefined');
          let route = this.$t('ipsviewer.undefined');
          let doseQuantity = this.$t('ipsviewer.undefined');
          try {
            id = resource.id;
          }
          catch (e) { }
          try {
            status = resource.status;
          }
          catch (e) { }
          try {
            vaccineCode = resource.vaccineCode.coding[0].code;
          }
          catch (e) { }
          try {
            let display = resource.vaccineCode.coding[0].display;
            if (display != undefined) {
              vaccineCode = vaccineCode + ' ' + display;
            }
          }
          catch (e) { }
          try {
            date = resource.occurrenceDateTime;
          }
          catch (e) { }
          try {
            route = resource.route.coding[0].display;
          }
          catch (e) { }
          try {
            doseQuantity = resource.doseQuantity.value + " " + resource.doseQuantity.code;
          }
          catch (e) { }
          let immunization = {
            id: id,
            status: status,
            vaccineCode: vaccineCode,
            date: date,
            route: route,
            doseQuantity: doseQuantity,
          };
          this.immunizations.push(immunization);
        }
      }
    },
    getAuthor(ref) {
      for (let obj of this.IPSvalidated.entry) {
        if (obj.fullUrl == ref) {
          if (obj.resource.resourceType == "Practitioner") {
            let name = (obj.resource.name && obj.resource.name[0] && obj.resource.name[0].given[0]) || "";
            let lastName = (obj.resource.name && obj.resource.name[0] && obj.resource.name[0].family) || "";
            let identifier = (obj.resource.identifier && obj.resource.identifier[0] && obj.resource.identifier[0].value) || "";
            let city = (obj.resource.address && obj.resource.address[0] && obj.resource.address[0].city) || "";
            let country = (obj.resource.address && obj.resource.address[0] && obj.resource.address[0].country) || "";
            let address = city && country ? `${city}, ${country}` : city || country;
            let author = {
              name: name + ' ' + lastName,
              id: identifier,
              address: address
            }
            this.author = author;
          } else if (obj.resource.resourceType == "PractitionerRole") {
            if (obj.resource.practitioner.reference) {
              this.getAuthor(obj.resource.practitioner.reference);

            }
          }
        }
      }
      return ref

    },
    getCustodian(ref) {
      for (let obj of this.IPSvalidated.entry) {
        if (obj.fullUrl == ref && obj.resource.resourceType == 'Organization') {
          let name = obj.resource.name;
          let city = obj.resource.address.city || '';
          let country = obj.resource.address.country || '';
          let address = city && country ? `${city}, ${country}` : city || country;
          let custodian = {
            name: name,
            address: address
          }
          this.custodian = custodian;
        }
      }
      return ref
    },
    isDoseQuantityUndefined(doseQuantity) {
      return doseQuantity !== this.$t('ipsviewer.undefined');
    }
  },
  computed: {
    IPSvalidated: getStore("ips")
  }
}
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

.surface-container.info-card {
  border-radius: 8px !important;
  border: 1px solid grey !important;
}
</style>
