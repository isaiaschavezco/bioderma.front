<template>
  <div>
    <a-row>
      <a-col :xs="{ span: 19 } ">
        <Chat :email="emailConversation" :dataUser="user" />
      </a-col>
      <a-col :xs="{ span: 5 }">
        <ChatsList @openConversation="openConversation"/>
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
      User: {}
    };
  },
  methods: {
    openConversation(user) {
      this.emailConversation = user.email;
      this.user = user;
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
