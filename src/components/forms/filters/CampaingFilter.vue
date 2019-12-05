<template>
	<a-row class="group-filter">
			<div class="filter contain-one">
				<a-card class="mycard" title="AGREGAR FILTRO +">
					<!-- <p :style="{ marginBottom: '20px' }">
						<a-checkbox :checked="checked" :disabled="disabled" @change="onChange"></a-checkbox>
					</p>
					<p>
						<a-button
							type="primary"
							size="small"
							@click="toggleChecked"
						>{{!checked ? 'Check' : 'Uncheck'}}</a-button>
						<a-button
							:style="{ marginLeft: '10px' }"
							type="primary"
							size="small"
							@click="toggleDisable"
						>{{!disabled ? 'Disable' : 'Enable'}}</a-button>
					</p>-->

					<a-row class="container-option">
						<a-row class="container-item">
							<a-row class="select-item">
								<a-checkbox>Todos los nombres</a-checkbox>
							</a-row>
							<a-row class="select-item">
								<a-checkbox>
									<a-radio-group name="radioGroup" :defaultValue="1">
										<a-radio :value="1">NAOS</a-radio>
										<a-radio :value="2">Farmacia</a-radio>
									</a-radio-group>
								</a-checkbox>
							</a-row>
							<a-row class="select-item">
								<!-- Row checkbox -->
								<a-checkbox @click="ableItem" @change="onChange" style="margin-right:7px; "></a-checkbox>
								<a-select
									showSearch
									placeholder="Estado"
									optionFilterProp="children"
									style="width: 170px"
									@change="handleChange"
									:filterOption="filterOption"
									:disabled="disabledItem"
								>
									<a-select-option value="jack">Jack</a-select-option>
									<a-select-option value="lucy">Lucy</a-select-option>
									<a-select-option value="tom">Tom</a-select-option>
								</a-select>
							</a-row>
							<a-row class="select-item">
								<a-checkbox
									@click="ableItemOne"
									@change="onChange"
									style="margin-right:7px; "
								></a-checkbox>
								<a-select
									showSearch
									placeholder="Municipio"
									optionFilterProp="children"
									style="width: 170px"
									@change="handleChange"
									:filterOption="filterOption"
									:disabled="disabledItemOne"
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
									@click="ableItemTwo"
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
									:disabled="disabledItemTwo"
								>
									<a-select-option value="jack">Jack</a-select-option>
									<a-select-option value="lucy">Lucy</a-select-option>
									<a-select-option value="tom">Tom</a-select-option>
								</a-select>
							</a-row>

							<!-- Row checkbox -->
							<a-row class="select-item">
								<a-checkbox
									@click="ableItemThree"
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
									:disabled="disabledItemThree"
								>
									<a-select-option value="jack">Jack</a-select-option>
									<a-select-option value="lucy">Lucy</a-select-option>
									<a-select-option value="tom">Tom</a-select-option>
								</a-select>
							</a-row>
							<!-- Row checkbox -->
							<a-row class="select-item">
								<a-checkbox @click="ableItemFour" @change="onChange"></a-checkbox>
								<span>Edad</span>
								<a-input-number
									:min="18"
									:max="100"
									:disabled="disabledItemFour"
									style="width: 60px; margin-right: 3px; margin-left: -6px"
								/>
								<span>a</span>
								<a-input-number
									:min="18"
									:max="100"
									:disabled="disabledItemFour"
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
			<div class="filter">
				<a-card class="mycard" title="FILTROS AGREGADOS"></a-card>
			</div>
	</a-row>
</template>

<script>
export default {
	name: "CampaingFilter"
}
</script>

<style scoped>
.container-btn {
  display: flex;
  justify-content: center;
}
.group-filter {
  display: flex;
}
.filter {
  width: 50%;
  padding: 8px;
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