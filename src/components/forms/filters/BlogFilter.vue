<template>
  <a-row class="group-filter" v-if="!this.isAll" >
    <div class="filter contain-one">
      <a-card class="mycard" title="AGREGAR FILTRO">
        <a-row class="container-option">
          <a-row class="container-item">
          <!-- Row checkbox -->

<!-----------------------------PRINCIPAL-------------------------------------------->
            <a-row class="select-item">
              <a-checkbox
                @change="onChangeFilter"
                name="allUsers"
                :checked="disabled.allUsers"
                :disabled="filters.length > 0"
              >Todos los usuarios {{getUserTypeString(this.getUserTypeId())}} </a-checkbox>
            </a-row>
<!-----------------------------CADENA-------------------------------------------->
            <a-row class="select-item" :class="!isBlogEsthederm && !isBiodermaGame && !isBlogNaos && !isAll?'':'hidden'">
             <a-space direction="vertical">
              <a-checkbox
                style="width:2rem; height:2rem; margin-right:7px;"
                :checked="!disabled.chain && !disabled.allUsers"
                @change="onChangeFilter"
                :disabled="disabled.allUsers || filters.length > 0"
                name="chain"
              ></a-checkbox>
              <a-select
                showSearch
                placeholder="Cadena"
                optionFilterProp="children"
                style="width: 170px"
                :filterOption="filterOption"
                :disabled="disabled.chain || disabled.allUsers || filters.length > 0 "
                v-model="filterToSend.chain"
                name="chain"
              >
                <a-select-option
                  v-for="chain in chains"
                  :value="chain.id"
                  :key="chain.id"
                >{{ chain.name }}</a-select-option>
              </a-select>
             </a-space>
            </a-row>
<!-------------------------- CLINICA ------------------------------------------->

             <a-row class="select-item" :class="this.isBlogEsthederm?'':'hidden'">
             <a-space direction="vertical">
              <a-checkbox
                :checked="!disabled.clinic && !disabled.allUsers"
                :disabled="disabled.allUsers || filters.length > 0"
                style="margin-right:7px; "
                @change="onChangeFilter"    
                name="clinic"                            
              ></a-checkbox>
              <a-select
                showSearch
                placeholder="Clinica"
                optionFilterProp="children"
                style="width: 170px"
                :filterOption="filterOption"
                :disabled="disabled.clinic || disabled.allUsers || filters.length > 0"
                v-model="filterToSend.clinic"
                name="clinic"
              >
                <a-select-option
                  v-for="clinic in clinics"
                  :key="clinic.id"
                  :value="clinic.id"
                >{{ clinic.name }}</a-select-option>
              </a-select>
             </a-space>
            </a-row>

<!------------------------------POSICION ----------------------------------------->
            <!--Posición en naos-->
            <a-row class="select-item" :class="this.isBlogNaos?'':'hidden'">
             <a-space direction="vertical">
              <a-checkbox
                :checked="!disabled.position && !disabled.allUsers"
                @change="onChangeFilter"
                :disabled="disabled.allUsers || filters.length > 0"
                name="position"
                style="margin-right:7px; "
              ></a-checkbox>

              <a-select
                showSearch
                placeholder="Posición"
                optionFilterProp="children"
                style="width: 170px"
                :filterOption="filterOption"
                :disabled="disabled.position || disabled.allUsers || filters.length > 0"
                v-model="filterToSend.naosPosition"
                name="position"
              >
                <a-select-option
                  v-for="position in positions"
                  :key="position.id"
                  :value="position.id"
                >{{ position.name }}</a-select-option>
              </a-select>
             </a-space>
            </a-row>
<!--------------------------------ESTADOS--------------------------------------->

            <a-row class="select-item" :class="this.isAll ? 'hidden' : ''">
             <a-space direction="vertical">
              <a-checkbox
                :checked="!disabled.state && !disabled.allUsers"
                :disabled="disabled.allUsers || filters.length > 0"
                @change="onChangeFilter"
                name="state"
                style="margin-right:7px; "
              ></a-checkbox>
              <a-select
                showSearch
                placeholder="Estado"
                optionFilterProp="children"
                style="width: 170px"
                :filterOption="filterOption"
                :disabled="disabled.state ||disabled.allUsers || filters.length > 0"
                v-model="filterToSend.state"
              >
                <a-select-option
                  v-for="state in states"
                  :key="state.id"
                  :value="state.id"
                >{{ state.name }}</a-select-option>
              </a-select>
             </a-space>
            </a-row> 
          </a-row>
        </a-row>

<!------------------------------------------------------------------------->
        <div class="container-btn">
          <a-button
            @click="addFilter"
            type="primary"
            style="background-color:#009FD1; border: none; margin-top:15px"
            :loading="isAddingFilter"
            :disabled="filters.length > 0"
          >Agregar filtro a la lista</a-button>
        </div>
      </a-card>
    </div>


  <!--FILTROS AGREGADOS-->
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

const initialStateDisabled ={
          allUsers: true,
          position: true,
          state: true,
          disabled: true,
          chain: true,
          clinic: true,
}
const initialFilterToSend =
{
  allUsers: true,
  userType: 1,
  state: 1,
  city: -1,
  chain: 1,
  clinic: 1,
  naosPosition: 1,
  initAge: -1,
  finalAge: -1,
  gender: -1
}

export default {
  name: "CampaingFilter",
  props: {
    resetFilters: {
      type: Boolean,
      default: false
    },
    isBlogEsthederm: Boolean,
    isBiodermaGame: Boolean,
    isBlogNaos: Boolean,
    isAll: Boolean

  },
  watch: {
    resetFilters: function() {
      if (this.resetFilters) {
        this.filters = [];
        this.disabled = { ...initialStateDisabled };
        this.$emit("updateFilters", this.filters.slice(), false);
      }
      if(this.resetFilters && this.isAll){
        console.log("Es para todos!");
        this.addFilter()
      }
        else if(this.resetFilters)
          console.log("no para todos :(");
    }
  },
  data() {
    return {
      filterToSend: initialFilterToSend,
      disabled: { ...initialStateDisabled },
      allUsers: false,
      isAddingFilter: false,
      states: [],
      cities: [],
      positions: [],
      chains: [],
      clinics: [],
      filters: [],
      isNotificationView: false,
      BlogNaos: 1,
      Drugstore: 2,
      BlogEsthederm: 4,
      BiodermaGame: 2,
      All: 3
    };
  },
  async created() {
    console.log("SE CREÓ ESTE COMPONENTE");
    if(this.isAll){
        console.log("Es para todos!");
        this.addFilter()
      }
    try {
      await this.getData();
      this.filterToSend.userType = this.getUserTypeId();

    } catch (error) {
      console.log("Error: ", error.message);
    }
  },
  methods: {
    getUserTypeId(){
      console.log(this.isBlogEsthederm,this.isBiodermaGame,this.isBlogNaos,this.isAll)
      if (!this.isBlogEsthederm && !this.isBiodermaGame && !this.isBlogNaos && !this.isAll )
        return this.Drugstore

      return this.isBlogEsthederm ?  this.BlogEsthederm : this.isBiodermaGame ? this.BiodermaGame :this.isAll ? this.isAll : this.BlogNaos
    },
    getUserTypeString(id){
        return (this.isBlogEsthederm) ? "Esthederm" : (this.isBlogNaos) ? "Naos" : (this.isBiodermaGame) ? 'Bioderma Game': (this.isAll) ? "" : "Farmacia"   
    },
    async getData() {
      const resState = await this.$axios("state");
      const resPositions = await this.$axios("position");
      const resChains = await this.$axios("chain");
      const resClinics = await this.$axios("clinic");
      this.positions = resPositions.data.workPositions
      this.chains = resChains.data.chains
      this.clinics = resClinics.data.clinics
      this.states = resState.data.states
    },
    onChangeFilter(e) {
      console.log(e.target);
      this.disabled[e.target.name] = e.target.checked
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

    addFilter() {
      const filterData = {
        allUsers: this.disabled.allUsers,
        userType: this.getUserTypeId(),
        state: this.filterToSend.state,
        city: -1,
        chain: this.filterToSend.chain,
        clinic: this.filterToSend.clinic,
        naosPosition: this.filterToSend.naosPosition,
        initAge: -1,
        finalAge: -1,
        gender: -1
      };

      if (this.isAll) {
        for (const key in filterData) filterData[key] = -1;
        filterData.allUsers = true;
        console.log("Entro al primero");
        // eslint-disable-next-line
      } else if(this.disabled.allUsers){
        for (const key in filterData) filterData[key] = -1;
        console.log("Entro al segundo");
        for (const key in filterData) filterData[key] = -1;
        filterData.allUsers = true;
        filterData.userType = this.getUserTypeId()
      } else if(!this.disabled.allUsers && (!this.disabled.state || !this.disabled.chain || !this.disabled.clinic)){
        console.log("Entro al tercero");
        filterData.allUsers = false;
        filterData.userType = this.getUserTypeId()
        filterData.city = -1;
        if (this.disabled.state) filterData.state = -1;
        if (this.disabled.chain || filterData.userType !== 2) filterData.chain = -1;
        if (this.disabled.clinic || filterData.userType !== 4) filterData.clinic = -1;
        if (this.disabled.position || (filterData.userType !== 1 && this.userType !== 3 )) filterData.naosPosition = -1;
      }else{
        this.$notification["error"]({
          message: "Error",
          description: "Selecciona un valor."
        });
        return 
      }
      this.registerFilter(filterData);
    },
    async registerFilter(filter) {
      try {
        this.isAddingFilter = true;
        console.log("filtro enviado",filter);
        const response = await this.$axios.post("target", filter);
        this.filters.push(response.data.target);
        console.log("nuevo filtro agregado: ", response.data.target);
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
      this.allUsers = false;
      for (const filter of this.filters) {
        this.allUsers = this.allUsers || filter.allUsers;
      }
      this.$emit("updateFilters", this.filters.slice());
    }
  },
  computed: {
    isButtonBlocked: function(){
      if(this.isBlogNaos && disabledPosition && disabledState) return true
      if (this.isBlogEsthederm && disabledClinic && disabledState) return true
      if (!this.isBlogNaos && !this.isBiodermaGame && !this.isBlogEsthederm && disabledClinic && disabledState) return true
      return false
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
.red{
  background:red;
}
.blue{
  background:blue;

}
</style>