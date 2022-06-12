<template>
    <div class="SpeedGraph">
        <apexchart ref="graph" width="500" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>
<script>

export default {
    name : 'SeedGraph',
    props: {
        serial: String
    },
    components: {
        
    },
    data : () => {
        return {
            chartOptions: {
                chart: {
                    id: 'vuechart-example',
                    show: false,
                    zoom: {
                        enabled: false
                    },
                    type: 'area'
                },
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false
                },
                xaxis: {
                    type: "datetime",
                    labels: {
                        datetimeUTC: false
                    }
                },
                tooltip: {
                    x: {
                    format: "dd.MM.yyyy HH:mm"
                    }
                },
                yaxis: {
                    labels: {
                    formatter: function (value) {
                        
                        if (value < Math.pow(10,3))
                            return value + "b"
                        if(value >= Math.pow(10,3) && value < Math.pow(10,6))
                            return +(Math.round((value/Math.pow(10,3)) + "e+2")  + "e-2")  + "kb"
                        else if(value >= Math.pow(10,6) && value < Math.pow(10,9))
                            return +(Math.round((value/Math.pow(10,6)) + "e+2")  + "e-2")  + "mb"
                        else if(value >= Math.pow(10,9))
                            return +(Math.round((value/Math.pow(10,9)) + "e+2")  + "e-2")  + "gb"
                        else
                            return value
                        
                    }
                    },
                },

                animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                        speed: 2000
                    }
                },
                title: {
                    text: 'Traffic',
                    align: 'center'
                },
            
            },
            series: [{
                name: 'series-1',
                data: [[+new Date,0],[+new Date,0]]
            }]
      
        }
    },
    sockets: {
        connect: function () {
            console.log('socket connected')
        },
        send_traffic: function (data) {

            const temp = this.series[0].data.slice()
            temp.push([+new Date,parseInt(data)])
            if (temp.length > 20)
                temp.splice(0,10)

            this.series = [
                {
                    name: 'series-1',
                    data : temp
                }
            ]
            
        }
    },
    mounted() {
        this.$socket.emit('get-traffic',this.serial)
    }    
}
</script>
<style scoped>

</style>