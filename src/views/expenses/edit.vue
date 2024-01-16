
<template>
    <CAlert class="d-flex align-items-center" :color="colorAlert"  :visible="alertVisible" dismissible @close="() => { alertVisible = false }"> <CIcon :icon="iconAlert"  class="flex-shrink-0 me-2" width="24" height="24" />
            <div v-html="message"></div>
        </CAlert>
        <CButton
                class="my-3"
                href="#/expenses"
                color="primary"
                role="button"
                component="a"
                >
                Back
        </CButton>
    <CCard>
        
        <CCardHeader component="h5">Edit Expense</CCardHeader>
        <CCardBody>
            <CForm>
                <CRow>
                    <CCol xs="12" sm="6">
                        <CFormInput
                        type="text"
                        id="name"
                        label="Name"
                        placeholder=""
                        v-model="name"
                        />
                    </CCol>
                    <CCol xs="6" sm="6">
                        <CFormSelect
                        aria-label="Default select example"
                        v-model="category"
                        label="Category">
                        <option v-for="category in categories" :value="category.id" :selected="category.id == category_id ">
                            {{ category.name }}
                        </option>
                        </CFormSelect>
                    </CCol>
                    <CCol xs="12" sm="6">
                        <CFormInput
                        type="number"
                        id="value"
                        label="Value"
                        placeholder=""
                        v-model="value"
                        />
                    </CCol>
                    <CCol xs="12" sm="6">
                        <CFormInput
                        type="date"
                        id="date"
                        label="Date"
                        placeholder=""
                        v-model="date"
                        />
                    </CCol>
                    <CCol xs="12" sm="12">
                        <CFormTextarea
                        id="description"
                        label="Description"
                        rows="3"
                        v-model="description"
                        text="Must be 2-255 words long."
                    ></CFormTextarea>
                    </CCol>
                </CRow>
                
               
            </CForm>
        </CCardBody>
        <CCardFooter>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <CButton color="dark" @click="save">Save</CButton>
            </div>
        </CCardFooter>
    </CCard>
</template>

<script>
import axios from 'axios'
import router from '@/router';
  export default {
    name: 'createExpense',
    data(){
        return{
            name:"",
            description:"",
            date:"",
            value:"",
            alertVisible:false,
            colorAlert:"",
            iconAlert:"",
            categories:[],
            category:""
        }
    },
    methods:{
        save(){
                let url = 'http://localhost/financial/api/expenses/update.php';
                axios.post(url,JSON.stringify(
                    {
                        name:this.name,
                        category_id:this.category,
                        date:this.date,
                        description:this.description,
                        value:this.value,
                        id:this.$route.params.id
                    })
                    ).then(res => {
                
                if(res.data.status == 1)
                {
                    this.message = res.data.message
                    this.alertVisible = true
                    this.colorAlert = "success"
                    this.iconAlert = "cil-check-circle"
                    
                }
                if(res.data.status == 2)
                {
                    this.message = res.data.message
                    this.alertVisible = true
                    this.colorAlert = "warning"
                    this.iconAlert = "cil-warning"
                    
                }
                if(res.data.status == 3)
                {
                    let error  = ""
                    Object.values(res.data.message).forEach((value ) => { error +=value+"<br>"  })
                    this.message = error
                    this.alertVisible = true
                    this.colorAlert = "danger"
                    this.iconAlert = "cil-warning"
        
                }

            })
            
            
        },
        async getCategories(){
            let url = 'http://localhost/financial/api/categories/getAll.php';
            await axios.get(url).then(res => {
                console.log(res.data.message);
                this.categories = res.data.message
            }) 
            
        },
        async  getData(id){
            let url = 'http://localhost/financial/api/expenses/getOne.php';
            await axios.post(url,JSON.stringify({id:id})).then(res => {
                this.name = res.data.message[0].name
                this.value = res.data.message[0].value
                this.date = res.data.message[0].date
                this.description = res.data.message[0].description
                this.category = res.data.message[0].category_id

            })
        }
        
    },
    mounted(){
        this.getCategories()
        this.getData(this.$route.params.id)
    }
  }
</script>