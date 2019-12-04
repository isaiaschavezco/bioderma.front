<template>
  <div>
    <a-row>
      <h1 class="title-theme">SELECCIONA UN TEMA PARA LA APLICACIÓN</h1>
    </a-row>
    <a-row class="main-phones">
      <div>
        <!-- Spring -->
        <a-row class="container-phone">
          <img class="img-phone" src="../assets/theme/iPhone_001.png" alt />
          <a-row class="container-palette">
            <div class="color-palette" style="background: #95DB95"></div>
            <div class="color-palette" style="background: #449C44"></div>
            <div class="color-palette" style="background: #1C541C"></div>
          </a-row>
          <a-button
            key="submit"
            type="primary"
            style="background: #449C44; border: none;"
            class="btn-cel"
            @click="changeSessionColor"
          >APLICAR</a-button>
        </a-row>
      </div>
      <div>
        <!-- Summer -->
        <a-row class="container-phone">
          <img class="img-phone" src="../assets/theme/iPhone_001.png" alt />
          <a-row class="container-palette">
            <div class="color-palette" style="background: #EEC795"></div>
            <div class="color-palette" style="background: #F99F28"></div>
            <div class="color-palette" style="background: #AF6B11"></div>
          </a-row>
          <a-button
            key="submit"
            type="primary"
            style="background: #F99F28; border: none;"
            class="btn-cel"
            @click="changeSessionColor"
          >APLICAR</a-button>
        </a-row>
      </div>
      <div>
        <!-- Autumn -->
        <a-row class="container-phone">
          <img class="img-phone" src="../assets/theme/iPhone_001.png" alt />
          <a-row class="container-palette">
            <div class="color-palette" style="background: #A31A29"></div>
            <div class="color-palette" style="background: #AB6870"></div>
            <div class="color-palette" style="background: #E89DA6"></div>
          </a-row>
          <a-button
            key="submit"
            type="primary"
            style="background: #AB6870; border: none;"
            class="btn-cel"
            @click="changeSessionColor"
          >APLICAR</a-button>
        </a-row>
      </div>
      <div>
        <!-- Winter -->
        <a-row class="container-phone">
          <img class="img-phone" src="../assets/theme/iPhone_001.png" alt />
          <a-row class="container-palette">
            <div class="color-palette" style="background: #80C7E5"></div>
            <div class="color-palette" style="background: #009DE0"></div>
            <div class="color-palette" style="background: #0077AA"></div>
          </a-row>
          <a-button
            key="submit"
            type="primary"
            style="background: #0077AA; border: none;"
            class="btn-cel"
            @click="changeSessionColor"
          >APLICAR</a-button>
        </a-row>
      </div>
    </a-row>
  </div>
</template>
<script>
const data = [];
export default {
  data() {
    return {
      data
    };
  },
  methods: {
    changeSessionColor() {
      this.$confirm({
        title: "¿QUE TAL ESTE TEMA PARA TU APLICACIÓN?",
        content: "",
        onOk() {
          alert("Theme Actived");
        },
        onCancel() {}
      });
    }
  }
};
</script>
<style>
.title-theme {
  text-align: left;
  color: #526987;
}
.main-phones {
  display: flex;
  margin-top: 20px;
}
.container-phone {
  display: flex;
  flex-direction: column;
}

.img-phone {
  width: 55%;
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
  margin-top: 15px;
}

.color-palette {
  width: 50px;
  height: 50px;
  margin: 10px;
  padding: 4px;
  border-radius: 5px;
}
</style>