<template>
  <div>
    <a-row>
      <a-col :xs="{ span: 22 }">
        <div class="card-container" style="height: 50rem;">
          <a-tabs type="card" @change="onChangeTab" style="height: 4rem;">
            <a-tab-pane tab="¿QUIENES SOMOS?" key="6"></a-tab-pane>
            <a-tab-pane tab="BIODERMA PATOLOGÍA" key="1"></a-tab-pane>
            <a-tab-pane tab="BIODERMA PRODUCTOS" key="2"></a-tab-pane>
            <a-tab-pane tab="INSTITUT ESTHEDERM" key="5"></a-tab-pane>
            <a-tab-pane tab="VADEMÉCUM" key="3"></a-tab-pane>
            <a-tab-pane tab="TÉCNICA DE VENTAS" key="4"></a-tab-pane>
          </a-tabs>
          <a-list
            class="demo-loadmore-list"
            itemLayout="horizontal"
            :dataSource="files"
            style="padding: 0 1rem; background-color: white;"
          >
            <div
              v-if="showLoadingMore"
              slot="loadMore"
              :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
            >
              <a-spin v-if="loadingMore" />
            </div>
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a slot="actions">
                <a-button
                  shape="circle"
                  icon="delete"
                  size="large"
                  @click="showDeleteConfirm(item.id, onDeleteBlog)"
                />
              </a>
              <a-list-item-meta
                :description="item.title === '' ? 'SIN ASIGNAR' : item.title + ' - ' + item.fileName"
              >
                <a slot="title">{{item.name.toUpperCase()}}</a>
                <a-avatar
                  slot="avatar"
                  size="large"
                  icon="file-pdf"
                  style="color: #f56a00; backgroundColor: #fde3cf"
                />
              </a-list-item-meta>
              <div>{{item.createdAt.substring(0,10)}}</div>
            </a-list-item>
          </a-list>
        </div>
      </a-col>
      <a-col class="column-right" :xs="{ span: 2 }" style="text-align:center;">
        <a-row style="margin-right:-28px">
          <a-col>
            <a-button shape="circle" icon="file-add" size="large" @click="loadFileModal = true" />
          </a-col>
          <a-col class="title-span-tag">AGREGAR PDF</a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-modal
      title="CARGAR NUEVO PDF"
      v-model="loadFileModal"
      :confirmLoading="loadingFileForm"
      centered
    >
      <a-form :form="fileForm">
        <a-form-item>
          <a-input
            placeholder="Ingresa un título para el archivo"
            v-decorator="[
          'title',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
          />
        </a-form-item>

        <a-form-item>
          <a-select
            v-decorator="[
          'menu',
          {rules: [{ required: true, message: 'Favor de seleccionar una categoría' }]}
        ]"
            placeholder="Selecciona una categoría"
            @change="handleChangeMenu"
          >
            <a-select-option :value="1">PATOLOGÍA</a-select-option>
            <a-select-option :value="2">PRODUCTOS</a-select-option>
            <a-select-option :value="3">VADEMECUM</a-select-option>
            <a-select-option :value="4">TÉCNICA DE VENTAS</a-select-option>
            <a-select-option :value="5">INSTITUT ESTHEDERM</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item>
          <a-select
            v-decorator="[
          'submenu',
          {rules: [{ required: true, message: 'Favor de seleccionar una subcategoría' }]}
        ]"
            placeholder="Selecciona una subcategoría"
            :options="submenuItems"
          ></a-select>
        </a-form-item>

        <a-form-item>
          <div class="dropbox">
            <a-upload-dragger
              v-decorator="['upload', {rules: [{ required: true, message: 'Favor de cargar un archivo PDF' }]
          }]"
              name="upload"
              action="https://bioderma-api-inmersys.herokuapp.com/upload/1"
              accept=".pdf"
              @change="handleChangeFileUpload"
              :beforeUpload="beforeUpload"
              :fileList="fileList"
            >
              <p class="ant-upload-drag-icon">
                <a-icon type="file-pdf" />
              </p>
              <p class="ant-upload-text">Selecciona o suelta un archivo en esta área para cargarlo</p>
              <p class="ant-upload-hint">Únicamente archivos .pdf</p>
            </a-upload-dragger>
          </div>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button
          type="primary"
          style="background-color:#009FD1; border: none; margin-bottom: 20px; border-radius: 24px; width: 200px;"
          @click="onSubmitFileForm"
        >SUBIR</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeTab: 1,
      files: [],
      loadingMore: false,
      showLoadingMore: true,
      loadFileModal: false,
      fileForm: this.$form.createForm(this),
      submenuItems: [],
      fileList: [],
      loadingFileForm: false
    };
  },
  methods: {
    onChangeTab(activeTabKey) {
      this.activeTab = activeTabKey;
      this.getFiles(this.activeTab);
    },
    async getFiles(menuId) {
      this.loadingMore = true;
      const response = await this.$axios(`submenu/${menuId}`);
      // console.log(response.data);
      this.files = response.data;
      if (this.activeTab == 2) {
        this.files.sort(function(a, b) {
          return a.id - b.id;
        });
      }
      this.loadingMore = false;
    },
    onSubmitFileForm() {
      this.fileForm.validateFields(async (err, values) => {
        if (!err) {
          try {
            const response = await this.$axios.post("submenu", {
              menu: values.menu,
              submenu: values.submenu,
              title: values.title,
              fileUrl: values.upload.fileList[0].response
            });

            this.loadFileModal = false;
            this.fileForm.resetFields();
            this.fileList = [];

            if (response.data == 0) {
              this.getFiles(this.activeTab);
              this.showNotification(
                "success",
                "Archivo cargado",
                "Se ha cargado el archivo correctamente."
              );
            } else {
              this.showNotification(
                "warning",
                "Archivo existente",
                "La sección ya cuenta con un archivo, si desea registrar uno nuevo elimine el archivo actual."
              );
            }
          } catch (err) {
            this.showNotification(
              "error",
              "Error al realizar el registro",
              "Ha ocurrido un error al registrar esta sección."
            );
          }
        }
      });
    },
    showDeleteConfirm(blogId, onDelete) {
      this.$confirm({
        title: "¿Estás seguro que deseas eliminar este archivo?",
        okText: "ELIMINAR",
        okType: "danger",
        cancelText: "CANCELAR",
        centered: true,
        onOk() {
          onDelete(blogId);
        },
        onCancel() {}
      });
    },
    async onDeleteBlog(blogId) {
      try {
        const response = await this.$axios.delete(`submenu/file/${blogId}`);
        console.log(response.data.status);
        if (response.data.status == 0) {
          this.getFiles(this.activeTab);
          this.showNotification(
            "success",
            "Archivo eliminado",
            "El archivo ha sido eliminado exitosamente."
          );
        }
      } catch (err) {
        this.showNotification(
          "error",
          "Error al eliminar el archivo",
          "Ha ocurrido un error al intentar eliminar el archivo."
        );
      }
    },
    showNotification(type, title, message) {
      this.$notification[type]({
        message: title,
        description: message
      });
    },
    handleChangeMenu(value) {
      this.getSubMenuItems(value);
    },
    async getSubMenuItems(menuId) {
      const response = await this.$axios(`submenu/items/${menuId}`);
      this.submenuItems = response.data;
    },
    handleChangeFileUpload(info) {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      this.fileList = fileList;
    },
    beforeUpload(file) {
      let status = true;
      this.fileForm.validateFields((err, values) => {
        if (err) {
          if (err.menu || err.submenu || err.title) {
            status = false;
          }
        }
      });
      return status;
    },
    showNotification(type, title, message) {
      this.$notification[type]({
        message: title,
        description: message
      });
    }
  },
  mounted() {
    this.getFiles("1");
  }
};
</script>
<style>
</style>