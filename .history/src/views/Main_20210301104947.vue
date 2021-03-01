<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <div class="side">
      <a-layout-sider collapsible v-model="collapsed">
        <div style="text-align:center; padding: 2rem 0rem;" class="side">
          <img
            alt="logo"
            src="../assets/Logo_NAOS_l_blanca_sintext.svg"
            class="naos-logo"
            slot="cover"
            width="50"
            v-if="collapsed"
          />
          <img
            alt="logo"
            src="../assets/Logo_NAOS_l_blanca.svg"
            class="naos-logo"
            slot="cover"
            width="184"
            v-else
          />
          <img
            alt="logo"
            src="../assets/Bioderma_Logo_blanco.svg"
            slot="cover"
            width="75"
          />
        </div>

        <div class="side">
          <a-menu
            style="background: #526987; "
            theme="dark"
            mode="inline"
            :selectedKeys="defaultKey"
            @click="onMenuSelect"
          >
            <a-menu-item class="menu-item" key="1">
              <img
                src="../assets/icons/Usuarios_Inactivo.png"
                class="icon"
                alt
              />
              <span v-if="!collapsed">Usuarios</span>
            </a-menu-item>
            <a-menu-item class="menu-item" key="10">
              <a-icon type="home" />
              <span v-if="!collapsed">Empresas</span>
            </a-menu-item>
            <a-menu-item class="menu-item" key="2">
              <img
                src="../assets/icons/Capacitacion_Inactivo.png"
                class="icon"
                alt
              />
              <span v-if="!collapsed">Capacitación</span>
            </a-menu-item>
            <a-menu-item class="menu-item" key="3">
              <img src="../assets/icons/Blog_Inactivo.png" class="icon" alt />
              <span v-if="!collapsed">Blog</span>
            </a-menu-item>
            <a-menu-item class="item" key="4">
              <img src="../assets/icons/Trivia_Inactivo.png" class="icon" alt />
              <span v-if="!collapsed">Campañas</span>
            </a-menu-item>
            <a-menu-item class="item" key="5">
              <img
                src="../assets/icons/Club_Bioderma_Inactivo.png"
                class="icon"
                alt
              />
              <span v-if="!collapsed">Club Bioderma</span>
            </a-menu-item>
            <a-menu-item class="item" key="6">
              <img
                src="../assets/icons/Notificacion_Inactivo.png"
                class="icon"
                alt
              />
              <span v-if="!collapsed">Notificaciones</span>
            </a-menu-item>
            <a-menu-item class="item" key="7">
              <a-badge status="success" v-if="isMessageWaiting" />
              <img
                src="../assets/icons/Mensajeria_Inactivo.png"
                class="icon"
                alt
              />
              <span v-if="!collapsed">Mensajeria</span>
            </a-menu-item>
            <a-menu-item class="item" key="8">
              <img src="../assets/icons/Temas_Inactivo.png" class="icon" alt />
              <span v-if="!collapsed">Configuración</span>
            </a-menu-item>
            <a-menu-item class="item" key="9">
              <a-icon type="poweroff" class="icon" />
              <span v-if="!collapsed">Cerrar sesión</span>
            </a-menu-item>
          </a-menu>
        </div>
      </a-layout-sider>
    </div>
    <a-layout>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', minHeight: '280px' }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
// import io from "socket.io";
import * as io from "socket.io-client";

export default {
  data() {
    return {
      collapsed: false,
      defaultKey: ["1"],
      alertSocket: null,
      isMessageWaiting: false
    };
  },
  methods: {
    onMenuSelect(e) {
      switch (e.key) {
        case "1":
          this.$router.push({ name: "users" });
          this.defaultKey = ["1"];
          break;
        case "2":
          this.$router.push({ name: "training" });
          this.defaultKey = ["2"];
          break;
        case "3":
          this.$router.push({ name: "blog" });
          this.defaultKey = ["3"];
          break;
        case "4":
          this.$router.push({ name: "campaing" });
          this.defaultKey = ["4"];
          break;
        case "5":
          this.$router.push({ name: "club" });
          this.defaultKey = ["5"];
          break;
        case "6":
          this.$router.push({ name: "notification" });
          this.defaultKey = ["6"];
          break;
        case "7":
          this.isMessageWaiting = false;
          this.$router.push({ name: "messaging" });
          this.defaultKey = ["7"];
          break;
        case "8":
          this.$router.push({ name: "themes" });
          this.defaultKey = ["8"];
          break;
        case "9":
          this.defaultKey = ["9"];
          this.$router.push({ name: "login" });
          break;
        case "10":
          this.defaultKey = ["10"];
          this.$router.push({ name: "business" });
          break;
        default:
          break;
      }
    }
  },
  mounted() {
    switch (this.$router.currentRoute.name.toString()) {
      case "users":
        this.defaultKey = ["1"];
        break;
      case "business":
        this.defaultKey = ["10"];
        break;
      case "training":
        this.defaultKey = ["2"];
        break;
      case "blog":
        this.defaultKey = ["3"];
        break;
      case "campaing":
        this.defaultKey = ["4"];
        break;
      case "club":
        this.defaultKey = ["5"];
        break;
      case "notification":
        this.defaultKey = ["6"];
        break;
      case "messaging":
        this.isMessageWaiting = false;
        this.defaultKey = ["7"];
        break;
      case "themes":
        this.defaultKey = ["8"];
        break;
      default:
        break;
    }
  },
  created() {
    this.alertSocket = io(
      "https://bioderma-api-inmersys.herokuapp.com/chatAdmin"
    );
    // this.alertSocket = io("http://localhost:3000/chatAdmin");

    this.alertSocket.on("alertToClient", msg => {
      // console.log("Socket msn: ", msg.message);
      if (msg) {
        this.$store.commit("setNewEmailToList", msg.message);
      }
      if (this.$router.currentRoute.name.toString() != "messaging") {
        this.isMessageWaiting = true;
        this.$notification.open({
          message: "Tienes un nuevo mensaje",
          description: "Puedes ver tu mensaje en la sección de mensajeria",
          icon: <a-icon type="mail" style="color: #108ee9" />
        });
      }
    });
    this.alertSocket.on("connect_error", error => {
      console.log("Server");
    });
  },
  destroyed() {
    if (this.alertSocket != null) {
      this.alertSocket.close();
    }
    // console.log("Destrido");
  }
};
</script>
<style>
#components-layout-demo-custom-trigger {
  height: 100%;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.side {
  max-width: 100%;
  background: #526987;
  /* padding-right: 12px;
  padding-left: 8px; */
}

.main-content {
  background: #fff;
}

.icon {
  width: 22px;
  margin-right: 10px;
}

.title-span-tag {
  color: #526987;
}

.ant-layout-sider,
.ant-layout-sider-trigger {
  background: #526987 !important;
}
</style>
