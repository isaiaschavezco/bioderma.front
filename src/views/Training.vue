<template>
  <div>
    <a-row>
      <a-col :xs="{ span: 22 }">
        <div class="card-container" style="height: 50rem;">
          <a-tabs type="card" @change="onChangeTab" style="height: 4rem;">
            <a-tab-pane tab="PATOLOGÍA" key="1"></a-tab-pane>
            <a-tab-pane tab="PRODUCTOS" key="2"></a-tab-pane>
            <a-tab-pane tab="VADEMECUM" key="3"></a-tab-pane>
            <a-tab-pane tab="TÉCNICA DE VENTAS" key="4"></a-tab-pane>
            <a-tab-pane tab="INSTITUT ESTHEDERM" key="5"></a-tab-pane>
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
                <a-button shape="circle" icon="delete" size="large" />
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
      <a-col :xs="{ span: 2 }" style="text-align:center;">
        <a-row>
          <a-col>
            <a-button shape="circle" icon="file-add" size="large" @click="loadFileModal = true" />
          </a-col>
          <a-col>AGREGAR PDF</a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-modal
      title="CARGAR NUEVO PDF"
      v-model="loadFileModal"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      centered
    >
      <a-form :form="fileForm" @submit="handleSubmit">
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
              v-decorator="['file', {rules: [{ required: true, message: 'Favor de cargar un archivo PDF' }]
          }]"
              name="files"
              :action="uploadFile"
              accept=".pdf"
            >
              <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
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
          style="background-color:#001529; border: 1px solid #001529;"
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
      data: [
        {
          value: "ANATOMÍA DE LA PIEL",
          label: "1"
        },
        {
          value: "ANATOMÍA DE LA PIEL",
          label: "2"
        },
        {
          value: "ANATOMÍA DE LA PIEL",
          label: "3"
        }
      ],
      activeTab: 1,
      files: [],
      loadingMore: false,
      showLoadingMore: true,
      loadFileModal: false,
      fileForm: this.$form.createForm(this),
      submenuItems: []
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
      this.files = response.data;
      this.loadingMore = false;
    },
    onSubmitFileForm() {
      this.fileForm.validateFields(async (err, values) => {
        if (!err) {
          try {
            console.log("form: ", values);
          } catch (err) {
            this.showNotification(
              "error",
              "Error al agregar cadena",
              "Ha ocurrido un error al registrar la cadena."
            );
          }
        }
      });
    },
    handleChangeMenu(value) {
      this.getSubMenuItems(value);
    },
    async getSubMenuItems(menuId) {
      const response = await this.$axios(`submenu/items/${menuId}`);
      this.submenuItems = response.data;
    },
    uploadFile(file) {
      console.log("file: ", file);
    }
  },
  mounted() {
    this.getFiles(1);
  }
};
</script>
<style>
</style>