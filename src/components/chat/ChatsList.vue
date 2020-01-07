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
			<a-list-item slot="renderItem" slot-scope="item" key="item.id">
        <a-row>
          <a-col :span="6">
            <a-avatar icon="user" style="margin-left:1rem" />
          </a-col>

          <a-col :span="18">
            <div class="container-contacts-name">
              <div class="user-name" @click="onOpenConversation(item.user)">
                <span>{{item.user.name + ' ' + item.user.lastName}}</span>
              </div>
              <div>
                <img class="img-endConversation" src="../../assets/chat/Fin_de_conversacion.png" alt />
              </div>
            </div>
          </a-col>
        </a-row>
			</a-list-item>
		</a-list>
	</div>
</template>

<script>
const data = [
  {
    id: "1",
    user:{
      name: "John Brown",
      email: "prueba@inmersys.com",
      profile: "NAOS",
      position: "Gerente",
      points: 500
    }
  },
  {
    id: "2",
    user:{
      name: "Jim Green",
      email: "prueba@inmersys.com",
      profile: "NAOS",
      position: "Gerente",
      points: 500
    }
  },
  {
    id: "3",
    user:{
      name: "Joe Black",
      email: "prueba@inmersys.com",
      profile: "Farmacia",
      position: "-",
      points: 500
    }
  },
  {
    id: "4",
    user:{
      name: "Sam Fisher",
      email: "prueba@inmersys.com",
      profile: "Farmacia",
      position: "-",
      points: 500
    }
  },
  {
    id: "5",
    user:{
      name: "Master Chief",
      email: "prueba@inmersys.com",
      profile: "Farmacia",
      position: "-",
      points: 500
    }
  },
  {
    id: "6",
    user:{
      name: "Ella no te ama",
      email: "prueba@inmersys.com",
      profile: "Farmacia",
      position: "-",
      points: 500
    }
  },
  {
    id: "7",
    user:{
      name: "Josh Nicols",
      email: "prueba@inmersys.com",
      profile: "Farmacia",
      position: "-",
      points: 500
    }
  },
  {
    id: "8",
    user:{
      name: "Pantera Rosa",
      email: "prueba@inmersys.com",
      profile: "Farmacia",
      position: "-",
      points: 500
    }
  },
  {
    id: "9",
    user:{
      name: "Jefferson Gutierritos",
      email: "prueba@inmersys.com",
      profile: "Farmacia",
      position: "-",
      points: 500
    }
  },
  {
    id: "10",
    user:{
      name: "Alvin Yakitori",
      email: "prueba@inmersys.com",
      profile: "Farmacia",
      position: "-",
      points: 500
    }
  },
  {
    id: "1",
    user:{
      name: "John Brown",
      email: "prueba@inmersys.com",
      profile: "NAOS",
      position: "Gerente",
      points: 500
    }
  },
  {
    id: "2",
    user:{
      name: "Jim Green",
      email: "prueba@inmersys.com",
      profile: "NAOS",
      position: "Gerente",
      points: 500
    }
  },
  {
    id: "3",
    user:{
      name: "Joe Black",
      email: "prueba@inmersys.com",
      profile: "Farmacia",
      position: "-",
      points: 500
    }
  },
  {
    id: "4",
    user:{
      name: "Sam Fisher",
      email: "prueba@inmersys.com",
      profile: "Farmacia",
      position: "-",
      points: 500
    }
  },
  {
    id: "5",
    user:{
      name: "Master Chief",
      email: "prueba@inmersys.com",
      profile: "Farmacia",
      position: "-",
      points: 500
    }
  },
  {
    id: "6",
    user:{
      name: "Ella no te ama",
      email: "prueba@inmersys.com",
      profile: "Farmacia",
      position: "-",
      points: 500
    }
  },
  {
    id: "7",
    user:{
      name: "Josh Nicols",
      email: "prueba@inmersys.com",
      profile: "Farmacia",
      position: "-",
      points: 500
    }
  },
  {
    id: "8",
    user:{
      name: "Pantera Rosa",
      email: "prueba@inmersys.com",
      profile: "Farmacia",
      position: "-",
      points: 500
    }
  }
];
export default {
	name: "ChatsList",
	data() {
		return {
      chats: [],
		}
  },
  async mounted() {
    try {
      const response = await this.$axios("/message/list");

      this.chats = response.data.conversations;
      
    } catch (error) {
      console.log("Hubo un error: ", error.message);
    }
  },
  methods: {
    onOpenConversation(user) {
      this.$emit('openConversation', user);
    }
  }
}
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
</style>