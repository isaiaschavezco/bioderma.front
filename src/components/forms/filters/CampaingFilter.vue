<template>
	<a-row class="group-filter">
			<div class="filter contain-one">
				<a-card class="mycard" title="AGREGAR FILTRO +">
					<a-row class="container-option">
						<a-row class="container-item">
							<a-row class="select-item">
								<a-checkbox @change="onChangeMainFilter" :checked="disabledFilters">Todos los nombres</a-checkbox>
							</a-row>

							<a-row class="select-item">
								<a-checkbox :checked="!disabledFilters && !disabledUserType" :disabled="disabledFilters" @change="toggleUserType">
									<a-radio-group :disabled="disabledUserType || disabledFilters" name="user-type" defaultValue="1" v-model="filterToSend.userType">
										<a-radio value="1">NAOS</a-radio>
										<a-radio value="2">Farmacia</a-radio>
									</a-radio-group>
								</a-checkbox>
							</a-row>
							
							<a-row class="select-item">
								<!-- Row checkbox -->
								<a-checkbox :checked="!disabledFilters && !disabledPosition" @click="togglePosition" :disabled="disabledFilters" style="margin-right:7px; "></a-checkbox>
								<a-select
									showSearch
									placeholder="Posiciòn"
									optionFilterProp="children"
									style="width: 170px"
									:filterOption="filterOption"
									:disabled="disabledPosition || disabledFilters"
									v-model="filterToSend.naosPosition"
									name="position"
								>
									<a-select-option v-for="position in positions" :key="position.id" :value="position.id">
										{{ position.name }}
									</a-select-option>
								</a-select>
							</a-row>

							<a-row class="select-item">
								<!-- Row checkbox -->
								<a-checkbox :checked="!disabledFilters && !disabledState" @click="toggleState" :disabled="disabledFilters" style="margin-right:7px; "></a-checkbox>
								<a-select
									showSearch
									placeholder="Estado"
									optionFilterProp="children"
									style="width: 170px"
									:filterOption="filterOption"
									:disabled="disabledState || disabledFilters"
									v-model="filterToSend.state"
									name="state"
								>
									<a-select-option v-for="state in states" :key="state.id" :value="state.id">
										{{ state.name }}
									</a-select-option>
								</a-select>
							</a-row>


							<!-- Row checkbox -->
							<a-row class="select-item" :class="(filterToSend.userType!=2)?'hidden':''">
								<a-checkbox
									:disabled="disabledFilters"
									:checked="!disabledChain && !disabledFilters"
									style="margin-right:7px; "
									@click="toggleChain"
								></a-checkbox>

								<a-select
									showSearch
									placeholder="Cadena"
									optionFilterProp="children"
									style="width: 170px"
									:filterOption="filterOption"
									:disabled="disabledChain || disabledFilters"
									v-model="filterToSend.chain"
									name="chain"
								>
									<a-select-option v-for="chain in chains" :value="chain.id" :key="chain.id">{{ chain.name }}</a-select-option>
								</a-select>
							</a-row>

							<!-- Row checkbox -->
							<a-row class="select-item">
								<a-checkbox :checked="!disabledFilters && !disabledAge" :disabled="disabledFilters" @click="toggleAge"></a-checkbox>
								<span>Edad</span>
								<a-input-number
									:min="18"
									:max="100"
									:disabled="disabledAge || disabledFilters"
									style="width: 60px; margin-right: 3px; margin-left: -6px"
									v-model="filterToSend.initAge"
									name="init-age"
								/>
								<span>a</span>
								<a-input-number
									:min="18"
									:max="100"
									:disabled="disabledAge || disabledFilters"
									style="width: 60px; margin-left: 2px"
									v-model="filterToSend.finalAge"
									name="final-age"
								/>
							</a-row>

							<a-row class="select-item">
								<a-checkbox :checked="!disabledFilters && !disabledGender" :disabled="disabledFilters" @change="toggleGender">
									<a-radio-group :disabled="disabledGender || disabledFilters" :defaultValue="filterToSend.gender" v-model="filterToSend.gender" name="gender">
										<a-radio value="1">Mujer</a-radio>
										<a-radio value="0">Hombre</a-radio>
									</a-radio-group>
								</a-checkbox>
							</a-row>
						</a-row>
					</a-row>

					<div class="container-btn">
						<a-button
							@click="addFilter"
							type="primary"
							style="background-color:#009FD1; border: none; margin-top:15px"
						>Agregar filtro a la lista</a-button>
					</div>
				</a-card>
			</div>
			<div class="added-filters">
				<a-card class="mycard" title="FILTROS AGREGADOS">
					<div class="filter-list">
						<div class="filter__data" v-for="filter in filters" :key="filter.id">
							<p class="filter__title">FILTRO {{ filter.id }}</p>
							<a-row>
									<a-col span="19">
										<p class="filter__content">
											{{ getFormatFilterList(filter) }}
										</p>
									</a-col>
									<a-col span="5" class="filter__remove-button">
										<a-button type="primary" shape="circle" icon="close" style="background-color:#009FD1; border: none; " @click="onRemoveFilter(filter.id)"></a-button>
									</a-col>
							</a-row>
						</div>
					</div>
				</a-card>
			</div>
	</a-row>
</template>

''

<script>
export default {
	name: "CampaingFilter",
	data() {
		return {
			filterToSend: {
				allUsers: true,
				userType: 1,
				state: 1,
				chain: 1,
				naosPosition: 1,
				initAge: 18,
				finalAge: 100,
				gender: -1
			},
			states: [],
			positions: [],
			chains: [],
			disabledFilters: true,
			disabledUserType: false,
			disabledPosition: true,
			disabledState: true,
      disabledChain: true,
			disabledAge: true,
			disabledGender: true,
			filters: []
		}
	},
	async created() {
		this.states = await this.getStates();
		this.positions = await this.getWorkPositions();
		this.chains = await this.getChains();
	},
	methods: {
		async getStates() {
			const urlStates = "https://bioderma-api-inmersys.herokuapp.com/state";
			const response = await this.$axios(urlStates);
			
			return response.data.states;
		},
		async getWorkPositions() {
			const urlWorkPositions = "https://bioderma-api-inmersys.herokuapp.com/position";
			const response = await this.$axios(urlWorkPositions);
			
			return response.data.workPositions;
		},
		async getChains() {
			const urlChains = "https://bioderma-api-inmersys.herokuapp.com/chain";
			const response = await this.$axios(urlChains);

			return response.data.chains;
		},
		onChangeMainFilter(e) {
			this.disabledFilters = e.target.checked;
			this.filterToSend.allUsers = e.target.checked;
		},
		toggleUserType() {
			this.disabledUserType = !this.disabledUserType;
    },		
		togglePosition() {
      this.disabledPosition = !this.disabledPosition;
    },
		toggleState() {
      this.disabledState = !this.disabledState;
    },
    toggleMunicipality() {
      this.disabledMunicipality = !this.disabledMunicipality;
    },
    toggleColony() {
      this.disabledColony = !this.disabledColony;
    },
    toggleChain() {
      this.disabledChain = !this.disabledChain;
    },
    toggleAge() {
      this.disabledAge = !this.disabledAge;
    },
    toggleGender() {
      this.disabledGender = !this.disabledGender;
    },

    onSubmitNotificationForm() {
      //alert("Subir");
      this.fileForm.validateFields((err, values) => {
        if (!err) {
          console.log("Datos recibidos: ", values);
          this.showConfirm();
          // this.notifications = values;
          // console.log("Datos guardados: ", this.notifications);
          //alert("Exito");
        }
      });
    },
    showConfirm() {
      this.$confirm({
        title: "¿Estás seguro que deseas enviar esta notificación?",
        content: h => <div style="color:#000;"></div>,
        onOk() {
          console.log("ENVIAR");
        },
        onCancel() {
          console.log("ATRAS");
        },
        class: "test"
      });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
		},
		getFormatFilterList(filter) {
			let formatedFilter = "";

			if (filter.allUsers)
				formatedFilter = "Todos los usuarios.";
			else {
				const arrFormatedFilter = [filter.type];

				if (filter.chain !== null)
					arrFormatedFilter.push(filter.chain);

				if (filter.city !== null)
					arrFormatedFilter.push(filter.city);

				if (filter.gender !== null) {
					if (filter.gender)
						arrFormatedFilter.push("Mujer");
					else
						arrFormatedFilter.push("Hombre");
				}

				if (filter.initAge !== null) 
					arrFormatedFilter.push(`${filter.initAge} - ${filter.finalAge} años`)

				formatedFilter = arrFormatedFilter.join(", ");
			}

			return formatedFilter;
		},
		getGender() {
			if (this.filterToSend.gender === -1)
				return -1;

			console.log("Gender", this.filterToSend.gender);

			return this.filterToSend.gender === "1"?1:0;

		},
		addFilter() {
			const filterData = {
				allUsers: this.filterToSend.allUsers,
				userType: this.filterToSend.userType,
				state: this.filterToSend.state,
				chain: this.filterToSend.chain,
				naosPosition: this.filterToSend.naosPosition,
				initAge: this.filterToSend.initAge,
				finalAge: this.filterToSend.finalAge,
				gender: this.getGender()
			};

			if (filterData.allUsers) {
				for (const key in filterData)
					filterData[key] = -1;
				
				filterData.allUsers = true;
			}
			else {
				if (this.disabledUserType)
					filterData.userType = -1;

				if (this.disabledState)
					filterData.state = -1;

				if (this.disabledChain || this.userType === 1)
					filterData.chain = -1;

				if (this.disabledAge) {
					filterData.initAge = -1;
					filterData.finalAge = -1;
				}
			}

			console.log("%cNew filter: ", "color:green;", filterData)

			this.registerFilter(filterData);
		},
		async registerFilter(filter) {
			const urlRegisterFilter = "https://bioderma-api-inmersys.herokuapp.com/target";

			try {
				const response = await this.$axios.post(urlRegisterFilter, filter);
				this.filters.push(response.data.target);

				// this.$notification["success"]({
				// 	message: "Registro exitoso",
        //   description:
        //     "El filtro se registro exitosamente.",
        // });
			} catch (err) {
				console.log(err);
				this.$notification["error"]({
					message: "Error",
          description:
            "Hubo un error al registrar el filtro.",
        });
			}
		},
		async onRemoveFilter(idFilter) {
			console.log("Remove filter:", idFilter);
			const urlRegisterFilter = "https://bioderma-api-inmersys.herokuapp.com/target";

			try {
				const response = await this.$axios.delete(urlRegisterFilter, {
					"targetId": idFilter
				});
				

				this.filters = this.filters.filter(filter => filter.id !== idFilter);


				// this.$notification["success"]({
        //   message: "Filtro eliminado",
        //   description:
        //     "El filtro se elimino exitosamente.",
        // });
			} catch (err) {
				console.log(err);
				this.$notification["error"]({
          message: "Error",
          description:
            "Hubo un error al eliminar el filtro.",
        });
			}
		}
  }
}
</script>

<style scoped>
p{
	margin: 0;
}
.ant-card-body {
	padding-bottom: 0;
}
.container-btn {
  display: flex;
  justify-content: center;
}
.group-filter {
  display: flex;
}
.added-filters {
  width: 50%;
  margin: 8px;
	height: 45vh;
}
.filter {
  width: 50%;
  padding: 8px;
}
.filter-list {
	height: 30vh;
	overflow-y: scroll;
}
.filter__data {
	font-size: 0.87rem;
	margin: 0 1rem 1.8rem 0;
}
.filter__title {
	font-weight: bold;
}
.filter__content {
	width: 100%;
}
.filter__remove-button {
	text-align: right;
}
.mycard {
  border: none;
  border-bottom: none;
}
.container-option {
  width: 100%;
  display: flex;
}
.container-item {
  margin: 0 auto;
}
.select-item {
  margin-bottom: 20px;
}
.hidden {
	display: none;
}
</style>