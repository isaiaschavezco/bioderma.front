<template>
  <div class="container-blog">
    <a-row>
      <a-col :xs="{ span: 16 }">
        <div class="card-container">
          <a-card title="CAMPAÑA PHOTODERM">
            <a-table :columns="columns" :dataSource="data" style="margin-top: 1rem;">
              <span slot="action" slot-scope="text, record">
                <router-link to="EditCampaing">
                  <a-button shape="circle" icon="edit" size="large" />
                </router-link>
                <a-divider type="vertical" />
                <a-button shape="circle" icon="delete" size="large" />
                <a-divider type="vertical" />
                <a-button shape="circle" icon="caret-right" size="large" />
              </span>
            </a-table>
          </a-card>
        </div>
      </a-col>
      <a-col :xs="{ span: 5 }" style="margin-top: 30px">
        <div class="container-notification" style>
          <a-card title="HISTORIAL DE NOTIFICACIONES" style="text-align:left;">
            <a-list :dataSource="data">
              <div slot="renderItem" slot-scope="item, index" style="padding: 15px">
                <span style="font-weight: bold;">{{ item.date }}</span>
                <p style="margin-bottom:30px">{{ item.description }}</p>
                <a-divider class="divider" />
              </div>
            </a-list>
          </a-card>
        </div>
      </a-col>
      <a-col class="column-right" :xs="{ span: 3 }" style="text-align:center;">
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
            <a-upload-dragger
              name="file"
              :multiple="true"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              @change="handleChange"
            >
              <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
              </p>
              <p class="ant-upload-text">Click or drag file to this area to upload</p>
              <p class="ant-upload-hint">Seleccione una imagen THUMBNAIL</p>
            </a-upload-dragger>
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
  </div>
</template>
<script>
const columns = [
  {
    dataIndex: "title",
    key: "title",
    title: "NOMBRE DE LA TRIVIA",
    align: "center"
  },
  {
    title: "VIGENCIA",
    dataIndex: "valid",
    key: "valid",
    align: "center",
    scopedSlots: { customRender: "tags" }
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    align: "center"
  },
  {
    title: "PUNTOS",
    dataIndex: "points",
    key: "points",
    align: "center"
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
    valid: "01/01/2000",
    status: "Enviada",
    points: 500
  },
  {
    key: "2",
    title: "HYDRABIO GEL-CREMA PREMIO COSMÉTICA GQ 2018",
    valid: "01/01/2000",
    status: "Enviada",
    points: 500
  },
  {
    key: "3",
    title: "HYDRABIO GEL-CREMA PREMIO COSMÉTICA GQ 2018",
    label: "prueba@inmersys.com",
    valid: "01/01/2000",
    status: "Enviada",
    points: 500
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
    handleChange(info) {
      const status = info.file.status;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
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
