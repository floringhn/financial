<template>
    <CAlert class="d-flex align-items-center" :color="colorAlert"  :visible="alertVisible" dismissible @close="() => { alertVisible = false }"> <CIcon :icon="iconAlert"  class="flex-shrink-0 me-2" width="24" height="24" />
            <div>{{ message }}</div>
        </CAlert>
        <CButton
                class="my-3"
                href="#/categories"
                color="primary"
                role="button"
                component="a"
                >
                Back
        </CButton>
    <CCard>
        <CCardHeader component="h5">Edit Category</CCardHeader>
        <CCardBody>
            <CForm>
                <CFormInput
                type="text"
                id="create"
                label="Name"
                v-model="name"
                />
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
                let url = 'http://localhost/financial/api/categories/update.php';
                axios.post(url,JSON.stringify({name:this.name,id:this.$route.params.id})).then(res => {
                
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
            })
            }else{
                    this.message = "The name is empty"
                    this.alertVisible = true
                    this.colorAlert = "danger"
                    this.iconAlert = "cil-warning"
            }
        },
        getData(id){
            let url = 'http://localhost/financial/api/categories/getOne.php';
            axios.post(url,JSON.stringify({id:id})).then(res => {
                this.name = res.data.message[0].name
            })
        }
    },
    mounted(){
        this.getData(this.$route.params.id)
    }
  }
</script>