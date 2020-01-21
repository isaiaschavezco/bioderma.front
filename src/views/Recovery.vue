<template>
  <a-row type="flex" align="middle" justify="center">
    <a-col :lg="8" class="recovery">
      <img src="../assets/Bioderma_Logo_001.png" alt class="bioderma-logo" />
      <a-card width="100%">
        <h4 class="recovery-message">RECIBIMOS UNA PEITICIÓN PARA REINICIAR TU CONTRASEÑA</h4>
        <div class="recovery-email">{{ email }}</div>
        <a-form :form="recoveryForm" class="form-recovery" @submit="handleSubmit">
          <div class="password">
            <a-form-item>
              <a-input
                v-decorator="[
								'password',
								{ rules: [{ required: true, message: 'Por favor introduce tu contraseña' }] },
							]"
                minlength="8"
                :type="visibilityPassword"
                placeholder="Contraseña"
                enterButton
              ></a-input>
            </a-form-item>
            <a-button
              :icon="visibilityPassword==='password'?'eye-invisible':'eye'"
              class="visibility-password"
              @click="toggleVisibilityPassword"
            />
          </div>

          <div class="password">
            <a-form-item>
              <a-input
                class="password-confirmation"
                v-decorator="[
								'passwordConfirmation',
								{ rules: [{ required: true, validator: validatePassword, message: 'No coincide con la contraseña' }] },
							]"
                :type="visibilityConfirmation"
                placeholder="Confirmar contraseña"
              ></a-input>
            </a-form-item>
            <a-button
              :icon="visibilityConfirmation==='password'?'eye-invisible':'eye'"
              class="visibility-password"
              @click="toggleVisibilityConfirmation"
            />
          </div>
          <a-form-item>
            <a-button
              type="primary"
              style="margin: auto!important; display:block; width:100%;"
              html-type="submit"
              class="login-form-button"
            >REGISTRAR</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: "Recovery",
  data() {
    return {
      recoveryForm: this.$form.createForm(this),
      email: this.$route.query.email,
      token: this.$route.query.token,
      password: "",
      visibilityPassword: "password",
      visibilityConfirmation: "password"
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();

      this.recoveryForm.validateFields(async (err, values) => {
        if (!err) {
          try {
            const response = await this.$axios.put("user/recovery", {
              email: this.email,
              password: values.password,
              token: this.token
            });

            if (response.data.status == 10) {
              this.$notification["warning"]({
                message: "Token invalido",
                description:
                  "El token que esta utilizando ya ha sido utilizado o no es un token valido."
              });
            }

            if (response.data.status == 0) {
              this.$notification["success"]({
                message: "Contraseña restablecida",
                description: "La contraseña se ha restablecido correctamente."
              });
            }
          } catch (err) {
            this.$notification["error"]({
              message: "Error al restablecer contraseña",
              description:
                "Ha ocurrido un error durante la recuperación de contraseña."
            });
          }
        }
      });
    },
    toggleType(inputType) {
      if (inputType === "password") inputType = "text";
      else inputType = "password";

      return inputType;
    },
    toggleVisibilityPassword() {
      this.visibilityPassword = this.toggleType(this.visibilityPassword);
    },
    toggleVisibilityConfirmation() {
      this.visibilityConfirmation = this.toggleType(
        this.visibilityConfirmation
      );
    },
    validatePassword(rule, value, callback) {
      const values = this.recoveryForm.getFieldsValue();

      if (values.password !== values.passwordConfirmation) {
        callback("No coincide con la contraseña.");
      } else callback();
    }
  }
};
</script>

<style scoped>
.recovery {
  margin-top: 15vh;
}
.bioderma-logo {
  width: 35%;
  margin-bottom: 2.2rem;
}
.form-recovery {
  margin: 0;
}
.recovery-message {
  margin-top: 1rem;
  font-weight: bold;
}
.recovery-email {
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  font-weight: 500;
}
.password {
  display: grid;
  grid-template-columns: 9fr 1fr;
  grid-gap: 1rem;
  align-items: top;
}
.visibility-password {
  height: 2rem;
  margin-top: 5px;
}
</style>