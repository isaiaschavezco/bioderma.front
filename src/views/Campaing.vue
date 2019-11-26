<template>
  <div>
    <a-row>
      <a-col :xs="{ span: 22 }">
        <div class="card-container" style="height: 50rem; margin-top: 4px;">
          <a-tabs
            type="card"
            @change="onChangeTab"
            style="height: 2.4rem; margin-bottom:1rem; border-bottom:  .5px solid rgba(0, 0, 0, 0.8);"
          >
            <a-tab-pane tab="CAMPAÑAS" key="1"></a-tab-pane>
            <a-tab-pane tab="BIODERMA GAMES" key="2"></a-tab-pane>
          </a-tabs>
          <a-list
            :grid="{ gutter: 16, column: 3 }"
            :dataSource="data"
            :style="{ overflow: 'scroll' }"
            style="height: 100%;"
          >
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-tooltip
                placement="topLeft"
                title="Da click en la imágen para ver las trivias de esta campaña"
              >
                <a-card
                  :title="item.name"
                  :headStyle="
                    bioGamesTab
                      ? { background: '#6e6e6e', color: '#d9d9d9' }
                      : {}
                  "
                  :bodyStyle="
                    bioGamesTab
                      ? { background: '#6e6e6e', color: '#d9d9d9' }
                      : {}
                  "
                >
                  <img alt="example" :src="item.portrait" slot="cover" />
                  <span style="font-weight: 700;">FILTROS</span>
                  <br />
                  <span>{{ item.filter[0] }}</span>
                  <a-divider
                    :style="{
                      margin: '10px 0px',
                      border: '1px solid rgba(0,0,0,0.1)'
                    }"
                  />
                  <span style="font-weight: 700;">ESTATUS</span>
                  <br />
                  <span>{{ item.isActive ? "ACTIVA" : "CONCLUIDA" }}</span>
                  <template class="ant-card-actions" slot="actions">
                    <a-icon type="close-circle" />
                    <a-icon type="edit" />
                    <a-icon type="delete" />
                  </template>
                </a-card>
              </a-tooltip>
            </a-list-item>
          </a-list>
        </div>
      </a-col>
      <a-col class="column-right-cam" :xs="{ span: 2 }" style="text-align:center;">
        <a-row style="margin-top: -13px; margin-left: 27px;">
          <a-col>
            <a-button shape="circle" icon="plus" size="large" @click="loadFileModal = true" />
          </a-col>
          <a-col>AÑADIR CAMPAÑA</a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-modal
      title="NUEVA CAMPAÑA"
      v-model="loadFileModal"
      :confirmLoading="loadingFileForm"
      centered
    >
      <a-form :form="fileForm">
        <a-form-item>
          <a-input
            placeholder="Ingresa un nombre para la campaña"
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: 'Favor de llenar el campo' }]
              }
            ]"
          />
        </a-form-item>

        <a-form-item>
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
              action="http://localhost:3000/upload/1"
              accept=".png, .jpg, jpge"
              @change="handleChangeFileUpload"
              :beforeUpload="beforeUpload"
              :fileList="fileList"
            >
              <p class="ant-upload-drag-icon">
                <a-icon type="picture" />
              </p>
              <p class="ant-upload-text">Selecciona o suelta una imagen para la campaña</p>
              <p class="ant-upload-hint">Únicamente archivos .png, .jpg o .jpge</p>
            </a-upload-dragger>
          </div>
        </a-form-item>
      </a-form>
      <a-divider :style="{ margin: '10px 0px', border: '1px solid rgba(0,0,0,0.1)' }" />
      <FormFilter />
      <template slot="footer">
        <a-button
          type="primary"
          style="background-color:#009FD1; border-radius: 24px; width: 200px; margin-bottom: 20px;"
          @click="onSubmitFileForm"
        >SUBIR</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import FormFilter from "../components/FormFilter";
export default {
  components: {
    FormFilter
  },
  data() {
    return {
      data: [
        {
          id: 1,
          name: "Nombre campaña",
          portrait:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQvZBYT2ojOnMqeyDX0rtMtzObcawQSug5-C4n7fASfjpnSu_Yx",
          isActive: true,
          filter: ["NAOS, Mexicalli"]
        },
        {
          id: 2,
          name: "Nombre campaña 2",
          portrait:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQvZBYT2ojOnMqeyDX0rtMtzObcawQSug5-C4n7fASfjpnSu_Yx",
          isActive: true,
          filter: ["NAOS, Mexicalli"]
        },
        {
          id: 3,
          name: "Nombre campaña 3",
          portrait:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQvZBYT2ojOnMqeyDX0rtMtzObcawQSug5-C4n7fASfjpnSu_Yx",
          isActive: false,
          filter: ["NAOS, Mexicalli"]
        },
        {
          id: 1,
          name: "Nombre campaña",
          portrait:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQvZBYT2ojOnMqeyDX0rtMtzObcawQSug5-C4n7fASfjpnSu_Yx",
          isActive: true,
          filter: ["NAOS, Mexicalli"]
        },
        {
          id: 2,
          name: "Nombre campaña 2",
          portrait:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQvZBYT2ojOnMqeyDX0rtMtzObcawQSug5-C4n7fASfjpnSu_Yx",
          isActive: true,
          filter: ["NAOS, Mexicalli"]
        },
        {
          id: 3,
          name: "Nombre campaña 3",
          portrait:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQvZBYT2ojOnMqeyDX0rtMtzObcawQSug5-C4n7fASfjpnSu_Yx",
          isActive: false,
          filter: ["NAOS, Mexicalli"]
        },
        {
          id: 1,
          name: "Nombre campaña",
          portrait:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQvZBYT2ojOnMqeyDX0rtMtzObcawQSug5-C4n7fASfjpnSu_Yx",
          isActive: true,
          filter: ["NAOS, Mexicalli"]
        },
        {
          id: 2,
          name: "Nombre campaña 2",
          portrait:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQvZBYT2ojOnMqeyDX0rtMtzObcawQSug5-C4n7fASfjpnSu_Yx",
          isActive: true,
          filter: ["NAOS, Mexicalli"]
        }
      ],
      activeTab: 1,
      files: [],
      loadingMore: false,
      showLoadingMore: true,
      loadFileModal: false,
      fileForm: this.$form.createForm(this),
      submenuItems: [],
      fileList: [],
      loadingFileForm: false,
      bioGamesTab: false
    };
  },
  methods: {
    onChangeTab(activeTabKey) {
      this.activeTab = activeTabKey;
      if (activeTabKey == "1") {
        this.bioGamesTab = false;
      } else {
        this.bioGamesTab = true;
      }
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
    this.getFiles(1);
  }
};
</script>
<style>
.card-container
  > .ant-tabs
  > .ant-tabs-top
  > .ant-tabs-card
  > .ant-tabs-no-animation {
  border-bottom: 1px solid;
}
.column-right-cam {
  margin-top: 78px;
}
</style>
