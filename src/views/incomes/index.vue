<template>
    <CCard class="text-center">
<CCardHeader>
<CRow>
    <CCol :xs="6" class="text-start"><h4>Incomes</h4></CCol>
    <CCol :xs="6">
        <CNav variant="pills" class="card-header-pills">
        <CNavItem class="ms-auto">
            <CNavLink
            href="#/income/create"
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
  <CTableHeaderCell scope="col">Data</CTableHeaderCell>
  <CTableHeaderCell scope="col">Options</CTableHeaderCell>
</CTableRow>
</CTableHead>
  <CTableBody>
    <CTableRow v-for="(income,index) in items" :key="index">
        <CTableDataCell>{{ income.name }}</CTableDataCell>
        <CTableDataCell>{{ income.value }}</CTableDataCell>
        <CTableDataCell>{{ income.date }}</CTableDataCell>
        <CTableDataCell>
          <RouterLink :to="{path: '/income/edit/'+income.id }" class="btn btn-secondary btn-sm">Edit</RouterLink>
          <CButton color="danger" variant="outline" class="ms-2 btn-sm" @click="deleteIncome(income.id)">Delete</CButton>
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
export default {
data: () => {
  return {
    
    items: [
      
    ]
  }
},
methods:{
   async getIncome(){
        let url = 'http://localhost/financial/api/incomes/getAll.php';
        await axios.post(url).then(res => {
            this.items = res.data.message
        }) 
        
    },
    deleteIncome(id){
        if(confirm('Are you sure, you want to delete this data ?'))
        {
            let url = 'http://localhost/financial/api/incomes/delete.php'; 
            axios.post(url,JSON.stringify(
            {
                id:id
            })
            ).then(res => {
                alert(res.data.message)
                this.getIncome()
            })
        }
        
    },
},
mounted(){
    this.getIncome()
}
}
</script>