<template>
    <div class="ont">
        <div v-if="items_ont" >
            <b-table dark class="text-xsmall" small bordered head-variant="dark" :table-variant="null" :items="items_ont" ></b-table>
        </div>
        <div v-if="items_acs">
            <b-table  dark class="text-xsmall" small bordered head-variant="dark" :table-variant="null" :items="items_acs" ></b-table>
        </div>
        <div v-if="items_voip">
            <b-table  dark class="text-xsmall" small bordered head-variant="dark" :table-variant="null" :items="items_voip" ></b-table>
        </div>
    </div>

</template>

<script>
export default {
    name:"ont",
    props: {
        items_ont: Array,
        items_acs: Array,
        items_voip: Array,
    }
}
</script>