<template>
  <div>
    <a-Row :gutter="24">
      <a-col :span="7">
        <a-row>
          <a-card style="width:100%; min-height:300px;">
            <h1 class="title-theme">BIODERMA GAMES</h1>
            <a-divider />
            <div style="height:90px; text-align:center">
              <img
                style="max-width:15rem; max-height: 10rem"
                :src="general.biodermaGameImage"
                centered
              />
            </div>
            <template>
              <a-button
                style="margin-top:5rem;"
                shape="circle"
                icon="plus"
                size="small"
                @click="addImageModal=true"
              />
              <span class="spaceButton">Añadir Imagen</span>
            </template>
          </a-card>
        </a-row>
      </a-col>
      <a-col :span="7">
        <a-row>
          <a-card style="width:100%; min-height:300px;">
            <h1 class="title-theme">Bioderma Games Blog</h1>
            <a-divider />
            <div style="height:90px; text-align:center">
              <img
                style="max-width:15rem; max-height: 10rem"
                :src="general.biodermaGameCampaingImage"
                centered
              />
            </div>
            <template>
              <a-button
                style="margin-top:5rem;"
                shape="circle"
                icon="plus"
                size="small"
                @click="addImageModalC=true"
              />
              <span class="spaceButton">Añadir Imagen</span>
            </template>
          </a-card>
        </a-row>
      </a-col>
      <a-col :span="7">
        <a-row>
          <a-card style="width:100%; min-height:300px;">
            <h1 class="title-theme">Bioderma Games Campaña</h1>
            <a-divider />
            <div style="height:90px; text-align:center">
              <img
                style="max-width:15rem; max-height: 10rem"
                :src="general.biodermaGameBlogImage"
                centered
              />
            </div>
            <template>
              <a-button
                style="margin-top:5rem;"
                shape="circle"
                icon="plus"
                size="small"
                @click="addImageModalB=true"
              />
              <span class="spaceButton">Añadir Imagen</span>
            </template>
          </a-card>
        </a-row>
      </a-col>
      <a-col :span="3">
        <a-modal title="Añadir una imagen" v-model="addImageModal" centered>
          <a-form :form="imageForm">
            <a-form-item>
              <div class="dropbox">
                <a-upload-dragger
                  :value="this.imageAux"
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
                  action="https://bioderma-desarrollo.herokuapp.com/upload/2"
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
            >ACEPTAR</a-button>
          </template>
        </a-modal>
        <a-modal title="Añadir una imagen" v-model="addImageModalB" centered>
          <a-form :form="imageFormB">
            <a-form-item>
              <div class="dropbox">
                <a-upload-dragger
                  :value="this.imageAuxB"
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
                  action="https://bioderma-desarrollo.herokuapp.com/upload/2"
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
              @click="onSubmitPictureFormB"
            >ACEPTAR</a-button>
          </template>
        </a-modal>
        <a-modal title="Añadir una imagen" v-model="addImageModalC" centered>
          <a-form :form="imageFormC">
            <a-form-item>
              <div class="dropbox">
                <a-upload-dragger
                  :value="this.imageAuxC"
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
                  action="https://bioderma-desarrollo.herokuapp.com/upload/2"
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
              @click="onSubmitPictureFormC"
            >ACEPTAR</a-button>
          </template>
        </a-modal>
        <a-switch
          style="margin-left:60px; margin-top:30px;"
          defaultChecked
          @click="BiodermaGames"
          :checked="this.switchBGame"
        ></a-switch>
      </a-col>
      {{word}} Bioderma Games
    </a-Row>
    <a-Row :gutter="4">
      <a-col :span="14" style="margin-top: 50px;">
        <a-row>
          <h1 class="title-theme">SELECCIONA UN TEMA PARA LA APLICACIÓN</h1>
        </a-row>
        <a-row class="main-phones">
          <div v-bind:class="[{ borderPhone: selected.phone1 }]">
            <!-- Spring -->
            <a-row class="container-phone">
              <img class="img-phone" src="../assets/theme/iPhone_001.png" alt />
              <a-row class="container-palette">
                <div class="color-palette" style="background: #95DB95"></div>
                <div class="color-palette" style="background: #449C44"></div>
                <div class="color-palette" style="background: #1C541C"></div>
              </a-row>
              <div style="text-align:center;">
                <a-button
                  key="submit"
                  type="primary"
                  style="background: #449C44; border: none;"
                  class="btn-cel"
                  @click="changeSessionColor(1)"
                >APLICAR</a-button>
              </div>
            </a-row>
          </div>
          <div v-bind:class="[{ borderPhone: selected.phone2 }]">
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
          <div v-bind:class="[{ borderPhone: selected.phone3 }]">
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
          <div v-bind:class="[{ borderPhone: selected.phone4 }]">
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
            <img :src="StoreStatus" style="width: 100%; height: 100%" />
          </a-card>
        </a-row>
      </a-col>
      <a-col :span="3">
        <a-switch
          style="margin-left:60px; margin-top:80px;"
          defaultChecked
          @click="StoreCheck"
          :checked="this.switchClubB"
        ></a-switch>
      </a-col>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{wordStore}} Tienda
    </a-Row>
  </div>
</template>
<script>
const data = [];
export default {
  data() {
    return {
      selected: {
        phone1: false,
        phone2: false,
        phone3: false,
        phone4: false
      },
      word: "Desactivar",
      wordStore: "Desactivar",
      addImageModal: false,
      addImageModalB: false,
      addImageModalC: false,
      image: "",
      imageAux: null,
      imageAuxC: null,
      imageAuxB: null,
      imageForm: this.$form.createForm(this),
      imageFormB: this.$form.createForm(this),
      imageFormC: this.$form.createForm(this),
      isClubBiodermaActive: true,
      isBiodermaGameActive: true,
      biodermaGameImage: "",
      biodermaGameCampaingImage: "",
      biodermaGameBlogImage: "",
      fileList: [],
      fileListC: [],
      fileListB: [],
      StoreStatus: "",
      switchBGame: true,
      switchClubB: true,
      theme: 1,
      general: [
        {
          id: 0,
          isClubBiodermaActive: true,
          theme: 1,
          isBiodermaGameActive: true,
          biodermaGameImage: "",
          biodermaGameCampaingImage: "",
          biodermaGameBlogImage: ""
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
      this.switchClubB = responseGeneral.data.general.isClubBiodermaActive;
      this.switchBGame = responseGeneral.data.general.isBiodermaGameActive;
      this.storeStatusImage(this.switchClubB);
      this.themesStatus(responseGeneral.data.general.themes);
      if (this.switchBGame == true) {
        this.word = "Desactivar";
      } else {
        this.word = "Activar";
      }
      if (this.switchClubB == true) {
        this.wordStore = "Desactivar";
      } else {
        this.wordStore = "Activar";
      }
    },
    storeStatusImage(value) {
      //console.log(value);
      if (value == false) {
        this.StoreStatus =
          "https://bioderma-space.sfo2.cdn.digitaloceanspaces.com/assets/TiendaCerrada.png";
      } else if (value == true) {
        this.StoreStatus =
          "https://bioderma-space.sfo2.cdn.digitaloceanspaces.com/assets/TiendaAbierta.png";
      }
    },
    themesStatus(num) {
      //console.log(num);
      if (num == 1) {
        this.selected.phone1 = true;
        this.selected.phone2 = false;
        this.selected.phone3 = false;
        this.selected.phone4 = false;
      } else if (num == 2) {
        this.selected.phone2 = true;
        this.selected.phone1 = false;
        this.selected.phone3 = false;
        this.selected.phone4 = false;
      } else if (num == 3) {
        this.selected.phone3 = true;
        this.selected.phone2 = false;
        this.selected.phone1 = false;
        this.selected.phone4 = false;
      } else if (num == 4) {
        this.selected.phone4 = true;
        this.selected.phone2 = false;
        this.selected.phone3 = false;
        this.selected.phone1 = false;
      }
    },
    StoreCheck(value) {
      //console.log(value);
      const component = this;
      if (value) {
        this.$confirm({
          title: "TIENDA",
          content: "¿Deseas activar Tienda?",
          okText: "ACTIVAR",
          cancelText: "CANCELAR",
          onOk() {
            component.postStore(value);
            component.wordStore = "Desactivar";
            component.StoreStatus =
              "https://bioderma-space.sfo2.cdn.digitaloceanspaces.com/assets/TiendaAbierta.png";
          },
          onCancel() {
            component.switchClubB = false;
          }
        });
      } else {
        this.$confirm({
          title: "TIENDA",
          content: "¿Deseas desactivar Tienda?",
          okText: "DESACTIVAR",
          cancelText: "CANCELAR",
          onOk() {
            component.postStore(value);
            component.wordStore = "Activar";
            component.StoreStatus =
              "https://st2.depositphotos.com/1259239/9745/vhttps://bioderma-space.sfo2.cdn.digitaloceanspaces.com/assets/TiendaCerrada.png";
          },
          onCancel() {
            component.switchClubB = true;
          }
        });
      }
    },
    success() {
      this.$notification["success"]({
        message: "TEMA CAMBIADO",
        description: (
          <div>
            <p>El tema ha sido cambiado correctamente</p>
          </div>
        )
      });
    },
    BiodermaGames(value) {
      //console.log(value);
      //this.postBiodermaG(value);
      const component = this;
      if (value) {
        this.$confirm({
          title: "BIODERMA GAMES",
          content: "¿Deseas activar Bioderma Games?",
          okText: "ACTIVAR",
          cancelText: "CANCELAR",
          onOk() {
            component.postBiodermaG(value);
            component.word = "Desactivar";
          },
          onCancel() {
            component.switchBGame = false;
          }
        });
      } else {
        this.$confirm({
          title: "BIODERMA GAMES",
          content: "¿Deseas desactivar Bioderma Games?",
          okText: "DESACTIVAR",
          cancelText: "CANCELAR",
          onOk() {
            component.postBiodermaG(value);
            component.word = "Activar";
          },
          onCancel() {
            component.switchBGame = true;
          }
        });
      }
    },
    async postStore(value) {
      //console.log(value);
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
      this.success();
    },
    changeSessionColor(num) {
      //console.log(num);
      const component = this;
      this.$confirm({
        title: "¿DESEAS APLICAR ESTE NUEVO TEMA A LA APLICACIÓN?",
        content: "",
        okText: "APLICAR",
        cancelText: "CANCELAR",
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
    async postImageCampaign() {
      try {
        const responseImageCampaign = await this.$axios.post(
          "configutarion/campaingimage",
          {
            biodermaGameCampaingImage: this.fileList[0].response
          }
        );
      } catch (error) {
        console.log(error);
      }
      this.getGeneral();
    },
    async postImageBlog() {
      try {
        const responseImageBlog = await this.$axios.post(
          "configutarion/blogimage",
          {
            biodermaGameBlogImage: this.fileList[0].response
          }
        );
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
    beforeUploadB(file) {
      let status = true;
      this.imageFormB.validateFields((err, values) => {
        if (err) {
          if (err.menu || err.submenu || err.title) {
            status = false;
          }
        }
      });
      return status;
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
      this.fileList = [];
    },
    onSubmitPictureFormB() {
      this.imageFormB.validateFields((err, values) => {
        if (!err) {
          image: values.upload.fileList[0].response;
          //console.log(this.fileList[0].response);
          this.postImageBlog();
        } else {
          this.failAddingImage();
        }
      });
      this.addImageModalB = false;
      this.fileList = [];
    },
    onSubmitPictureFormC() {
      this.imageFormC.validateFields((err, values) => {
        if (!err) {
          image: values.upload.fileList[0].response;
          //console.log(this.fileList[0].response;
          this.postImageCampaign();
        } else {
          this.failAddingImage();
        }
      });
      this.addImageModalC = false;
      this.fileList = [];
    }
  }
};
</script>
<style>
.title-theme {
  text-align: left;
  color: #526987;
}
.spaceButton {
  padding-left: 1rem !important;
}
.main-phones {
  display: flex;
  margin-top: 20px;
}
.container-phone {
  display: flex;
  flex-direction: column;
}
.borderPhone {
  background: #d8d8d8;
  border-radius: 10px;
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