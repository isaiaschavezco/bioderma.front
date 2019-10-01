<template>
  <div>
    <a-row>
      <a-col :xs="{ span: 22 }">
        <div class="card-container">
          <a-tabs type="card" @change="onChangeTab" style="elevation: 30deg;">
            <a-tab-pane tab="Usuarios" key="1">
              <a-input-search placeholder="Buscar usuario" enterButton />
              <a-table :columns="columns" :dataSource="data" style="margin-top: 1rem;">
                <span slot="action" slot-scope="text, record">
                  <a-button shape="circle" icon="info" size="large" />
                  <a-divider type="vertical" />
                  <a-button shape="circle" icon="delete" size="large" />
                </span>
              </a-table>
            </a-tab-pane>
            <a-tab-pane tab="Cadenas" key="2" style="padding-bottom: 2rem;">
              <a-input-search placeholder="Buscar cadena" @search="onSearchChains" enterButton />
              <a-table
                :columns="chainColumns"
                :dataSource="tableChains"
                style="margin-top: 1rem;"
                :rowKey="record => record.id"
              >
                <span slot="action" slot-scope="text, record">
                  <a-button
                    shape="circle"
                    icon="delete"
                    size="large"
                    @click="showDeleteConfirm(record.id, onDeleteChain)"
                  />
                </span>
              </a-table>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-col>
      <a-col :xs="{ span: 2 }" style="text-align:center;">
        <div v-if="activeTab == 1">
          <a-row>
            <a-col>
              <a-button shape="circle" icon="reload" size="large" />
            </a-col>
            <a-col>Resetear puntos</a-col>
          </a-row>
          <a-row style="margin-top:2rem;">
            <a-col>
              <a-button
                shape="circle"
                icon="user-add"
                size="large"
                @click="() => modal2Visible = true"
              />
            </a-col>
            <a-col>Nuevo usuario</a-col>
          </a-row>
        </div>
        <div v-if="activeTab == 2">
          <a-row>
            <a-col>
              <a-button
                shape="circle"
                icon="user-add"
                size="large"
                @click="() => chainModal = true"
              />
            </a-col>
            <a-col>Nueva cadena</a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>
    <a-modal
      title="Invita a un nuevo miembro a ser parte de Bioderma"
      centered
      v-model="modal2Visible"
      @ok="() => modal2Visible = false"
      okText="INVITAR"
    >
      <p>
        <a-input placeholder="Ingresa el correo electrónico del nuevo usuario" />
      </p>
      <p>
        <a-radio-group v-model="value">
          <a-radio :value="1">NAOS</a-radio>
          <a-radio :value="2">Farmacia</a-radio>
        </a-radio-group>
      </p>
      <template slot="footer">
        <a-button
          key="submit"
          type="primary"
          style="background-color:#001529; border: 1px solid #001529;"
        >INVITAR</a-button>
      </template>
    </a-modal>
    <a-modal title="Registrar cadena" centered v-model="chainModal">
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
          @click="onSubmitChainForm"
          type="primary"
          style="background-color:#001529; border: 1px solid #001529;"
        >REGISTRAR</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
const columns = [
  {
    dataIndex: "name",
    key: "name",
    title: "Nombre de usuario",
    align: "center"
  },
  {
    title: "E MAIL",
    dataIndex: "email",
    key: "email",
    align: "center"
  },
  {
    title: "Perfil",
    dataIndex: "profile",
    key: "profile",
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
    title: "Posición",
    dataIndex: "position",
    key: "position",
    align: "center",
    sorter: (a, b) => {
      if (a.position < b.position) {
        return -1;
      }
      if (a.position > b.position) {
        return 1;
      }
      return 0;
    }
  },
  {
    title: "Puntos acumulados",
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

const chainColumns = [
  {
    dataIndex: "name",
    key: "name",
    title: "Cadena",
    align: "center",
    sorter: (a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
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
    name: "John Brown",
    email: "prueba@inmersys.com",
    profile: "NAOS",
    position: "Gerente",
    points: 500
  },
  {
    key: "2",
    name: "Jim Green",
    email: "prueba@inmersys.com",
    profile: "NAOS",
    position: "Gerente",
    points: 500
  },
  {
    key: "3",
    name: "Joe Black",
    email: "prueba@inmersys.com",
    profile: "Farmacia",
    position: "-",
    points: 500
  }
];
export default {
  data() {
    return {
      collapsed: false,
      data,
      columns,
      chainColumns,
      modal2Visible: false,
      value: 1,
      activeTab: 1,
      chainModal: false,
      chainForm: this.$form.createForm(this),
      chains: [],
      tableChains: []
    };
  },
  methods: {
    callback(key) {
      console.log(key);
    },
    onChangeTab(activeTabKey) {
      this.activeTab = activeTabKey;
      switch (activeTabKey) {
        case "1":
          console.log("Consulto usuarios");
          break;
        case "2":
          this.getChains();
          break;
        default:
          break;
      }
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
    }
  }
};
</script>
<style>
.card-container {
  background: #f0f2f5;
  overflow: hidden;
  padding: 24px;
}
.card-container > .ant-tabs-card > .ant-tabs-content {
  height: 120px;
  margin-top: -16px;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
  border-color: #fff;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
  background: transparent;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}
</style>
