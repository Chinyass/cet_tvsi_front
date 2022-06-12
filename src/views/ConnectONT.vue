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
             <div id="form"  v-if="show_form">
                <b-form @submit.prevent="Setting">
                    <b-form-group
                        id="input-group-1"
                        label="login:"
                        label-for="acs_login"
                    >
                        <b-form-input
                        id="acs_login"
                        v-model="form.acs_login"
                        placeholder="Enter login"
                     
                        ></b-form-input>

                    </b-form-group>

                    <b-form-group id="input-group-2" label="Password:" label-for="acs_password">
                        <b-form-input
                        id="acs_password"
                        v-model="form.acs_password"
                        placeholder="Passowrd"
                       
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-3" label="Template:" label-for="template">
                        <b-form-select
                        id="template"
                        v-model="form.template"
                        :options="templates_options"
                      
                        ></b-form-select>
                    </b-form-group>

                    <b-form-checkbox
                        id="checkbox-1"
                        v-model="form.voip_selected"
                        name="checkbox-1"
                        :value="true"
                        :unchecked-value="false"
                    >
                        VOIP
                    </b-form-checkbox>
                    <div v-if="form.voip_selected">
                        <b-form-group
                            id="voip_number-gr"
                            label="number:"
                            label-for="voip_number"
                        >
                            <b-form-input
                            id="voip_number"
                            v-model="form.voip_number"
                            placeholder="Enter number"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group id="voip_password-gr" label="Password:" label-for="voip_password">
                            <b-form-input
                            id="voip_password"
                            v-model="form.voip_password"
                            placeholder="Passowrd"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group id="server-gr" label="Server:" label-for="voip_server">
                            <b-form-select
                            id="voip_server"
                            v-model="form.voip_server"
                            :options="voip_servers"
                            ></b-form-select>
                        </b-form-group>
                    </div>
                    <b-button type="submit" variant="primary">Submit</b-button>
                </b-form>
            </div>
            <b-row cols="3">
                <b-col cols="6">
                    <div class="inform" v-if="show_status">
                        <b-card-group deck>
                            <b-card 
                                bg-variant="dark" 
                                header="status" 
                                text-variant="white"
                                class="text-center"
                                >
                                <b-card-text 
                                    v-for="st in Object.keys(status)" :key="st">
                                        {{st}} : {{status[st]}}
                                </b-card-text>
                            </b-card>
                        </b-card-group>
                    </div>
                </b-col>
                <b-col cols="6">
                    <SpeedGraph v-if="traffic_serial" :serial="traffic_serial" />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import axios from 'axios'
import Spinner from '../components/spinner.vue'
import ONTINFO from '../components/ONTINFO.vue'
import SpeedGraph from '../components/SpeedGraph.vue'

export default {
    props: {
        ips: []
    },
    components:{
        Spinner,
        ONTINFO,
        SpeedGraph
    },
    data: () => {
        return {
            serial : 'ELTX',
            traffic_serial : '',
            loading: false,
            ip : '',
            ont_info : {
                items_ont: [],
                items_acs: [],
                items_voip: [],
                correct : false
            },
            form : {
                acs_login: '',
                acs_password: '',
                template: '',
                voip_selected : false,
                voip_password : '',
                voip_login : '',
                voip_server : '94.230.240.28'
            },
            model : '',
            true_template : '',
            templates_options : [],
            templates : {},
            voip_servers: ['94.230.240.28','94.230.240.29'],
            show_form : false,
            status: {},
            show_status : true,
            errors : []
        }
    },
    methods: {
        find() {
            if (!this.ips){
                this.$router.push({ name: 'Home'})
            }
            else{
                this.loading = true
                this.show_form = false
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
                            this.true_template = data.TEMPLATE
                            this.templates = data.TEMPLATES
                            this.templates_options = Object.values( data.TEMPLATES )
                            this.ip = data.ip
                            this.model = data.MODEL
                            console.log('TEMPLATE',this.templates)
                            if (data.TEMPLATE == 'Not created'){
                                this.form.template = `ntu-rg${data.PORT}`
                            }
                            else{
                                this.form.template = data.TEMPLATE
                            }

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

                            this.ont_info.correct = true
                            this.show_form = true
                        }
                        else{
                            this.errors.push(data)
                        }
                    });
                
                    console.log(this.ont_info)
                    this.loading = false
                    
                })
                this.traffic_serial = this.serial
            }
        },
        Setting(){
            const server_ip = this.$store.getters.SERVER_API
            const data = {}
            data.acs_login = this.form.acs_login
            data.acs_password = this.form.acs_password
            
            data.voip_selected = this.form.voip_selected
            data.voip_password = this.form.voip_password
            data.voip_number = this.form.voip_login
            data.voip_server = this.form.voip_server
            
            if (this.true_template === this.form.template)
                data.template_change = false
            else
                data.template_change = true
            
            data.template = Object.keys(this.templates).find(key => this.templates[key] === this.form.template);
            console.log("TEMPLATE",data.template)
            data.serial = this.serial
            data.ip = this.ip

            data.model = this.model
            
            axios.post(`${server_ip}/setting_ont`, data).then( res => {
                let res_data = res.data
                const status = {}
                Object.keys(res_data).forEach( el => {
                    console.log(el)
                    console.log(res_data[el])
                    if(res_data[el]){
                        status[el] = 'Изменено'
                    }
                    else{
                        status[el] = 'Без изменений'
                    }
                })
                this.status = status
                this.show_status = true
            })

        }
    }
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
 #form{
     background-color: rgba(249, 252, 249, 0.233);
     padding: 2%;
     border: 2px solid black;
    
     width: 50%;
 }
 .inform{
     width: 50%;
     font-size: 12px;
 }
</style>