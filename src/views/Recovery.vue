<template>
  <a-row type="flex" align="middle" justify="center">
		<a-col :lg="8" class="recovery">
			<img src="../assets/Bioderma_Logo_001.png" alt="" class="bioderma-logo">
			<a-card width="100%">
				<a-form
					:form="recoveryForm"
					class="form-recovery"
					@submit="handleSubmit"
				>
					<a-form-item>
						<a-input
							v-decorator="[
							'password',
							{ rules: [{ required: true, message: 'Please input your Password!' }] },
						]"
							type="password"
							placeholder="Contraseña"
						>
							<a-icon slot="suffix" type="lock" style="color: rgba(0,0,0,.25)" />
						</a-input>
										
						<a-input
							v-decorator="[
							'passwordConfirmation',
							{ rules: [{ required: true, message: 'Please input your Password!' }] },
						]"
							type="password"
							placeholder="Confirmar contraseña"
						>
							<a-icon slot="suffix" type="lock" style="color: rgba(0,0,0,.25)" />
						</a-input>
					</a-form-item>
					<a-form-item>
						<a-button type="primary" style="margin: auto!important; display:block; width:100%;" html-type="submit" class="login-form-button">REGISTRAR</a-button>
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
			recoveryForm: this.$form.createForm(this)
		};
	},
	methods: {
		handleSubmit() {
			
		}
	}
};
</script>

<style scoped>
.recovery {
	margin-top: 10%;
}
.bioderma-logo {
	width: 35%;
	margin-bottom: 2.2rem;
}
.form-recovery {
	margin: 0;
}
</style>