
<template>
    <CAlert class="d-flex align-items-center" :color="colorAlert"  :visible="alertVisible" dismissible @close="() => { alertVisible = false }"> <CIcon :icon="iconAlert"  class="flex-shrink-0 me-2" width="24" height="24" />
            <div>{{ message }}</div>
        </CAlert>
        <CButton
                class="my-3"
                href="#/budget-management"
                color="primary"
                role="button"
                component="a"
                >
                Back
        </CButton>
    <CCard>
        <CCardHeader component="h5">Set Budget: {{ category }}</CCardHeader>
        <CCardBody>
            <CForm>
                <CRow>
                    <CCol xs="12" sm="3">
                        <CFormInput
                        type="number"
                        id="jan"
                        label="Jan"
                        placeholder=""
                        v-model="jan"
                        />
                    </CCol>
                    <CCol xs="12" sm="3">
                        <CFormInput
                        type="number"
                        id="Feb"
                        label="Feb"
                        placeholder=""
                        v-model="feb"
                        />
                    </CCol>
                    <CCol xs="12" sm="3">
                        <CFormInput
                        type="number"
                        id="mar"
                        label="mar"
                        placeholder=""
                        v-model="mar"
                        />
                    </CCol>
                    <CCol xs="12" sm="3">
                        <CFormInput
                        type="number"
                        id="apr"
                        label="apr"
                        placeholder=""
                        v-model="apr"
                        />
                    </CCol>
                    <CCol xs="12" sm="3">
                        <CFormInput
                        type="number"
                        id="may"
                        label="May"
                        placeholder=""
                        v-model="may"
                        />
                    </CCol>
                    <CCol xs="12" sm="3">
                        <CFormInput
                        type="number"
                        id="june"
                        label="June"
                        placeholder=""
                        v-model="june"
                        />
                    </CCol>
                    <CCol xs="12" sm="3">
                        <CFormInput
                        type="number"
                        id="july"
                        label="July"
                        placeholder=""
                        v-model="july"
                        />
                    </CCol>
                    <CCol xs="12" sm="3">
                        <CFormInput
                        type="number"
                        id="aug"
                        label="Aug"
                        placeholder=""
                        v-model="aug"
                        />
                    </CCol>
                    <CCol xs="12" sm="3">
                        <CFormInput
                        type="number"
                        id="sept"
                        label="Sept"
                        placeholder=""
                        v-model="sept"
                        />
                    </CCol>
                    <CCol xs="12" sm="3">
                        <CFormInput
                        type="number"
                        id="oct"
                        label="Oct"
                        placeholder=""
                        v-model="oct"
                        />
                    </CCol>
                    <CCol xs="12" sm="3">
                        <CFormInput
                        type="number"
                        id="nov"
                        label="Nov"
                        placeholder=""
                        v-model="nov"
                        />
                    </CCol>
                    <CCol xs="12" sm="3">
                        <CFormInput
                        type="number"
                        id="dec"
                        label="Dec"
                        placeholder=""
                        v-model="dec"
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
            message:"",
            alertVisible:false,
            colorAlert:"",
            iconAlert:"",
            category:"",
            jan:0,
            feb:0,
            mar:0,
            apr:0,
            may:0,
            june:0,
            july:0,
            aug:0,
            sept:0,
            oct:0,
            nov:0,
            dec:0
        }
    },
    methods:{
        save(){
                let url = 'http://localhost/financial/api/budget-management/set.php';
                axios.post(url,JSON.stringify(
                {
                    jan:this.jan ,
                    feb:this.feb ,
                    mar:this.mar ,
                    apr:this.apr ,
                    may:this.may ,
                    june:this.june ,
                    july:this.july ,
                    aug:this.aug ,
                    sept:this.sept ,
                    oct:this.oct ,
                    nov:this.nov ,
                    dec:this.dec ,
                    category_id:this.$route.params.id 
                }
                )).then(res => {
                
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
            
            
        },
        async getCategory(){
            let url = 'http://localhost/financial/api/categories/getOne.php';
            await axios.post(url,JSON.stringify({id:this.$route.params.id})).then(res => {
                this.category = res.data.message
            }) 
            
        },
        async getData(id){
            let url = 'http://localhost/financial/api/budget-management/getOne.php';
            await axios.post(url,JSON.stringify({id:this.$route.params.id})).then(res => {
                  
                    this.jan = res.data.message[0].value,
                    this.feb = res.data.message[1].value,
                    this.mar = res.data.message[2].value,
                    this.apr = res.data.message[3].value,
                    this.may = res.data.message[4].value,
                    this.june = res.data.message[5].value,
                    this.july = res.data.message[6].value,
                    this.aug = res.data.message[7].value,
                    this.sept = res.data.message[8].value ,
                    this.oct = res.data.message[9].value,
                    this.nov = res.data.message[10].value,
                    this.dec = res.data.message[11].value

            })
            
        },
        
    },
    mounted(){
        this.getCategory(this.$route.params.id)
        this.getData(this.$route.params.id)
    }
  }
</script>