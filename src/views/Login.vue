<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-content>
      <a-row type="flex" justify="center" style="height: 100%;">
        <a-col :xs="{ span: 11 }" style="height: 100%;">
          <a-card
            class="container-logos"
            style="padding: 2rem; height: 100%;"
            align="middle"
          >
            <img class="logo-naos" alt="logo-naos" src="../assets/Logo_NAOS.png" width="300" />
            <img class="logo-bioderma" alt="example" src="../assets/logo.png" width="130" />
            <div class="form-login">
              <a-form
                id="components-form-demo-normal-login"
                :form="form"
                class="login-form"
                @submit="handleSubmit"
              >
                <a-form-item>
                  <a-input
                    v-decorator="[
          'user',
          { rules: [{ required: true, message: 'Favor de ingresar su usuario.' }] }
        ]"
                    placeholder="Usuario"
                  >
                    <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-input
                    v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Favor de ingresar su contraseña.' }] }
        ]"
                    type="password"
                    placeholder="Contraseña"
                  >
                    <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-row type="flex" justify="center" align="top">
                    <a-button
                      type="primary"
                      html-type="submit"
                      class="login-form-button"
                      style="background-color:#526987; border: 1px solid #707070;"
                      :loading="loadingSignIn"
                    >ENTRAR</a-button>
                  </a-row>
                </a-form-item>
              </a-form>
            </div>
          </a-card>
        </a-col>
        <a-col :xs="{ span: 13 }" style="height: 100%;">
          <div class="container-logo-pretty">
            <img class="logo-pretty" alt="pretty" src="../assets/pretty.jpg" />
          </div>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      form: null,
      loadingSignIn: false
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();

      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.loadingSignIn = true;
          try {
            const loginInfo = {
              email: values.user,
              password: values.password
            };

            const response = await this.$axios.post("sesion/admin", loginInfo);
            const responseLogin = response.data;

            if (responseLogin.status === 1 || responseLogin.status == 2) {
              let messageLogin = "Usuario incorrecto";
              
              if (responseLogin.status == 2)
                messageLogin = "Contraseña incorrecta";
              
              this.$message.error(messageLogin);
            }
            else {
              localStorage.clear();

              const {token, name, image, email} = responseLogin.profile;
              
              localStorage.setItem('token', token);
              localStorage.setItem('name', name);
              localStorage.setItem('image', image);
              localStorage.setItem('email', email);
              
              this.$router.push({ name: "users" });
            } 
          } catch(err) {
            console.log("%cHubo un error.", "color:red;font-size:1rem");
            this.$message.error("Hubo un error");
          }
          this.loadingSignIn = false;
        }
      });
    }
  },
  mounted() {
    this.form = this.$form.createForm(this);
  }
};
</script>
<style>
#components-layout-demo-top {
  height: 100%;
}

#components-layout-demo-top .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}

.container-logos {
  width: 100%;
}

.container-logo-pretty {
  width: 100%;
  height: 100%;
}

.logo-pretty {
  width: 100%;
  object-fit: cover;
  height: 100%;
}

.logo-naos {
  display: flex;
  justify-content: center;
  max-width: 100%;
  width: 340px;
  height: 78px;
  margin-top: 126px;
  margin-bottom: 0px;
}

.logo-bioderma {
  height: 32px;
}

.form-login {
  margin-top: 138px;
}

.login-form {
  max-width: 495px;
  width: 100%;
}
</style>