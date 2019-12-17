<template>
  <div>
    <a-Row :gutter="2">
      <a-col :span="21">
        <a-row>
          <a-card style="width:100%; min-height:300px;">
            <h1 class="title-theme">BIODERMA GAMES</h1>
            <a-divider />
            <div style="height:90px; text-align:center">
              <img
                style="max-width:35rem; margin-left:50px;"
                :src="general.biodermaGameImage"
                centered
              />
            </div>
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
        <a-switch style="margin-left:60px; margin-top:30px;" defaultChecked @click="BiodermaGames"></a-switch>
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
        <a-switch style="margin-left:80px; margin-top:80px;" defaultChecked @click="StoreCheck"></a-switch>
      </a-col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Activar Tienda
    </a-Row>
  </div>
</template>
<script>
const data = [];
export default {
  data() {
    return {
      addImageModal: false,
      image: "",
      imageForm: this.$form.createForm(this),
      isClubBiodermaActive: true,
      isBiodermaGameActive: true,
      biodermaGameImage: "",
      fileList: [],
      theme: 1,
      general: [
        {
          id: 0,
          isClubBiodermaActive: true,
          theme: 1,
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
      //console.log(responseGeneral.data.general.biodermaGameImage);
    },
    StoreCheck(value) {
      //console.log(value);
      const component = this;
      if (value) {
        this.$confirm({
          title: "TIENDA",
          content: "¿Deseas activar Tienda?",
          onOk() {
            component.postStore(value);
          },
          onCancel() {}
        });
      } else {
        this.$confirm({
          title: "TIENDA",
          content: "¿Deseas desactivar Tienda?",
          onOk() {
            component.postStore(value);
          },
          onCancel() {}
        });
      }
    },
    BiodermaGames(value) {
      //console.log(value);
      //this.postBiodermaG(value);
      const component = this;
      if (value) {
        this.$confirm({
          title: "BIODERMA GAMES",
          content: "¿Deseas activar Bioderma Games?",
          onOk() {
            component.postBiodermaG(value);
          },
          onCancel() {}
        });
      } else {
        this.$confirm({
          title: "BIODERMA GAMES",
          content: "¿Deseas desactivar Bioderma Games?",
          onOk() {
            component.postBiodermaG(value);
          },
          onCancel() {}
        });
      }
    },
    async postStore(value) {
      console.log(value);
      try {
        const responseBiodermaGames = await this.$axios.post(
          "configutarion/club",
          {
            isClubBiodermaActive: value
          }
        );
      } catch (error) {
        console.log(error);
      }
      this.getGeneral();
    },
    async postBiodermaG(value) {
      //console.log(value);
      try {
        const responseBiodermaGames = await this.$axios.post(
          "configutarion/bioderma",
          {
            isBiodermaGameActive: value
          }
        );
      } catch (error) {
        console.log(error);
      }
      this.getGeneral();
    },
    async getThemes(num) {
      try {
        const responseThemes = await this.$axios.post("configutarion/theme", {
          theme: num
        });
      } catch (error) {
        console.log(error);
      }
      this.getGeneral();
    },
    changeSessionColor(num) {
      //console.log(num);
      const component = this;
      this.$confirm({
        title: "¿QUE TAL ESTE TEMA PARA TU APLICACIÓN?",
        content: "",
        onOk() {
          component.getThemes(num);
        },
        onCancel() {}
      });
    },
    async postImage() {
      //console.log(this.fileList[0].response);
      try {
        const responseImage = await this.$axios.post("configutarion/image", {
          biodermaGameImage: this.fileList[0].response
        });
      } catch (error) {
        console.log(error);
      }
      this.getGeneral();
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
    failAddingImage() {
      this.$notification["error"]({
        message: "ERROR AL AÑADIR UNA IMAGEN",
        description:
          "Se ha proudcido un error añdiendo una imagen, favor de intentarlo más tarde."
      });
    },
    onSubmitPictureForm() {
      this.imageForm.validateFields((err, values) => {
        if (!err) {
          image: values.upload.fileList[0].response;
          //console.log(this.fileList[0].response);
          this.postImage();
        } else {
          this.failAddingImage();
        }
      });
      this.addImageModal = false;
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