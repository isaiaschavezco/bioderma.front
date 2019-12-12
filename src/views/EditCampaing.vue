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
          <a-col class="description-icon title-span-tag">Regresar a Campaña</a-col>
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
          <a-col class="description-icon title-span-tag">Agregar Opcion Multiple</a-col>
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
          <a-col class="description-icon title-span-tag">Agregar Relacion de Columnas</a-col>
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
          <a-col class="description-icon title-span-tag">Agregar Completa la Frase</a-col>
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
          <a-col class="description-icon title-span-tag">Agregar Ordena la Frase</a-col>
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
          <a-col class="description-icon title-span-tag">Agregar Opcion Multiple Imagen</a-col>
        </a-row>
      </a-col>
    </a-row>

    <!-- MODALES -->
    <!-- OPCION MULTIPLE -->
    <ModalMultipleOption :isVisible="multipleOptionModal" @close="() => multipleOptionModal = false"/>

    <!-- RELACION DE COLUMNAS -->
    <a-modal title="NUEVA PREGUNTA RELACIÓN DE COLUMNAS" centered v-model="columnRelationModal">
      <a-form :form="columnRelationForm">
        <span>
          ESCRIBE EN LA COLUMNA 1 EL REACTIVO Y EN LA COLUMNA 2 LA RESPUESTA CORRECTA DE FORMA LINEAL,
          EL SISTEMA POR SI MISMO SE ENCARGARÁ DE ALEATORIZARLA AMBAS COLUMNAS
        </span>

        <a-row class="container-row-img-option">
          <a-form-item class="img-upload">
            <a-input
              placeholder="Reactivo A"
              v-decorator="[
          'questionA',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
            />
          </a-form-item>
          <a-form-item class="img-upload">
            <a-input
              placeholder="Respuesta A"
              v-decorator="[
          'answerA',
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
          'questionB',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
            />
          </a-form-item>
          <a-form-item class="img-upload">
            <a-input
              placeholder="Respuesta B"
              v-decorator="[
          'answerB',
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
          'questionC',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
            />
          </a-form-item>
          <a-form-item class="img-upload">
            <a-input
              placeholder="Respuesta C"
              v-decorator="[
          'answerC',
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
          'questionD',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
            />
          </a-form-item>
          <a-form-item class="img-upload">
            <a-input
              placeholder="Respuesta D"
              v-decorator="[
          'answerD',
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
          'questionE',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
            />
          </a-form-item>
          <a-form-item class="img-upload">
            <a-input
              placeholder="Respuesta E"
              v-decorator="[
          'answerE',
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
          'timeColum',
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
          'ptsColum',
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
          @click="onSubmitColumnRelationForm"
        >CANCELAR</a-button>
        <a-button
          key="submit"
          type="primary"
          style="background-color:#009FD1; border-radius: 24px; width: 150px; margin-bottom: 20px;"
          @click="onSubmitColumnRelationForm"
        >CREAR</a-button>
      </template>
    </a-modal>
    <!-- COMPLETA LA FRASE -->
    <a-modal title="NUEVA PREGUNTA COMPLETA LA FRASE" centered v-model="phraseCompleteModal">
      <a-form :form="phraseCompleteForm">
        <span>
          ESCRIBE TU PREGUNTA Y COLOCA CUATRO GUIONES BAJOS DONDE QUISIERAS DEJAR UN ESPACIO
          A COMPLETAR
        </span>
        <a-form-item>
          <a-input
            placeholder="PREGUNTA ____ X"
            v-decorator="[
          'name-questionPhrase',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
          />
        </a-form-item>
        <a-divider />
        <span>
          ESCRIBE TU RESPUESTAS Y SELECCIONA LA RESPUESTA CORRECTA, PUEDES ESCRIBIR 2 A 5
          POSIBLES REPUESTAS
        </span>
        <a-checkbox-group @change="onChange">
          <a-checkbox value="A-CP"></a-checkbox>
          <a-form-item>
            <a-input
              placeholder="Respuesta A"
              v-decorator="[
          'questionAPhrase',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
            />
          </a-form-item>
          <a-checkbox value="B-CP"></a-checkbox>
          <a-form-item>
            <a-input
              placeholder="Respuesta B"
              v-decorator="[
          'questionBPhrase',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
            />
          </a-form-item>
          <a-checkbox value="C-CP"></a-checkbox>
          <a-form-item>
            <a-input
              placeholder="Respuesta C"
              v-decorator="[
          'questionCPhrase',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
            />
          </a-form-item>
          <a-checkbox value="D-CP"></a-checkbox>
          <a-form-item>
            <a-input
              placeholder="Respuesta D"
              v-decorator="[
          'questionDPhrase',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
            />
          </a-form-item>
          <a-checkbox value="E-CP"></a-checkbox>
          <a-form-item>
            <a-input
              placeholder="Respuesta E"
              v-decorator="[
          'questionEPhrase',
          {rules: [{ required: true, message: 'Favor de llenar el campo' }]}
        ]"
            />
          </a-form-item>
        </a-checkbox-group>
        <a-divider />
        <span>ASIGNA UN TIEMPO PARA RESPONDER ESTA PREGUNTA</span>
        <a-form-item>
          <span>TIEMPO</span>
          <a-input
            style="width: 100px"
            placeholder
            v-decorator="[
          'timePhrase',
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
          'ptsPhrase',
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
        >CANCELAR</a-button>
        <a-button
          key="submit"
          type="primary"
          style="background-color:#009FD1; border-radius: 24px; width: 150px; margin-bottom: 20px;"
        >CREAR</a-button>
      </template>
    </a-modal>
    <!-- ORDENA LA FRASE -->
    <a-modal title="NUEVA PREGUNTA ORDENA LA FRASE" centered v-model="phraseOrderModal">
      <a-form :form="phraseOrderForm">
        <span>
          ESCRIBE TU FRASE, EL SISTEMA SE ENCARGARA DE SEPARAR PALABRA POR PALABRA
          Y ALEATORIZARLA AL MOMENTO DE GENERARLA
        </span>
        <a-form-item>
          <a-input
            placeholder="PREGUNTA"
            v-decorator="[
          'name-questionOrder',
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
          'timeOrder',
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
          'ptsOrder',
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
          @click="onSubmitPhraseOrderForm"
        >CANCELAR</a-button>
        <a-button
          key="submit"
          type="primary"
          style="background-color:#009FD1; border-radius: 24px; width: 150px; margin-bottom: 20px;"
          @click="onSubmitPhraseOrderForm"
        >CREAR</a-button>
      </template>
    </a-modal>
    <!-- OPCION MULTIPLE IMAGEN -->
    <a-modal
      title="NUEVA PREGUNTA OPCION MULTIPLE IMAGEN"
      centered
      v-model="multipleOptionImageModal "
    >
      <a-form :form="imageQuestionForm">
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
        <span>
          CARGA TUS IMAGENES Y SELECCIONA LA RESPUESTA CORRECTA, PUEDES CARGAR HASTA
          5 POSIBLES RESPUESTAS
        </span>
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
        >CANCELAR</a-button>
        <a-button
          key="submit"
          type="primary"
          style="background-color:#009FD1; border-radius: 24px; width: 150px; margin-bottom: 20px;"
        >CREAR</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import ModalMultipleOption from "../components/modals/Campaing/Questions/ModalMultipleOption.vue"

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
  components: {
    ModalMultipleOption
  },
  data() {
    return {
      quizzId: -1,
      multipleOptionModal: true,

      testIconSVG,
      collapsed: false,
      data,
      columns,
      chainModal: false,
      imageQuestionForm: this.$form.createForm(this),
      chainForm: this.$form.createForm(this),
      optionMultiForm: this.$form.createForm(this),
      columnRelationForm: this.$form.createForm(this),
      phraseCompleteForm: this.$form.createForm(this),
      phraseOrderForm: this.$form.createForm(this),
      columnRelationModal: false,
      phraseCompleteModal: false,
      phraseOrderModal: false,
      multipleOptionImageModal: false,
    };
  },
  mounted() {
    this.quizzId = this.$route.query.quizzId;
  },
  methods: {
    onChange(checkedValues) {
      console.log("checked = ", checkedValues);
    },
    onSubmitOptionMultiple() {
      this.optionMultiForm.validateFields(async (err, values) => {
        if (!err) {
          //this.inviteUserLoading = true;
          console.log(values);
          alert("Exito");
        }
      });
    },
    onSubmitColumnRelationForm() {
      this.columnRelationForm.validateFields(async (err, values) => {
        if (!err) {
          //this.inviteUserLoading = true;
          console.log(values);
          alert("Exito");
        }
      });
    },
    onSubmitPhraseCompleteForm() {
      this.phraseCompleteForm.validateFields(async (err, values) => {
        if (!err) {
          //this.inviteUserLoading = true;
          console.log(values);
          alert("Exito");
        }
      });
    },
    onSubmitPhraseOrderForm() {
      this.phraseOrderForm.validateFields(async (err, values) => {
        if (!err) {
          //this.inviteUserLoading = true;
          console.log(values);
          alert("Exito");
        }
      });
    },
    handleChange() {

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
.container-row-img-option {
  display: flex;
  justify-content: center;
}

.img-upload {
  margin: 13px 13px;
}
</style>
