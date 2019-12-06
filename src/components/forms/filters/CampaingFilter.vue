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
									<a-radio-group :disabled="disabledUserType && !disabledFilters" name="radioGroup" defaultValue="1" @change="onChangeUserType">
										<a-radio value="1">NAOS</a-radio>
										<a-radio value="2">Farmacia</a-radio>
									</a-radio-group>
								</a-checkbox>
							</a-row>
							
							<a-row class="select-item">
								<!-- Row checkbox -->
								<a-checkbox :checked="!disabledFilters && !disabledState" @click="toggleState" @change="onChange" :disabled="disabledFilters" style="margin-right:7px; "></a-checkbox>
								<a-select
									showSearch
									placeholder="Estado"
									optionFilterProp="children"
									style="width: 170px"
									@change="handleChange"
									:filterOption="filterOption"
									:disabled="disabledState"
								>
									<a-select-option value="jack">Jack</a-select-option>
									<a-select-option value="lucy">Lucy</a-select-option>
									<a-select-option value="tom">Tom</a-select-option>
								</a-select>
							</a-row>

							<a-row class="select-item">
								<a-checkbox
									:checked="!disabledFilters && !disabledMunicipality"
									@click="toggleMunicipality"
									@change="onChange"
									style="margin-right:7px; "
									:disabled="disabledFilters"
								></a-checkbox>
								<a-select
									showSearch
									placeholder="Municipio"
									optionFilterProp="children"
									style="width: 170px"
									@change="handleChange"
									:filterOption="filterOption"
									:disabled="disabledMunicipality"
								>
									<a-select-option value="jack">Jack</a-select-option>
									<a-select-option value="lucy">Lucy</a-select-option>
									<a-select-option value="tom">Tom</a-select-option>
								</a-select>
							</a-row>

							<!-- Row checkbox -->
							<a-row class="select-item">
								<!-- Row checkbox -->
								<a-checkbox
									:checked="!disabledFilters && !disabledColony"
									:disabled="disabledFilters"
									@click="toggleColony"
									@change="onChange"
									style="margin-right:7px; "
								></a-checkbox>
								<a-select
									showSearch
									placeholder="Colonia"
									optionFilterProp="children"
									style="width: 170px"
									@change="handleChange"
									:filterOption="filterOption"
									:disabled="disabledColony"
								>
									<a-select-option value="jack">Jack</a-select-option>
									<a-select-option value="lucy">Lucy</a-select-option>
									<a-select-option value="tom">Tom</a-select-option>
								</a-select>
							</a-row>

							<!-- Row checkbox -->
							<a-row class="select-item" :class="isHiddenChain?'hidden':''">
								<a-checkbox
									:disabled="!disabledFilters && !disabledFilters"
									@click="toggleChain"
									@change="onChange"
									style="margin-right:7px; "
								></a-checkbox>

								<a-select
									showSearch
									placeholder="Cadena"
									optionFilterProp="children"
									style="width: 170px"
									@change="handleChange"
									:filterOption="filterOption"
									:disabled="disabledChain"
								>
									<a-select-option value="jack">Jack</a-select-option>
									<a-select-option value="lucy">Lucy</a-select-option>
									<a-select-option value="tom">Tom</a-select-option>
								</a-select>
							</a-row>

							<!-- Row checkbox -->
							<a-row class="select-item">
								<a-checkbox :checked="!disabledFilters && !disabledAge" :disabled="disabledFilters" @click="toggleAge" @change="onChange"></a-checkbox>
								<span>Edad</span>
								<a-input-number
									:min="18"
									:max="100"
									:disabled="disabledAge"
									style="width: 60px; margin-right: 3px; margin-left: -6px"
								/>
								<span>a</span>
								<a-input-number
									:min="18"
									:max="100"
									:disabled="disabledAge"
									style="width: 60px; margin-left: 2px"
								/>
							</a-row>
						</a-row>
					</a-row>

					<div class="container-btn">
						<a-button
							type="primary"
							style="background-color:#009FD1; border: none; margin-top:15px"
						>Agregar filtro a la lista</a-button>
					</div>
				</a-card>
			</div>
			<!-- -Municioio Colonia
			+Genero -->
			<div class="added-filters">
				<a-card class="mycard" title="FILTROS AGREGADOS">
					<div class="filter-list">
						<div class="filter" v-for="(filter, index) in filters" :key="index">
							<p>FILTRO {{ index + 1}}</p>
							<p class="filter-content">
								{{ filter }}
							</p>
						</div>
					</div>
				</a-card>
			</div>
	</a-row>
</template>

<script>
export default {
	name: "CampaingFilter",
	data() {
		return {
			disabledFilters: true,
			disabledUserType: true,
			disabledState: true,
      disabledMunicipality: true,
      disabledColony: true,
      disabledChain: true,
			disabledAge: true,
			isHiddenChain: true,
			filters: [
				{},
				{},
				{},
				{},
				{},
				{},
				{},
			]
		}
	},
	methods: {
		onChangeMainFilter(e) {
			this.disabledFilters = e.target.checked;
		},
		toggleUserType() {
      this.disabledUserType = !this.disabledUserType;
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
    // toggleChecked() {
    //   this.checked = !this.checked;
    // },
    toggleDisable() {
      this.disabled = !this.disabled;
    },
    onChange(e) {
      this.checked = e.target.checked;
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    // handleBlur() {
    //   console.log("blur");  
    // },
    // handleFocus() {
    //   console.log("focus");
    // },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
		},
		onChangeUserType(e) {
			const radio = e.target;
			this.isHiddenChain = (radio.value !== "2");
		}
  }
}
</script>

<style scoped>
.hidden {
	display: none;
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
	height: 40vh;
}

.filter-list {
	height: 40vh;
	overflow-y: scroll;
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
</style>