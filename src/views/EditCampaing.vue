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
              @click="() => sortWordsModal = true"
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
              @click="() => multipleImageOptionModal = true"
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

    <!-- OPCION MULTIPLE IMAGEN -->
    <ModalMultipleImageOption :isVisible="multipleImageOptionModal" :quizz="quizzId" @register="registerQuestion" @close="onCloseModal" />
    
    <!-- ORDENA LA FRASE -->
    <ModalSortWords :isVisible="sortWordsModal" :quizz="quizzId" @register="registerQuestion" @close="onCloseModal" />

    <!-- RELACION DE COLUMNAS -->
    <ModalColumnsRelation :isVisible="columnRelationModal" :quizz="quizzId" @register="registerQuestion" @close="onCloseModal" />

  </div>
</template>
<script>
import ModalMultipleOption from "../components/modals/Campaing/Questions/ModalMultipleOption.vue";
import ModalCompleteSentence from "../components/modals/Campaing/Questions/ModalCompleteSentence.vue";
import ModalMultipleImageOption from "../components/modals/Campaing/Questions/ModalMultipleImageOption.vue";
import ModalSortWords from "../components/modals/Campaing/Questions/ModalSortWords.vue";
import ModalColumnsRelation from "../components/modals/Campaing/Questions/ModalColumnsRelation.vue";

export default {
  components: {
    ModalMultipleOption,
    ModalCompleteSentence,
    ModalMultipleImageOption,
    ModalSortWords,
    ModalColumnsRelation,
  },
  data() {
    return {
      quizzId: this.$route.query.quizzId,
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
      sortWordsModal: false,
      multipleOptionModal: false,
      columnRelationModal: false,
      completeSentenceModal: false,
      multipleImageOptionModal: false
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

        try {
          if (question.question_type.id === 3) {
            if (title.length === 1) {
              title = title[0].data;
              
              if (title[0] === ' ')
                title = "_" + title;
              else
                title += "_"; 
            }
            else
              title = title.reduce((acc, val, index) => (acc.data + (index > 0?"_":"") + val.data));
          }
          else if (question.question_type.id === 4) {
            title = content.unorder.join(' ');
          }
          else if (question.question_type.id === 5) {
            title = content.questions[0].data;
          }
        } catch (error) {
          title = 'Sin titulo';
          console.log("Hubo un error.")
        }

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
      this.sortWordsModal = false;
      this.multipleOptionModal = false;
      this.completeSentenceModal = false;
      this.multipleImageOptionModal = false;
      this.columnRelationModal = false;

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
