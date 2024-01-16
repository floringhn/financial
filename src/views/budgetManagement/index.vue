<template>
    <CCard class="text-center">
<CCardHeader>
<CRow>
    <CCol :xs="6" class="text-start"><h4>Budget Management</h4></CCol>
</CRow>
</CCardHeader>
<CCardBody>
<CTable hover>
<CTableHead>
<CTableRow>
  <CTableHeaderCell scope="col">Category</CTableHeaderCell>
  <CTableHeaderCell scope="col">Options</CTableHeaderCell>
</CTableRow>
</CTableHead>
  <CTableBody>
    <CTableRow v-for="(category,index) in items" :key="index">
        <CTableDataCell>{{ category.name }}</CTableDataCell>
        <CTableDataCell>
          <RouterLink :to="{path: '/budget-management/set/'+category.id }" class="btn btn-secondary btn-sm">Set Budget</RouterLink>
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
    columns: [
      {
        key: 'id',
        label: '#',
        _props: { scope: 'col' },
      },
      {
        key: 'Name',
        _props: { scope: 'col' },
      },
    ],
    items: [
      
    ]
  }
},
methods:{
    getCategories(){
        let url = 'http://localhost/financial/api/categories/getAll.php';
         axios.post(url).then(res => {
            this.items = res.data.message
            console.log(res.data.message);
        }) 
        
    }
},
mounted(){
    this.getCategories()
}
}
</script>