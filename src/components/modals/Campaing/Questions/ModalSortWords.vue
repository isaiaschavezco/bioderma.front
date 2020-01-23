<template>
  <a-modal
    class="form-question"
    width="35%"
    centered
    v-model="isVisibleModal"
    @cancel="onCloseModal"
    :footer="null"
  >
    <h3 class="form-question__title">NUEVA PREGUNTA ORDENA LA FRASE</h3>

    <a-divider />

    <a-form class="form-question__form" :form="questionForm" @submit="onSubmitQuestion">
      <label
        class="form-question__headerLabel form-question__labelQuestion margin-horizontal"
      >ESCRIBE TU PREGUNTA</label>
      <a-form-item class="margin-horizontal" style="margin-bottom: 0">
        <a-input
          class="form-question__inputQuestion"
          placeholder="Escribe tu frase..."
          v-decorator="[
          'question',
          {
						rules: [{ required: true, validator: checkSentence }],
						initialValue: question
					}
        ]"
        />
      </a-form-item>

      <a-divider style="margin-top: 1rem; margin-bottom: 0.5rem;" />

      <div
        class="form-question__headerLabel margin-horizontal"
      >ASIGNA UN TIEMPO PARA RESPONDER ESTA PREGUNTA</div>

      <a-form-item class="margin-horizontal">
        <span class="form-question__bold-text">TIEMPO:</span>

        <a-input
          :maxLength="19"
          style="width: 120px"
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
          style="width: 120px"
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

      <a-row class="form-question__actions" type="flex" justify="center" :gutter="24">
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
	name: "ModalSortWords",
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
		}
	},
	data() {
		return {
			time: "1",
			points: "0",
			answer: 0,
			question: "",
			quizzId: this.quizz,
			isValidSentence: false,
			action: this.textButton,
			isAvailableOption: [true, true, false, false, false],
			isRequiredOption: [true, true, false, false, false],
			questionData: {},
			textOptions: [
				{
					name: 'optionA',
					indicator: 'A',
				},
				{
					name: 'optionB',
					indicator: 'B',
				},
				{
					name: 'optionC',
					indicator: 'C',
				},
				{
					name: 'optionD',
					indicator: 'D',
				},
				{
					name: 'optionE',
					indicator: 'E',
				}
			],
			isVisibleModal: this.isVisible,
			questionForm: this.$form.createForm(this)
			};
	},
	watch: {
		isVisible: function() {
			this.isVisibleModal = this.isVisible;
		},
		textButton: function() {
			this.action = this.textButton;
		},
		questionJSON: function() {
			this.questionData = this.questionJSON;
			if (this.questionJSON.content && this.questionJSON.answer) {
				const sentence = this.questionData.answer.order.map(val => val.data);
				this.question = sentence.join(" ");

				this.time = this.questionData.time;
				this.points = this.questionData.points;
				this.isValidSentence = true;
			}
		}
	},
	methods: {
		onCloseModal() {
			this.$emit('close');
			this.resetData();
		},
		resetData() {
			this.questionForm.resetFields();
			this.question = "";
			this.answer = 0;
			this.points = 0;
			this.time = 1;
		},
		checkSentence(rule, value, callback) {
			const words = value.trim().split(' ');

			if (words.length < 2) {
				this.isValidSentence = false;
				callback("Al menos debe haber 2 palabras en la frase.")
			}
			else if (words.length > 6) {
				this.isValidSentence = false;
				callback("La frase debe tener a lo mas 6 palabras.");
			}
			else {
				this.isValidSentence = true;
				callback();
			}
		},
		onSubmitQuestion(e) {
			e.preventDefault();
			this.questionForm.validateFields(['time', 'points'], async (err, values) => {
				if (!err && this.isValidSentence) {
					values = this.questionForm.getFieldsValue();

					const sentence = values.question.trim().split(' ').map((val, index) => {
						return {
							index,
							data: val
						};
					});

					const shuffledSentence = sentence.slice();
					shuffledSentence.sort(function (a, b) { return 0.5 - Math.random() })

					const contentJSON = JSON.stringify({
						unorder: shuffledSentence
					});

					const answerJSON = JSON.stringify({
						order: sentence
					});
					
					const questionInformation = {
						content: contentJSON,
						answer: answerJSON,
						points: Number.parseInt(values.points),
						time: Number.parseInt(values.time),
						questionType: 4,
						quizzId: this.quizzId
					};
					
					try {
						const responseData = await this.$emit('register', questionInformation);
						
						this.onCloseModal();

						console.log(questionInformation);
						console.log(JSON.stringify(questionInformation));
					} catch (error) {
						console.log('Hubo un error: ', error);
					}
				}
			})
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
.form-question__actions button {
  border-radius: 25px;
  width: 100%;
  font-weight: 550;
  font-size: 0.85rem;
  height: 2.7rem;
}
.form-question__bold-text {
  font-weight: 725;
}
.margin-horizontal {
  margin-left: 4rem;
  margin-right: 4rem;
}
</style>