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
              <a-row
                :gutter="16"
                :style="{ 'margin-top': '16px' }"
                v-for="(row, i) in groupedCampaings"
                :key="i"
              >
                <a-col span="6" v-for="(item, j) in row" :key="j">
                  <a-tooltip
                    placement="topLeft"
                    title="Da click en la imágen para ver las trivias de esta campaña"
                    class="list__campaing"
                  >
                    <a-card>
                      <div class="campaing__header">
                        <a-row :gutter="12">
                          <a-col :lg="{span:'24'}" :xl="{span:'15'}">
                            <h2>{{ item.name }}</h2>
                          </a-col>
                          <a-col :lg="{span:'24'}" :xl="{span:'9'}">
                            <a-row class="camapaing__actions" type="flex" justify="space-between">
                              <a-col span="8">
                                <a-icon
                                  class="campaing__action"
                                  type="edit"
                                  @click="onOpenEditCampaingModal(item.id, item.name)"
                                />
                              </a-col>

                              <a-col span="8">
                                <a-icon
                                  class="campaing__action"
                                  type="delete"
                                  @click="onOpenModalRemove(item.id)"
                                />
                              </a-col>
                            </a-row>
                          </a-col>
                        </a-row>
                      </div>

                      <a-divider />

                      <div class="campaing__container-img">
                        <img
                          alt="example"
                          :src="item.portrait"
                          class="campaing__img"
                          @click="() => editCampaing(item.id, item.name)"
                        />
                      </div>

                      <span style="font-weight: 700; margin-top: 1rem; display:block;">FILTROS</span>
                      <div class="campaing__filters">
                        <div class="campaing__filter" v-if="item.target.length > 0">
                          <p
                            v-for="filter in item.target"
                            :key="filter.id"
                          >{{ FilterHelper.toString(filter) }}</p>
                        </div>
                      </div>

                      <a-divider />
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
          <a-skeleton :loading="loadingCampaings" active></a-skeleton>
        </div>
      </a-col>
      <a-col class="column-right-cam" :xs="{ span: 2 }" style="text-align:center;">
        <a-row style="margin-top: -13px; margin-left: 27px;">
          <a-col>
            <a-button shape="circle" icon="plus" size="large" @click="onOpenNewCampaingModal" />
          </a-col>
          <a-col class="title-span-tag">Añadir campaña</a-col>
        </a-row>
      </a-col>
    </a-row>

    <ModalRemoveConfirmation
      :isVisible="removeConfirmationModal"
      targetName="campaña"
      @confirm="removeCampaing"
      @close="onCloseRemoveConfirmationModal"
      :quizzId="campaingRemoveId"
    />

    <a-modal
      :title="`NUEVA CAMPAÑA ${bioGamesTab?'BIODERMA GAMES':''}`"
      v-model="newCampaingModal"
      :confirmLoading="loadingFileForm"
      :afterClose="onCloseModal"
      centered
      width="60%"
      :footer="null"
    >
      <ModalCampaingRegister
        :biodermaGames="bioGamesTab"
        @campaingAdded="updateCampaings"
        @closeModal="onCloseModal"
      />
    </a-modal>

    <a-modal
      title="EDITAR CAMPAÑA"
      v-model="editCampaingModal"
      okText="EDITAR"
      cancelText="CANCELAR"
      @ok="editCampaingName"
      :confirmLoading="confirmEditCampaingLoading"
    >
      <div class="info-confirmation">
        <p>Escribe el nuevo nombre de la campaña</p>
        <a-form :form="editCampaingForm">
          <a-form-item>
            <a-input
              placeholder="Nombre de la campaña"
              v-decorator="[
              'name',
              {
                initialValue: actualCampaingName,
                rules: [{ required: true, message: 'Favor de llenar el campo' }]
              }
            ]"
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>
<script>
import ModalRemoveConfirmation from "../components/modals/Campaing/Confirmation/ModalRemoveConfirmation.vue";
import ModalCampaingRegister from "../components/modals/Campaing/ModalCampaingRegister.vue";
import Filter from "../components/forms/filters/FilterHelper";

export default {
  components: {
    ModalRemoveConfirmation,
    ModalCampaingRegister
  },
  data() {
    return {
      campaingRemoveId: -1,
      loadingCampaings: true,
      FilterHelper: Filter,
      campaings: [],
      groupedCampaings: [],
      loadingFileForm: false,
      activeTab: 1,
      files: [],
      loadingMore: false,
      showLoadingMore: true,
      newCampaingModal: false,
      editCampaingModal: false,
      submenuItems: [],
      bioGamesTab: false,
      removeConfirmationModal: false,
      editCampaingForm: this.$form.createForm(this),
      actualCampaingName: "",
      actualCampaingId: "",
      confirmEditCampaingLoading: false
    };
  },
  mounted: function() {
    // this.getFiles(1);
    this.getCamapings();
  },
  methods: {
    async getCamapings() {
      this.loadingCampaings = true;
      try {
        const response = await this.$axios(`campaing/${this.bioGamesTab}`);
        this.campaings = response.data;
        this.groupedCampaings = this.groupCampaings();
      } catch (err) {
        console.log("Error: ", err);
      }

      this.loadingCampaings = false;
    },
    onOpenNewCampaingModal() {
      this.newCampaingModal = true;
    },
    onCloseModal() {
      this.newCampaingModal = false;
    },
    updateCampaings() {
      this.getCamapings();
      // this.getFiles(this.activeTab);
    },
    onChangeTab(activeTabKey) {
      this.activeTab = activeTabKey;
      if (activeTabKey == "1") {
        this.bioGamesTab = false;
      } else {
        this.bioGamesTab = true;
      }
      this.getCamapings();
      // this.getFiles(this.activeTab);
    },
    async getFiles(menuId) {
      try {
        this.loadingMore = true;
        const response = await this.$axios(`submenu/${menuId}`);
        // console.log("Response: ", response);
        this.files = response.data;
      } catch (error) {
        console.log("Hubo un error al obtener los archivos: ", error.message);
      }

      this.loadingMore = false;
    },
    handleChangeMenu(value) {
      this.getSubMenuItems(value);
    },
    async getSubMenuItems(menuId) {
      try {
        const response = await this.$axios(`submenu/items/${menuId}`);
        this.submenuItems = response.data;
      } catch (error) {
        console.log("Hubo un error al obtener los sub menus.", error.message);
      }
    },
    onCloseRemoveConfirmationModal() {
      this.removeConfirmationModal = false;
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

      //  console.log("Grouped:", groupsCampaings);

      return groupsCampaings;
    },
    editCampaing(campaingId, campaingName) {
      this.$router.push({
        name: "campaingDetail",
        query: { id: campaingId },
        params: { name: campaingName }
      });
    },
    onOpenModalRemove(campaingId) {
      // console.log("campaingId: ", campaingId);
      this.campaingRemoveId = campaingId;
      this.removeConfirmationModal = true;
    },
    onOpenEditCampaingModal(campaingId, campaingName) {
      // console.log("campaingId: ", campaingId);
      // console.log("Edito campaña: ", campaingId, campaingName);
      this.actualCampaingName = campaingName;
      this.actualCampaingId = campaingId;
      this.editCampaingForm.resetFields();
      this.editCampaingModal = true;
      // this.editCampaingForm.setFieldsValue({
      //   ["name"]: this.actualCampaingName
      // });
    },
    editCampaingName() {
      // console.log(
      //   "ACTUALIZO: ",
      //   this.actualCampaingId,
      //   this.actualCampaingName
      // );
      this.editCampaingForm.validateFields(async (err, values) => {
        if (!err) {
          this.confirmEditCampaingLoading = true;
          try {
            const updateData = {
              campaingId: this.actualCampaingId,
              name: values.name
            };

            const responseData = await this.$axios.put("campaing", updateData);

            if (responseData.data.status == 0) {
              this.editCampaingForm.resetFields();
              this.confirmEditCampaingLoading = false;
              this.editCampaingModal = false;
              this.getCamapings();
              this.$notification["success"]({
                message: "Campaña actualizada",
                description: "Se ha editado el nombre correctamente."
              });
            }

            // console.log(JSON.stringify(questionInformation));
          } catch (error) {
            this.editCampaingForm.resetFields();
            this.confirmEditCampaingLoading = false;
            this.editCampaingModal = false;
            this.$notification["error"]({
              message: "Error al editar la campaña",
              description: "Ha ocurrido un error al editar esta campaña."
            });
          }
        }
      });
    },
    removeCampaing(status) {
      let type = "";
      let title = "";
      let content = "";
      switch (status) {
        case -1:
          type = "error";
          title = "Error al eliminar campaña";
          content = "Ha ocurrido un error al eliminar esta campaña.";
          break;
        case 0:
          type = "success";
          title = "Campaña eliminada";
          content = "Se ha eliminado la campaña exitosamente.";
          break;
        case 1:
          type = "warning";
          title = "Usuario no encontrado";
          content = "No se ha encontrado un usuario asociado a este correo.";
          break;
        case 2:
          type = "warning";
          title = "Contraseña incorrecta";
          content = "La contraseña no coincide para este usuario.";
          break;
        case 11:
          type = "info";
          title = "Esta campaña esta asociada con una o más trivias";
          content =
            "Para eliminar la campaña se deben eliminar las trivias a las que esta asociada.";
          break;
        default:
          break;
      }
      if (status != null) {
        this.onCloseRemoveConfirmationModal();
        this.getCamapings();
        this.$notification[type]({
          message: title,
          description: content
        });
      }
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
.campaing__header {
  height: 2.5rem;
}
.campaing__header h2 {
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
.campaing__container-img {
  width: 100%;
  text-align: center;
  object-fit: cover;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.campaing__img {
  text-align: center;
  max-height: 100%;
  width: 100%;
  object-fit: contain;
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
