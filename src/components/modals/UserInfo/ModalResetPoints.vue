<template>
	<a-modal
      title="¿Estas seguro que deseas reiniciar los puntos?"
      centered
    	:visible="isVisible"
			@cancel="closeModal"
			:footer="null"
    >
		<a-form layout="inline" :form="form" @submit="resetPoints">
      <a-form-item
        label="Contraseña"
      >
        <a-input
					placeholder="Contraseña"
					type="password"
					v-decorator="[
						`passsword`,
						{
							rules: [
								{
									required: true,
									message: 'Contraseña requerida',
								},
							],
						},
				]"/>
      </a-form-item>
      <a-form-item>
        <a-button type="danger" submit ghost html-type="submit" :loading="isValidating">
          Reiniciar
        </a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script> 
export default {
	name: "ModalResetPoints",
	props: {
		visible : Boolean
	},
	watch: {
		visible: function() {
			this.isVisible = this.visible;
		}
	},
	data() {
		return {
			isVisible: this.visible,
			form: this.$form.createForm(this),
			isValidating: false
		};
	},
	methods: {
		closeModal() {
			this.form.resetFields();
			this.$emit('cancel');
		},
		resetPoints(e) {
			e.preventDefault();
			
			this.form.validateFields(async (error, values) => {
				if (!error) {
					try {
						const email = localStorage.getItem("email");
						const password = values.passsword;

						this.isValidating = true;
						const response = await this.$axios.post("user/confirm", {
							email,
							password
						});

						const status = response.data.status;

						if (status === 0) {
							this.onResetPoints();
							this.closeModal();
						} 
						else {
							let message = "";

							if (status === 1) {
								message = "Usuario incorrecto."	
							}
							else {
								message = "La contraseña no coincide.";
							}

							this.$message.error(message);
						}

						this.form.resetFields();
					} catch (err) {
						console.log("Hubo un error:", err.message);
					}

						
					this.isValidating = false;
				}
      });
		},
    async onResetPoints() {
      try {
        const response = await this.$axios.put("user/resetpoints");
				this.$emit("updateList");
      } catch (error) {
        this.$notification["error"]({
          message: "Error al reiniciar puntos",
          description:
            "Hubo un error al reiniciar los puntos.",
        });
      }   
    }
	}
}
</script>

<style>
</style>