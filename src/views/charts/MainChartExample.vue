
<template>
  <CChart
    type="line"
    :data="data"
    :options="options"
    @get-dataset-at-event="aa"
    @get-element-at-event="aa"
    @get-elements-at-event="aa"
  />
</template>

<script>
import { CChart } from '@coreui/vue-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import axios from 'axios'

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default {
  name: 'MainChartExample',
  components: {
    CChart,
  },
  data(){
    return{
      dataChart:[]
    }
    
  },
  async setup() {
    let url = 'http://localhost/financial/api/dashboard/statistics.php';
    let response =  await axios.post(url,JSON.stringify({type:"Doughnut"})).then(res => {
         return res
      })
      console.log(response.data.value)
      const data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','Aug','Sept','Oct','Nov','Dec'],
          datasets: [
            {
              label: 'Expenses',
              backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
              borderColor: getStyle('--cui-info'),
              pointHoverBackgroundColor: getStyle('--cui-info'),
              borderWidth: 2,
              data: response.data.value,
              fill: true,
            },
          ],
        }

    const options = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            drawOnChartArea: false,
          },
        },
        y: {
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 5,
            stepSize: Math.ceil(250 / 5),
            max: 250,
          },
        },
      },
      elements: {
        line: {
          tension: 0.4,
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    }
    return {
      data,
      options,
    }
  },
  methods: {
    aa(value, value2) {
      console.log(value)
      console.log(value2)
    },
  },
}
</script>
