<template>
  <a-modal
    class="form-question"
    width="80%"
    centered
    v-model="isVisibleModal"
    @cancel="onCloseModal"
    :footer="null"
  >
    <h3 class="form-question__title">NUEVA PREGUNTA OPCION MULTIPLE IMAGEN</h3>

    <a-divider />

    <a-form class="form-question__form" :form="questionForm" @submit="onSubmitQuestion">
      <label
        class="form-question__headerLabel form-question__labelQuestion margin-horizontal"
      >ESCRIBE TU PREGUNTA</label>

      <a-form-item class="margin-horizontal" style="margin-bottom: 0">
        <a-input
          class="form-question__inputQuestion"
          placeholder="PREGUNTA"
          v-decorator="[
          'question',
          {
            rules: [{ required: true, message: 'Favor de llenar el campo' }],
            initialValue: question
          }
        ]"
        />
      </a-form-item>

      <a-divider style="margin-top: 1rem; margin-bottom: 0.5rem;" />

      <div class="form-question__headerLabel margin-horizontal">
        ESCRIBE TU RESPUESTAS Y SELECCIONA LA RESPUESTA CORRECTA, PUEDES ESCRIBIR DE 2 A 5
        POSIBLES REPUESTAS
      </div>

      <a-radio-group
        class="form-question__options"
        v-model="answer"
        style="margin-top: 1rem;"
        v-decorator="[
					`answer`,
					{rules: [{ required: true, message: 'Favor de llenar el campo' }]}
				]"
        @change="(e) => onChangeAnswer()"
      >
        <a-row style="margin-left: 4rem; margin-right: 4rem;" :gutter="15">
          <a-col
            class="form-question__option"
            span="12"
            v-for="(option, index) in textOptions"
            :key="index"
          >
            <a-col span="2">
              <a-radio
                class="option__radioOption"
                :value="index"
                :disabled="!isAvailableOption[index]"
              ></a-radio>
            </a-col>
            <a-col span="3" class="option__labelOption">{{ `${option.indicator})` }}</a-col>
            <a-col span="19" class="form-question__upload">
              <a-form-item>
                <a-form-item>
                  <div class="dropbox">
                    <a-upload-dragger
                      :disabled="!isAvailableOption[index]"
                      v-decorator="[
												`question${option.indicator}`,
												{rules: [{ required: isRequiredOption[index], message: 'Favor de subir una imagen' }]}
											]"
                      name="upload"
                      action="https://bioderma-api-inmersys.herokuapp.com/upload/3"
                      accept=".png, .jpg, jpeg"
                      @change="(info) => handleChangeFileUpload(info, index)"
                      :beforeUpload="(file) => beforeUpload(file, index)"
                      :fileList="fileList[index]"
                    >
                      <img
                        :src="optionsImages[index]"
                        alt
                        v-if="optionsImages[index]"
                        class="optionImage"
                      />
                      <p class="ant-upload-drag-icon" v-else>
                        <a-icon type="picture" />
                      </p>
                      <p class="ant-upload-text">Selecciona una imagen</p>
                    </a-upload-dragger>
                  </div>
                </a-form-item>
              </a-form-item>
            </a-col>
          </a-col>
        </a-row>
      </a-radio-group>

      <a-divider style="margin-top: 0;" />

      <div
        class="form-question__headerLabel margin-horizontal"
      >ASIGNA UN TIEMPO PARA RESPONDER ESTA PREGUNTA</div>

      <a-form-item class="margin-horizontal">
        <span class="form-question__bold-text">TIEMPO:</span>

        <a-input
          :maxLength="19"
          style="width: 120px; margin-left: 5px;"
          v-decorator="[
						'time',
						{
              rules: [{ required: true, message: 'Favor de llenar el campo', pattern: '^\\d+$'}],
              initialValue: time
            }
					]"
        />

        <span class="form-question__bold-text">SEG</span>
      </a-form-item>

      <a-divider />

      <label
        class="form-question__headerLabel margin-horizontal"
      >ASIGNA UN PUNTAJE PARA ESTA PREGUNTA</label>
      <a-form-item style="margin-left: 7.9rem;">
        <a-input
          :maxLength="19"
          style="width: 120px; margin-right: 5px;"
          v-decorator="[
						'points',
						{
              rules: [{ required: true, message: 'Favor de llenar el campo', pattern: '^\\d+$'}],
              initialValue: points
            }
					]"
        />

        <span class="form-question__bold-text">PTS</span>
      </a-form-item>

      <a-divider />

        <!-- v-if="registerButton" Antes solo se podia editar antes de enviar, si es necesario restablecer esa función solo colocar esta linea abajo--> 
      <a-row
        class="form-question__actions"
        type="flex"
        justify="center"
        :gutter="24"
      >
        <a-col span="7">
          <a-button type="primary" @click="onCloseModal">CANCELAR</a-button>
        </a-col>
        <a-col span="7">
          <a-button type="primary" html-type="submit">{{ action }}</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: "ModalMultipleImageOption",
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    quizz: {
      default: ""
    },
    questionJSON: {
      type: Object
    },
    textButton: {
      type: String
    },
    onlyView: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      time: 1,
      points: 0,
      answer: 0,
      question: "",
      fileList: [[], [], [], [], []],
      action: this.textButton,
      optionsImages: [null, null, null, null, null],
      quizzId: this.quizz,
      isAvailableOption: [true, true, false, false, false],
      isRequiredOption: [true, true, false, false, false],
      textOptions: [
        {
          name: "optionA",
          indicator: "A"
        },
        {
          name: "optionB",
          indicator: "B"
        },
        {
          name: "optionC",
          indicator: "C"
        },
        {
          name: "optionD",
          indicator: "D"
        },
        {
          name: "optionE",
          indicator: "E"
        }
      ],
      isVisibleModal: this.isVisible,
      questionForm: this.$form.createForm(this),
      registerButton: true
    };
  },
  watch: {
    isVisible: function() {
      this.isVisibleModal = this.isVisible;
    },
    textButton: function() {
      this.action = this.textButton;
    },
    onlyView: function() {
      this.registerButton = !this.onlyView;
    },
    questionJSON: function() {
      this.questionData = this.questionJSON;
      if (this.questionJSON.content && this.questionJSON.answer) {
        const options = this.questionData.content.possiblesResponses.map(
          val => val.response
        );
        this.question = this.questionData.content.question;

        this.optionsImages.fill(null);

        for (let i = 0; i < options.length; ++i)
          this.optionsImages[i] = options[i];

        this.registerButton = !this.onlyView;
        this.time = this.questionData.time;
        this.points = this.questionData.points;

        this.answer = this.questionData.answer.response;
        this.setAvailableOptions();
      }
    }
  },
  methods: {
    onCloseModal() {
      this.$emit("close");
      this.resetData();
    },
    resetData() {
      this.questionForm.resetFields();
      this.fileList.fill([]);
      this.optionsImages.fill(null);
      this.setAvailableOptions();
      this.answer = 0;
      this.question = "";
      this.time = 1;
      this.points = 0;
    },
    handleChangeFileUpload(info, index) {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      this.fileList[index] = fileList;
      this.optionsImages[index] = fileList[0].response;
      this.onChangeOptionValue();
    },
    beforeUpload(file, index) {
      let status = true;
      this.questionForm.validateFields(
        [`question${this.textOptions[index].indicator}`],
        (err, values) => {
          if (err) {
            if (err.menu || err.submenu || err.title) {
              status = false;
            }
          }
        }
      );

      return status;
    },
    onChangeOptionValue() {
      this.setAvailableOptions();
      this.onChangeAnswer();
    },
    onChangeAnswer() {
      const option = this.optionsImages[this.answer];
      if (
        this.answer > 1 &&
        (!this.isAvailableOption[this.answer] || !option)
      ) {
        for (let i = 4; i >= 0; --i) {
          if (i < 2 || (this.optionsImages[i] && this.isAvailableOption[i])) {
            this.answer = i;
            break;
          }
        }
      }
    },
    setAvailableOptions() {
      let newAvailableValues = new Array(5);
      newAvailableValues.fill(true);
      // console.log("Hola");
      for (let i = 0; i < 5; ++i) {
        if (i < 2) newAvailableValues[i] = true;
        else {
          let available = true;
          for (let j = 0; j < i && available; ++j)
            available &= this.optionsImages[j] !== null;

          newAvailableValues[i] = available;
        }
      }

      this.isAvailableOption = newAvailableValues;
    },
    onSubmitQuestion(e) {
      e.preventDefault();

      this.questionForm.validateFields(async (err, values) => {
        values = this.questionForm.getFieldsValue();

        if (!err) {
          try {
            console.log(options, this.optionsImages);
            for (let i = 0; i < 5; ++i) {
              if (
                !this.optionsImages[i] ||
                this.optionsImages[i].length === 0
              ) {
                for (let j = i; j < 5; ++j) this.optionsImages[j] = null;
                break;
              }
            }

            let options = this.optionsImages.filter(
              (val, index) =>
                val && val.length > 0 && this.isAvailableOption[index]
            );
            console.log(options, this.optionsImages);
            options = options.map((option, index) => {
              return {
                index: index,
                response: option
              };
            });

            let question = values.question;

            const content = JSON.stringify({
              question,
              possiblesResponses: options
            });

            const answer = JSON.stringify({
              response: this.answer
            });

            const questionInformation = {
              quizzId: this.quizzId,
              questionType: 2,
              content: content,
              points: Number.parseInt(values.points),
              answer: answer,
              time: Number.parseInt(values.time)
            };

            const responseData = await this.$emit(
              "register",
              questionInformation
            );

            this.onCloseModal();
          } catch (error) {
            console.log("Hubo un error: ", error);
          }
        } else {
          console.log("Errores:", err);
        }
      });
    }
  }
};
</script>

<style scoped>
:root {
  --main-color: rgb(200, 200, 200);
}
.form-question__title {
  text-align: center;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: -0.4rem;
}
.form-question__form {
  margin-top: -1rem;
}
.form-question__inputQuestion {
  font-size: 1.5rem;
  height: 2.7rem;
}
.form-question__labelQuestion {
  display: block;
  margin-bottom: 0.5rem;
}
.form-question__headerLabel {
  font-weight: 600;
  font-size: 0.75rem !important;
  color: var(--main-color);
}
.form-question__options {
  width: 100%;
}
.option__radioOption,
.option__labelOption {
  color: var(--main-color);
  line-height: 2.5rem;
}
.option__labelOption {
  font-size: 0.75rem;
}
.form-question__inputText {
  border-radius: 10px !important;
}
.form-question__actions {
  text-align: center;
}
.form-question__upload {
  height: 170px;
}
.form-question__actions button {
  border-radius: 25px;
  width: 100%;
  font-weight: 550;
  font-size: 0.85rem;
  height: 2.7rem;
}
.optionImage {
  height: 68px;
  object-fit: contain;
}
.form-question__bold-text {
  font-weight: 725;
}
.margin-horizontal {
  margin-left: 4rem;
  margin-right: 4rem;
}
</style>