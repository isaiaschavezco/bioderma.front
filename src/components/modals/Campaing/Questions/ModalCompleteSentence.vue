<template>
  <a-modal class="form-question" width="80%" centered v-model="isVisibleModal" @cancel="onCloseModal" :footer="null">
		<h3 class="form-question__title">NUEVA PREGUNTA COMPLETA LA FRASE</h3>
    
		<a-divider/>

		<a-form class="form-question__form" :form="questionForm" @submit="onSubmitQuestion">
    	<label class="form-question__headerLabel form-question__labelQuestion margin-horizontal">
				ESCRIBE TU PREGUNTA Y COLOCA UN GUION BAJO DÓNDE QUIERAS DEJAR UN ESPACIO A COMPLETAR
			</label>
      <a-form-item class="margin-horizontal" style="margin-bottom: 0">
        <a-input
					class="form-question__inputQuestion"
          placeholder="PREGUNTA _ X"
          v-decorator="[
          'question',
          {
						rules: [{ required: true, validator: checkQuestion }],
						initialValue: question
					}
        ]"
        />
      </a-form-item>
      
			<a-divider style="margin-top: 1rem; margin-bottom: 0.5rem;"/>
      
			<div class="form-question__headerLabel" style="margin-left: 2.25rem; margin-right: 2.25rem;">
				ESCRIBE TU RESPUESTAS Y SELECCIONA LA RESPUESTA CORRECTA, PUEDES ESCRIBIR DE 2 A 5
        POSIBLES REPUESTAS
			</div>
			
			<a-row style="margin-top: 1rem; margin-left: 4rem; margin-right: 4rem;">
				<a-col span="2">
					<span class="form-question__headerLabel">OK</span>
				</a-col>
			</a-row>

      <a-radio-group class="form-question__options"
				v-model="answer"
				v-decorator="[
					`answer`,
					{rules: [{ required: true }]}
				]"
				@change="(e) => onChangeAnswer()"
			>
				<a-row style="margin-left: 4rem; margin-right: 4rem;" v-for="(option, index) in textOptions" :key="index">
					<a-col class="form-question__option" span="24">
						<a-col span="2">
							<a-radio
								@change="(e) => onChangeAnswer()"
							 class="option__radioOption" :value="index" :disabled="!isAvailableOption[index]"></a-radio>
						</a-col>
						<a-col span="1" class="option__labelOption">
							{{ `${option.indicator})` }}
						</a-col>
						<a-col span="21">
							<a-form-item>
								<a-input
									class="form-question__inputText"
									:placeholder="`Respuesta ${option.indicator}`"
									:disabled="!isAvailableOption[index]"
									v-decorator="[
										`question${option.indicator}`,
										{
											rules: [{ required: isRequiredOption[index], validator: checkWords }],
											initialValue: optionsValues[index]
										}
									]"
									@change="(e) => {onChangeOptionValue(index, e.target.value); }"
								/>
							</a-form-item>
						</a-col>
					</a-col>
				</a-row>
      </a-radio-group>
      
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
			
			<!-- <a-row v-if="registerButton" -->
			<a-row 
			 class="form-question__actions" type="flex" justify="center" :gutter="24">
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
	name: "ModalMultipleOption",
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
			time: "1",
			points: "0",
			answer: 0,
			question: "",
			wordsToComplete: 0,
			quizzId: this.quizz,
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
			optionsValues: ["", "", "", "", ""],
			action: this.textButton,
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
			if (this.questionData.content && this.questionData.answer) {
				this.question = this.questionData.content.question;
				
				if (this.question.length == 1) {
					this.question = this.question[0].data;
					
					if (this.question[0] === ' ')
						this.question = "_" + this.question;
					else
						this.question += "_"; 
				}
				else {
					this.question = this.question.map(val => val.data);
					this.question = this.question.reduce((acc, val, index) => {
						return acc + (index > 0?"_":"") + val;
					});
				}

				this.time = this.questionData.time;
				this.points = this.questionData.points;				
				this.answer = this.questionData.answer.response;
				this.optionsValues.fill("");

				this.registerButton = !this.onlyView;
				let responses = this.questionData.content.possiblesResponses;
				responses = responses.map(val => val.response);

				responses.forEach((val, idx) => {
					this.onChangeOptionValue(idx, val);
				});
			}
		}
	},
	methods: {
		checkQuestion(rule, value, callback) {
			let currWords = 0;
			
			for (let i = 0; i < value.length; ++i) {
				if (value[i] === '_')
					++currWords;
			}

			this.wordsToComplete = currWords;

			if (currWords === 0)
				callback("La pregunta al menos debe contener una palabra para completar.");
			else {
				callback();
			}
		},
		checkWords(rule, value, callback) {
			const options = value.split(',').filter(value => value.trim().length > 0);

			if (options.length < this.wordsToComplete) {
				callback(`Hay ${this.wordsToComplete} por completar y tu solo proporcionas ${options.length}.`)
			}
			else {
				callback();
			}
		},
		onChangeOptionValue(index, value) {
			this.optionsValues[index] = value;
			this.setAvailableOptions();
			this.onChangeAnswer();
		},
		onChangeAnswer() {
			const option = this.optionsValues[this.answer];
			if (!this.isAvailableOption[this.answer] || option.length === 0 || option.length === "" ) {
				for (let i = 4; i >= 0; --i) {
					if (i < 2 || (this.isAvailableOption[i] && (this.optionsValues[i].length !== ""))) {
						this.answer = i;
						break;
					}
				}
			}
		},
		onCloseModal() {
			this.$emit('close');
			this.resetData();
		},
		resetData() {
			this.questionForm.resetFields();
			this.optionsValues.fill("");
			this.setAvailableOptions();
			this.question = "";
			this.answer = 0;
			this.points = 0;
			this.time = 1;
		},
		setAvailableOptions() {
			let newAvailableValues = new Array(5);
			newAvailableValues.fill(true);

			for (let i = 0; i < 5; ++i) {
				if (i < 2)
					newAvailableValues[i] = true;
				else {
					let available = true;
					for (let j = 0; j < i && available; ++j){
						available &= (this.optionsValues[j].length !== 0 && this.optionsValues[j] !== "" );
					newAvailableValues[i] = available;
					}
				}
			}

			this.isAvailableOption = newAvailableValues;
		},
		onSubmitQuestion(e) {
			e.preventDefault();

			this.questionForm.validateFields(['time', 'points'], async (err, values) => {
				values = this.questionForm.getFieldsValue();
				
				if (!err) {
					for (let i = 0; i < 5; ++i) {
						if (this.optionsValues[i].length == 0) {
							for (let j  = i; j < 5; ++j)
								this.optionsValues[j] = "";

							break;
						}
					}

					let options = this.optionsValues.filter((val, index) => val.length > 0 && this.isAvailableOption[index]).map((option, index) => {
						return {
							index: index,
							response: option,
							responses: option.split(',').map(val => val.trim())
						};
					})

					let question = values.question.split('_').filter(val => val.length > 0).map(part => { return {data: part} } );
					
					const content = JSON.stringify({
						question,
						possiblesResponses: options
					});

					const answer = JSON.stringify({
						response: this.answer
					});

					const questionInformation = {
						quizzId: this.quizzId,
						questionType: 3,
						content: content,
						points: Number.parseInt(values.points),
						answer: answer,
						time: Number.parseInt(values.time),
					};
					
					try {
						const responseData = await this.$emit('register', questionInformation);
						
						this.onCloseModal();

						console.log(JSON.stringify(questionInformation));
					} catch (error) {
						console.log("Hubo un error: ", error);
					}
				}
				else {
					console.log("Errores:", err)
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
.margin-horizontal {
	margin-left: 4rem;
	margin-right: 4rem;
}
</style>