<template>
  <div class="container-blog">
    <a-row>
      <a-col :xs="{ span: 18 }" class="column">
        <div class="card-container">
          <a-card title="CAMPAÑA PHOTODERM">
            <a-table :columns="columnsQuestionsTable" :dataSource="questionsData" style="margin-top: 1rem;">
              <span slot="action" slot-scope="text, record">
                <a-button shape="circle" icon="edit" size="large" @click="() => editQuestion(text.key)" />
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
              @click="() => completeSentenceModal = true"
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
              @click="() => sortSentenceModal = true"
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
    <ModalMultipleOption :isVisible="multipleOptionModal" :quizz="quizzId" @register="registerQuestion" @close="onCloseModal" />

    <!-- COMPLETA LA FRASE -->
    <ModalCompleteSentence :isVisible="completeSentenceModal" :quizz="quizzId" @register="registerQuestion" @close="onCloseModal" />

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
    <!-- ORDENA LA FRASE -->
    <a-modal title="NUEVA PREGUNTA ORDENA LA FRASE" centered v-model="sortSentenceModal">
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
import ModalMultipleOption from "../components/modals/Campaing/Questions/ModalMultipleOption.vue";
import ModalCompleteSentence from "../components/modals/Campaing/Questions/ModalCompleteSentence.vue";

export default {
  components: {
    ModalMultipleOption,
    ModalCompleteSentence,
  },
  data() {
    return {
      quizzId: this.$route.query.quizzId,
      multipleOptionModal: false,

      collapsed: false,
      questionsData: [],
      columnsQuestionsTable: [
        {
          dataIndex: "title",
          key: "title",
          title: "PREGUNTA",
          align: "center"
        },
        {
          title: "TIPO",
          dataIndex: "type",
          key: "type",
          align: "center",
          scopedSlots: { customRender: "tags" }
        },
        {
          title: "TIEMPO",
          dataIndex: "time",
          key: "time",
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
      ],
      chainModal: false,
      imageQuestionForm: this.$form.createForm(this),
      chainForm: this.$form.createForm(this),
      columnRelationForm: this.$form.createForm(this),
      phraseOrderForm: this.$form.createForm(this),
      columnRelationModal: false,
      completeSentenceModal: true,
      sortSentenceModal: false,
      multipleOptionImageModal: false,
    };
  },
  async mounted() {
    this.getQuestions();
  },
  methods: {
    async getQuestions() {
      const urlQuestions = `https://bioderma-api-inmersys.herokuapp.com/question/${this.quizzId}`;
      let questions = [];

      try {
        console.log("Obteniendo preguntas...");
        const response = await this.$axios(urlQuestions);
        
        questions = this.getFormatedQuestions(response.data);
      } catch (error) {
        console.log("Hubo un error: ", error);
      }

      this.questionsData = questions;
    },
    getFormatedQuestions(questionsResponse) {
      const questions = questionsResponse.questions.map(question => {
        const content = JSON.parse(question.content);

        let title = content.question;

        if (question.question_type.id === 3)
          title = title.reduce((acc, val, index) => (acc.data + (index > 0?"_":"") + val.data));

        let newQuestion = {
          key: question.id,
          title: title,
          time: question.time,
          points: question.points,
          type: question.question_type.name
        };

        return newQuestion;
      });

      return questions;
    },
    onCloseModal() {
      this.multipleOptionModal = false;
      this.completeSentenceModal = false;
      this.getQuestions();
    },
    async registerQuestion(questionData) {
      const urlQuestionRegister = "https://bioderma-api-inmersys.herokuapp.com/question";
      let responseData = {};

      try {
        const response = await this.$axios.post(urlQuestionRegister, questionData);
        responseData = response.data;
        this.getQuestions();
      } catch (error) {
        throw error;
      }

      return responseData;
    },
    editQuestion(id) {
      console.log(id);
    },
    onChange(checkedValues) {
      console.log("checked = ", checkedValues);
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
