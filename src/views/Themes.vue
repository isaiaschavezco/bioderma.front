<template>
  <div>
    <a-Row :gutter="2">
      <a-col :span="21">
        <a-row>
          <a-card style="width:100%; min-height:300px;">
            <h1 class="title-theme">BIODERMA GAMES</h1>
            <a-divider />
          </a-card>
        </a-row>
      </a-col>
      <a-col :span="3">
        <a-button
          shape="circle"
          icon="plus"
          size="large"
          style="margin-left:60px; margin-top:50px;"
        />
        <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AÑADIR IMAGEN
        <br />
        <br />
        <a-switch
          style="margin-left:60px; margin-top:30px;"
          defaultChecked
          @change="checkedBioderma"
        ></a-switch>
      </a-col>Activar Bioderma Games
    </a-Row>
    <a-Row :gutter="4">
      <a-col :span="14" style="margin-top: 50px;">
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
      </a-col>
      <a-col :span="7" style="margin-top: 50px;">
        <a-row>
          <a-card style="height:500px; margin-left:60px;">
            <h1 class="title-theme">TIENDA</h1>
            <a-divider />
          </a-card>
        </a-row>
      </a-col>
      <a-col :span="3">
        <a-switch style="margin-left:80px; margin-top:80px;" defaultChecked @change="Storechecked"></a-switch>
      </a-col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Activar Tienda
    </a-Row>
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
    Storechecked(value) {
      console.log(value);
    },
    checkedBioderma(value) {
      console.log(value);
    },
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