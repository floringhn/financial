<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="4">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autocomplete="username"
                      v-model="username"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autocomplete="current-password"
                      v-model="password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="12">
                      <div class="d-grid gap-2 col-6 mx-auto">
                        <CButton color="primary" @click="login"> Login </CButton>
                      </div>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import axios from 'axios'
import router from '@/router';
export default {
  name: 'Login',
  methods:{
    data(){
      return{
        password:'',
        username:''
      }
    },
    async login(){
      let url = 'http://localhost/financial/api/auth-file/login-user.php';
      let result = await axios.post(url,JSON.stringify({ email:this.username, password:this.password }))
      
      if(result.status == 200 && result.data.status > 0)
      {
        localStorage.setItem("user-info",JSON.stringify(result.data))
        localStorage.removeItem("userToken");
        localStorage.setItem("userToken",result.data.jwt)
        this.$router.push({name: 'Home'}) 
      }
    }
  }
}
</script>
