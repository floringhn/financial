<template>
        <CCard class="text-center">
  <CCardHeader>
    <CRow>
        <CCol :xs="6" class="text-start"><h4>Categories</h4></CCol>
        <CCol :xs="6">
            <CNav variant="pills" class="card-header-pills">
            <CNavItem class="ms-auto">
                <CNavLink
                href="#/category/create"
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
      <CTableHeaderCell scope="col">Options</CTableHeaderCell>
    </CTableRow>
    </CTableHead>
      <CTableBody>
        <CTableRow v-for="(category,index) in items" :key="index">
            <CTableDataCell>{{ category.name }}</CTableDataCell>
            <CTableDataCell>
              <RouterLink :to="{path: '/category/edit/'+category.id }" class="btn btn-secondary btn-sm">Edit</RouterLink>
              <CButton color="danger" variant="outline" class="ms-2 btn-sm">Delete</CButton>
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
       async getCategories(){
            let url = 'http://localhost/financial/api/categories/getAll.php';
            await axios.post(url).then(res => {
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