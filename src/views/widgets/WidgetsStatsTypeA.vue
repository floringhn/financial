
<template>
  <CChartDoughnut
    type="doughnut"
    :data="data"
    
  />
</template>

<script>

import { CChartDoughnut } from '@coreui/vue-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import axios from 'axios'

export default {
  name: 'CChartDoughnutExample',
  components: {
    CChartDoughnut,
  },
  async setup() {
    let url = 'http://localhost/financial/api/dashboard/statistics.php';
    let response =  await axios.post(url,JSON.stringify({type:"Doughnut"})).then(res => {
         return res
      })
    let urlCategories = 'http://localhost/financial/api/dashboard/getCategories.php';  
    let categories =  await axios.post(urlCategories).then(res => {
         return res
      })
      console.log(categories);  
      const data = {
        labels: categories.data.value,
          datasets: [
            {
              backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
              data: response.data.value,
            },
          ],
        }
   
    return {
      data,
     
    }
  },
  methods: {
   
  },
}
</script>
