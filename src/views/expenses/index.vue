<template>
    <CRow>
        <CCol :xs="10">
        </CCol>
        <CCol :xs="2" class="text-end my-2">
            <CButton color="secondary" variant="outline" class="ms-auto btn-sm " @click="exportCSV">Export CSV</CButton>
        </CCol>
    </CRow>
    
    <CCard class="text-center">
<CCardHeader>
<CRow>
    <CCol :xs="6" class="text-start"><h4>Expenses</h4></CCol>
    <CCol :xs="6">
        <CNav variant="pills" class="card-header-pills">
        <CNavItem class="ms-auto">
            <CNavLink
            href="#/expense/create"
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
  <CTableHeaderCell scope="col">Category</CTableHeaderCell>
  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
  <CTableHeaderCell scope="col">Value</CTableHeaderCell>
  <CTableHeaderCell scope="col">Date</CTableHeaderCell>
  <CTableHeaderCell scope="col">Description</CTableHeaderCell>
  <CTableHeaderCell scope="col">Options</CTableHeaderCell>
</CTableRow>
</CTableHead>
  <CTableBody>
    <CTableRow v-for="(expense,index) in items" :key="index">
        <CTableDataCell>{{ expense.category }}</CTableDataCell>
        <CTableDataCell>{{ expense.name }}</CTableDataCell>
        <CTableDataCell>{{ expense.value }}</CTableDataCell>
        <CTableDataCell> {{format_date(expense.date)}}  </CTableDataCell>
        <CTableDataCell>{{ expense.description }}</CTableDataCell>
        <CTableDataCell>
          <RouterLink :to="{path: '/expense/edit/'+expense.id }" class="btn btn-secondary btn-sm">Edit</RouterLink>
          <CButton color="danger" variant="outline" class="ms-2 btn-sm" @click="deleteExpense(expense.id)">Delete</CButton>
        </CTableDataCell>
    </CTableRow>
  </CTableBody>
  </CTable>
</CCardBody>
</CCard>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
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
   async getExpenses(){
        let url = 'http://localhost/financial/api/expenses/getAll.php';
        await axios.get(url).then(res => {
            this.items = res.data.message
            console.log(res.data.message);
        }) 
        
    },
    format_date(value){
         if (value) {
           return moment(String(value)).format('DD.MM.YYYY')
          }
      },
    deleteExpense(id){
        if(confirm('Are you sure, you want to delete this data ?'))
        {
            let url = 'http://localhost/financial/api/expenses/delete.php'; 
            axios.post(url,JSON.stringify(
            {
                id:id
            })
            ).then(res => {
                alert(res.data.message)
                this.getExpenses()
            })
        }
        
    },
    exportCSV(){
        let apiUrl = 'http://localhost/financial/api/expenses/getAll.php';
        axios.get(apiUrl).then(res => {
        
        
        const data = res.data.message.map(object => {
            return { Name: object.name,Category:object.category,Value:object.value,Date:object.date,Description:object.description};
        })
        
        const csvContent = this.convertToCSV(data)
        const blob = new Blob([csvContent],{ type: 'text/csv;charset=utf-8'})
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download','exportExpenses.csv')
        link.click()
    }) 
    },
    convertToCSV(data){
        const headers = Object.keys(data[0])
        const rows = data.map(obj => headers.map(header => obj[header]))
        const headerRow = headers.join(',')
        const csvRows = [headerRow, ...rows.map(row => row.join(','))]
        return csvRows.join('\n')
    }
},
mounted(){
    this.getExpenses()
}
}
</script>