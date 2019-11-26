<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <div class="side">
      <a-layout-sider>
        <div style="text-align:center; padding: 2rem 0rem;" class="side">
          <img
            alt="logo"
            src="../assets/Logo_NAOS_l_blanca.svg"
            class="naos-logo"
            slot="cover"
            width="184"
          />
          <img alt="logo" src="../assets/Bioderma_Logo_blanco.svg" slot="cover" width="75" />
        </div>

        <div class="side">
          <a-menu
            style="background: #526987; "
            theme="dark"
            mode="inline"
            :defaultSelectedKeys="['1']"
            @click="onMenuSelect"
          >
            <a-menu-item class="menu-item" key="1">
              <img src="../assets/icons/Usuarios_Inactivo.png" class="icon" alt />
              <span>Usuarios</span>
            </a-menu-item>
            <a-menu-item class="menu-item" key="2">
              <img src="../assets/icons/Capacitacion_Inactivo.png" class="icon" alt />
              <span>Capacitación</span>
            </a-menu-item>
            <a-menu-item class="menu-item" key="3">
              <img src="../assets/icons/Blog_Inactivo.png" class="icon" alt />
              <span>Blog</span>
            </a-menu-item>
            <a-menu-item class="item" key="4">
              <img src="../assets/icons/Trivia_Inactivo.png" class="icon" alt />
              <span>Trivia</span>
            </a-menu-item>
            <a-menu-item class="item" key="5">
              <img src="../assets/icons/Club_Bioderma_Inactivo.png" class="icon" alt />
              <span>Club Bioderma</span>
            </a-menu-item>
            <a-menu-item class="item" key="6">
              <img src="../assets/icons/Notificacion_Inactivo.png" class="icon" alt />
              <span>Notificaciones</span>
            </a-menu-item>
            <a-menu-item class="item" key="7">
              <img src="../assets/icons/Mensajeria_Inactivo.png" class="icon" alt />
              <span>Mensajeria</span>
            </a-menu-item>
            <a-menu-item class="item" key="8">
              <img src="../assets/icons/Temas_Inactivo.png" class="icon" alt />
              <span>Temas</span>
            </a-menu-item>
          </a-menu>
        </div>
      </a-layout-sider>
    </div>
    <a-layout>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', minHeight: '280px' }">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false
    };
  },
  methods: {
    onMenuSelect(e) {
      switch (e.key) {
        case "1":
          this.$router.push({ name: "users" });
          break;
        case "2":
          this.$router.push({ name: "training" });
          break;
        case "3":
          this.$router.push({ name: "blog" });
          break;
        case "4":
          this.$router.push({ name: "campaing" });
          break;
        case "5":
          this.$router.push({ name: "club" });
          break;
        case "6":
          this.$router.push({ name: "notification" });
          break;
        case "7":
          this.$router.push({ name: "messaging" });
          break;
        case "8":
          this.$router.push({ name: "themes" });
          break;
        default:
          break;
      }
    }
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
  padding-right: 12px;
  padding-left: 8px;
}

.main-content {
  background: #fff;
}

.icon {
  width: 22px;
  margin-right: 10px;
}
</style>
