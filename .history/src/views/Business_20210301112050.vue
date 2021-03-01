<template>
  <div>
    <a-row>
      <a-col :xs="{ span: 22 }">
        <div class="card-container">
          <a-tabs type="card" @change="onChangeTab" style="elevation: 30deg;">
            <a-tab-pane tab="FARMACIAS" key="2">
              <a-input-search
                placeholder="Buscar cadena"
                @search="onSearchChains"
                v-model="chainSearch"
                enterButton
              />
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
                    @click="showDeleteConfirmChain(record.id, onDeleteChain)"
                  />
                </span>
              </a-table>
            </a-tab-pane>
            <!--ISAIAS-->
            <a-tab-pane tab="ESTHEDERM" key="3">
              <a-input-search
                placeholder="Buscar clínica"
                @search="onSearchClinics"
                v-model="clinicSearch"
                enterButton
              />
              <a-table
                :columns="clinicColumns"
                :dataSource="tableClinics"
                style="margin-top: 1rem;"
                :rowKey="record => record.id"
              >
                <span slot="action" slot-scope="text, record">
                  <a-button
                    shape="circle"
                    icon="delete"
                    size="large"
                    @click="showDeleteConfirmClinic(record.id, onDeleteClinic)"
                  />
                </span>
              </a-table>
            </a-tab-pane>
            <!-- DIGITAL -->

            <a-tab-pane tab="CONVENIO" key="5">
              <a-input-search
                placeholder="Buscar clínica"
                @search="onSearchClinics"
                v-model="clinicSearch"
                enterButton
              />
              <a-table
                :columns="convenioColumns"
                :dataSource="tableClinics"
                style="margin-top: 1rem;"
                :rowKey="record => record.id"
              >
                <span slot="action" slot-scope="text, record">
                  <a-button
                    shape="circle"
                    icon="delete"
                    size="large"
                    @click="showDeleteConfirmClinic(record.id, onDeleteClinic)"
                  />
                </span>
              </a-table>
            </a-tab-pane>
            <!--ISAIAS-->
          </a-tabs>
          <a-skeleton :loading="isLoadingTable" active />
        </div>
      </a-col>

      <!--columna de nuevo usuario-->
      <a-col class="column-right" :xs="{ span: 2 }" style="text-align:center;">
        <div v-if="activeTab == 1">
          <a-row>
            <a-col>
              <a-button
                shape="circle"
                icon="reload"
                size="large"
                @click="openResetPointsModal"
              />
            </a-col>
            <a-col class="title-span-tag">Resetear puntos</a-col>
          </a-row>
          <a-row style="margin-top:2rem;">
            <a-col>
              <a-button
                shape="circle"
                icon="user-add"
                size="large"
                @click="() => (inviteUserModal = true)"
              />
            </a-col>
            <a-col class="title-span-tag">Nuevo usuario</a-col>
          </a-row>
          <a-row style="margin-top:2rem;">
            <a-col>
              <a-button
                shape="circle"
                icon="file-text"
                size="large"
                @click="() => (exportCSModal = true)"
              />
            </a-col>
            <a-col class="title-span-tag">Exportar CSV</a-col>
          </a-row>
        </div>
        <div v-if="activeTab == 2">
          <a-row>
            <a-col>
              <a-button
                shape="circle"
                icon="user-add"
                size="large"
                @click="() => (chainModal = true)"
              />
            </a-col>
            <a-col>NUEVA FARMACIA</a-col>
          </a-row>
        </div>
        <!--ISAIAS-->
        <div v-if="activeTab == 3">
          <a-row>
            <a-col>
              <a-button
                shape="circle"
                icon="user-add"
                size="large"
                @click="() => (clinicModal = true)"
              />
            </a-col>
            <a-col>Nueva clínica</a-col>
          </a-row>
        </div>
        <div v-if="activeTab == 5">
          <a-row>
            <a-col>
              <a-button
                shape="circle"
                icon="user-add"
                size="large"
                @click="() => (clinicModal = true)"
              />
            </a-col>
            <a-col>Nuevo convenio</a-col>
          </a-row>
        </div>
        <!--ISAIAS-->
      </a-col>
    </a-row>
    <!--Modal Invita a un nuevo miembro a ser parte de Bioderma-->
    <a-modal
      title="Invita a un nuevo miembro a ser parte de Bioderma"
      centered
      v-model="inviteUserModal"
      :maskClosable="false"
      @cancel="closeInvitationModal"
    >
      <a-form :form="inviteUserForm">
        <a-form-item>
          <a-input
            placeholder="Ingresa el correo electrónico del nuevo usuario"
            v-decorator="[
              'email',
              {
                rules: [{ required: true, message: 'Favor de llenar el campo' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item>
          <a-radio-group
            v-decorator="[
              'type',
              {
                rules: [
                  {
                    required: true,
                    message: 'Favor de seleccionar un tipo de usuario'
                  }
                ]
              }
            ]"
          >
            <a-radio :value="1">
              <span class="item-modal">NAOS</span>
            </a-radio>
            <a-radio :value="2">
              <span class="item-modal">Farmacia</span>
            </a-radio>
            <a-radio :value="3">
              <span class="item-modal">Esthederm</span>
            </a-radio>
            <a-divider></a-divider>

            <a-radio :value="4">
              <span class="item-modal">Convenio</span>
            </a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button
          key="submit"
          type="primary"
          style="background-color:#009FD1; border-radius: 24px; width: 200px; margin-bottom: 20px;"
          :loading="inviteUserLoading"
          @click="onSubmitInvitationForm"
          >INVITAR</a-button
        >
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
                {
                  rules: [
                    { required: true, message: 'Favor de llenar el campo' }
                  ]
                }
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
          style="background-color:#009FD1; border-radius: 24px; width: 200px; margin-bottom: 20px;"
          >REGISTRAR</a-button
        >
      </template>
    </a-modal>
    <!--ISAIAS CLINICA-->
    <a-modal title="Registrar clínica" centered v-model="clinicModal">
      <p>
        <a-form :form="clinicForm">
          <a-form-item>
            <a-input
              placeholder="Ingresa el nombre de la clínica"
              v-decorator="[
                'clinic',
                {
                  rules: [
                    { required: true, message: 'Favor de llenar el campo' }
                  ]
                }
              ]"
            />
          </a-form-item>
        </a-form>
      </p>
      <template slot="footer">
        <a-button
          class="btn-center"
          @click="onSubmitClinicForm"
          type="primary"
          style="background-color:#009FD1; border-radius: 24px; width: 200px; margin-bottom: 20px;"
          >REGISTRAR CLINICA</a-button
        >
      </template>
    </a-modal>
    <!-- <AddRowModal
      title="Agregar convenio con empresa"
      :active="true"
      :form="clinicForm"
      placehold="Ingresa el nombre del convenio "
      :onOk="onSubmitClinicForm"
    /> -->
    <!--ISAIAS CLINICA-->

    <a-modal
      title="Selecciona el tipo de usuario del que deseas obtener la información"
      centered
      v-model="exportCSModal"
      :maskClosable="false"
      @cancel="closeExportCSVModal"
    >
      <a-form :form="exportCSVForm">
        <a-form-item>
          <a-radio-group
            v-decorator="[
              'type',
              {
                rules: [
                  {
                    required: true,
                    message: 'Favor de seleccionar un tipo de usuario'
                  }
                ]
              }
            ]"
          >
            <a-radio :value="1">
              <span class="item-modal">NAOS</span>
            </a-radio>
            <a-radio :value="2">
              <span class="item-modal">Farmacia</span>
            </a-radio>
            <a-radio :value="3">
              <span class="item-modal">Esthederm</span>
            </a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button
          v-if="!isCSVReady"
          key="submit"
          type="primary"
          style="background-color:#009FD1; border-radius: 24px; width: 200px; margin-bottom: 20px;"
          :loading="exportCSVLoading"
          @click="onGenerateReportClick"
          >GENERAR REPORTE</a-button
        >
        <download-csv
          v-else
          :data="dataToExport"
          :name="
            (reportSelected == 1
              ? 'NAOS_'
              : reportSelected == 2
              ? 'FARMACIA_'
              : 'ESTHEDERM_') +
              new Date().getTime().toString() +
              '.csv'
          "
        >
          <a-button
            type="primary"
            icon="download"
            style="background-color:#009FD1; border-radius: 24px; width: 200px; margin-bottom: 20px;"
            @click="closeExportCSVModal"
            >DESCARGAR REPORTE</a-button
          >
        </download-csv>
      </template>
    </a-modal>

    <ModalUserInfo
      :userInfo="userInfoModal"
      @cancel="onCloseInfoUser"
      :onCloseInfoUser="onCloseInfoUser"
      :visible="showUserInfoModal"
      :getUsersListInfo="getUsersListInfo"
    />
    <ModalResetPoints
      :visible="showResetPoints"
      @updateList="getUsersListInfo"
      @cancel="closeResetPointsModal"
    />
  </div>
</template>
<script>
import ModalUserInfo from "../components/modals/UserInfo/ModalUserInfo.vue";
import ModalResetPoints from "../components/modals/UserInfo/ModalResetPoints.vue";
import AddRowModal from "../components/modals/Users/AddRowModal.vue";

const userColumns = [
  {
    dataIndex: "name",
    key: "name",
    title: "Nombre de usuario",
    align: "center",
    sorter: (a, b) => {
      if (a.name.toUpperCase() < b.name.toUpperCase()) {
        return -1;
      }
      if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return 1;
      }
      return 0;
    }
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
    title: "Cadena",
    dataIndex: "chain",
    key: "chain",
    align: "center"
  },
  {
    title: "Clinica",
    dataIndex: "clinic",
    key: "clinic",
    align: "center"
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
const clinicColumns = [
  {
    dataIndex: "name",
    key: "name",
    title: "Clinica",
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
const convenioColumns = [
  {
    dataIndex: "name",
    key: "name",
    title: "NOMBRE DE LA EMPRESA",
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
    title: "DESCUENTO",
    dataIndex: "name",
    key: "name",
    align: "center"
  },
  {
    title: "",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];
export default {
  components: {
    ModalUserInfo,
    ModalResetPoints,
    AddRowModal
  },
  data() {
    return {
      collapsed: false,
      userSearch: "",
      chainSearch: "",
      clinicSearch: "",
      usersListInfo: [],
      users: [],
      userColumns,
      chainColumns,
      clinicColumns,
      convenioColumns,
      value: 1,
      activeTab: 1,
      chainModal: false,
      clinicModal: false,
      chainForm: this.$form.createForm(this),
      clinicForm: this.$form.createForm(this),
      inviteUserForm: this.$form.createForm(this),
      exportCSVForm: this.$form.createForm(this),
      showResetPoints: false,
      chains: [],
      clinics: [],
      tableChains: [],
      tableClinics: [],
      inviteUserModal: false,
      exportCSModal: false,
      inviteUserLoading: false,
      exportCSVLoading: false,
      showUserInfoModal: false,
      isLoadingTable: true,
      userInfoModal: {
        name: "",
        lastName: "",
        birthday: "",
        gender: "",
        city: "",
        pharmacy: "",
        chain: "",
        address: "",
        position: "",
        phone: "",
        email: "",
        totalPoints: "",
        pointsHistory: []
      },
      dataToExport: [],
      isCSVReady: false,
      reportSelected: 1
    };
  },
  mounted() {
    this.getUsersListInfo();
  },
  methods: {
    callback(key) {
      console.log(key);
    },
    async getUsersListInfo() {
      try {
        this.isLoadingTable = true;
        const response = await this.$axios("user");
        const usersList = response.data.users.map((val, index) => {
          return {
            key: val.id,
            name: val.name,
            email: val.email,
            profile: val.type.name,
            position: val.position === null ? "" : val.position.name,
            points: val.points,
            chain: val.chain === null ? "" : val.chain.name,
            clinic: val.clinic === null ? "" : val.clinic.name
          };
        });

        this.usersListInfo = usersList;
        this.users = usersList;
        this.isLoadingTable = false;
      } catch (error) {
        console.log("%cError al obtener los usuarios", "color:red;");
        console.log(error);
      }
    },
    onChangeTab(activeTabKey) {
      this.activeTab = activeTabKey;
      switch (activeTabKey) {
        case "1":
          this.getUsersListInfo();
          this.userSearch = "";
          break;
        case "2":
          this.getChains();
          this.chainSearch = "";
          break;
        case "3":
          this.getClinics();
          this.clinicSearch = "";
          break;
        default:
          break;
      }
    },
    async getChains() {
      try {
        this.isLoadingTable = true;
        const responseChains = await this.$axios("chain");
        this.chains = responseChains.data.chains;
        this.tableChains = this.chains;
      } catch (error) {
        console.log("Hubo un error al obtener las cadenas: ", error);
      }
      this.isLoadingTable = false;
    },
    async getClinics() {
      try {
        this.isLoadingTable = true;
        const responseClinics = await this.$axios("clinic");
        this.clinics = responseClinics.data.clinics;
        this.tableClinics = this.clinics;
      } catch (error) {
        console.log("Hubo un error al obtener las clinicas: ", error);
      }
      this.isLoadingTable = false;
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
            this.chainForm.resetFields();
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
    onSubmitClinicForm() {
      this.clinicForm.validateFields(async (err, values) => {
        if (!err) {
          try {
            const response = await this.$axios.post("clinic", {
              name: values.clinic.toUpperCase().trim(),
              isDeleted: false
            });
            this.clinicModal = false;
            this.clinicForm.resetFields();
            if (response.data == 1) {
              // ----AQUÍ
              this.getClinics();
              this.showNotification(
                "success",
                "Cadena registrada",
                "La clinica ha sido registrada correctamente."
              );
            } else if (response.data == 2) {
              this.showNotification(
                "info",
                "Esta clinica ya existe",
                "La clinica que ha intentando registrar, ya existe."
              );
            }
          } catch (err) {
            this.showNotification(
              "error",
              "Error al agregar clinica",
              "Ha ocurrido un error al registrar la clinica."
            );
            console.log(err);
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
    async onDeleteClinic(clinicId) {
      try {
        const response = await this.$axios.delete(`clinic/${clinicId}`);
        if (response.data == 1) {
          this.getClinics();
          this.showNotification(
            "success",
            "Clinica eliminada",
            "La clinica ha sido eliminada exitosamente."
          );
        }
      } catch (err) {
        this.showNotification(
          "error",
          "Error al eliminar clinica",
          "Ha ocurrido un error al intentar eliminar la clinica."
        );
      }
    },
    showDeleteConfirmChain(chaindId, onDelete) {
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
    showDeleteConfirmClinic(clinicId, onDelete) {
      this.$confirm({
        title: "¿Estás seguro que deseas eliminar esta clinica?",
        okText: "ELIMINAR",
        okType: "danger",
        cancelText: "CANCELAR",
        centered: true,
        onOk() {
          onDelete(clinicId);
        },
        onCancel() {}
      });
    },
    showDeleteConfirmUser(email, onDelete) {
      this.$confirm({
        title: "¿Estás seguro que deseas eliminar este usuario?",
        okText: "ELIMINAR",
        okType: "danger",
        cancelText: "CANCELAR",
        centered: true,
        onOk() {
          onDelete(email);
        },
        onCancel() {}
      });
    },
    async onDeleteUser(email) {
      try {
        const response = await this.$axios.delete(`user/${email}`);
        this.getUsersListInfo();
      } catch (error) {
        this.$notification[type]({
          message: "Error al eliminar usuario",
          description: "Hubo un error al eliminar el usuario."
        });
      }
    },
    onSearchUsers(value) {
      value = value.trim();
      this.usersListInfo = this.users.filter(
        user =>
          user.name.toUpperCase().indexOf(value.toUpperCase()) >= 0 ||
          user.email.toUpperCase().indexOf(value.toUpperCase()) >= 0
      );
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
    onSearchClinics(value) {
      const newClinic = this.clinics.filter(element => {
        return element.name.indexOf(value.toUpperCase()) >= 0;
      });
      if (newClinic.length === 0) {
        this.showNotification(
          "info",
          "No se encontraron coincidencias para esta clínica",
          "No se encontraron registros para esta búsqueda."
        );
      } else {
        this.tableClinics = newClinic;
      }
    },
    onSubmitInvitationForm() {
      this.inviteUserForm.validateFields(async (err, values) => {
        if (!err) {
          this.inviteUserLoading = true;
          try {
            const response = await this.$axios.post("user/invite", {
              email: values.email.trim().toLowerCase(),
              type: values.type
            });
            this.inviteUserLoading = false;
            this.inviteUserForm.resetFields();
            this.inviteUserModal = false;

            // console.log(response.data);

            if (response.data == 0) {
              this.showNotification(
                "success",
                "Invitación enviada",
                "La invitación ha sido enviada correctamente."
              );
            } else if (response.data === 9) {
              this.$notification["info"]({
                message: "Usuario activo",
                description: "El usuario se encuentra activo."
              });
            } else if (response.data === 8) {
              this.getUsersListInfo();
              this.$notification["success"]({
                message: "Usuario activado",
                description: "El usuario se ha activado exitosamente."
              });
            }
          } catch (err) {
            this.inviteUserLoading = false;
            this.showNotification(
              "error",
              "Error al invitar usuario",
              "Ha ocurrido un error realizar la invitación."
            );
          }
        }
      });
    },
    async onShowUserInfo(email) {
      console.log(
        "%cObteniendo informacion usuario.",
        "color:green;font-size:0.7rem;"
      );

      const responseList = await this.$axios.post("pointsbyuser/history", {
        email,
        page: 0
      });
      const response = await this.$axios(`user/${email}`);
      console.log("responseList", responseList);
      console.log("response", response.data.profile);

      response.data.profile.pointsHistory = responseList.data.points;

      this.userInfoModal = response.data.profile;

      this.showUserInfoModal = true;
    },
    onCloseInfoUser() {
      this.showUserInfoModal = false;
    },
    openResetPointsModal() {
      this.showResetPoints = true;
    },
    closeResetPointsModal() {
      this.showResetPoints = false;
    },
    closeInvitationModal() {
      this.inviteUserForm.resetFields();
    },
    closeExportCSVModal() {
      this.exportCSVForm.resetFields();
      this.exportCSModal = false;
      this.isCSVReady = false;
    },
    onGenerateReportClick() {
      this.exportCSVForm.validateFields(async (err, values) => {
        if (!err) {
          this.exportCSVLoading = true;
          try {
            const response = await this.$axios(`user/report/${values.type}`);
            this.exportCSVForm.resetFields();
            this.reportSelected = values.type;
            this.dataToExport = response.data.report;
            this.exportCSVLoading = false;
            this.isCSVReady = true;
          } catch (err) {
            this.exportCSVLoading = false;
            this.showNotification(
              "error",
              "Error al generar reporte",
              "Ha ocurrido un error al generar este reporte."
            );
          }
        }
      });
    }
  }
};
</script>
<style>
.card-container {
  /* background: #f0f2f5; */
  background: #fff;
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
  border-top: 0.5px solid rgba(0, 0, 0, 0.8);
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1);
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
  background: #526987;
  color: #fff;
}

.column-right {
  margin-top: 65px;
}

.item-modal {
  margin-right: 30px;
  color: #526987;
  font-weight: 500;
}

/* .ant-modal-close-x {
  color: white;
  margin: 1rem 1rem 0 0;
  background-color: #1790FF;
  border-radius: 50%;
  box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.6);
  transition-delay: 0ms;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
}

.ant-modal-close-x:active {
  transform: scale(0.8);
} */

.total-points-user {
  font-weight: bold;
}

.points-info-user-amount {
  font-size: 2.5rem;
}
</style>
