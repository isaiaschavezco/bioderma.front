<template>
  <div>
    <a-row>
      <a-col :xs="{ span: 19 } ">
        <div class="main-chat">
          <div class="container-chat">
            <div class="container-chat-header">
              <div class="title-chat">Dr Strange</div>
              <div class="end-chat">
                <button class="btn-end-chat">
                  <span>Finalizar Conversación</span>
                  <img class="img-chat" src="../assets/chat/Fin_de_conversacion.png" alt />
                </button>
              </div>
            </div>
          </div>
          <div class="container-chat-inputs">
            <div class="inputs-chat">
              <a-input placeholder="Escribe un mensaje" style="width: 95%; margin-right:10px" />
              <a-button type="primary" shape="circle" icon="right-circle" :size="size" />
            </div>
          </div>
        </div>
      </a-col>
      <a-col :xs="{ span: 5 }">
        <div class="container-contacts" style>
          <div class="container-contacts-title">
            <span>CHATS</span>
          </div>
          <a-list
            :grid="{ gutter: 2 }"
            :style="{ overflow: 'scroll'}"
            style="height: 38.5rem;"
            :dataSource="data"
          >
            <a-list-item slot="renderItem" slot-scope="item, index">
              <div class="container-contacts-name">
                <div>
                  <span>{{item.name}}</span>
                </div>
                <div>
                  <img class="img-chat" src="../assets/chat/Fin_de_conversacion.png" alt />
                </div>
              </div>
            </a-list-item>
          </a-list>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
const data = [
  {
    key: "1",
    name: "John Brown",
    email: "prueba@inmersys.com",
    profile: "NAOS",
    position: "Gerente",
    points: 500
  },
  {
    key: "2",
    name: "Jim Green",
    email: "prueba@inmersys.com",
    profile: "NAOS",
    position: "Gerente",
    points: 500
  },
  {
    key: "3",
    name: "Joe Black",
    email: "prueba@inmersys.com",
    profile: "Farmacia",
    position: "-",
    points: 500
  },
  {
    key: "4",
    name: "Sam Fisher",
    email: "prueba@inmersys.com",
    profile: "Farmacia",
    position: "-",
    points: 500
  },
  {
    key: "5",
    name: "Master Chief",
    email: "prueba@inmersys.com",
    profile: "Farmacia",
    position: "-",
    points: 500
  },
  {
    key: "6",
    name: "Ella no te ama",
    email: "prueba@inmersys.com",
    profile: "Farmacia",
    position: "-",
    points: 500
  },
  {
    key: "7",
    name: "Josh Nicols",
    email: "prueba@inmersys.com",
    profile: "Farmacia",
    position: "-",
    points: 500
  },
  {
    key: "8",
    name: "Pantera Rosa",
    email: "prueba@inmersys.com",
    profile: "Farmacia",
    position: "-",
    points: 500
  },
  {
    key: "9",
    name: "Jefferson Gutierritos",
    email: "prueba@inmersys.com",
    profile: "Farmacia",
    position: "-",
    points: 500
  },
  {
    key: "10",
    name: "Alvin Yakitori",
    email: "prueba@inmersys.com",
    profile: "Farmacia",
    position: "-",
    points: 500
  },
  {
    key: "1",
    name: "John Brown",
    email: "prueba@inmersys.com",
    profile: "NAOS",
    position: "Gerente",
    points: 500
  },
  {
    key: "2",
    name: "Jim Green",
    email: "prueba@inmersys.com",
    profile: "NAOS",
    position: "Gerente",
    points: 500
  },
  {
    key: "3",
    name: "Joe Black",
    email: "prueba@inmersys.com",
    profile: "Farmacia",
    position: "-",
    points: 500
  },
  {
    key: "4",
    name: "Sam Fisher",
    email: "prueba@inmersys.com",
    profile: "Farmacia",
    position: "-",
    points: 500
  },
  {
    key: "5",
    name: "Master Chief",
    email: "prueba@inmersys.com",
    profile: "Farmacia",
    position: "-",
    points: 500
  },
  {
    key: "6",
    name: "Ella no te ama",
    email: "prueba@inmersys.com",
    profile: "Farmacia",
    position: "-",
    points: 500
  },
  {
    key: "7",
    name: "Josh Nicols",
    email: "prueba@inmersys.com",
    profile: "Farmacia",
    position: "-",
    points: 500
  },
  {
    key: "8",
    name: "Pantera Rosa",
    email: "prueba@inmersys.com",
    profile: "Farmacia",
    position: "-",
    points: 500
  }
];
const chat = [];
export default {
  data() {
    return {
      data,
      chat
    };
  },
  methods: {
    selectUser() {
      alert("Usuario Seleccionado: ");
    }
  }
};
</script>
<style>
.main-chat {
  margin-right: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.container-chat {
  background: #fff;
  overflow: hidden;
  height: 45em;
  display: flex;
  flex-direction: column;
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

.end-chat,
.title-chat {
  margin: 0 4em;
}

.img-chat {
  width: 30px;
  margin-left: 10px;
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
  height: 50em;
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

.container-contacts-name {
  display: flex;
  justify-content: space-between;
  padding: 0 3em;
}
</style>
