<template>
    <CCard class="text-center">
<CCardHeader>
<CRow>
    <CCol :xs="6" class="text-start"><h4>Goals</h4></CCol>
    <CCol :xs="6">
        <CNav variant="pills" class="card-header-pills">
        <CNavItem class="ms-auto">
            <CNavLink
            href="#/goal/create"
            active
            >
            New
            </CNavLink>
        </CNavItem>
        </CNav>
    </CCol>
</CRow>
</CCardHeader>
<CCardBody>
<CTable hover>
<CTableHead>
<CTableRow>
  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
  <CTableHeaderCell scope="col">Value</CTableHeaderCell>
  <CTableHeaderCell scope="col">Until Data</CTableHeaderCell>
  <CTableHeaderCell scope="col">Options</CTableHeaderCell>
</CTableRow>
</CTableHead>
  <CTableBody>
    <CTableRow v-for="(goal,index) in items" :key="index">
        <CTableDataCell>{{ goal.name }}</CTableDataCell>
        <CTableDataCell>{{ goal.value }}</CTableDataCell>
        <CTableDataCell>{{ format_date(goal.date) }}</CTableDataCell>
        <CTableDataCell>
          <RouterLink :to="{path: '/goal/edit/'+goal.id }" class="btn btn-secondary btn-sm">Edit</RouterLink>
          <CButton color="danger" variant="outline" class="ms-2 btn-sm" @click="deletegoal(goal.id)">Delete</CButton>
        </CTableDataCell>
    </CTableRow>
  </CTableBody>
  </CTable>
</CCardBody>
</CCard>
</template>

<script>
import axios from 'axios'
import router from '@/router';
import moment from 'moment'
export default {
data: () => {
  return {
    
    items: [
      
    ]
  }
},
methods:{
   async getgoal(){
        let url = 'http://localhost/financial/api/goals/getAll.php';
        await axios.post(url).then(res => {
            this.items = res.data.message
            console.log(res.data.message);
        }) 
        
    },
    deletegoal(id){
        if(confirm('Are you sure, you want to delete this data ?'))
        {
            let url = 'http://localhost/financial/api/goals/delete.php'; 
            axios.post(url,JSON.stringify(
            {
                id:id
            })
            ).then(res => {
                alert(res.data.message)
                this.getgoal()
            })
        }
        
    },
    format_date(value){
         if (value) {
           return moment(String(value)).format('DD.MM.YYYY')
          }
      },
},
mounted(){
    this.getgoal()
}
}
</script>