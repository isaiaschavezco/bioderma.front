<template>
  <div class="container-blog">
    <a-row>
      <a-col :xs="{ span: 15 }">
        <a-card :title="campaingName">
          <a-skeleton :loading="loadingQuizz" active>
            <a-table :columns="columns" :dataSource="quizz" style="margin-top: 0rem;" size="small">
              <span slot="action" slot-scope="text, record">
                <a-button
                  shape="circle"
                  icon="edit"
                  size="large"
                  @click="() => editQuizz(record.quizzId, record.name, text.status)"
                />
                <a-divider type="vertical" />
                <a-button
                  shape="circle"
                  icon="delete"
                  size="large"
                  @click="onOpenModalRemove(record.quizzId)"
                />

                <a-divider type="vertical" />
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>{{record.isSend ? 'Esta trivia ha sido enviada' : (record.questions <= 0 ? 'Esta trivia no tiene preguntas asignadas' : 'Enviar') }}</span>
                  </template>
                  <a-button
                    shape="circle"
                    icon="caret-right"
                    size="large"
                    :disabled="record.isSend ? true : record.questions <= 0"
                    @click="() => {validityModalForm = true; currentModalId = record.quizzId;}"
                  />
                </a-tooltip>
              </span>
            </a-table>
          </a-skeleton>
        </a-card>
      </a-col>

      <a-col :xs="{ span: 6 }" style="margin-left: 30px;">
        <div class="container-notification">
          <a-card title="RECORD" style="text-align:center;">
            <a-list
              itemLayout="horizontal"
              size="small"
              :pagination="pagination"
              :dataSource="usersTop"
            >
              <a-list-item slot="renderItem" slot-scope="item, index" key="item.id">
                <a-list-item-meta>
                  <a slot="title">{{item.name.toUpperCase() + " " + item.lastName.toUpperCase()}}</a>
                  <a-avatar
                    style="color: #f56a00; backgroundColor: #fde3cf"
                    slot="avatar"
                  >{{ actualUsersTopPage == 1 ? index + 1 : (actualUsersTopPage-1) * 10 + index + 1 }}</a-avatar>
                </a-list-item-meta>
                <div>{{item.totalPoints}}</div>
              </a-list-item>
            </a-list>
          </a-card>
        </div>
      </a-col>
      <a-col class="column-right" :xs="{ span: 2 }" style="text-align:center;">
        <div v-if="activeTab == 1">
          <a-row>
            <a-col>
              <a-button
                shape="circle"
                icon="plus"
                size="large"
                @click="() => quizzModalRegister = true"
              />
            </a-col>
            <a-col>Añadir trivia</a-col>
          </a-row>
          <a-row style="margin-top:2rem;" v-if="!isCSVReady">
            <a-col>
              <a-button
                shape="circle"
                icon="file-text"
                size="large"
                :loading="exportCSVLoading"
                @click="onGenerateReportClick"
              />
            </a-col>
            <a-col class="title-span-tag">Generar CSV</a-col>
          </a-row>
          <a-row style="margin-top:2rem;" v-if="isCSVReady">
            <a-col>
              <download-csv
                :data="dataToExport"
                :name="'Campaing_' + campaingName + '_' + (new Date()).getTime().toString() + '.csv'"
              >
                <a-button
                  shape="circle"
                  icon="download"
                  size="large"
                  @click="() => isCSVReady = false"
                />
              </download-csv>
            </a-col>
            <a-col class="title-span-tag">Descargar CSV</a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>

    <ModalRemoveConfirmation
      :isVisible="removeConfirmationModal"
      targetName="trivia"
      :quizzId="quizzIdToRemove"
      @close="onCloseRemoveConfirmationModal"
      @confirm="removeQuizz"
    />

    <a-modal title="NUEVA ENTRADA" centered v-model="quizzModalRegister">
      <a-form :form="quizzForm">
        <a-form-item>
          <a-input
            placeholder="Titulo de la trivia"
            v-decorator="[
          'quizzTitle',
          {rules: [{ required: true, message: 'Favor de asignar un titulo a la trivia' }]}
        ]"
          />
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button
          key="submit"
          type="primary"
          style="background-color:#009FD1; border-radius: 24px; width: 200px; margin: 0 auto 20px auto; display:block"
          :loading="inviteUserLoading"
          @click="onSubmitQuizz"
        >SIGUIENTE</a-button>
      </template>
    </a-modal>

    <a-modal
      class="modal-validity"
      v-model="validityModalForm"
      :closable="false"
      width="60%"
      centered
      :bodyStyle="{
        height: '300px'
      }"
    >
      <h4>ANTES DE ENVIAR LA TRIVIA DEBES ASIGNAR UNA VIGENCIA</h4>

      <div class="modal-validity__form">
        <span>VIGENCIAL DEL:</span>
        <a-date-picker
          :disabledDate="disabledStartValidityDate"
          :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
          format="DD-MM-YYYY HH:mm:ss"
          
          v-model="startValidityDate"
          placeholder="Inicio de trivia"
          @openChange="handleStartOpenChange"
        />
        <span>AL</span>
        <a-date-picker
          :disabledDate="disabledEndValidityDate"
          :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
          format="DD-MM-YYYY HH:mm:ss"
          placeholder="Fin trivia"
          v-model="endValidityDate"
          :open="endOpenDate"
          @openChange="handleEndOpenChange"
        />
      </div>

      <template slot="footer">
        <div class="validity-form__buttons">
          <a-button
            class="validity-form__button"
            type="primary"
            size="large"
            @click="() => validityModalForm = false"
          >Cancelar</a-button>
          <a-button
            class="validity-form__button"
            type="primary"
            size="large"
            v-if="continueBtnValidity"
            @click="onSubmitValidityForm"
          >Enviar</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>
<script>
import moment from "moment";
import ModalRemoveConfirmation from "../components/modals/Campaing/Confirmation/ModalRemoveConfirmation.vue";

const columns = [
  {
    dataIndex: "name",
    key: "name",
    title: "NOMBRE DE LA TRIVIA",
    align: "center"
  },
  {
    title: "VIGENCIA",
    dataIndex: "validity",
    key: "validity",
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

export default {
  components: {
    ModalRemoveConfirmation
  },
  data() {
    return {
      currentModalId: -1,
      continueBtnValidity: false,
      startValidityDate: null,
      endValidityDate: null,
      endOpenDate: false,
      loadingQuizz: true,
      validityModalForm: false,
      collapsed: false,
      columns,
      value: 1,
      activeTab: 1,
      quizzModalRegister: false,
      quizzForm: this.$form.createForm(this),
      chains: [],
      tableChains: [],
      inviteUserLoading: false,
      campaingId: this.$route.query.id,
      campaingName: this.$route.params.name,
      removeConfirmationModal: false,
      quizz: [],
      quizzIdToRemove: 0,
      actualUsersTopPage: 1,
      pagination: {
        onChange: page => {
          this.actualUsersTopPage = page;
        },
        pageSize: 10
      },
      usersTop: [],
      isCSVReady: false,
      dataToExport: [],
      exportCSVLoading: false
    };
  },
  mounted() {
    this.getCampaingDetails();
    this.getTopUsers();
  },
  watch: {
    startValidityDate: function() {
      this.continueBtnValidity =
        this.startValidityDate !== null && this.endValidityDate !== null;
    },
    endValidityDate: function() {
      this.continueBtnValidity =
        this.startValidityDate !== null && this.endValidityDate !== null;
    }
  },
  methods: {
    moment,
    onOpenModalRemove(quizzId) {
      this.quizzIdToRemove = quizzId;
      this.removeConfirmationModal = true;
    },
    disabledAllDates(current) {
      return true;
    },
    disabledValidityDate(current) {
      // Can not select days before today and today
      return current && current < moment().endOf("day");
    },
    disabledStartValidityDate(startValidityDate) {
      const endValidityDate = this.endValidityDate;
      if (!startValidityDate || !endValidityDate) {
        return false;
      }
      return (
        startValidityDate.valueOf() > endValidityDate.valueOf() &&
        disabledValidityDate(startValidityDate)
      );
    },
    disabledEndValidityDate(endValidityDate) {
      const startValidityDate = this.startValidityDate;
      if (!endValidityDate || !startValidityDate) {
        return false;
      }
      return startValidityDate.valueOf() >= endValidityDate.valueOf();
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpenDate = true;
      }
    },
    handleEndOpenChange(open) {
      this.endOpenDate = open;
    },
    async getCampaingDetails() {
      this.loadingQuizz = true;

      try {
        const response = await this.$axios(`quizz/${this.campaingId}`);

        this.quizz = response.data;

        console.log("this.quizz: ", this.quizz);

        this.quizz.map((trivia, index) => {
          const newTrivia = trivia;
          newTrivia.key = index;

          if (newTrivia.isDeleted) newTrivia.status = "Eliminada";
          else if (newTrivia.isActive) newTrivia.status = "Activa";
          else if (newTrivia.isSend) newTrivia.status = "Enviada";
          else newTrivia.status = "No enviada";

          if (newTrivia.startedAt === "Invalid date")
            newTrivia.validity = "No asignada";
          else
            newTrivia.validity = `${newTrivia.startedAt} - ${newTrivia.finishedAt}`;

          return newTrivia;
        });

        // for (let i = 0; i < this.quizz.length; ++i) {
        //   const currQuizz = this.quizz[i];
        //   const ans = await this.$axios(`question/${currQuizz.quizzId}`);
        //   this.isSend[i] = ans.data.questions.length > 0;
        // }
      } catch (err) {}
      this.loadingQuizz = false;
    },
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
    async onSubmitQuizz() {
      this.quizzForm.validateFields(async (err, values) => {
        if (!err) {
          try {
            const quizzInfo = {
              campaingId: this.campaingId,
              name: values.quizzTitle
            };

            // console.log(quizzInfo);

            const response = await this.$axios.post("quizz", quizzInfo);

            this.quizzModalRegister = false;
            this.quizzForm.resetFields();
            this.getCampaingDetails();

            // console.log(response.data);

            if (response.data == 0) {
              this.showNotification(
                "success",
                "Trivia registrada",
                "La trivia ha sido registrada correctamente."
              );
            }
          } catch (err) {
            this.showNotification(
              "error",
              "Error al agregar trivia",
              "Ha ocurrido un error al registrar la trivia."
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
    async onSubmitValidityForm() {
      const quizzId = this.currentModalId;
      const urlValidityDate = "quizz/send";

      console.log("Submited Dates: ");
      console.log(
        quizzId,
        this.startValidityDate.format("YYYY-MM-DD"),
        this.endValidityDate.format("YYYY-MM-DD")
      );

      try {
        const validityDate = {
          quizzId,
          startDate: this.startValidityDate.format("YYYY-MM-DD HH:mm:ss"),
          finishDate: this.endValidityDate.format("YYYY-MM-DD HH:mm:ss")
        };
        const response = await this.$axios.post(urlValidityDate, validityDate);

        this.getCampaingDetails();
        this.validityModalForm = false;
        this.startValidityDate = null;
        this.endValidityDate = null;
        // console.log("Response validity:", response.data);
      } catch (err) {
        console.log("Submit dates: ", err);
      }
    },
    editQuizz(quizzId, quizzName, status) {
      this.$router.push({
        name: "editCampaing",
        query: { quizzId },
        params: {
          campaingName: this.campaingName,
          quizzName,
          status: status.toUpperCase() !== "ACTIVA"
        }
      });
    },
    removeQuizz(status) {
      let type = "";
      let title = "";
      let content = "";
      switch (status) {
        case -1:
          type = "error";
          title = "Error al eliminar trivia";
          content = "Ha ocurrido un error al eliminar esta trivia.";
          break;
        case 0:
          type = "success";
          title = "Trivia eliminada";
          content = "Se ha eliminado la trivia exitosamente.";
          break;
        case 1:
          type = "warning";
          title = "Usuario no encontrado";
          content = "No se ha encontrado un usuario asociado a este correo.";
          break;
        case 2:
          type = "warning";
          title = "Contraseña incorrecta";
          content = "La contraseña no coincide para este usuario.";
          break;
        default:
          break;
      }
      if (status != null) {
        this.onCloseRemoveConfirmationModal();
        this.getCampaingDetails();
        this.$notification[type]({
          message: title,
          description: content
        });
      }
    },
    onCloseRemoveConfirmationModal() {
      this.removeConfirmationModal = false;
    },
    async getTopUsers() {
      const response = await this.$axios(
        `pointsbyuser/campaing/${this.campaingId}`
      );
      this.usersTop = response.data.points;
      // console.log("usersTop: ", this.usersTop);
    },
    async onGenerateReportClick() {
      this.exportCSVLoading = true;
      try {
        const response = await this.$axios(`campaing/report/${this.campaingId}`);
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
.form-questions__button {
  text-align: center;
}
.modal-validity h4 {
  font-size: 1.1rem;
  font-weight: 650;
  text-align: center;
  margin: 3rem 0 4rem 0;
}
.modal-validity__form {
  text-align: center;
  font-size: 1rem;
}
.modal-validity__form span {
  margin: 0 0.2rem;
}
.validity-form__buttons {
  text-align: center;
}
.validity-form__button {
  width: 20%;
}
</style>
