<template>
    <div class="PortInfo">
        <b-container>
            <b-input-group prepend="ip" size="sm" class="w-50">
                <b-form-input v-model="ip"></b-form-input>
                <b-input-group-append>
                    <b-button 
                        variant="outline-info" 
                        @click="find" 
                        :disabled="loading"
                        >Найти</b-button>
                </b-input-group-append>
            </b-input-group>
        </b-container>
    </div>
</template>

<script>
export default {
    name : 'PortInfo',
    data : () => {
        return {
            ip: '',
            loading : false
        }
    },
    methods: {
        find() {
            console.log(this.ip)
        }
    }
}
</script>