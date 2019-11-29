<template>
  <div class="container-blog">
    <a-row>
      <a-col :xs="{ span: 18 }" class="column">
        <div class="card-container">
          <a-card title="CAMPAÑA PHOTODERM">
            <a-table :columns="columns" :dataSource="data" style="margin-top: 1rem;">
              <span slot="action" slot-scope="text, record">
                <a-button shape="circle" icon="edit" size="large" />
                <a-divider type="vertical" />
                <a-button shape="circle" icon="delete" size="large" />
              </span>
            </a-table>
          </a-card>
        </div>
      </a-col>

      <!-- BOTONES -->
      <a-col class="column" :xs="{ span: 4 }" style="text-align:center;">
        <a-row class="btn-description">
          <a-col>
            <router-link to="ViewCampaing">
              <a-button shape="circle" icon="arrow-left" size="large" />
            </router-link>
          </a-col>
          <a-col class="description-icon">Regresar a Campaña</a-col>
        </a-row>
        <a-row class="btn-description">
          <a-col>
            <a-button
              shape="circle"
              icon="bars"
              size="large"
              @click="() => multipleOptionModal = true"
            />
          </a-col>
          <a-col class="description-icon">Agregar Opcion Multiple</a-col>
        </a-row>
        <a-row class="btn-description">
          <a-col>
            <a-button
              shape="circle"
              icon="rise"
              size="large"
              @click="() => columnRelationModal = true"
            />
          </a-col>
          <a-col class="description-icon">Agregar Relacion de Columnas</a-col>
        </a-row>
        <a-row class="btn-description">
          <a-col>
            <a-button
              shape="circle"
              icon="dash"
              size="large"
              @click="() => phraseCompleteModal = true"
            />
          </a-col>
          <a-col class="description-icon">Agregar Completa la Frase</a-col>
        </a-row>
        <a-row class="btn-description">
          <a-col>
            <a-button
              shape="circle"
              icon="appstore"
              size="large"
              @click="() => phraseOrderModal = true"
            />
          </a-col>
          <a-col class="description-icon">Agregar Ordena la Frase</a-col>
        </a-row>
        <a-row class="btn-description">
          <a-col>
            <a-button
              shape="circle"
              icon="picture"
              size="large"
              @click="() => multipleOptionImageModal = true"
            />
          </a-col>
          <a-col class="description-icon">Agregar Opcion Multiple Imagen</a-col>
        </a-row>
      </a-col>
    </a-row>

    <!-- MODALES -->
    <!-- OPCION MULTIPLE -->
    <a-modal title="NUEVA PREGUNTA OPCION MULTIPLE" centered v-model="multipleOptionModal ">
      <a-form :form="inviteUserForm">
        <span>ESCRIBE TU PREGUNTA</span>
        <a-form-item>
          <a-input
            placeholder="PREGUNTA"
            v-decorator="[
          'name-question',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
          />
        </a-form-item>
        <a-divider />
        <span>
          ESCRIBE TU RESPUESTAS Y SELECCIONA LA RESPUESTA CORRECTA, PUEDES ESCRIBIR 2 A 5
          POSIBLES REPUESTAS
        </span>
        <a-form-item>
          <a-input
            placeholder="Respuesta A"
            v-decorator="[
          'questionA',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            placeholder="Respuesta B"
            v-decorator="[
          'questionB',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            placeholder="Respuesta C"
            v-decorator="[
          'questionC',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            placeholder="Respuesta D"
            v-decorator="[
          'questionD',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            placeholder="Respuesta E"
            v-decorator="[
          'questionE',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
          />
        </a-form-item>
        <a-divider />
        <span>ASIGNA UN TIEMPO PARA RESPONDER ESTA PREGUNTA</span>
        <a-form-item>
          <span>TIEMPO</span>
          <a-input
            style="width: 100px"
            placeholder
            v-decorator="[
          'time',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
          />
          <span>SEG</span>
        </a-form-item>
        <a-divider />
        <span>ASIGNA UN PUNTAJE PARA ESTA PREGUNTA</span>
        <a-form-item>
          <a-input
            style="width: 100px"
            placeholder
            v-decorator="[
          'pts',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
          />
          <span>PTS</span>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-divider />
        <a-button
          key="submit"
          type="primary"
          style="background-color:#009FD1; border-radius: 24px; width: 150px; margin-bottom: 20px;"
          :loading="inviteUserLoading"
          @click="onSubmitInvitationForm"
        >CANCELAR</a-button>
        <a-button
          key="submit"
          type="primary"
          style="background-color:#009FD1; border-radius: 24px; width: 150px; margin-bottom: 20px;"
          :loading="inviteUserLoading"
          @click="onSubmitInvitationForm"
        >CREAR</a-button>
      </template>
    </a-modal>
    <!-- RELACION DE COLUMNAS -->
    <a-modal title="NUEVA PREGUNTA RELACIÓN DE COLUMNAS" centered v-model="columnRelationModal">
      <a-form :form="inviteUserForm">
        <span>
          ESCRIBE EN LA COLUMNA 1 EL REACTIVO Y EN LA COLUMNA 2 LA RESPUESTA CORRECTA DE FORMA LINEAL,
          EL SISTEMA POR SI MISMO SE ENCARGARÁ DE ALEATORIZARLA AMBAS COLUMNAS
        </span>

        <a-row class="container-row-img-option">
          <a-form-item class="img-upload">
            <a-input
              placeholder="Reactivo A"
              v-decorator="[
          'name-question',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
            />
          </a-form-item>
          <a-form-item class="img-upload">
            <a-input
              placeholder="Respuesta A"
              v-decorator="[
          'name-question',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
            />
          </a-form-item>
        </a-row>
        <a-row class="container-row-img-option">
          <a-form-item class="img-upload">
            <a-input
              placeholder="Reactivo B"
              v-decorator="[
          'name-question',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
            />
          </a-form-item>
          <a-form-item class="img-upload">
            <a-input
              placeholder="Respuesta B"
              v-decorator="[
          'name-question',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
            />
          </a-form-item>
        </a-row>
        <a-row class="container-row-img-option">
          <a-form-item class="img-upload">
            <a-input
              placeholder="Reactivo C"
              v-decorator="[
          'name-question',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
            />
          </a-form-item>
          <a-form-item class="img-upload">
            <a-input
              placeholder="Respuesta C"
              v-decorator="[
          'name-question',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
            />
          </a-form-item>
        </a-row>
        <a-row class="container-row-img-option">
          <a-form-item class="img-upload">
            <a-input
              placeholder="Reactivo D"
              v-decorator="[
          'name-question',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
            />
          </a-form-item>
          <a-form-item class="img-upload">
            <a-input
              placeholder="Respuesta D"
              v-decorator="[
          'name-question',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
            />
          </a-form-item>
        </a-row>
        <a-row class="container-row-img-option">
          <a-form-item class="img-upload">
            <a-input
              placeholder="Reactivo E"
              v-decorator="[
          'name-question',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
            />
          </a-form-item>
          <a-form-item class="img-upload">
            <a-input
              placeholder="Respuesta E"
              v-decorator="[
          'name-question',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
            />
          </a-form-item>
        </a-row>

        <a-divider />
        <span>ASIGNA UN TIEMPO PARA RESPONDER ESTA PREGUNTA</span>
        <a-form-item>
          <span>TIEMPO</span>
          <a-input
            style="width: 100px"
            placeholder
            v-decorator="[
          'time',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
          />
          <span>SEG</span>
        </a-form-item>
        <a-divider />
        <span>ASIGNA UN PUNTAJE PARA ESTA PREGUNTA</span>
        <a-form-item>
          <a-input
            style="width: 100px"
            placeholder
            v-decorator="[
          'pts',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
          />
          <span>PTS</span>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-divider />
        <a-button
          key="submit"
          type="primary"
          style="background-color:#009FD1; border-radius: 24px; width: 150px; margin-bottom: 20px;"
          :loading="inviteUserLoading"
          @click="onSubmitInvitationForm"
        >CANCELAR</a-button>
        <a-button
          key="submit"
          type="primary"
          style="background-color:#009FD1; border-radius: 24px; width: 150px; margin-bottom: 20px;"
          :loading="inviteUserLoading"
          @click="onSubmitInvitationForm"
        >CREAR</a-button>
      </template>
    </a-modal>
    <!-- COMPLETA LA FRASE -->
    <a-modal title="NUEVA PREGUNTA COMPLETA LA FRASE" centered v-model="phraseCompleteModal">
      <a-form :form="inviteUserForm">
        <span>
          ESCRIBE TU PREGUNTA Y COLOCA CUATRO GUIONES BAJOS DONDE QUISIERAS DEJAR UN ESPACIO
          A COMPLETAR
        </span>
        <a-form-item>
          <a-input
            placeholder="PREGUNTA ____ X"
            v-decorator="[
          'name-question',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
          />
        </a-form-item>
        <a-divider />
        <span>
          ESCRIBE TU RESPUESTAS Y SELECCIONA LA RESPUESTA CORRECTA, PUEDES ESCRIBIR 2 A 5
          POSIBLES REPUESTAS
        </span>
        <a-form-item>
          <a-input
            placeholder="Respuesta A"
            v-decorator="[
          'questionA',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            placeholder="Respuesta B"
            v-decorator="[
          'questionB',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            placeholder="Respuesta C"
            v-decorator="[
          'questionC',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            placeholder="Respuesta D"
            v-decorator="[
          'questionD',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            placeholder="Respuesta E"
            v-decorator="[
          'questionE',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
          />
        </a-form-item>
        <a-divider />
        <span>ASIGNA UN TIEMPO PARA RESPONDER ESTA PREGUNTA</span>
        <a-form-item>
          <span>TIEMPO</span>
          <a-input
            style="width: 100px"
            placeholder
            v-decorator="[
          'time',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
          />
          <span>SEG</span>
        </a-form-item>
        <a-divider />
        <span>ASIGNA UN PUNTAJE PARA ESTA PREGUNTA</span>
        <a-form-item>
          <a-input
            style="width: 100px"
            placeholder
            v-decorator="[
          'pts',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
          />
          <span>PTS</span>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-divider />
        <a-button
          key="submit"
          type="primary"
          style="background-color:#009FD1; border-radius: 24px; width: 150px; margin-bottom: 20px;"
          :loading="inviteUserLoading"
          @click="onSubmitInvitationForm"
        >CANCELAR</a-button>
        <a-button
          key="submit"
          type="primary"
          style="background-color:#009FD1; border-radius: 24px; width: 150px; margin-bottom: 20px;"
          :loading="inviteUserLoading"
          @click="onSubmitInvitationForm"
        >CREAR</a-button>
      </template>
    </a-modal>
    <!-- ORDENA LA FRASE -->
    <a-modal title="NUEVA PREGUNTA ORDENA LA FRASE" centered v-model="phraseOrderModal">
      <a-form :form="inviteUserForm">
        <span>
          ESCRIBE TU FRASE, EL SISTEMA SE ENCARGARA DE SEPARAR PALABRA POR PALABRA
          Y ALEATORIZARLA AL MOMENTO DE GENERARLA
        </span>
        <a-form-item>
          <a-input
            placeholder="PREGUNTA"
            v-decorator="[
          'name-question',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
          />
        </a-form-item>
        <a-divider />
        <span>ASIGNA UN TIEMPO PARA RESPONDER ESTA PREGUNTA</span>
        <a-form-item>
          <span>TIEMPO</span>
          <a-input
            style="width: 100px"
            placeholder
            v-decorator="[
          'time',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
          />
          <span>SEG</span>
        </a-form-item>
        <a-divider />
        <span>ASIGNA UN PUNTAJE PARA ESTA PREGUNTA</span>
        <a-form-item>
          <a-input
            style="width: 100px"
            placeholder
            v-decorator="[
          'pts',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
          />
          <span>PTS</span>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-divider />
        <a-button
          key="submit"
          type="primary"
          style="background-color:#009FD1; border-radius: 24px; width: 150px; margin-bottom: 20px;"
          :loading="inviteUserLoading"
          @click="onSubmitInvitationForm"
        >CANCELAR</a-button>
        <a-button
          key="submit"
          type="primary"
          style="background-color:#009FD1; border-radius: 24px; width: 150px; margin-bottom: 20px;"
          :loading="inviteUserLoading"
          @click="onSubmitInvitationForm"
        >CREAR</a-button>
      </template>
    </a-modal>
    <!-- OPCION MULTIPLE IMAGEN -->
    <a-modal
      title="NUEVA PREGUNTA OPCION MULTIPLE IMAGEN"
      centered
      v-model="multipleOptionImageModal "
    >
      <a-form :form="inviteUserForm">
        <span>ESCRIBE TU PREGUNTA</span>
        <a-form-item>
          <a-input
            placeholder="PREGUNTA"
            v-decorator="[
          'name-question',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
          />
        </a-form-item>

        <a-row class="container-row-img-option">
          <a-form-item class="img-upload">
            <a-upload-dragger
              name="file"
              :multiple="false"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              @change="handleChange"
            >
              <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
              </p>
              <p class="ant-upload-text">Seleccione una imagen</p>
              <p class="ant-upload-hint"></p>
            </a-upload-dragger>
          </a-form-item>
          <a-form-item class="img-upload">
            <a-upload-dragger
              name="file"
              :multiple="false"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              @change="handleChange"
            >
              <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
              </p>
              <p class="ant-upload-text">Seleccione una imagen</p>
              <p class="ant-upload-hint"></p>
            </a-upload-dragger>
          </a-form-item>
        </a-row>
        <a-row class="container-row-img-option">
          <a-form-item class="img-upload">
            <a-upload-dragger
              name="file"
              :multiple="false"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              @change="handleChange"
            >
              <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
              </p>
              <p class="ant-upload-text">Seleccione una imagen</p>
              <p class="ant-upload-hint"></p>
            </a-upload-dragger>
          </a-form-item>

          <a-form-item class="img-upload">
            <a-upload-dragger
              name="file"
              :multiple="false"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              @change="handleChange"
            >
              <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
              </p>
              <p class="ant-upload-text">Seleccione una imagen</p>
              <p class="ant-upload-hint"></p>
            </a-upload-dragger>
          </a-form-item>
        </a-row>
        <a-row class="container-row-img-option">
          <a-form-item class="img-upload">
            <a-upload-dragger
              name="file"
              :multiple="false"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              @change="handleChange"
            >
              <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
              </p>
              <p class="ant-upload-text">Seleccione una imagen</p>
              <p class="ant-upload-hint"></p>
            </a-upload-dragger>
          </a-form-item>
        </a-row>

        <a-divider />
        <span>ASIGNA UN TIEMPO PARA RESPONDER ESTA PREGUNTA</span>
        <a-form-item>
          <span>TIEMPO</span>
          <a-input
            style="width: 100px"
            placeholder
            v-decorator="[
          'time',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
          />
          <span>SEG</span>
        </a-form-item>
        <a-divider />
        <span>ASIGNA UN PUNTAJE PARA ESTA PREGUNTA</span>
        <a-form-item>
          <a-input
            style="width: 100px"
            placeholder
            v-decorator="[
          'pts',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
          />
          <span>PTS</span>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-divider />
        <a-button
          key="submit"
          type="primary"
          style="background-color:#009FD1; border-radius: 24px; width: 150px; margin-bottom: 20px;"
          :loading="inviteUserLoading"
          @click="onSubmitInvitationForm"
        >CANCELAR</a-button>
        <a-button
          key="submit"
          type="primary"
          style="background-color:#009FD1; border-radius: 24px; width: 150px; margin-bottom: 20px;"
          :loading="inviteUserLoading"
          @click="onSubmitInvitationForm"
        >CREAR</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
const testIconSVG = {
  template: `  <svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.422 155.255"><defs><style>.cls-1{fill:#1d1d1b;}</style></defs><title>Agregar_CompletaLaFrase</title><g id="Grupo_587" data-name="Grupo 587"><g id="Grupo_579" data-name="Grupo 579"><g id="Grupo_549" data-name="Grupo 549"><rect id="Rectángulo_260" data-name="Rectángulo 260" class="cls-1" y="3.794" width="156.63" height="65.626"/></g><g id="Grupo_550" data-name="Grupo 550"><path id="Trazado_2103" data-name="Trazado 2103" class="cls-1" d="M337.9,261.227H173.675V188.014H337.9ZM181.25,253.64H330.294V195.612H181.273Z" transform="translate(0.422 -188.014)"/></g><g id="Grupo_551" data-name="Grupo 551"><rect id="Rectángulo_261" data-name="Rectángulo 261" class="cls-1" x="355.792" y="3.794" width="156.63" height="65.626"/></g><g id="Grupo_552" data-name="Grupo 552"><rect id="Rectángulo_262" data-name="Rectángulo 262" class="cls-1" y="89.628" width="156.63" height="65.626"/></g><g id="Grupo_553" data-name="Grupo 553"><rect id="Rectángulo_263" data-name="Rectángulo 263" class="cls-1" x="177.901" y="89.628" width="156.63" height="65.626"/></g></g></g></svg>`
};

const testIcon = {
  template: `<a-icon :component="testIconSVG" />`
};
const columns = [
  {
    dataIndex: "title",
    key: "title",
    title: "PREGUNTA",
    align: "center"
  },
  {
    title: "TIPO",
    dataIndex: "valid",
    key: "valid",
    align: "center",
    scopedSlots: { customRender: "tags" }
  },
  {
    title: "TIEMPO",
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
      testIconSVG,
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
      multipleOptionModal: false,
      columnRelationModal: false,
      phraseCompleteModal: false,
      phraseOrderModal: false,
      multipleOptionImageModal: false,
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
.column {
  margin-top: 65px;
}

.item-modal {
  margin-right: 30px;
  color: #526987;
  font-weight: 500;
}

.btn-description {
  margin-top: 12px;
}

.description-icon {
  margin: 0 auto;
  width: 70%;
}

.container-multi-option {
}

.container-row-img-option {
  display: flex;
  justify-content: center;
}

.img-upload {
  margin: 13px 13px;
}
</style>
