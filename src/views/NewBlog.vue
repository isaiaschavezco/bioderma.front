<template>
  <div>
    <a-row>
      <a-col :xs="{ span: 15 }" style="margin-top: 30px;">
        <div style="margin-right:25px; margin-bottom:20px">
          <a-card title="TITULO DEL BLOG" class="container">
            <a-form :form="fileForm">
              <a-form-item>
                <a-input
                  placeholder="Subtitulo"
                  v-decorator="[
                    'subtitle',
                    {
                      rules: [
                        { required: true, message: 'Favor de llenar el campo' }
                      ]
                    }
                  ]"
                />
              </a-form-item>
              <a-form-item>
                <!-- <a-textarea placeholder="Articulo" :rows="20" /> -->
                <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
              </a-form-item>
            </a-form>

            <a-divider class="divider" />
          </a-card>
        </div>
      </a-col>
      <a-col :xs="{ span: 7 }" style="margin-top: 30px">
        <div class="header-gallery-img">GALERIA DE IMAGENES</div>
        <div class="container-imgs" style>
          <a-row class="container-imgs">
            <div class="dropbox">
              <a-upload-dragger
                v-decorator="[
                'upload',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Favor de cargar un archivo PDF'
                    }
                  ]
                }
              ]"
                name="upload"
                action="https://bioderma-api-inmersys.herokuapp.com/upload/4"
                accept=".png, .jpg, jpge"
                @change="handleChangeFileUpload"
                :beforeUpload="beforeUpload"
                :fileList="fileList"
              >
                <p class="ant-upload-drag-icon">
                  <a-icon type="picture" />
                </p>
                <p class="ant-upload-text">Selecciona o suelta una imagen para el carrete</p>
                <p class="ant-upload-hint">Únicamente archivos .png, .jpg o .jpge</p>
              </a-upload-dragger>
            </div>
          </a-row>
          <a-row class="container-imgs">
            <div class="dropbox">
              <a-upload-dragger
                v-decorator="[
                'upload',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Favor de cargar un archivo PDF'
                    }
                  ]
                }
              ]"
                name="upload"
                action="https://bioderma-api-inmersys.herokuapp.com/upload/4"
                accept=".png, .jpg, jpge"
                @change="handleChangeFileUpload"
                :beforeUpload="beforeUpload"
                :fileList="fileList"
              >
                <p class="ant-upload-drag-icon">
                  <a-icon type="picture" />
                </p>
                <p class="ant-upload-text">Selecciona o suelta una imagen para el carrete</p>
                <p class="ant-upload-hint">Únicamente archivos .png, .jpg o .jpge</p>
              </a-upload-dragger>
            </div>
          </a-row>
          <a-row class="container-imgs">
            <div class="dropbox">
              <a-upload-dragger
                v-decorator="[
                'upload',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Favor de cargar un archivo PDF'
                    }
                  ]
                }
              ]"
                name="upload"
                action="https://bioderma-api-inmersys.herokuapp.com/upload/4"
                accept=".png, .jpg, jpge"
                @change="handleChangeFileUpload"
                :beforeUpload="beforeUpload"
                :fileList="fileList"
              >
                <p class="ant-upload-drag-icon">
                  <a-icon type="picture" />
                </p>
                <p class="ant-upload-text">Selecciona o suelta una imagen para el carrete</p>
                <p class="ant-upload-hint">Únicamente archivos .png, .jpg o .jpge</p>
              </a-upload-dragger>
            </div>
          </a-row>
        </div>
        <div class="container-imgs">
          <a-form>
            <a-input placeholder="Nombre de etiqueta" style="width: 80%; margin: 0 10;">
              <a-button slot="addonAfter">
                <a-icon type="plus" />
              </a-button>
            </a-input>
            <div style="margin-top: 10px;">
              <a-tag
                v-for="tag in tags"
                color="cyan"
                :key="tag"
                closable
                @close="log"
              >{{tag.toUpperCase()}}</a-tag>
            </div>
          </a-form>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col
        :xs="{ span: 7, offset: 15 }"
        style="margin-top: 10px;"
        justify="space-around"
        align="middle"
      >
        <a-button size="large" style="border-radius: 24px;">CANCELAR</a-button>
        <a-button
          type="primary"
          size="large"
          style="margin-left:3rem; background-color:#009FD1; border-radius: 24px;"
        >PUBLICAR</a-button>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
// import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
// import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
// import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
const notifications = [];
export default {
  components: {
    //  FormFilter
  },
  data() {
    return {
      loading: false,
      imageUrl: "",
      data: [
        {
          id: 1,
          date: "01/01/2020",
          title: "Titlo 1",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
          id: 2,
          date: "01/01/2020",
          title: "Titlo 1",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
          id: 3,
          date: "01/01/2020",
          title: "Titlo 1",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }
      ],
      fileForm: this.$form.createForm(this),
      disabledItem: true,
      disabledItemOne: true,
      disabledItemTwo: true,
      disabledItemThree: true,
      disabledItemFour: true,
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        alignment: {
          options: ["left", "right"]
        }
      },
      tags: ["seca", "piel"]
    };
  },
  computed: {},
  methods: {
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      if (!isJPG) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  mounted() {
    console.log(this.$route.params);
  },
  ableItem() {
    this.disabledItem = !this.disabledItem;
  },
  ableItemOne() {
    this.disabledItemOne = !this.disabledItemOne;
  },
  ableItemTwo() {
    this.disabledItemTwo = !this.disabledItemTwo;
  },
  ableItemThree() {
    this.disabledItemThree = !this.disabledItemThree;
  },
  ableItemFour() {
    this.disabledItemFour = !this.disabledItemFour;
  },

  onSubmitNotificationForm() {
    //alert("Subir");
    this.fileForm.validateFields((err, values) => {
      if (!err) {
        console.log("Datos recibidos: ", values);
        this.showConfirm();
        // this.notifications = values;
        // console.log("Datos guardados: ", this.notifications);
        //alert("Exito");
      }
    });
  },
  showConfirm() {
    this.$confirm({
      title: "¿Estás seguro que deseas enviar esta notificación?",
      content: h => <div style="color:#000;"></div>,
      onOk() {
        console.log("ENVIAR");
      },
      onCancel() {
        console.log("ATRAS");
      },
      class: "test"
    });
  },
  // toggleChecked() {
  //   this.checked = !this.checked;
  // },
  toggleDisable() {
    this.disabled = !this.disabled;
  },
  onChange(e) {
    this.checked = e.target.checked;
  },
  handleChange(value) {
    console.log(`selected ${value}`);
  },
  // handleBlur() {
  //   console.log("blur");
  // },
  // handleFocus() {
  //   console.log("focus");
  // },
  filterOption(input, option) {
    return (
      option.componentOptions.children[0].text
        .toLowerCase()
        .indexOf(input.toLowerCase()) >= 0
    );
  }
};
</script>
<style>
.container-imgs {
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  width: 95%;
  text-align: center;
}

.divider {
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.ant-upload.ant-upload-select-picture-card {
  width: 250px;
  height: 125px;
}

.tags-field {
  width: 80%;
  display: flex;
  margin: 0 auto;
  margin-top: 20px;
}

.header-gallery-img {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

.ck-editor__editable {
  min-height: 30rem;
}
</style>
