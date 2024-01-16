
<template>
    <CAlert class="d-flex align-items-center" :color="colorAlert"  :visible="alertVisible" dismissible @close="() => { alertVisible = false }"> <CIcon :icon="iconAlert"  class="flex-shrink-0 me-2" width="24" height="24" />
        <div v-html="message"></div>
        </CAlert>
        <CButton
                class="my-3"
                href="#/goals"
                color="primary"
                role="button"
                component="a"
                >
                Back
        </CButton>
    <CCard>
        
        <CCardHeader component="h5">Edit goal</CCardHeader>
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
    name: 'editGoal',
    data(){
        return{
            name:"",
            value:0,
            date:"",
            message:"",
            alertVisible:false,
            colorAlert:"",
            iconAlert:""
        }
    },
    methods:{
        save(){
            if(this.name)
            {
                let url = 'http://localhost/financial/api/goals/update.php';
                axios.post(url,JSON.stringify({name:this.name,value:this.value,date:this.date, id:this.$route.params.id})).then(res => {
                
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
            }else{
                    this.message = "The name is empty"
                    this.alertVisible = true
                    this.colorAlert = "danger"
                    this.iconAlert = "cil-warning"
            }
            
        },
        async  getData(id){
            let url = 'http://localhost/financial/api/goals/getOne.php';
            await axios.post(url,JSON.stringify({id:id})).then(res => {
                this.name = res.data.message[0].name
                this.value = res.data.message[0].value
                this.date = res.data.message[0].date
            })
        }
        
    },
    mounted(){
        this.getData(this.$route.params.id)
    }
  }
</script>