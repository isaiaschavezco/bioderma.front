<template>
  <div class="container-blog">
    <a-row>
      <a-col :xs="{ span: 22 }">
        <div class="card-container">
          <a-tabs type="card" @change="onChangeTab" style="elevation: 30deg;">
            <a-tab-pane tab="USUARIOS" key="1">
              <a-input-search placeholder="Buscar blog" enterButton />
              <a-table :columns="columns" :dataSource="data" style="margin-top: 1rem;">
                <span slot="tags" slot-scope="tags">
                  <a-tag
                    v-for="tag in tags"
                    :color="tag==='loser' ? 'volcano' : (tag.length > 5 ? 'geekblue' : 'green')"
                    :key="tag"
                  >{{tag.toUpperCase()}}</a-tag>
                </span>
                <span slot="action" slot-scope="text, record">
                  <a-button shape="circle" icon="info" size="large" />
                  <a-divider type="vertical" />
                  <a-button shape="circle" icon="delete" size="large" />
                </span>
              </a-table>
            </a-tab-pane>
            <a-tab-pane tab="BIODERMA GAMES" key="2"></a-tab-pane>
          </a-tabs>
        </div>
      </a-col>
      <a-col class="column-right" :xs="{ span: 2 }" style="text-align:center;">
        <div v-if="activeTab == 1">
          <a-row style>
            <a-col>
              <a-button shape="circle" icon="plus" size="large" @click="() => blogNewModal = true" />
            </a-col>
            <a-col>Crear nueva entrada</a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>

    <a-modal title="NUEVA ENTRADA" centered v-model="blogNewModal">
      <a-form :form="fileBlogForm">
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
        <router-link to="NewBlog">
          <a-button
            type="primary"
            style="background-color:#009FD1; border-radius: 24px; width: 200px; margin-bottom: 20px;"
            @click="onSubmitInvitationForm"
          >SIGUIENTE</a-button>
        </router-link>
      </template>
    </a-modal>
  </div>
</template>
<script>
const columns = [
  {
    dataIndex: "title",
    key: "title",
    title: "Nombre de blog",
    align: "center"
  },
  {
    title: "Etiquetas",
    dataIndex: "tags",
    key: "tags",
    align: "center",
    scopedSlots: { customRender: "tags" }
  },
  {
    title: "Fecha",
    dataIndex: "date",
    key: "date",
    align: "center",
    sorter: (a, b) => {
      if (a.profile < b.profile) {
        return -1;
      }
      if (a.profile > b.profile) {
        return 1;
      }
      return 0;
    }
  },
  {
    title: "",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

const data = [
  {
    key: "1",
    title: "HYDRABIO GEL-CREMA PREMIO COSMÉTICA GQ 2018",
    date: "01/01/2000",
    tags: ["tag1", "tag2", "tag3"]
  },
  {
    key: "2",
    title: "HYDRABIO GEL-CREMA PREMIO COSMÉTICA GQ 2018",
    label: "prueba@inmersys.com",
    date: "01/01/2000",
    tags: ["tag1", "tag2", "tag3"]
  },
  {
    key: "3",
    title: "HYDRABIO GEL-CREMA PREMIO COSMÉTICA GQ 2018",
    label: "prueba@inmersys.com",
    date: "01/01/2000",
    tags: ["tag1", "tag2", "tag3"]
  }
];
export default {
  data() {
    return {
      collapsed: false,
      data,
      columns,
      value: 1,
      activeTab: 1,
      chainModal: false,
      chainForm: this.$form.createForm(this),
      fileBlogForm: this.$form.createForm(this),
      chains: [],
      tableChains: [],

      blogNewModal: false,
      inviteUserLoading: false
    };
  },
  methods: {
    onSubmitInvitationForm() {
      this.fileBlogForm.validateFields(async (err, values) => {
        if (!err) {
          alert("Exito");
          console.log(values);
        }
      });
    }
  }
};
</script>
<style>
.column-right {
  margin-top: 65px;
}

.item-modal {
  margin-right: 30px;
  color: #526987;
  font-weight: 500;
}
</style>
