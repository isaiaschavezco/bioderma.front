<template>
  <div>
    <a-row>
      <h1 class="title-theme">Selecciona un tema para la aplicacion</h1>
    </a-row>
    <a-row class="main-phones">
      <div>
        <a-row class="container-phone">
          <img class="img-phone" src="../assets/theme/cel.jpg" alt />
          <a-row class="container-palette">
            <div class="color-palette" style="background: #93FF00"></div>
            <div class="color-palette" style="background: #55FF00"></div>
            <div class="color-palette" style="background: #E4FF00"></div>
            <div class="color-palette" style="background: #D4FF00"></div>
          </a-row>
          <a-button
            key="submit"
            type="primary"
            class="btn-cel"
            :loading="inviteUserLoading"
            @click="onSubmitInvitationForm"
          >APLICAR</a-button>
        </a-row>
      </div>
      <div>
        <a-row class="container-phone">
          <img class="img-phone" src="../assets/theme/cel.jpg" alt />
          <a-row class="container-palette">
            <div class="color-palette" style="background: #FFB900"></div>
            <div class="color-palette" style="background: #FFCA3D"></div>
            <div class="color-palette" style="background: #FF7515"></div>
            <div class="color-palette" style="background: #FF2E15"></div>
          </a-row>
          <a-button
            key="submit"
            type="primary"
            class="btn-cel"
            :loading="inviteUserLoading"
            @click="onSubmitInvitationForm"
          >APLICAR</a-button>
        </a-row>
      </div>
      <div>
        <a-row class="container-phone">
          <img class="img-phone" src="../assets/theme/cel.jpg" alt />
          <a-row class="container-palette">
            <div class="color-palette" style="background: #15F4FF"></div>
            <div class="color-palette" style="background: #15B1FF"></div>
            <div class="color-palette" style="background: #1563FF"></div>
            <div class="color-palette" style="background: #152EFF"></div>
          </a-row>
          <a-button
            key="submit"
            type="primary"
            class="btn-cel"
            :loading="inviteUserLoading"
            @click="onSubmitInvitationForm"
          >APLICAR</a-button>
        </a-row>
      </div>
      <div>
        <a-row class="container-phone">
          <img class="img-phone" src="../assets/theme/cel.jpg" alt />
          <a-row class="container-palette">
            <div class="color-palette" style="background: #93FF00"></div>
            <div class="color-palette" style="background: #55FF00"></div>
            <div class="color-palette" style="background: #E4FF00"></div>
            <div class="color-palette" style="background: #D4FF00"></div>
          </a-row>
          <a-button
            key="submit"
            type="primary"
            class="btn-cel"
            :loading="inviteUserLoading"
            @click="onSubmitInvitationForm"
          >APLICAR</a-button>
        </a-row>
      </div>
    </a-row>
  </div>
</template>
<script>
const data = [
  {
    color: "#000"
  }
];
export default {
  data() {
    return {
      data
    };
  }
};
</script>
<style>
.title-theme {
  text-align: left;
}
.main-phones {
  display: flex;
  justify-content: center;
}
.container-phone {
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.img-phone {
  width: 100%;
  margin: 0 auto;
}

.btn-cel {
  background-color: #009fd1;
  margin: 0 auto;
  border-radius: 35px;
  width: 50%;
}

.container-palette {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.color-palette {
  width: 12%;
  height: 30px;
  background: red;
  margin: 10px;
  padding: 4px;
  border-radius: 5px;
}
</style>