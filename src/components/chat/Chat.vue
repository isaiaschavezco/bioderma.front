<template>
  <div class="main-chat">
    <HeaderChat :dataUser="user" @deleteConversation="deleteConversation" />
    <div class="conversation-chat">
      <div class="list-messages" v-if="!isLoadingMessages">
        <Message
          v-for="message in messages"
          :key="message.id"
          :isOrigin="message.type!=='client'"
          :infoUser="message.type!=='client'"
          :dataMessage="message"
          :colour="user.colour"
        />
      </div>
      <a-skeleton avatar active :paragraph="{rows: 4}" v-if="isLoadingMessages" />
    </div>
    <div class="container-chat-inputs">
      <div class="inputs-chat">
        <a-input
          placeholder="Escribe un mensaje"
          class="input-message"
          @keypress="sendMessage"
          v-model="message"
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
    dataUser: Object
  },
  data() {
    return {
      messages: [],
      isLoadingMessages: false,
      user: this.dataUser,
      requestChat: null,
      message: "",
      enable: true,
      unsubscribeMutation: null
    };
  },
  watch: {
    dataUser: function() {
      this.user = this.dataUser;
      this.getConversation();
      // if (this.user.email) {
      //   this.requestChat = setInterval(this.updateConversation, 5000);
      // }
    }
  },
  mounted() {
    // console.log("INICIO CHATS");
    this.unsubscribeMutation = this.$store.subscribe((mutation, state) => {
      // console.log("PASE CHAT");
      if (mutation.type === "setNewEmailToList") {
        // console.log("PAYLOAD ", mutation.payload);
        if (mutation.payload == this.user.email) {
          // console.log("CAMBIO CHAT");
          setTimeout(this.updateConversation, 500);
          // this.updateConversation();
        }
      }
    });
  },
  methods: {
    async sendMessage(e) {
      const message = this.message.trim();
      if (e.code === "Enter" && message.length > 0 && this.enable) {
        try {
          this.enable = false;
          const response = await this.$axios.post("message/admin", {
            userEmail: this.user.email,
            data: message
          });

          this.message = "";
          const newMessages = response.data.session;
          this.messages = newMessages;
          this.enable = true;
        } catch (error) {
          this.$notification["error"]({
            message: "Error al eliminar enviar mensaje",
            description: "Hubo un error al enviar el mensaje."
          });
          this.enable = true;
        }
      }
    },
    async getConversation() {
      try {
        this.isLoadingMessages = true;
        const response = await this.$axios(`message/user/${this.user.email}`);
        this.messages = response.data.session;
        this.isLoadingMessages = false;
      } catch (error) {
        console.log(
          "Hubo un error al obtener los mensaje de la conversacion: ",
          error.message
        );
      }
    },
    async updateConversation() {
      try {
        const response = await this.$axios(`message/user/${this.user.email}`);
        this.messages = response.data.session;
      } catch (error) {
        console.log(
          "Hubo un error al obtener los mensaje de la conversacion: ",
          error.message
        );
      }
    },
    deleteConversation() {
      // clearInterval(this.requestChat);
      this.user.email = "";
      this.$emit("deleteConversation", this.user);
    }
  },
  destroyed() {
    // clearInterval(this.requestChat);
    this.unsubscribeMutation();
  }
};
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
  overflow-y: auto;
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
.input-message {
  margin: auto;
  display: block;
  border-radius: 2rem;
  height: 4rem;
  width: 95%;
}
.btn-end-chat {
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
  transition-delay: 0ms;
}
.btn-end-chat:active {
  transform: scale(0.9);
}
</style>