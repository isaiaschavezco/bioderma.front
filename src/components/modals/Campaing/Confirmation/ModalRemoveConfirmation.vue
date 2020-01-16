<template>
	<a-modal
      :title="`¿Estas seguro que deseas eliminar la ${target}?`"
      v-model="visible"
			:footer="null"
    >
		<div class="info-confirmation">
			<p>Escribe tu contraseña para confirmar que quieres eliminar la {{ target }}</p>
			<a-input type="password" placeholder="Contraseña" />
		</div>
		<template>
			<div class="footer">
				<a-button @click="onClose">Cancelar</a-button>
				<a-button @click="removeCampaing" type="danger">Eliminar</a-button>
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
			target: this.targetName
		}
	},
	methods: {
		onClose() {
			this.$emit('close');
		},
		removeCampaing() {

		}
	}
}
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