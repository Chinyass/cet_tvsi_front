<template>
    <div class="find-ont">
        <div class="tagcontainer">
            <div v-for="ip in ips" :key="ip" class="tagip">
                {{ip}}
            </div>
        </div>
        <b-container>
            <b-input-group prepend="Serial" size="sm" class="w-50">
                <b-form-input v-model="serial"></b-form-input>
                <b-input-group-append>
                    <b-button 
                        variant="outline-info" 
                        @click="find" 
                        :disabled="loading"
                        >Найти</b-button>
                </b-input-group-append>
            </b-input-group>
            <br>
            <Spinner v-if="loading" />
            <div v-if="!loading">
                <p v-for="error in errors" :key="error" style="color: red">{{error.ip}} {{error.error}}</p>
            </div>
            <ONTINFO v-if="!loading && ont_info.correct" 
                :items_ont="ont_info.items_ont"
                :items_acs="ont_info.items_acs"
                :items_voip="ont_info.items_voip"
            />
        </b-container>
    </div>
</template>

<script>
import axios from 'axios'
import Spinner from '../components/spinner.vue'
import ONTINFO from '../components/ONTINFO.vue'

export default {
    props: {
        ips: []
    },
    components:{
        Spinner,
        ONTINFO
    },
    data: () => {
        return {
            serial : 'ELTX',
            loading: false,
            ont_info : {
                items_ont: [],
                items_acs: [],
                items_voip: [],
                correct : false
            },
            errors : []
        }
    },
    methods: {
        find() {
            if (!this.ips){
                this.$router.push({ name: 'Home'})
            }
            this.loading = true
            this.ont_info.items_ont = []
            this.ont_info.items_acs = []
            this.ont_info.items_voip = []
            const serial = this.serial.trim()
            const server_ip = this.$store.getters.SERVER_API
            const ips = this.ips
            axios.post(`${server_ip}/find_ont`,{
                serial,
                ips
            }).then( res => {
                const res_data = res.data
                console.log(res_data)
                res_data.forEach(data => {
                    if (!data['error']){
                        this.ont_info.items_ont = [{
                            'ip olt' : data.ip,
                            serial : data.SERIAL,
                            'Port/Id' : `${data.PORT}/${data.ID}`,
                            'RX' : data.OPTICAL_RX,
                            'TX' : data.OPTICAL_TX,
                            'MODEL': data.MODEL,
                            'FIRMWARE' : data.FIRMWARE,
                            'TEMPLATE' : data.TEMPLATE
                        }]
                        
                        this.ont_info.items_acs = [{
                            user : data.USER,
                            login : data.LOGIN,
                            password : data.PASSWORD,
                            profile : data.PROFILE,   
                        }]

                        if(data.VOIP_ENABLE || data.VOIP_NUMBER || data.VOIP_PASSWORD)
                            this.ont_info.items_voip = [{
                                'voip enable': data.VOIP_ENABLE,
                                'voip number' : data.VOIP_NUMBER,
                                'voip password' : data.VOIP_PASSWORD,
                            }]

                        this.ont_info.correct = true
                    }
                    else{
                        this.errors.push(data)
                    }
                });
            
                console.log(this.ont_info)
                this.loading = false
            })
        }
    }
}
</script>
<style scoped>
 .find-ont{
     font-size: 12px;
 }
 .tagcontainer{
     display: flex;
     align-content: space-around;
 }
 .tagip{
     border: 1px solid rgb(106, 7, 7);
     border-radius: 10%;
     margin-left: 6px;
     background-color: rgba(53, 220, 232, 0.659);
     color:rgb(9, 48, 208);
     font-family: 'Courier New', Courier, monospace;
 }
</style>