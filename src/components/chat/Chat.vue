<template>
	<div class="main-chat">
		<HeaderChat  />
		<div class="conversation-chat">
			<div class="list-messages">
				<Message v-for="message in messages" :key="message.id" :isOrigin="message.type==='client'" :infoUser="message.type!=='client'" :dataMessage="message" />
			</div>
			<a-skeleton avatar :paragraph="{rows: 4}" v-if="isLoadingMessages" />
		</div>
		<div class="container-chat-inputs">
			<div class="inputs-chat">
				<a-input placeholder="Escribe un mensaje" style="width: 95%; margin-right:10px" />
				<a-button
					type="primary"
					shape="circle"
					icon="right-circle"
					@click="sendMessage"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import HeaderChat from "./HeaderChat.vue";
import Message from "./Message.vue";

export default {
	name: "Chat",
	components: {
		HeaderChat,
		Message
	},
	props: {
		email: {
			type: String,
			default: ""
		},
		dataUser: Object
	},
	data() {
		return {
			emailMessage: this.email,
			messages: [],
			isLoadingMessages: false
		};
	},
	watch: {
		email: function() {
			this.emailMessage = this.email;
			this.getConversation();
		}

	},
	mounted() {
	},
	methods: {
		sendMessage() {
			console.log("%cEnvidado", "color: green;")
		},
		async getConversation() {
			try {
				this.isLoadingMessages = true;
				const response = await this.$axios(`message/user/${this.emailMessage}`);
				this.messages = response.data.session;
				this.isLoadingMessages = false;
			} catch (error) {
				console.log("Hubo un error al obtener los mensaje de la conversacion: ", error.message);
			}
		}
	}
}
</script>

<style>
.main-chat {
  margin-right: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}
.conversation-chat {
  background: #fff;
  overflow: hidden;
  height: 40em;
	padding: 2.2rem 5rem 2rem 5rem;
}
.container-chat-header {
  background: #526987;
  height: 4em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  font-size: 20px;
}
</style>