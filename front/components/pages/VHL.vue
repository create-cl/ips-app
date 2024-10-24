<template>
    <v-row class="ma-0 pa-4 remove-error surface d-flex justify-center">
        <v-tabs background-color="surface" slider-color="surface" color="primary" centered v-model="activeTab">
            <v-tab
                v-for="(tab, index) in tabs"
                :key="tab"
                :class="activeTab == index ? 'tab-selected' : 'tab-unselected'"
                >{{ tab }}
            </v-tab>
        </v-tabs>
        <v-container fluid class="min-height-100 pa-0 surface" v-show="activeTab === 0">
            <generate-v-h-l :server="server" :id="id"/>
        </v-container>
        <v-container fluid class="min-height-100 pa-0 surface" v-show="activeTab === 1">
            <view-v-h-l @view-document="handleViewDocument"/>
        </v-container>
    </v-row>
</template>
<script>
import ViewVHL from './ViewVHL.vue';
import GenerateVHL from './GenerateVHL.vue';

export default {
    components: {ViewVHL, GenerateVHL},
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
            activeTab: 0,
        };
    },
    computed: {
        tabs() {
        return [
            this.$t('vhl.tabs.generate'),
            this.$t('vhl.tabs.view')
        ];
        }
    },
    methods: {
        handleViewDocument(data){
            this.$emit('view-document', data);
        }
    }

}
</script>
<style>
.tab-selected {
    background-color: var(--v-primary-base) !important;
    color: var(--v-on-primary-base) !important;
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
    height: 70%;
    align-self: center;
}

.tab-unselected {
  color: var(--v-primary-base) !important;
}

</style>