<template>
  <div class="home">
        <b-row cols="3">
          <b-col cols="1">
            <div>
              <b-button-group vertical>
                <b-button size="sm" 
                  variant="outline-info" 
                  :disabled="selected_ats.length == 0"
                  @click="toConnectOnt"
                  >Подключение ONT
                </b-button>
                <b-button size="sm" 
                  variant="outline-info"
                  :disabled="selected_ats.length == 0"
                  @click="toFindByUser"
                  >Поиск инф. по лиц.счету</b-button>
              </b-button-group>
            </div>
          </b-col>
          <b-col cols="9">
            <b-row cols="4">
              <b-col v-for="data in atss" :key="data.name" 
                @click="toSelected(data.name)" 
                >
                <ATS 
                    :class="selected_ats.includes(data.name) ? 'ats-selected' : 'ats'" 
                    :name="data.name" 
                    :olts="data.olts" 
                    :location="data.location"
                />
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="2">
            <div>
              <b-button-group vertical>
                <b-button @click="select_all" variant="info" size="sm">Select All</b-button>
              </b-button-group>
            </div>
          
          </b-col>
        </b-row>
 
  </div>
</template>

<script>
import ATS from '../components/ATS.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    ATS
  },
  data: function() {
    return {
      atss:[],
      selected_ats: []
    }
  },
  created() {
    const server_ip = this.$store.getters.SERVER_API
    axios.get(`${server_ip}/ats`).then( res => {
      this.atss = res.data
    })
  },
  methods: {
    select_all(){
      this.selected_ats = this.atss.map( ats => ats.name )
    },
    toSelected(name){
       const index = this.selected_ats.indexOf(name)
       index !== -1 ? this.selected_ats.splice(index, 1) : this.selected_ats.push(name)
    },
    toConnectOnt(){
       const ips = []
       this.selected_ats.forEach( el => {
         const atss = this.atss.filter( ats => {
            return ats.name === el
         })
         if (atss){
           const ats = atss[0]
           ats.olts.map( olt => {
             ips.push(olt.ip)
           })
         }
       })       
       this.$router.push({ name: 'find-ont', params: { ips : ips  } })
    },
    toFindByUser(){
       const ips = []
       this.selected_ats.forEach( el => {
         const atss = this.atss.filter( ats => {
            return ats.name === el
         })
         if (atss){
           const ats = atss[0]
           ats.olts.map( olt => {
             ips.push(olt.ip)
           })
         }
       })       
       this.$router.push({ name: 'find-by-user', params: { ips : ips  } })
    },

  }

}
</script>
<style scoped>
  .home{
    margin-top: 1%;
  }
  .ats:hover{
    background-color: rgba(59, 242, 74, 0.761);
  }
  .ats-selected{
    background-color: rgba(59, 242, 74, 0.761);
  }
</style>