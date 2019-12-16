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
          @click="addImageModal=true"
        />
        <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AÑADIR IMAGEN
        <br />
        <br />
        <a-modal
          title="ACTIVAR BIODERMA GAMES"
          v-model="activateBioGames"
          okText="Si"
          cancelText="No"
          @ok="actBioGames"
        >
          <p>¿Estás seguro de activar Bioderma Games?</p>
        </a-modal>
        <a-modal
          title="DESACTIVAR BIODERMA GAMES"
          v-model="desactivateBioGames"
          okText="Si"
          cancelText="No"
          @ok="desBioGames"
        >
          <p>¿Estás seguro de desactivar Bioderma Games?</p>
        </a-modal>
        <a-modal
          title="ACTIVAR TIENDA"
          v-model="activateStore"
          okText="Si"
          cancelText="No"
          @ok="actStore"
        >
          <p>¿Estás seguro de activar la Tienda?</p>
        </a-modal>
        <a-modal
          title="DESACTIVAR BIODERMA GAMES"
          v-model="desactivateStore"
          okText="Si"
          cancelText="No"
          @ok="desStore"
        >
          <p>¿Estás seguro de desactivar la Tienda?</p>
        </a-modal>
        <a-modal title="Añadir una imagen" v-model="addImageModal" centered>
          <a-form :form="imageForm">
            <a-form-item>
              <div class="dropbox">
                <a-upload-dragger
                  v-decorator="[
                'upload',
                {
                  rules: [
                    {
                      required: false,
                      message: 'Favor de cargar un archivo JPG, PNG o JPGE'
                    }
                  ]
                }
              ]"
                  name="upload"
                  action="https://bioderma-api-inmersys.herokuapp.com/upload/2"
                  accept=".png, .jpg, jpge"
                  @change="handleChangeFileUpload"
                  :beforeUpload="beforeUpload"
                  :fileList="fileList"
                >
                  <p class="ant-upload-drag-icon">
                    <a-icon type="picture" />
                  </p>
                  <p class="ant-upload-text">Selecciona o suelta una imagen para tu producto</p>
                  <p class="ant-upload-hint">Unicamente archivos .png, .jpg o .jpge</p>
                </a-upload-dragger>
              </div>
            </a-form-item>
          </a-form>
          <template slot="footer">
            <a-button
              type="primary"
              style="background-color:#009FD1; border-radius: 24px; width: 200px; margin-bottom: 20px;"
              @click="onSubmitPictureForm"
            >Aceptar</a-button>
          </template>
        </a-modal>
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
                @click="changeSessionColor(1)"
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
                @click="changeSessionColor(2)"
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
                @click="changeSessionColor(3)"
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
                @click="changeSessionColor(4)"
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
      activateBioGames: false,
      desactivateBioGames: false,
      activateStore: false,
      desactivateStore: false,
      addImageModal: false,
      image: "",
      imageForm: this.$form.createForm(this),
      isClubBiodermaActive: true,
      isBiodermaGameActive: true,
      fileList: [],
      themes: 1,
      general: [
        {
          id: 0,
          isClubBiodermaActive: true,
          themes: 1,
          isBiodermaGameActive: true,
          biodermaGameImage: ""
        }
      ],
      data
    };
  },
  mounted() {
    this.getGeneral();
  },
  methods: {
    async getGeneral() {
      const responseGeneral = await this.$axios.get("configutarion/general");
      console.log(responseGeneral.data.general);
      this.general = responseGeneral.data.general;
    },
    Storechecked(value) {
      //console.log(value);
      if (value) {
        this.activateStore = true;
      } else {
        this.desactivateStore = true;
      }
    },
    failActStore() {
      this.$notification["error"]({
        message: "ERROR EN TIENDA",
        description:
          "Se ha proudcido un error intentando activar la tienda, favor de intentarlo más tarde"
      });
    },
    failDesStore() {
      this.$notification["error"]({
        message: "ERROR EN TIENDA",
        description:
          "Se ha proudcido un error intentando desactivar la tienda, favor de intentarlo más tarde"
      });
    },
    failActGames() {
      this.$notification["error"]({
        message: "ERROR EN BIODERMA GAMES",
        description:
          "Se ha proudcido un error intentando activar Bioderma Games, favor de intentarlo más tarde"
      });
    },
    failDesGames() {
      this.$notification["error"]({
        message: "ERROR EN TIENDA",
        description:
          "Se ha proudcido un error intentando desactivar Bioderma Games, favor de intentarlo más tarde"
      });
    },
    onSubmitPictureForm() {
      this.imageForm.validateFields((err, values) => {
        if (!err) {
          image: values.upload.fileList[0].response;
          //console.log(this.fileList[0].response);
        } else {
          console.log("Huevos");
        }
      });
    },
    successAddingImage() {
      //Agregando una imagen
    },
    failAddingImage() {
      this.$notification["error"]({
        message: "ERROR AL AÑADIR UNA IMAGEN",
        description:
          "Se ha proudcido un error añdiendo una imagen, favor de intentarlo más tarde."
      });
    },
    handleChangeFileUpload(info) {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      this.fileList = fileList;
    },
    beforeUpload(file) {
      let status = true;
      this.imageForm.validateFields((err, values) => {
        if (err) {
          if (err.menu || err.submenu || err.title) {
            status = false;
          }
        }
      });
      return status;
    },
    async actStore() {
      try {
        const responseStore = await this.$axios.post("configutarion/club", {
          isClubBiodermaActive: true
        });
        if (responseStore.data.status == 0) {
          this.getGeneral();
        } else {
          if (value) {
            this.failActStore;
          } else {
            this.failDesStore;
          }
        }
      } catch (error) {
        console.log(error);
      }
      this.activateStore = false;
    },
    async desStore() {
      try {
        const responseStore = await this.$axios.post("configutarion/club", {
          isClubBiodermaActive: false
        });
        if (responseStore.data.status == 0) {
          this.getGeneral();
        } else {
          if (value) {
            this.failActStore;
          } else {
            this.failDesStore;
          }
        }
      } catch (error) {
        console.log(error);
      }
      this.desactivateStore = false;
    },
    async actBioGames() {
      //console.log("activar");
      try {
        const responseBGames = await this.$axios.post(
          "configutarion/bioderma",
          {
            isClubBiodermaActive: true
          }
        );
        if (responseBGames.data.status == 0) {
          this.getGeneral();
        } else {
          if (value) {
            this.failActGames;
          } else {
            this.failDesGames;
          }
        }
      } catch (error) {
        console.log(error);
      }
      this.activateBioGames = false;
    },
    async desBioGames() {
      //console.log("desactivar");
      try {
        const responseBGames = await this.$axios.post(
          "configutarion/bioderma",
          {
            isClubBiodermaActive: false
          }
        );
        if (responseBGames.data.status == 0) {
          this.getGeneral();
        } else {
          if (value) {
            this.failActGames;
          } else {
            this.failDesGames;
          }
        }
      } catch (error) {
        console.log(error);
      }
      this.desactivateBioGames = false;
    },
    checkedBioderma(value) {
      if (value) {
        this.activateBioGames = true;
      } else {
        this.desactivateBioGames = true;
      }
    },
    async getThemes(num) {
      try {
        const responseThemes = await this.$axios.post("configutarion/theme", {
          themes: this.num
        });
      } catch (error) {
        console.log(error);
      }
      this.getGeneral();
    },
    changeSessionColor(num) {
      console.log(num);
      const component = this;
      this.$confirm({
        title: "¿QUE TAL ESTE TEMA PARA TU APLICACIÓN?",
        content: "",
        onOk() {
          component.getThemes(num);
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