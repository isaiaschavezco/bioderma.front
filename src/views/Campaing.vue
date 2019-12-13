<template>
  <div>
    <a-row>
      <a-col :xs="{ span: 22 }">
        <div class="card-container" style="height: 50rem; margin-top: 4px;">
          <a-tabs
            type="card"
            @change="onChangeTab"
            style="height: 2.4rem; margin-bottom:1rem; border-bottom:  .5px solid rgba(0, 0, 0, 0.8);"
          >
            <a-tab-pane tab="CAMPAÑAS" key="1"></a-tab-pane>
            <a-tab-pane tab="BIODERMA GAMES" key="2"></a-tab-pane>
          </a-tabs>

          <a-skeleton :loading="loadingCampaings" active>
            <section :style="{ overflow: 'auto', height: '88vh'}">
              <a-row :gutter="16" :style="{ 'margin-top': '16px' }" v-for="(row, i) in groupedCampaings" :key="i">
                <a-col span="6" v-for="(item, j) in row" :key="j">
                  <a-tooltip placement="topLeft" title="Da click en la imágen para ver las trivias de esta campaña" class="list__campaing">
                    <a-card>
                      <div class="campaing__head">
                        <a-row>
                          <a-col span="15">
                            <h2>{{ item.name }}</h2>
                          </a-col>
                          <a-col span="9">
                            <a-row class="camapaing__actions" type="flex" justify="space-between">
                              <a-col span="8">
                                <a-icon class="campaing__action" type="edit" @click="() => editCampaing(item.id)"/>
                              </a-col>

                              <a-col span="8">
                                <a-icon class="campaing__action" type="delete" />
                              </a-col>
                            </a-row>
                          </a-col>
                        </a-row>
                      </div>

                      <a-divider />
                      
                      <img alt="example" :src="item.portrait" class="campaing__img" @click="() => editCampaing(item.id)"/>
                      
                      <span style="font-weight: 700;">FILTROS</span>
                      <div class="campaing__filters">
                          <div class="campaing__filter" v-if="item.target.length > 0">
                            <p v-for="filter in item.target" :key="filter.id">
                              {{ FilterHelper.toString(filter) }}
                            </p>
                          </div>
                      </div>
                      
                      
                      <a-divider/>
                      <span style="font-weight: 700;">ESTATUS</span>
                      <br />
                      <span>{{ item.isActive ? "ACTIVA" : "CONCLUIDA" }}</span>
                      <a-divider />
                    </a-card>
                  </a-tooltip>
                </a-col>
              </a-row>
            </section>
          </a-skeleton>
          <a-skeleton :loading="loadingCampaings" active>
          </a-skeleton>
        </div>
      </a-col>
      <a-col class="column-right-cam" :xs="{ span: 2 }" style="text-align:center;">
        <a-row style="margin-top: -13px; margin-left: 27px;">
          <a-col>
            <a-button shape="circle" icon="plus" size="large" @click="openModal" />
          </a-col>
          <a-col class="title-span-tag">AÑADIR CAMPAÑA</a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-modal
      title="NUEVA CAMPAÑA"
      v-model="loadFileModal"
      :confirmLoading="loadingFileForm"
      :afterClose="closeModal"
      centered
      width="50%"
      :footer="null"
    >
      <ModalCampaingRegister
        :biodermaGames="bioGamesTab"
        @campaingAdded="updateCampaings"
        @closeModal="closeModal"
      />
    </a-modal>
  </div>
</template>
<script>
import ModalCampaingRegister from "../components/modals/Campaing/ModalCampaingRegister.vue";
import Filter from "../components/forms/filters/FilterHelper";

export default {
  components: {
    ModalCampaingRegister
  },
  data() {
    return {
      loadingCampaings: true,
      FilterHelper: Filter,
      campaings: [],
      groupedCampaings: [],
      loadingFileForm: false,
      activeTab: 1,
      files: [],
      loadingMore: false,
      showLoadingMore: true,
      loadFileModal: false,
      submenuItems: [],
      bioGamesTab: false
    };
  },
  mounted: function() {
    this.getFiles(1);
    this.getCamapings();
  },
  methods: {
    async getCamapings() {
      this.loadingCampaings = true;
      const urlCamapaings = `https://bioderma-api-inmersys.herokuapp.com/campaing/${this.bioGamesTab}`;

      try {
        const response = await this.$axios(urlCamapaings);
        this.campaings = response.data;
        this.groupedCampaings = this.groupCampaings(); 
      } catch (err) {
        console.log("Error: ", err);
      }

      this.loadingCampaings = false;
    },
    openModal() {
      this.loadFileModal = true;
      console.log("Open", this.loadFileModal);
    },
    closeModal() {
      this.loadFileModal = false;
      console.log(this.loadFileModal);
    },
    updateCampaings() {
      this.getCamapings();
      this.getFiles(this.activeTab);
    },
    onChangeTab(activeTabKey) {
      this.activeTab = activeTabKey;
      if (activeTabKey == "1") {
        this.bioGamesTab = false;
      } else {
        this.bioGamesTab = true;
      }
      this.getCamapings();
      this.getFiles(this.activeTab);
    },
    async getFiles(menuId) {
      this.loadingMore = true;
      const response = await this.$axios(`submenu/${menuId}`);
      console.log("Response: ",response);
      this.files = response.data;
      this.loadingMore = false;
    },
    handleChangeMenu(value) {
      this.getSubMenuItems(value);
    },
    async getSubMenuItems(menuId) {
      const response = await this.$axios(`submenu/items/${menuId}`);
      this.submenuItems = response.data;
    },
    groupCampaings() {
      const totalGroups = Math.ceil(this.campaings.length / 4);
      const groupsCampaings = [];

      for (let i = 0; i < totalGroups; ++i) {
        const currGroup = [];

        for (let j = 4 * i; j < 4 * (i + 1) && j < this.campaings.length; ++j)
          currGroup.push(this.campaings[j]);

        groupsCampaings.push(currGroup);
      }

      console.log("Grouped:", groupsCampaings);

      return groupsCampaings;
    },
    editCampaing(campaingId) {
      this.$router.push({ name: 'campaingDetail', query: { id: campaingId } });
    }
  }
};
</script>
<style scoped>
.card-container
  > .ant-tabs
  > .ant-tabs-top
  > .ant-tabs-card
  > .ant-tabs-no-animation {
  border-bottom: 1px solid;
}
.campaing__header h4 {
  margin: 0;
}
.campaing__action {
  font-size: 1.2rem;
  padding: 7px;
  border-radius: 50%;
  box-shadow: 1px 1px 5px 1px rgba(119, 119, 119, 0.5);
  transition-delay: 0;
  transition-duration: 10ms;
  transition-timing-function: ease-in-out;
}
.campaing__action:active {
  transform: scale(0.9);
}
.campaing__img {
  height: 200px;
  width: 100%;
  object-fit: cover;
  cursor: pointer;
}
.campaing__filters {
  height: 4.5rem;
  overflow-y: auto;
  margin: 1rem 0 2rem 0;
}
.campaing__filters p {
  margin: 0.2rem 0 0 0;
}
.column-right-cam {
  margin-top: 78px;
}
</style>
