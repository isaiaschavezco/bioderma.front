<template>
	<div class="container-chat-header">
		<a-row style="width:100%;" type="flex" align="middle" justify="center">
			<a-col :span="3">
				<a-avatar style="margin-left:3rem;" :size="50" icon="user" />
			</a-col>

			<a-col :span="15">
				<div class="title-chat">{{ user }}</div>
			</a-col>
			
			<a-col :span="6">
				<div class="end-chat">
					<button class="btn-end-chat">
							<span>Finalizar Conversación</span>
							<img class="img-endConversation" src="../../assets/chat/Fin_de_conversacion.png" alt />
					</button>
				</div>
			</a-col>
		</a-row>
	</div>
</template>

<script>
export default {
	name: "HeaderChat",
	data() {
		return {
			user: "Usuario"
		}
	}
}
</script>

<style>
.title-chat {
}
</style>