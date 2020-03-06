<template>
  <div class="container-contacts" style>
    <div class="container-contacts-title">
      <span>CHATS</span>
    </div>

    <a-list
      :grid="{ gutter: 2 }"
      :style="{ overflow: 'scroll'}"
      style="height: 38.5rem;margin-top:1rem;"
      :dataSource="chats"
    >
      <a-list-item slot="renderItem" slot-scope="item, index" key="item.id">
        <a-row style="margin-top:0.5rem;">
          <a-col :span="6">
            <a-badge :dot="item.user.isNewMessage">
              <a-avatar
                :style="{
                color: 'white',
                backgroundColor: colours[index % colours.length],
                'margin-left': '1rem'
              }"
              >{{item.user.name[0] + item.user.lastName[0]}}</a-avatar>
            </a-badge>
          </a-col>

          <a-col :span="18">
            <div class="container-contacts-name">
              <div
                class="user-name"
                @click="onOpenConversation(item.user, colours[index % colours.length])"
              >
                <span>{{item.user.name + ' ' + item.user.lastName}}</span>
              </div>
              <div class="btn-end-chat" @click="deleteConversation(item.user)">
                <img
                  class="img-endConversation"
                  src="../../assets/chat/Fin_de_conversacion.png"
                  alt
                />
              </div>
            </div>
          </a-col>
        </a-row>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
export default {
  name: "ChatsList",
  props: {
    emailsList: Map
  },
  data() {
    return {
      chats: [],
      colours: ["#66bb6a", "#7e57c2", "#EF5350", "#5C6BC0", "#8d6e63"],
      unsubscribeMutation: null,
      activeChat: ""
    };
  },
  mounted() {
    try {
      // console.log("EMAIL LIST COMPONENT: ", this.emailsList);
      this.getChats();
      this.unsubscribeMutation = this.$store.subscribe((mutation, state) => {
        // console.log("PASE");
        if (mutation.type === "setNewEmailToList") {
          // console.log("CAMBIO LISTA");
          this.getChats();
        }
      });
      // console.log("UNSSUBSCRIBE MOUNTED: ", this.unsubscribeMutation);
    } catch (error) {
      console.log("Hubo un error: ", error.message);
    }
  },
  methods: {
    async getChats() {
      try {
        const response = await this.$axios("message/list");
        const newChats = response.data.conversations;
        let newChatList = [];
        newChats.forEach(chatElement => {
          //Se evalua si se activa o no el badge de la conversación
          let isBadgeActive =
            this.activeChat != chatElement.user.email
              ? this.emailsList.get(chatElement.user.email)
                ? true
                : false
              : false;

          newChatList.push({
            id: chatElement.id,
            user: {
              name: chatElement.user.name,
              lastName: chatElement.user.lastName,
              email: chatElement.user.email,
              isNewMessage: isBadgeActive
            }
          });
          // console.log(
          //   "STATUS: ",
          //   chatElement.user.email,
          //   this.emailsList.get(chatElement.user.email) ? true : false
          // );
        });
        this.chats = newChatList;
        // console.log("this.chats: ", this.chats);
      } catch (error) {
        console.log("Hubo un error al onbtener la lista: ", error.message);
      }
    },
    onOpenConversation(user, colour) {
      user.isNewMessage = false;
      this.activeChat = user.email;
      this.$store.commit("deleteEmailFromList", user.email);
      this.$emit("openConversation", user, colour);
    },
    deleteConversation(user) {
      this.$emit("deleteConversation", user);
    }
  },
  destroyed() {
    this.unsubscribeMutation();
  }
};
</script>

<style scoped>
.container-contacts-name {
  display: flex;
  justify-content: space-between;
  padding: 0 3em;
  align-items: center;
}
.user-name {
  cursor: pointer;
  transition-duration: 100ms;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;
}
.user-name:active {
  transform: scale(0.9);
}
/* .ant-scroll-number .ant-badge-dot {
  background: #52c41a !important;
} */
</style>