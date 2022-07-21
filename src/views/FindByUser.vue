<template>
    <div class="FindByUser">
        <div class="tagcontainer">
            <div v-for="ip in ips" :key="ip" class="tagip">
                {{ip}}
            </div>
        </div>
        <b-container>
            <b-input-group prepend="User" size="sm" class="w-50">
                <b-form-input v-model="user"></b-form-input>
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
            <ONTINFO v-if="!loading" 
                :items_ont="ont_info.items_ont"
                :items_acs="ont_info.items_acs"
                :items_voip="ont_info.items_voip"
            />
            <SpeedGraph v-if="traffic_serial" :serial="traffic_serial" :ip="ip" />
        </b-container>
    </div>    
</template>

<script>
import axios from 'axios'
import ONTINFO from '../components/ONTINFO.vue'
import SpeedGraph from '../components/SpeedGraph.vue'
import Spinner from '../components/spinner.vue'

export default {
    name: 'FindByUser',
    props: {
        ips: []
    },
    components:{
        Spinner,
        ONTINFO,
        SpeedGraph
    },
    data : () => {
        return {
            ip : '',
            user : '',
            loading : false,
            traffic_serial: '',
            errors: [],
            ont_info : {
                items_ont: [],
                items_acs: [],
                items_voip: [],
            },
        }
    },
    beforeRouteLeave (to, from, next) {
        this.$socket.emit('disconnect-traffic')
        next()
    },
    methods: {
        find() {
            if (!this.ips){
                this.$router.push({ name: 'Home'})
            }
            const server_ip = this.$store.getters.SERVER_API
            const ips = this.ips

            axios.post(`${server_ip}/find_by_user`,{
                user: this.user,
                ips: this.ips
            }).then( res => {
                const res_data = res.data
                console.log(res_data)
                res_data.forEach(data => {
                    if (!data['error']){
                        this.true_template = data.TEMPLATE
                        this.templates_options = Object.values( data.TEMPLATES )
                        this.ip = data.ip
                        this.model = data.MODEL
    
                        this.ont_info.items_ont = [{
                            'ip olt' : data.ip,
                            serial : data.SERIAL,
                            'Port/Id' : `${data.PORT}/${data.ID}`,
                            'RX' : parseInt(data.OPTICAL_RX) * 0.1,
                            'TX' : parseInt(data.OPTICAL_TX) * 0.001,
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
                        
                        this.traffic_serial = data.SERIAL.replace('454C5458','ELTX')
                    }
                    else{
                        this.errors.push(data)
                    }
                });
                this.loading = false
                

            })
        },
        handler: function handler(event) {
            this.$socket.emit('disconnect-traffic')
        }
    },
    created() {
        window.addEventListener('beforeunload', this.handler)
    },
}
</script>
<style scoped>
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