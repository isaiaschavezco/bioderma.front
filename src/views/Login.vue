<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-content>
      <a-row type="flex" justify="left" style="height: 100%;">
        <a-col :xs="{ span: 8 }" style="height: 100%;">
          <a-card hoverable style="padding: 2rem; height: 100%;" align="middle">
            <img alt="example" src="../assets/logo.png" style="margin-top: 10rem;" />
            <a-form
              id="components-form-demo-normal-login"
              :form="form"
              class="login-form"
              @submit="handleSubmit"
            >
              <a-form-item>
                <a-input
                  v-decorator="[
          'User',
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
                    style="background-color:#001529; border: 1px solid #001529;"
                  >ENTRAR</a-button>
                </a-row>
              </a-form-item>
            </a-form>
          </a-card>
        </a-col>
        <a-col :xs="{ span: 16 }" style="height: 100%;"></a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      form: null
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.$router.push({ name: "users" });
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
</style>