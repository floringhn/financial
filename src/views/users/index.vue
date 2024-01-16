<template>
    <CCard class="text-center">
<CCardHeader>
<CRow>
    <CCol :xs="6" class="text-start"><h4>Users</h4></CCol>
    <CCol :xs="6">
        <CNav variant="pills" class="card-header-pills">
        <CNavItem class="ms-auto">
            <CNavLink
            href="#/user/create"
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
  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
  <CTableHeaderCell scope="col">Options</CTableHeaderCell>
</CTableRow>
</CTableHead>
  <CTableBody>
    <CTableRow v-for="(user,index) in items" :key="index">
        <CTableDataCell>{{ user.name }}</CTableDataCell>
        <CTableDataCell>{{ user.email }}</CTableDataCell>
        <CTableDataCell>
          <RouterLink :to="{path: '/user/edit/'+user.id }" class="btn btn-secondary btn-sm">Edit</RouterLink>
          <CButton color="danger" variant="outline" class="ms-2 btn-sm" @click="deleteuser(user.id)">Delete</CButton>
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
   async getuser(){
        let url = 'http://localhost/financial/api/users/getAll.php';
        await axios.get(url).then(res => {
            this.items = res.data.message
        }) 
        
    },
    deleteuser(id){
        if(confirm('Are you sure, you want to delete this data ?'))
        {
            let url = 'http://localhost/financial/api/users/delete.php'; 
            axios.post(url,JSON.stringify(
            {
                id:id
            })
            ).then(res => {
                alert(res.data.message)
                this.getuser()
            })
        }
        
    },
},
mounted(){
    this.getuser()
}
}
</script>