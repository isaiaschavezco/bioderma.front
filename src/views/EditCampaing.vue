<template>
  <div class="container-blog">
    <a-row>
      <a-col :xs="{ span: 18 }" class="column">
        <div class="card-container">
          <a-card :title="quizzName">
            <a-table :columns="columnsQuestionsTable" :dataSource="questionsData" style="margin-top: 1rem;">
              <span slot="action" slot-scope="text, record">
                <a-button shape="circle" icon="edit" size="large" @click="editQuestion(text.key, text.type)" />
                <a-divider type="vertical" />
                <a-button shape="circle" icon="delete" size="large" @click="removeQuestion(text.key)" />
              </span>
            </a-table>
          </a-card>
        </div>
      </a-col>

      <!-- BOTONES -->
      <a-col class="column" :xs="{ span: 4 }" style="text-align:center;">
        <a-row class="btn-description">
          <a-col>
            <a-button shape="circle" icon="arrow-left" size="large" @click="returnToCampaing"/>
          </a-col>
          <a-col class="description-icon title-span-tag">Regresar a trivia</a-col>
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
    <ModalMultipleOption :isVisible="multipleOptionModal" :quizz="quizzId" :questionJSON="questionDataMultipleOption" @register="registerQuestion" @close="onCloseModal" />

    <!-- RELACION DE COLUMNAS -->
    <ModalColumnsRelation :isVisible="columnRelationModal" :quizz="quizzId" :questionJSON="questionDataColumnRelation" @register="registerQuestion" @close="onCloseModal" />

    <!-- COMPLETA LA FRASE -->
    <ModalCompleteSentence :isVisible="completeSentenceModal" :quizz="quizzId" :questionJSON="questionDataCompleteSentence" @register="registerQuestion" @close="onCloseModal" />

    <!-- ORDENA LA FRASE -->
    <ModalSortWords :isVisible="sortWordsModal" :quizz="quizzId" :questionJSON="questionDataSortWords" @register="registerQuestion" @close="onCloseModal" />
    
    <!-- OPCION MULTIPLE IMAGEN -->
    <ModalMultipleImageOption :isVisible="multipleImageOptionModal" :quizz="quizzId" :questionJSON="questionDataMultipleImage" @register="registerQuestion" @close="onCloseModal" />
  </div>
</template>
<script>
import ModalRemoveConfirmation from "../components/modals/Campaing/Confirmation/ModalRemoveConfirmation.vue";
import ModalMultipleOption from "../components/modals/Campaing/Questions/ModalMultipleOption.vue";
import ModalCompleteSentence from "../components/modals/Campaing/Questions/ModalCompleteSentence.vue";
import ModalMultipleImageOption from "../components/modals/Campaing/Questions/ModalMultipleImageOption.vue";
import ModalSortWords from "../components/modals/Campaing/Questions/ModalSortWords.vue";
import ModalColumnsRelation from "../components/modals/Campaing/Questions/ModalColumnsRelation.vue";

export default {
  components: {
    ModalRemoveConfirmation,
    ModalMultipleOption,
    ModalCompleteSentence,
    ModalMultipleImageOption,
    ModalSortWords,
    ModalColumnsRelation
  },
  data() {
    return {
      quizzId: this.$route.query.quizzId,
      quizzName: this.$route.params.quizzName,
      campaingName: this.$route.params.campaingName,
      collapsed: false,
      questionsData: [],
      questionDataMultipleOption: {},
      questionDataColumnRelation: {},
      questionDataCompleteSentence: {},
      questionDataMultipleImage: {},
      questionDataSortWords: {},
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
      multipleImageOptionModal: false,
      removeConfirmationModal: false
    };
  },
  async mounted() {
    this.getQuestions();
  },
  methods: {
    async getQuestions() {
      let questions = [];

      try {
        const response = await this.$axios(`question/${this.quizzId}`);
        
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
            {
              title = title.map(val => val.data);
              title = title.reduce((acc, val, index) => {
                return acc + (index > 0?"_":"") + val;
              });
            }
          }
          else if (question.question_type.id === 4) {
            const orderContent = JSON.parse(question.answer);
            title = orderContent.order.map(val => val.data).join(' ');
          }
          else if (question.question_type.id === 5) {
            title = content.questions[0].data;
          }
        } catch (error) {
          title = "Sin titulo";
          console.log("Hubo un error al obtener el titulo: ", error.message);
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
    returnToCampaing() {
      this.$router.go(-1);
    },
    onCloseModal() {
      this.sortWordsModal = false;
      this.multipleOptionModal = false;
      this.completeSentenceModal = false;
      this.multipleImageOptionModal = false;
      this.columnRelationModal = false;
      this.removeConfirmationModal = false;
      this.questionDataMultipleOption = {};

      this.getQuestions();
    },
    async registerQuestion(questionData) {
      let responseData = {};

      try {
        responseData = await this.$axios.post("question", questionData);
      } catch (error) {
        this.$notification["error"]({
          message: "Error al registrar la pregunta.",
          description:
          'Al parecer hubo un error al registrar la pregunta, intenta de nuevo.',
        });
      }

      this.getQuestions();
      
      return responseData;
    },
    async editQuestion(id, questionType) {
      const url = `question/detail/${id}`;
      
      try {
        const response = await this.$axios(url);
        const question = response.data.question;

        question.content = JSON.parse(question.content);
        question.answer = JSON.parse(question.answer);
        
        this.openEditModal(question, questionType);
      } catch (error) {
        console.log("Hubo un error al editar la prgunta:", error.message);
        this.$notification["error"]({
          message: "Error al editar la pregunta.",
          description:
          'Al parecer hubo un error al editar la pregunta, intenta de nuevo.',
        });
      }
    },
    openEditModal(question, questionType) {
      if (questionType === "OPCION MULTIPLE IMAGENES") {
        this.multipleImageOptionModal = true;
        console.log(question);
        this.questionDataMultipleImage = question;
      }
      else if (questionType === "ORDENA LA FRASE") {
        this.sortWordsModal = true;
        this.questionDataSortWords = question;
      }
      else if (questionType === "COMPLETA LA FRASE") {
        this.completeSentenceModal = true;
        this.questionDataCompleteSentence = question;
      }
      else if (questionType === "RELACION DE COLUMNAS") {
        this.columnRelationModal = true;
        this.questionDataColumnRelation = question;
      }
      else if (questionType === "OPCION MULTIPLE") {
        this.multipleOptionModal = true;
        this.questionDataMultipleOption = question; 
      }
    },
    removeQuestion(id) {
      console.log("Question: ",  id);
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
