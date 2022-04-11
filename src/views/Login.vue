<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <div class="text-center" style="margin: 2.5rem 0">
                    <CImage rounded fluid :src="ImgLogo01" class="logo-mh"/>
                  </div>
                  <h6 class="fw-bold mb-4">ログイン</h6>
                  <div class="invalid-feedback-cus mb-2" v-if="error">
                    {{ error }}
                  </div>
                  <CInputGroup class="mb-3">
                    <CFormInput
                      size="lg"
                      id="email"
                      name="email"
                      placeholder="メールアドレス"
                      autocomplete="email"
                      v-model="email"
                      :class="{
                        'is-invalid': submitted && v$.email.$invalid,
                      }"
                    />
                    <div
                      v-if="submitted && v$.email.$invalid"
                      class="invalid-feedback"
                    >
                      必須項目
                    </div>
                  </CInputGroup>
                  <CInputGroup class="mb-3">
                    <CFormInput
                      size="lg"
                      type="password"
                      placeholder="パスワード"
                      autocomplete="current-password"
                      id="password"
                      name="password"
                      v-model="password"
                      :class="{
                        'is-invalid': submitted && v$.password.$invalid,
                      }"
                    />
                    <div
                      v-if="submitted && v$.password.$invalid"
                      class="invalid-feedback"
                    >
                      <span v-if="v$.password.required.$invalid">必須項目</span>
                      <!-- <span v-if="v$.password.minLength.$invalid"
                        >パスワードは最低でも8文字必要</span
                      > -->
                    </div>
                  </CInputGroup>
                  <CRow>
                    <CCol class="text-center mb-4" style="font-size: 12px">
                      パスワード忘れた方は<a
                        href="javascript:void(0)"
                        @click="resetPwd"
                        class="px-0 text-medium-emphasis link"
                        >こちら</a
                      >
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol class="text-center mt-2">
                      <CButton @click.prevent="login" color="info" class="px-4">
                        ログイン
                      </CButton>
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
import AuthRepository from '@/repositories/AuthRepository.vue'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import ImgLogo01 from '@/assets/images/logo_pink.svg'
import Utils from '@/utils/Utils'
import jwt_decode from 'jwt-decode'
import Constants from '@/utils/Constants'

export default {
  name: 'Login',
  components: {},
  setup() {
    return {
      ImgLogo01,
      v$: useVuelidate(),
    }
  },
  data() {
    return {
      email: '',
      password: '',
      submitted: false,
      error: '',
      searchParams: '',
    }
  },
  validations() {
    return {
      email: { required, email },
      password: {
        required,
      },
    }
  },
  methods: {
    login() {
      this.submitted = true
      if (this.v$.$invalid) {
        return
      }
      const data = { email: this.email, password: this.password }
      try {
        AuthRepository.post('auth/login', data).then((response) => {
          if (response.response) {
            if (500 === response.response.data.statusCode) {
              Utils.showToast(
                'システムエラーが発生しました。再度操作してください。',
              )
              return
            } else if (412 === response.response.data.statusCode) {
              Utils.showToast(
                'メールアドレスまたはパスワードが間違っています。',
              )
              return
            }
          }
          if (response.data) {
            const accessToken = response.data.access_token
            const refreshToken = response.data.refresh_token
            const user_info = jwt_decode(accessToken)
            if (user_info.status === 0) {
              this.error =
                'このメールアドレスはまだ登録されていません。または、登録手続きがまだ完了していません。'
              return
            } else if (user_info.status === 2) {
              this.error = 'このアカウントの契約は停止されています。'
              return
            }
            localStorage.setItem('access_token', accessToken)
            localStorage.setItem('refresh_token', refreshToken)
            localStorage.setItem('user_info', JSON.stringify(user_info))
            this.$router.push({name:'home'});
          }
        })
      } catch (err) {
        this.error = err.message
      }
    },
    resetPwd() {
      this.$router.push({ name: 'ResetPassword' })
    },
  },
  mounted() {
  },
}
</script>
<style scoped>
input {
  font-size: 1rem;
  border: 1px solid #f2f2f2;
  background: #f2f2f2;
}

.link {
  font-weight: bold;
  text-decoration: none;
  font-size: 12px;
  color: #1c234e !important;
  cursor: pointer;
}

.btn-info {
  color: #fff;
  font-weight: 700;
  height: 3rem;
  width: 10rem;
  border-radius: 5px;
  font-size: 15px;
}

.form-control-lg {
  min-height: calc(1.5em + 1.5rem + 6px);
  border-radius: 0.25rem !important;
}
</style>
