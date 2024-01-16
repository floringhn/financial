
<template>
    <CAlert class="d-flex align-items-center" :color="colorAlert"  :visible="alertVisible" dismissible @close="() => { alertVisible = false }"> <CIcon :icon="iconAlert"  class="flex-shrink-0 me-2" width="24" height="24" />
        <div v-html="message"></div>
        </CAlert>
        <CButton
                class="my-3"
                href="#/users"
                color="primary"
                role="button"
                component="a"
                >
                Back
        </CButton>
    <CCard>
        
        <CCardHeader component="h5">Create user</CCardHeader>
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
                        type="email"
                        id="emailUser"
                        label="email"
                        placeholder=""
                        v-model="email"
                        />
                    </CCol>
                    <CCol xs="12" sm="6">
                        <CFormInput
                        type="password"
                        id="passwordUser"
                        label="Password"
                        placeholder=""
                        v-model="password"
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
    name: 'createCategory',
    data(){
        return{
            name:"",
            password:"",
            email:"",
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
                let url = 'http://localhost/financial/api/users/create.php';
                axios.post(url,JSON.stringify({
                    name:this.name,
                    email:this.email,
                    password:this.password
                  
                })).then(res => {
                
                if(res.data.status == 1)
                {
                    this.message = res.data.message
                    this.alertVisible = true
                    this.colorAlert = "success"
                    this.iconAlert = "cil-check-circle"
                    this.name = ""
                    this.email = ""
                    this.password = ""
                    
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
        
    },
  }
</script>