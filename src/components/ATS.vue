<template>
    <div id='ats'>
        <h5>{{name}}</h5>
        <div id='olts'>
            <p v-for="olt in olts" :key="olt.ip">{{olt.ip}} {{olt.model}} {{olt.firmware}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ats',
    props: {
        olts: [],
        name: String
    }
}
</script>
<style scoped>
    #ats{
        
        border-radius: 10%;
        background-color: aquamarine;

    }
</style>