<template>
    <div id='ats'>
        <h5>{{name}}</h5>
        <div id='border'>
            <p>{{location}}</p>
            <hr>
            <div id='olts'>
                <p class="olt"  
                   v-for="olt in olts" :key="olt.ip"
                >
                    {{olt.ip}} {{olt.model}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ats',
    props: {
        olts: [],
        name: String,
        location: String,
        address: String
    },

    methods: {
     
    }
}
</script>
<style scoped>
    #ats{
        margin-left: 20px;
        border-radius: 5%;
    }
    #border{
        background-color: rgba(28, 27, 37, 0.86);
        margin-bottom:20px;
        padding-left: 10px;
        padding-right: 10px;
        padding-top:10px;
        color: white;
        font-size: 14px;
        height: 200px;
    }
</style>