<template>
  <div>
    <a-row>
      <a-col :xs="{ span: 15 }" style="margin-top: 30px; margin-left: 24px">
        <div style="margin-right:25px; margin-bottom:20px">
          <a-card title="TITULO DEL BLOG" class="container">
            <a-form :form="fileForm">
              <a-form-item>
                <a-input
                  placeholder="SECCION ASIGNADA (BIODERMA GAMES / CAPACITACION)"
                  v-decorator="[
                    'name',
                    {
                      rules: [
                        { required: true, message: 'Favor de llenar el campo' }
                      ]
                    }
                  ]"
                />
              </a-form-item>
              <a-form-item>
                <a-input
                  placeholder="Subtitulo"
                  v-decorator="[
                    'name',
                    {
                      rules: [
                        { required: true, message: 'Favor de llenar el campo' }
                      ]
                    }
                  ]"
                />
              </a-form-item>
              <a-form-item>
                <a-textarea placeholder="Articulo" :rows="20" />
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
            <a-upload
              name="avatar"
              listType="picture-card"
              class="avatar-uploader"
              :showUploadList="false"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :beforeUpload="beforeUpload"
              @change="handleChange"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
              <div v-else>
                <a-icon :type="loading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
          </a-row>
          <a-row class="container-imgs">
            <a-upload
              name="avatar"
              listType="picture-card"
              class="avatar-uploader"
              :showUploadList="false"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :beforeUpload="beforeUpload"
              @change="handleChange"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
              <div v-else>
                <a-icon :type="loading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
          </a-row>
          <a-row class="container-imgs">
            <a-upload
              name="avatar"
              listType="picture-card"
              class="avatar-uploader"
              :showUploadList="false"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :beforeUpload="beforeUpload"
              @change="handleChange"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
              <div v-else>
                <a-icon :type="loading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
          </a-row>
        </div>
        <a-form>
          <a-input placeholder="Escribe un mensaje" style="width: 95%; margin-right:10px" />
          <a-button type="primary" shape="circle" icon="right-circle" :size="size" />
          <a-button shape="circle" icon="plus" @click="() => inviteUserModal = true" />
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>
<script>
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
      disabledItemFour: true
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
</style>
