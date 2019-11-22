<template>
  <div class="container-blog">
    <a-row>
      <a-col :xs="{ span: 22 }">
        <div class="card-container">
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
        </div>
      </a-col>
      <a-col class="column-right" :xs="{ span: 2 }" style="text-align:center;">
        <div v-if="activeTab == 1">
          <a-row style>
            <a-col>
              <a-button
                shape="circle"
                icon="plus"
                size="large"
                @click="() => inviteUserModal = true"
              />
            </a-col>
            <a-col>Crear nueva entrada</a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>

    <a-modal title="NUEVA ENTRADA" centered v-model="inviteUserModal">
      <a-form :form="inviteUserForm">
        <a-form-item>
          <a-input
            placeholder="Titulo de la entrada"
            v-decorator="[
          'input',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
          />
        </a-form-item>
        <a-form-item>
          <a-form-item>
            <div class="dropbox">
              <a-upload-dragger
                v-decorator="['upload', {rules: [{ required: true, message: 'Favor de cargar un archivo PDF' }]
          }]"
                name="upload"
                action="http://localhost:3000/upload/1"
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
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button
          key="submit"
          type="primary"
          style="background-color:#009FD1; border-radius: 24px; width: 200px; margin-bottom: 20px;"
          :loading="inviteUserLoading"
          @click="onSubmitInvitationForm"
        >SIGUIENTE</a-button>
      </template>
    </a-modal>

    <!-- <a-modal title="Registrar cadena" centered v-model="chainModal">
      <p>
        <a-form :form="chainForm">
          <a-form-item>
            <a-input
              placeholder="Ingresa el nombre de la cadena"
              v-decorator="[
          'chain',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
            />
          </a-form-item>
        </a-form>
      </p>
      <template slot="footer">
        <a-button
          class="btn-center"
          @click="onSubmitChainForm"
          type="primary"
          style="background-color:##009FD1; border-radius: 24px; width: 200px; margin-bottom: 20px;"
        >SIGUIENTE</a-button>
      </template>
    </a-modal>-->
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
      inviteUserModal: false,
      value: 1,
      activeTab: 1,
      chainModal: false,
      chainForm: this.$form.createForm(this),
      inviteUserForm: this.$form.createForm(this),
      chains: [],
      tableChains: [],
      inviteUserModal: false,
      inviteUserLoading: false
    };
  },
  methods: {
    callback(key) {
      console.log(key);
    },
    async getChains() {
      const responseChains = await this.$axios("chain");
      this.chains = responseChains.data;
      this.tableChains = this.chains;
    },
    onSubmitChainForm() {
      this.chainForm.validateFields(async (err, values) => {
        if (!err) {
          try {
            const response = await this.$axios.post("chain", {
              name: values.chain.toUpperCase().trim(),
              isDeleted: false
            });
            this.chainModal = false;
            if (response.data == 1) {
              this.getChains();
              this.showNotification(
                "success",
                "Cadena registrada",
                "La cadena ha sido registrada correctamente."
              );
            } else if (response.data == 2) {
              this.showNotification(
                "info",
                "Esta cadena ya existe",
                "La cadena que ha intentando registrar, ya existe."
              );
            }
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
    showNotification(type, title, message) {
      this.$notification[type]({
        message: title,
        description: message
      });
    },
    async onDeleteChain(chaindId) {
      try {
        const response = await this.$axios.delete(`chain/${chaindId}`);
        if (response.data == 1) {
          this.getChains();
          this.showNotification(
            "success",
            "Cadena eliminada",
            "La cadena ha sido eliminada exitosamente."
          );
        }
      } catch (err) {
        this.showNotification(
          "error",
          "Error al eliminar cadena",
          "Ha ocurrido un error al intentar eliminar la cadena."
        );
      }
    },
    showDeleteConfirm(chaindId, onDelete) {
      this.$confirm({
        title: "¿Estás seguro que deseas eliminar esta cadena?",
        okText: "ELIMINAR",
        okType: "danger",
        cancelText: "CANCELAR",
        centered: true,
        onOk() {
          onDelete(chaindId);
        },
        onCancel() {}
      });
    },
    onSearchChains(value) {
      const newChain = this.chains.filter(element => {
        return element.name.indexOf(value.toUpperCase()) >= 0;
      });
      if (newChain.length === 0) {
        this.showNotification(
          "info",
          "No se encontraron coincidencias",
          "No se encontraron registros para esta búsqueda."
        );
      } else {
        this.tableChains = newChain;
      }
    },
    onSubmitInvitationForm() {
      this.inviteUserForm.validateFields(async (err, values) => {
        if (!err) {
          this.inviteUserLoading = true;
          try {
            const response = await this.$axios.post("user/invite", {
              email: values.email.trim(),
              type: values.type
            });
            this.inviteUserLoading = false;
            this.inviteUserForm.resetFields();
            this.inviteUserModal = false;
            if (response.data == 0) {
              this.showNotification(
                "success",
                "Invitación enviada",
                "La invitación ha sido enviada correctamente."
              );
            }
          } catch (err) {
            this.inviteUserLoading = false;
            this.showNotification(
              "error",
              "Error al agregar cadena",
              "Ha ocurrido un error al registrar la cadena."
            );
          }
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
