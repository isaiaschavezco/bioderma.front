<template>
	<div class="container-chat-header">
		<a-row style="width:100%;" type="flex" align="middle" justify="center">
			<a-col :span="3" v-if="user.name">
            <a-avatar
              :style="{
                color: 'white',
                backgroundColor: user.colour,
                'margin-left': '1rem'
              }"
							:size="50"
            >{{user.name[0] + user.lastName[0]}}</a-avatar>
			</a-col>

			<a-col :span="15">
				<div class="title-chat">{{ user.name?user.name:"Abre una conversación" }}</div>
			</a-col>
			
			<a-col :span="6">
				<div class="end-chat" v-if="user.name">
					<div class="btn-end-chat" @click="deleteConversation">
							<span>Finalizar Conversación</span>
							<img class="img-endConversation" src="../../assets/chat/Fin_de_conversacion.png" alt />
					</div>
				</div>
			</a-col>
		</a-row>
	</div>
</template>

<script>
export default {
	name: "HeaderChat",
	props: {
		dataUser: Object
	},
	data() {
		return {
			user: this.dataUser
		}
	},
	watch: {
		dataUser: function() {
			this.user = this.dataUser;
		}
	},
	methods: {
		deleteConversation() {
			this.$emit("deleteConversation");
		}
	}
}
</script>

<style>
</style>