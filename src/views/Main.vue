<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider collapsible v-model="collapsed">
      <div class="logo" />
      <!-- <div style="text-align:center; margin: 2rem 0rem;">
        <img alt="logo" src="../assets/logo.png" slot="cover" width="80%" height="70rem" />
      </div>-->
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']" @click="onMenuSelect">
        <a-menu-item key="1">
          <a-icon type="user" />
          <span>Usuarios</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="video-camera" />
          <span>Capacitación</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="upload" />
          <span>Blog</span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="upload" />
          <span>Trivia</span>
        </a-menu-item>
        <a-menu-item key="5">
          <a-icon type="upload" />
          <span>Club Bioderma</span>
        </a-menu-item>
        <a-menu-item key="6">
          <a-icon type="upload" />
          <span>Notificaciones</span>
        </a-menu-item>
        <a-menu-item key="7">
          <a-icon type="upload" />
          <span>Mensajeria</span>
        </a-menu-item>
        <a-menu-item key="8">
          <a-icon type="upload" />
          <span>Temas</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
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
        case "4":
          this.$router.push({ name: "campaing" });
          break;
        case "5":
          this.$router.push({ name: "club" });
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
</style>
