<template>
  <a-modal
    :title="`¿Estas seguro que deseas eliminar la ${target}?`"
    v-model="visible"
    :footer="null"
    @cancel="onClose"
  >
    <div class="info-confirmation">
      <p>Escribe tu contraseña para confirmar que quieres eliminar la {{ target }}</p>
      <a-form :form="passwordForm">
        <a-form-item>
          <a-input
            placeholder="Contraseña"
            type="password"
            v-decorator="[
              'password',
              {
                rules: [{ required: true, message: 'Favor de llenar el campo' }]
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </div>
    <template>
      <div class="footer">
        <a-button @click="onClose">CANCELAR</a-button>
        <a-button @click="removeCampaing" type="danger">ELIMINAR</a-button>
      </div>
    </template>
  </a-modal>
</template>

<script>
export default {
  name: "ModalReomveConfirmation",
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    targetName: {
      type: String,
      default: ""
    },
    quizzId: {
      type: Number
    }
  },
  watch: {
    isVisible: function() {
      this.visible = this.isVisible;
    }
  },
  data() {
    return {
      okDisabled: true,
      visible: this.isVisible,
      target: this.targetName,
      passwordForm: this.$form.createForm(this)
    };
  },
  methods: {
    onClose() {
      this.passwordForm.resetFields();
      this.$emit("close");
    },
    removeCampaing() {
      let status = null;
      try {
        this.passwordForm.validateFields(async (err, values) => {
          if (!err) {
            if (this.target === "trivia") {
              const response = await this.$axios.put("quizz/remove", {
                email: localStorage.getItem("email"),
                password: values.password.trim(),
                quizzId: this.quizzId
              });
              status = response.data.status;
            } else if (this.target == "campaña") {
              const response = await this.$axios.put("campaing/remove", {
                email: localStorage.getItem("email"),
                password: values.password.trim(),
                campaingId: this.quizzId
              });
              status = response.data.status;
            }
            this.passwordForm.resetFields();
            this.$emit("confirm", status);
          }
        });
      } catch (err) {
        status = -1;
        this.passwordForm.resetFields();
        this.$emit("confirm", status);
      }
    }
  }
};
</script>

<style scoped>
.footer {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10rem;
  margin-top: 1rem;
}
</style>