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

            <Spinner v-if="loading" />

        </b-container>
    </div>
</template>

<script>
import axios from 'axios'
import Spinner from '../components/spinner.vue'
export default {
    props: {
        ips: []
    },
    components:{
        Spinner
    },
    data: () => {
        return {
            serial : 'ELTX',
            loading: false
        }
    },
    methods: {
        find() {
            this.loading = true
            const serial = this.serial.trim()
            const server_ip = this.$store.getters.SERVER_API

            axios.post(`${server_ip}`)
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