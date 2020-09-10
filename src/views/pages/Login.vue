<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="doLogin">
                  <h1>Войти</h1>
                  <p class="text-muted">Войти в ваш аккаунт</p>
                  <CInput placeholder="Логин" v-model="login">
                    <template #prepend-content>
                      <CIcon name="cil-user" />
                    </template>
                  </CInput>
                  <CInput
                    placeholder="Пароль"
                    type="password"
                    autocomplete="curent-password"
                    v-model="password"
                  >
                    <template #prepend-content>
                      <CIcon name="cil-lock-locked" />
                    </template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton color="primary" class="px-4" type="submit">Войти</CButton>
                    </CCol>
                    <CCol col="12">
                      <CAlert color="danger" class="mt-3" v-if="error">{{error}}</CAlert>
                    </CCol>
                    <CCol col="6" class="text-right">
                      <!-- <CButton color="link" class="px-0">Forgot password?</CButton> -->
                      <CButton
                        color="link"
                        class="d-lg-none"
                        @click="$router.push('/signup')"
                      >Зарегистрироваться</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h2>Регистрация</h2>
                <p>Нет аккаунта? Зарегистрируйтесь</p>
                <CButton
                  color="light"
                  variant="outline"
                  size="lg"
                  @click="$router.push('/signup')"
                >Регистрация!</CButton>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      login: "",
      password: "",
      error: "",
    };
  },

  methods: {
    async doLogin() {
      try {
        const { data: result } = await this.$api.post("adminLogin", null, {
          login: this.login,
          password: this.password,
        });
        if (result.error) {
          this.error = result.error;
        }
        if (result.token) {
          this.$store.commit("user/setToken", result.token);
          this.$store.commit("user/setUser", result.user);
          this.$router.push("/");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
