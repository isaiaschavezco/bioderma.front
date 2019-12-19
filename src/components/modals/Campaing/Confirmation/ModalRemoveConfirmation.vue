<template>
	<a-modal
      :title="`¿Estas seguro que deseas eliminar la ${target}?`"
      v-model="visible"
      @ok="removeCampaing"
			@cancel="onClose"
    >
		<div class="info-confirmation">
			<p>Escribe tu contraseña para confirmar que quieres eliminar la {{ target }}</p>
			<a-input type="password" placeholder="Contraseña" />
		</div>

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

<style>

</style>