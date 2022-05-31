<template>
  <div class="home">
      <b-container>
        <b-row align-v="stretch">
          <b-col v-for="data in atss" :key="data.name">
            <ATS :name="data.name" :olts="data.olts" />
          </b-col>
        </b-row>
      </b-container>
  </div>
</template>

<script>
import ATS from '../components/ATS.vue'

export default {
  name: 'Home',
  components: {
    ATS
  },
  data: function() {
    return {
      atss:[
        {
          name:'ATC-3',
          location: 'центр',
          address: 'ул.Дружбы 156',
          olts: [
            {
              ip:'10.3.0.26',
              model: 'LTP 8x',
              firmware: '4.2.1'
            }
          ]
        },
        {
          name:'ATC-6',
          location: 'башня',
          address: 'ул.кочетова 156',
          olts: [
            {
              ip:'10.6.0.3',
              model: 'LTP 4x',
              firmware: '4.2.3'
            }
          ]
        },
        {
          name:'ATC-2',
          location: 'башня',
          address: 'ул.кочетова 156',
          olts: [
            {
              ip:'10.6.0.3',
              model: 'LTP 4x',
              firmware: '4.2.3'
            }
          ]
        },
        {
          name:'ATC-66',
          location: 'башня',
          address: 'ул.кочетова 156',
          olts: [
            {
              ip:'10.6.0.3',
              model: 'LTP 4x',
              firmware: '4.2.3'
            }
          ]
        },
        {
          name:'ATC-9',
          location: 'башня',
          address: 'ул.кочетова 156',
          olts: [
            {
              ip:'10.6.0.3',
              model: 'LTP 4x',
              firmware: '4.2.3'
            }
          ]
        },
        {
          name:'ATC-10',
          location: 'башня',
          address: 'ул.кочетова 156',
          olts: [
            {
              ip:'10.6.0.3',
              model: 'LTP 4x',
              firmware: '4.2.3'
            }
          ]
        },
        {
          name:'ATC-11',
          location: 'башня',
          address: 'ул.кочетова 156',
          olts: [
            {
              ip:'10.6.0.3',
              model: 'LTP 4x',
              firmware: '4.2.3'
            }
          ]
        },
        {
          name:'ATC-12',
          location: 'башня',
          address: 'ул.кочетова 156',
          olts: [
            {
              ip:'10.6.0.3',
              model: 'LTP 4x',
              firmware: '4.2.3'
            }
          ]
        }
      ]
    }
  },

}
</script>
<style scoped>
  
</style>