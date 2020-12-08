<template>
  <a-row class="group-filter">
    <div class="filter contain-one">
      <a-card class="mycard" title="AGREGAR FILTRO +">
        <a-row class="container-option">
          <a-row class="container-item">
            <a-row class="select-item">
              <a-checkbox
                @change="onChangeMainFilter"
                :checked="disabledFilters"
                :disabled="!allUsers && filters.length > 0"
              >Todos los usuarios</a-checkbox>
            </a-row>

            <a-row class="select-item">
              <a-checkbox
                :checked="!disabledFilters && !disabledUserType"
                :disabled="disabledFilters"
                @change="toggleUserType"
              >
                <a-radio-group
                  :disabled="disabledUserType || disabledFilters"
                  name="user-type"
                  :defaultValue="1"
                  v-model="filterToSend.userType"
                  @change="blockFilters"
                >
                  <a-radio :value="1">NAOS</a-radio>
                  <a-radio :value="2">Farmacia</a-radio>
                  <a-radio :value="3" v-if="!isNotificationView">ADMIN</a-radio>
                </a-radio-group>
              </a-checkbox>
            </a-row>

            <a-row class="select-item" :class="(filterToSend.userType==2)?'hidden':''">
              <!-- Row checkbox -->
              <a-checkbox
                :checked="!disabledFilters && !disabledPosition"
                @click="togglePosition"
                :disabled="disabledFilters"
                style="margin-right:7px; "
              ></a-checkbox>
              <a-select
                showSearch
                placeholder="Posición"
                optionFilterProp="children"
                style="width: 170px"
                :filterOption="filterOption"
                :disabled="disabledPosition || disabledFilters"
                v-model="filterToSend.naosPosition"
                name="position"
              >
                <a-select-option
                  v-for="position in positions"
                  :key="position.id"
                  :value="position.id"
                >{{ position.name }}</a-select-option>
              </a-select>
            </a-row>

            <a-row class="select-item">
              <!-- Row checkbox -->
              <a-checkbox
                :checked="!disabledFilters && !disabledState"
                @click="toggleState"
                :disabled="disabledFilters"
                style="margin-right:7px; "
              ></a-checkbox>
              <a-select
                showSearch
                placeholder="Estado"
                optionFilterProp="children"
                style="width: 170px"
                :filterOption="filterOption"
                :disabled="disabledState || disabledFilters"
                v-model="filterToSend.state"
                @change="getCities"
                name="state"
              >
                <a-select-option
                  v-for="state in states"
                  :key="state.id"
                  :value="state.id"
                >{{ state.name }}</a-select-option>
              </a-select>
            </a-row>

            <!-- Row checkbox -->
            <a-row class="select-item">
              <a-checkbox
                :checked="!disabledFilters && !disabledCity"
                @click="toggleCity"
                :disabled="disabledFilters"
                style="margin-right:7px; "
              ></a-checkbox>
              <a-select
                showSearch
                placeholder="Ciudad"
                optionFilterProp="children"
                style="width: 170px"
                :filterOption="filterOption"
                :disabled="disabledCity || disabledFilters"
                v-model="filterToSend.city"
                name="city"
              >
                <a-select-option
                  v-for="city in cities"
                  :key="city.id"
                  :value="city.id"
                >{{ city.name }}</a-select-option>
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
                <a-select-option
                  v-for="chain in chains"
                  :value="chain.id"
                  :key="chain.id"
                >{{ chain.name }}</a-select-option>
              </a-select>
            </a-row>

            <!-- Row checkbox -->
            <a-row class="select-item">
              <a-checkbox
                :checked="!disabledFilters && !disabledAge"
                :disabled="disabledFilters"
                @click="toggleAge"
              ></a-checkbox>
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
              <a-checkbox
                :checked="!disabledFilters && !disabledGender"
                :disabled="disabledFilters"
                @change="toggleGender"
              >
                <a-radio-group
                  :disabled="disabledGender || disabledFilters"
                  :defaultValue="filterToSend.gender"
                  v-model="filterToSend.gender"
                  name="gender"
                >
                  <a-radio :value="1">Mujer</a-radio>
                  <a-radio :value="0">Hombre</a-radio>
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
            :loading="isAddingFilter"
            
          >Agregar filtro a la lista</a-button>
        </div>
      </a-card>
    </div>
    <div class="added-filters">
      <a-card class="mycard" title="FILTROS AGREGADOS">
        <div class="message-empty" v-if="filters.length === 0">
          <p>No se han agregado filtros a la lista.</p>
        </div>
        <div class="filter-list">
          <div class="filter__data" v-for="filter in filters" :key="filter.id">
            <p class="filter__title">FILTRO</p>
            <a-row>
              <a-col span="19">
                <p class="filter__content">{{ getFormatFilterList(filter) }}</p>
              </a-col>
              <a-col span="5" class="filter__remove-button">
                <a-button
                  type="primary"
                  shape="circle"
                  icon="close"
                  style="background-color:#009FD1; border: none; "
                  @click="onRemoveFilter(filter.id)"
                ></a-button>
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
  props: {
    resetFilters: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    resetFilters: function() {
      if (this.resetFilters) {
        this.filters = [];
        this.allUsers = true;
        this.disabledState = true;
        this.disabledCity = true;
        this.disabledChain = true;
        this.disabledAge= true;
        this.disabledGender= true;
        this.disabledPosition = true;
        this.$emit("updateFilters", this.filters.slice(), false);
      }
    },
    blockFilters: function() {
      this.$emit("blockFilters");
    }
  },
  data() {
    return {
      filterToSend: {
        allUsers: true,
        userType: 1,
        state: 1,
        city: 1,
        chain: 1,
        naosPosition: 1,
        initAge: 18,
        finalAge: 100,
        gender: 1
      },
      allUsers: false,
      isAddingFilter: false,
      states: [],
      cities: [],
      positions: [],
      chains: [],
      disabledFilters: true,
      disabledUserType: false,
      disabledPosition: true,
      disabledState: true,
      disabledCity: true,
      disabled: true,
      disabledChain: true,
      disabledAge: true,
      disabledGender: true,
      filters: [],
      isNotificationView: false
    };
  },
  async created() {
    try {
      this.states = await this.getStates();
      await this.getCities();
      this.positions = await this.getWorkPositions();
      this.chains = await this.getChains();
      // console.log("ESTOY EN: ", this.$route.name);
      if (this.$route.name == "notification") {
        this.isNotificationView = true;
      }
    } catch (error) {
      console.log("Error: ", error.message);
    }
  },
  methods: {
    async getStates() {
      try {
        const response = await this.$axios("state");
        return response.data.states;
      } catch (error) {
        console.log("Hubo un error.");
      }
      return [];
    },
    async getCities() {
      try {
        const response = await this.$axios(`city/${this.filterToSend.state}`);
        this.cities = response.data.cities;
        this.filterToSend.city = this.cities.length > 0 ? this.cities[0].id : 1;
      } catch (error) {
        console.log("Hubo un error.");
      }
    },
    async getWorkPositions() {
      try {
        const response = await this.$axios("position");
        return response.data.workPositions;
      } catch (error) {
        console.log("Hubo un error.");
      }
      return [];
    },
    async getChains() {
      try {
        const response = await this.$axios("chain");
        return response.data.chains;
      } catch (error) {
        console.log("Hubo un error.");
      }
      return [];
    },
    onChangeMainFilter(e) {
      this.disabledFilters = e.target.checked;
      this.filterToSend.allUsers = e.target.checked;
    },
    toggleUserType() {
      this.disabledUserType = !this.disabledUserType;
      this.filterToSend.allUsers = this.disabledUserType;
      this.disabledFilters = this.disabledUserType;
    },
    togglePosition() {
      this.disabledPosition = !this.disabledPosition;
    },
    toggleState() {
      this.disabledState = !this.disabledState;
    },
    toggleCity() {
      this.disabledCity = !this.disabledCity;
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
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    getFormatFilterList(filter) {
      let formatedFilter = "";

      if (filter.allUsers) formatedFilter = "Todos los usuarios.";
      else {
        const arrFormatedFilter = [];

        if (filter.type !== null) {
          arrFormatedFilter.push(filter.type);
        } else {
          arrFormatedFilter.push(filter.role);
        }

        if (filter.position !== null) arrFormatedFilter.push(filter.position);

        if (filter.chain !== null) arrFormatedFilter.push(filter.chain);

        if (filter.city !== null) arrFormatedFilter.push(filter.city);

        if (filter.delegation !== null)
          arrFormatedFilter.push(filter.delegation);

        if (filter.gender !== null) {
          if (filter.gender) arrFormatedFilter.push("Mujer");
          else arrFormatedFilter.push("Hombre");
        }

        if (filter.initAge !== null)
          arrFormatedFilter.push(`${filter.initAge} - ${filter.finalAge} años`);

        formatedFilter = arrFormatedFilter.join(", ");
      }

      return formatedFilter;
    },
    getGender() {
      if (this.filterToSend.gender === -1 || this.disabledGender) return -1;

      console.log("Gender", this.filterToSend.gender);

      return this.filterToSend.gender === "1" ? 1 : 0;
    },
    addFilter() {
      const filterData = {
        allUsers: this.filterToSend.allUsers,
        userType: this.filterToSend.userType,
        state: this.filterToSend.state,
        city: this.filterToSend.city,
        chain: this.filterToSend.chain,
        naosPosition: this.filterToSend.naosPosition,
        initAge: this.filterToSend.initAge,
        finalAge: this.filterToSend.finalAge,
        gender: this.getGender()
      };

      if (filterData.allUsers) {
        for (const key in filterData) filterData[key] = -1;

        filterData.allUsers = true;
      } else {
        if (this.disabledUserType) filterData.userType = -1;

        if (this.disabledState) filterData.state = -1;

        if (this.disabledCity) filterData.city = -1;

        if (this.disabledChain || this.userType === 1) filterData.chain = -1;

        if (this.disabledAge) {
          filterData.initAge = -1;
          filterData.finalAge = -1;
        }

        if (this.disabledPosition) filterData.naosPosition = -1;
      }

      // console.log("%cNew filter: ", "color:green;", filterData);

      this.registerFilter(filterData);
    },
    async registerFilter(filter) {
      try {
        this.isAddingFilter = true;
        const response = await this.$axios.post("target", filter);
        this.filters.push(response.data.target);
        console.log("%cNew filter: ", "color:green;", response.data.target);
        this.updateFilters();
      } catch (err) {
        console.log(err);
        this.$notification["error"]({
          message: "Error",
          description: "Hubo un error al registrar el filtro."
        });
      }
      this.isAddingFilter = false;
    },
    async onRemoveFilter(idFilter) {
      try {
        const response = await this.$axios.delete("target", {
          targetId: idFilter
        });

        this.filters = this.filters.filter(filter => filter.id !== idFilter);

        this.updateFilters();
      } catch (err) {
        console.log(err);
        this.$notification["error"]({
          message: "Error",
          description: "Hubo un error al eliminar el filtro."
        });
      }
    },
    updateFilters() {
      
        this.disabledState = true;
        this.disabledCity = true;
        this.disabledChain = true;
        this.disabledAge= true;
        this.disabledGender= true;
        this.disabledPosition = true;

      for (const filter of this.filters) {
        this.allUsers = this.allUsers || filter.allUsers;
      }

      this.$emit("updateFilters", this.filters.slice());
    },
    blockFilters(){
        this.disabledPosition = true;
        this.disabledState = true;
        this.disabledCity = true;
        this.disabledChain = true;
        this.disabledAge= true;
        this.disabledGender= true;
        console.log("Desactivando filtros")
    }
  }
};
</script>

<style scoped>
p {
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
  overflow-y: auto;
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