<template>
  <a-modal class="form-question" width="35%" centered v-model="isVisibleModal" @cancel="onCloseModal" :footer="null">
		<h3 class="form-question__title">NUEVA PREGUNTA RELACIÓN DE COLUMNAS</h3>
    
		<a-divider/>

		<a-form class="form-question__form" :form="questionForm" @submit="onSubmitQuestion">
    	<div class="form-question__headerLabel" style="margin-left: 2.25rem; margin-right: 2.25rem;">
				ESCRIBE EN LA COLUMNA 1 EL REACTIVO Y EN LA COLUMNA 2 LA RESPUESTA CORRECTA DE
				FORMA LINEAL, EL SISTEMA POR SI MISMO SE ENCARGARÁ DE ALEATORIZAR AMBAS
				COLUMNAS
			</div>

			<a-row style="margin-left: 4rem; margin-right: 4rem; margin-top:1rem;">
				<a-col class="text-center form-question__columnLabel" offset="2" :span="11">
					COLUMNA 1
				</a-col>
				<a-col class="text-center form-question__columnLabel" :span="11">
					COLUMNA 2
				</a-col>
			</a-row>

			<a-row style="margin-left: 4rem; margin-right: 4rem;" :gutter="12" v-for="(option, index) in textOptions" :key="index">
				<a-col span="2" class="option__labelOption">
					{{ `${option.indicator})` }}
				</a-col>

				<a-col class="form-question__option" span="11">
					<a-col span="24">
						<a-form-item>
							<a-input
								class="form-question__inputText"
								:placeholder="`Reactivo ${option.indicator}`"
								:disabled="!isAvailableOption[index]"
								v-decorator="[
									`reactive${option.indicator}`,
									{
										rules: [{ required: isRequiredOption[index], message: 'Favor de llenar el campo' }],
										initialValue: reactivesValues[index]
									}
								]"
								@change="(e) => {onChangeReactiveValue(index, e.target.value); }"
							/>
						</a-form-item>
					</a-col>
				</a-col>

				<a-col class="form-question__option" span="11">
					<a-col span="24">
						<a-form-item>
							<a-input
								class="form-question__inputText"
								:placeholder="`Respuesta ${option.indicator}`"
								:disabled="!isAvailableOption[index]"
								v-decorator="[
									`response${option.indicator}`,
									{
										rules: [{ required: isRequiredOption[index], message: 'Favor de llenar el campo' }],
										initialValue: responsesValues[index]
									}
								]"
								@change="(e) => {onChangeResponseValue(index, e.target.value); }"
							/>
						</a-form-item>
					</a-col>
				</a-col>
			</a-row>
      
			<a-divider style="margin-top: 0;"/>
      
			<div class="form-question__headerLabel margin-horizontal">ASIGNA UN TIEMPO PARA RESPONDER ESTA PREGUNTA</div>
      
			<a-form-item class="margin-horizontal">
        <span class="form-question__bold-text">TIEMPO: </span>
    
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

        <span class="form-question__bold-text"> SEG</span>
      </a-form-item>
    
		  <a-divider />
    
		  <label class="form-question__headerLabel margin-horizontal">ASIGNA UN PUNTAJE PARA ESTA PREGUNTA</label>
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

        <span class="form-question__bold-text"> PTS</span>
      </a-form-item>
    
			<a-divider />
			
			<a-row class="form-question__actions" type="flex" justify="center" :gutter="24">
				<a-col span="7">
					<a-button type="primary" @click="onCloseModal">CANCELAR</a-button>
				</a-col>
				<a-col span="7">
					<a-button type="primary" html-type="submit">CREAR</a-button>
				</a-col>
			</a-row>
    </a-form>
  </a-modal>
</template>

<script>
export default {
	name: "ModalColumnsRelation",
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
		}
	},
	data() {
		return {
			time: 1,
			points: 0,
			quizzId: this.quizz,
			questionData: this.questionJSON,
			isAvailableOption: [true, true, false, false, false],
			isRequiredOption: [true, true, false, false, false],
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
			questionForm: this.$form.createForm(this),
			reactivesValues: ["", "", "", "", ""],
			responsesValues: ["", "", "", "", ""]
		};
	},
	watch: {
		isVisible: function() {
			this.isVisibleModal = this.isVisible;
		},
		questionJSON: function() {
			this.questionData = this.questionJSON;
			if (this.questionData.content && this.questionData.answer) {
				this.time = this.questionData.time;
				this.points = this.questionData.points;

				this.reactivesValues.fill("");
				this.responsesValues.fill("");

				let questions = this.questionData.content.questions;
				questions = questions.map(val => val.data);

				questions.forEach((val, idx) => {
					this.onChangeReactiveValue(idx, val);
				});

				let responses = this.questionData.answer.responses;

				responses = responses.map(val => val.data);

				responses.forEach((val, idx) => {
					this.onChangeResponseValue(idx, val);
				});

			}
		}
	},
	methods: {
		onChangeReactiveValue(index, value) {
			this.reactivesValues[index] = value;
			this.setAvailableOptions();
		},
		onChangeResponseValue(index, value) {
			this.responsesValues[index] = value;
			this.setAvailableOptions();
		},
		onCloseModal() {
			this.$emit('close');
			this.resetData();
		},
		resetData() {
			this.questionForm.resetFields();
			this.reactivesValues.fill("");
			this.responsesValues.fill("");
			this.setAvailableOptions();
			this.time = 1;
			this.points = 0;
		},
		setAvailableOptions() {
			let newAvailableValues = new Array(5);
			newAvailableValues.fill(true);

			for (let i = 0; i < 5; ++i) {
				if (i < 2)
					newAvailableValues[i] = true;
				else {
					let available = true;

					for (let j = 0; j < i && available; ++j)
						available &= (this.reactivesValues[j].length > 0 && this.responsesValues[j].length > 0);
					

					newAvailableValues[i] = available;
				}
			}

			this.isAvailableOption = newAvailableValues;
		},
		onSubmitQuestion(e) {
			e.preventDefault();
			this.questionForm.validateFields(async (err, values) => {
				if (!err) {
					for (let i = 0; i < 5; ++i) {
						if (this.reactivesValues[i].length === 0 || this.responsesValues[i].length === 0) {
							for (let j  = i; j < 5; ++j) {
								this.reactivesValues[j] = "";
								this.responsesValues[j] = "";
							}

							break;
						}
					}

					let questions = this.reactivesValues.filter((val, index) => val.length > 0 && this.isAvailableOption[index]);
					let responses = this.responsesValues.filter((val, index) => val.length > 0 && this.isAvailableOption[index]);

					questions = questions.map((val, index) => {
						return {
							index: index,
							data: val
						};
					});

					responses = responses.map((val, index) => {
						return {
							index: index,
							data: val
						};
					});

					const contentJSON = JSON.stringify({
						questions,
					});

					const answerJSON = JSON.stringify({
						responses
					});
					
					const questionInformation = {
						content: contentJSON,
						answer: answerJSON,
						points: Number.parseInt(values.points),
						time: Number.parseInt(values.time),
						questionType: 5,
						quizzId: this.quizzId
					};
					
					try {
						const responseData = await this.$emit('register', questionInformation);
						
						this.onCloseModal();

						console.log(JSON.stringify(questionInformation));
					} catch (error) {
						console.log('Hubo un erro: ', error);
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
	font-size: 0.75rem!important;
	color: var(--main-color);
}
.form-question__options {
	width: 100%;
}
.option__radioOption, .option__labelOption {
	color: var(--main-color);
	line-height: 2.5rem;
}
.option__labelOption {
	font-size: 0.75rem;
}
.form-question__inputText {
	border-radius: 10px!important;
}
.form-question__actions {
	text-align: center;
}
.form-question__actions button {
	border-radius: 25px;
	width: 100%;
	font-weight: 550;
	font-size: 0.85rem;
	height: 2.7rem;;
}
.form-question__bold-text {
	font-weight: 725;
}
.form-question__columnLabel {
	font-weight: bold;
	color: var(--main-color);
	margin-bottom: 0.6rem;
}
.margin-horizontal {
	margin-left: 4rem;
	margin-right: 4rem;
}
.text-center {
	text-align: center;
}
</style>