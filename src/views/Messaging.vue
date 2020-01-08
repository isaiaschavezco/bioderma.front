<template>
  <div>
    <a-row>
      <a-col :xs="{ span: 19 } ">
        <Chat :dataUser="user" @deleteConversation="deleteConversation"/>
      </a-col>
      <a-col :xs="{ span: 5 }">
        <ChatsList @openConversation="openConversation" @deleteConversation="deleteConversation"/>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import Chat from "../components/chat/Chat.vue";
import ChatsList from "../components/chat/ChatsList.vue";

export default {
  components: {
    Chat,
    ChatsList
  },
  data() {
    return {
      emailConversation: "",
      user: {}
    };
  },
  methods: {
    openConversation(user) {
      this.user = user;
      console.log(user);
    },
    async deleteConversation(user) {
      const email = user.email;
      
      const response = await this.$axios.delete(`message/user/${email}`);

      console.log(response.data);

      if (this.user.email && this.user.email === email)
        console.log("Hola");
        this.user = {};
    }
  }
};
</script>
<style>
.img-endConversation {
  width: 20px;
  margin-left: 20px;
}

.btn-end-chat {
  background: none;
  border: none;
  cursor: pointer;
}

.container-chat-inputs {
  border-top: 1px solid rgba(0, 0, 0, 0.2);
}

.inputs-chat {
  padding: 17px 20px;
}

.container-contacts {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  height: 50.5em;
}

.container-contacts-title {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4em;
  background: #526987;
  color: #fff;
  font-size: 20px;
}
</style>
