<template>
  <div>
    <a-row>
      <a-col :xs="{ span: 15 }" style="margin-top: 30px;">
        <div style="margin-right:25px; margin-bottom:20px">
          <a-card :title="articleTitle" class="container">
            <a-form :form="articleForm">
              <a-form-item>
                <a-input
                  placeholder="Subtitulo"
                  v-decorator="[
                    'subtitle',
                    {
                      initialValue: articleSubtitle,
                      rules: [
                        { required: true, message: 'Favor de llenar el campo' }
                      ]
                    }
                  ]"
                />
              </a-form-item>
              <a-divider class="divider" />
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
        <div class="header-gallery-img">LISTA DE IMAGENES</div>
        <a-form :form="assetsForm">
          <div class="container-imgs">
            <a-form-item>
              <a-row class="container-imgs">
                <div class="dropbox">
                  <a-upload-dragger
                    v-decorator="[
                      'upload',
                      {
                        initialValue: fileList,
                        rules: [
                          {
                            required: true,
                            message: 'Favor de cargar almenos un archivo'
                          }
                        ]
                      }
                    ]"
                    name="upload"
                    action="https://bioderma-desarrollo.herokuapp.com/upload/4"
                    accept=".png, .jpg, .jpge, .mp4"
                    @change="handleChangeFileUpload"
                    :beforeUpload="beforeUpload"
                    :fileList="fileList"
                    listType="picture"
                  >
                    <p class="ant-upload-drag-icon">
                      <a-icon type="plus-circle" />
                    </p>
                    <p
                      class="ant-upload-text"
                    >Selecciona o suelta hasta 3 imágenes/videos para el carrete</p>
                    <p class="ant-upload-hint">Formatos aceptados .png, .jpg, .jpge o .mp4</p>
                    <p class="ant-upload-hint">Imágenes &lt; 2MB / Videos &lt; 10MB</p>
                  </a-upload-dragger>
                </div>
              </a-row>
            </a-form-item>
            <!-- <a-form-item>
              <a-row class="container-imgs">
                <div class="dropbox">
                  <a-upload-dragger
                    v-decorator="[
                    'upload2',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Favor de cargar un archivo PDF'
                        }
                      ]
                    }
                  ]"
                    name="upload2"
                    action="https://bioderma-desarrollo.herokuapp.com/upload/4"
                    accept=".png, .jpg, jpge"
                    @change="handleChangeFileUpload2"
                    :beforeUpload="beforeUpload"
                    :fileList="fileList2"
                  >
                    <p class="ant-upload-drag-icon">
                      <a-icon type="picture" />
                    </p>
                    <p class="ant-upload-text">Selecciona o suelta una imagen para el carrete</p>
                    <p class="ant-upload-hint">Únicamente archivos .png, .jpg o .jpge</p>
                  </a-upload-dragger>
                </div>
              </a-row>
            </a-form-item>
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
                  action="https://bioderma-desarrollo.herokuapp.com/upload/4"
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
            </a-row>-->
          </div>
        </a-form>
        <div class="container-imgs">
          <a-form :form="tagForm">
            <a-form-item>
              <a-input
                placeholder="Nombre de etiqueta"
                style="width: 80%; margin: 0 10;"
                v-decorator="[
                    'name',
                    {
                      rules: [
                        { required: true, message: 'Favor de llenar el campo' }
                      ]
                    }
                  ]"
              >
                <a-button slot="addonAfter" @click="onSubmitTag" :loading="isTagFormLoading">
                  <a-icon type="plus" />
                </a-button>
              </a-input>
            </a-form-item>
            <div style="margin-top: 10px;">
              <a-tag
                v-for="tag in tags"
                color="cyan"
                :key="tag.id"
                closable
                @close="onDeleteTag(tag)"
              >{{tag.name}}</a-tag>
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
        <a-button size="large" style="border-radius: 24px;" @click="onCancelBlogSubmit">CANCELAR</a-button>
        <a-button
          type="primary"
          size="large"
          style="margin-left:3rem; background-color:#009FD1; border-radius: 24px;"
          @click="showSubmitConfirm(onSubmitArticle, isEditing)"
        >{{ isEditing ? 'EDITAR' : 'PUBLICAR' }}</a-button>
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
      articleForm: this.$form.createForm(this),
      assetsForm: this.$form.createForm(this),
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        toolbar: {
          items: ["bold", "italic", "undo", "redo"]
        }
      },
      tags: [],
      filters: [],
      tagIds: [],
      articleSubtitle: "",
      articleTitle: "",
      articleImage: "",
      fileList: [],
      tagForm: this.$form.createForm(this),
      isTagFormLoading: false,
      isBiodermaGame: false,
      isBlogNaos: true,
      isAll: true,
      uploadFileStatus: true,
      blogData: null,
      isEditing: false,
      articleId: null,
      nullable: null
    };
  },
  computed: {},
  methods: {
    beforeUpload(file) {
      let status = true;
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isMP4 = file.type === "video/mp4";

      if (!isJPG && !isPNG && !isMP4) {
        this.$message.error("Este formato no esta permido.");
        status = false;
      }

      if (isJPG || isPNG) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error("La imagen debe ser menor a 2MB.");
          status = false;
        }
      }

      if (isMP4) {
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
          this.$message.error("El video debe ser menor a 10MB.");
          status = false;
        }
      }

      // console.log("STATUS: ", status);
      this.uploadFileStatus = status;
      return status;
    },
    handleChangeFileUpload(info) {
      //console.log("info: ", info);
      if (this.uploadFileStatus) {
        let fileList = [...info.fileList];
        //console.log("fileList: ", fileList);
        if (fileList.length > 3) {
          fileList = fileList.slice(1, 4);
        }
        this.fileList = fileList;
      }
    },
    async onSubmitArticle() {
      let imagesArray = [];
      let isAllValidate = true;

      this.articleForm.validateFields(async (err, values) => {
        if (!err) {
          this.articleSubtitle = values.subtitle;
        } else {
          isAllValidate = false;
        }
      });

      this.assetsForm.validateFields(async (err, values) => {
        console.log("values.upload: ", values.upload);
        if (!err) {
          //console.log("assetsForm: ", values);

          for (let index = 0; index < values.upload.fileList.length; index++) {
            let assetUrl = values.upload.fileList[index].response;

            if (values.upload.fileList[index].type === "video/mp4") {
              let indexUrl = assetUrl.indexOf("/blog/");
              assetUrl =
                "https://bioderma-space.sfo2.digitaloceanspaces.com" +
                assetUrl.substring(indexUrl, assetUrl.length);
            }

            //console.log("assetUrl: ", assetUrl);

            imagesArray.push({
              id: index,
              data:
                values.upload.fileList[index].type === "video/mp4"
                  ? "https://bioderma-space.sfo2.cdn.digitaloceanspaces.com/assets/videoblur.jpeg"
                  : assetUrl,
              video:
                values.upload.fileList[index].type === "video/mp4"
                  ? assetUrl
                  : ""
            });
          }
        } else {
          isAllValidate = false;
        }
      });

      if (isAllValidate) {
        try {
          //console.log("imagesArray: ", imagesArray);
          let response = null;
          if (this.isEditing) {
            response = await this.$axios.put("article", {
              id: this.articleId,
              galery: JSON.stringify(imagesArray),
              subtitle: this.articleSubtitle,
              content: this.editorData,
              tags: this.tagIds

            });
          } else {
            response = await this.$axios.post("article", {
              title: this.articleTitle,
              image: this.articleImage,
              galery: JSON.stringify(imagesArray),
              subtitle: this.articleSubtitle,
              content: this.editorData,
              isBiodermaGame: this.isBiodermaGame,
              isBlogNaos: this.isBlogNaos,
              isBlogEsthederm: this.isBlogEsthederm,
              isAll: this.isBiodermaGame ? null : this.isAll,
              tags: this.tagIds,
              targets: [...this.filters]
            });
          }
          //console.log("response", response);
          this.$notification["success"]({
            message: "Entrada enviada correctamente",
            description: "Se ha enviado la entrada exitosamente."
          });
          
          this.$router.push({
            name: "blog"
          });
        } catch (error) {
          //console.log(error);
          this.$notification["error"]({
            message: "Error al subir entrada",
            description: "Ha ocurrido un error al subir la entrada."
          });
        }
      }
    },
    showSubmitConfirm(onSubmit, isEditing) {
      this.$confirm({
        title: isEditing
          ? "¿Estás seguro que deseas editar esta entrada?"
          : "¿Estás seguro que deseas publicar esta entrada?",
        okText: isEditing ? "EDITAR" : "PUBLICAR",
        okType: "warning",
        cancelText: "CANCELAR",
        centered: true,
        onOk() {
          onSubmit();
        },
        onCancel() {}
      });
    },
    onSubmitTag() {
      this.tagForm.validateFields(async (err, values) => {
        if (!err) {
          try {
            this.isTagFormLoading = true;
            const response = await this.$axios.post("tag", {
              tagName: values.name.trim().toUpperCase()
            });
            this.tags.push(response.data.tag);
            this.tagIds.push(response.data.tag.id);
            this.tagForm.resetFields();
            this.isTagFormLoading = false;
          } catch (error) {
            this.isTagFormLoading = false;
            //console.log("error: ", values);
          }
        }
      });
    },
    onDeleteTag(tagName) {
      const result = this.tags.filter(tempTap => tempTap.id !== tagName.id);
      this.tags = result;
      const resultIds = this.tagIds.filter(tempId => tempId !== tagName.id);
      this.tagIds = resultIds;
    },
    onCancelBlogSubmit() {
      this.$router.push({
        name: "blog"
      });
    }
  },
  async mounted() {
    if (this.$route.query.blogId) {
      this.isEditing = true;

      const response = await this.$axios(`article/${this.$route.query.blogId}`);

      this.articleId = this.$route.query.blogId;
      this.blogData = response.data.blogs;

      //console.log("blogData: ", this.blogData);

      this.articleTitle = this.blogData.title;
      this.editorData = this.blogData.description;
      this.articleSubtitle = this.blogData.subtitle;
      this.blogData.tags.forEach(tempTag => {
        this.tags.push(tempTag);
        this.tagIds.push(tempTag.id);
      });

      this.blogData.images.forEach(tempAsset => {
        let isVideo = tempAsset.video ? tempAsset.video.length > 0 : false;
        let assetName = isVideo
          ? tempAsset.video.split("-")
          : tempAsset.data.split("-");

        this.fileList.push({
          uid: tempAsset.id,
          thumbUrl: tempAsset.data,
          response: isVideo ? tempAsset.video : tempAsset.data,
          name: assetName[assetName.length - 1]
        });
      });
    } else {
      this.articleTitle = this.$route.params.title;
      this.articleImage = this.$route.params.image;
      this.isBiodermaGame = this.$route.params.isBiodermaGame;
      this.isBlogNaos = this.$route.params.isBlogNaos;
      this.isBlogEsthederm = this.$route.params.isBlogEsthederm;
      this.isAll = this.$route.params.isAll;
      this.filters = this.$route.params.filters;
      console.log("¡FILTROS!",this.filters,this.isBiodermaGame);
    }
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
  height: 25rem;
}
</style>
