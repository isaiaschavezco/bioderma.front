<template>
  <a-col
    v-if="campaing.status.id !== statusCodes.deleted"
    :span="8"
    style="min-height:100%;"
  >
    <div class="guter-col">
      <a-card
        :loading="loading"
        :title="campaing.name"
        style="padding-top:0; margin:0;"
      >
        <a-badge
          slot="extra"
          status="success"
          text="Activa"
          v-if="campaing.status.id === statusCodes.active"
        />
        <a-badge
          slot="extra"
          status="processing"
          text="Incompleta"
          v-if="campaing.status.id === statusCodes.created"
        />
        <a-badge
          slot="extra"
          status="default"
          text="Eliminada"
          v-if="campaing.status.id === statusCodes.deleted"
        />
        <a-badge
          slot="extra"
          status="warning"
          text="Pausada"
          v-if="campaing.status.id === statusCodes.paused"
        />

        <a-badge
          slot="extra"
          status="warning"
          text="Finalizada"
          v-if="campaing.status.id === statusCodes.finished"
        />
        <a-space
          direction="horizontal"
          align="center"
          style=" display:flex;justify-content:space-around;padding-bottom:1rem; margin-top:-0.5rem; "
          v-if="campaing.status.id !== statusCodes.deleted"
        >
          <a-col v-if="!isFinished">
            <a-popconfirm
              title="¿Estás seguro que deseas eliminar esta campaña?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="onCloseCampaing"
            >
              <a-button type="link" size="small">Cerrar campaña </a-button>
            </a-popconfirm>
          </a-col>
          <span v-if="campaing.status.id === statusCodes.active">Pausar</span>
          <a-col v-if="campaing.status.id !== statusCodes.finished">
            <a-switch @change="onChangeSwitch" v-model="isActive" />
          </a-col>
          <a-col v-if="campaing.status.id !== statusCodes.finished">
            <a-icon
              @click="onEditCampaing(campaing)"
              class="campaing__action"
              size="large"
              type="edit"
            />
          </a-col>

          <a-col>
            <a-popconfirm
              title="¿Estás seguro que deseas eliminar esta campaña?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="onDeleteCampaing"
            >
              <a-icon class="campaing__action" type="delete" />
            </a-popconfirm>
          </a-col>
          <!-- @click="onDeleteProductModal(), gettingId(item.id)" -->
        </a-space>
        <a-space direction="vertical" size="small" align="start">
          <p style="margin-bottom:0.1rem;font-weight:bold;">
            Vigencia
          </p>
          <div style="display:flex;">
            <p style="margin-bottom:0.1rem; ">
              Del {{ moment(campaing.startedAt).format("YYYY/MM/DD") }}
            </p>
            <p style="margin-bottom:0.1rem; margin-left:0.2rem; ">
              Al {{ moment(campaing.finishedAt).format("YYYY/MM/DD") }}
            </p>
          </div>
          <p style="margin-bottom:0.1rem; font-weight:bold;">
            Limite de productos
          </p>
          <p style="margin-bottom:0.1rem;">{{ campaing.buymax }}</p>
          <p style="margin-bottom:0.1rem; font-weight:bold;">
            Productos de regalo
          </p>
          <p style="margin-bottom:0.1rem;">{{ campaing.giftMax }}</p>
          <p
            v-if="campaing.bussinessId"
            style="margin-bottom:0.1rem; font-weight:bold;"
          >
            inactiveCampaing Convenio
          </p>
          <p style="margin-bottom:0.1rem;">{{ convenioName }}</p>
        </a-space>
        <template
          slot="actions"
          class="ant-card-actions"
          v-if="campaing.status.id !== statusCodes.deleted"
        >
          <span>
            <a-button :disabled="campaing.sales.length === 0">
              VER PEDIDOS</a-button
            >
            <!-- :loading="inviteUserLoading" -->
            <!-- @click="onSubmitInvitationForm" -->
          </span>
          <span>
            <a-button
              v-if="campaing.products.length"
              @click="onGoToStore"
              type="primary"
            >
              VER TIENDA
            </a-button>
          </span>
        </template>
      </a-card>
    </div>
  </a-col>
</template>

<script>
import moment from "moment";

export default {
  props: {
    onEditCampaing: Function,
    changeStepStore: Function,
    replaceCampaing: Function,
    onAddProductsToCampaing: Function,
    restoreData: Function,
    setBusinessUsed: Function,
    campaing: Object,
    statusCodes: Object,
    stepStoresCodes: Object
  },
  data() {
    return {
      loading: false,
      isActive: false,
      isFinished: false,
      convenioName: ""
    };
  },
  computed: {
    status: function() {
      return campaing.status.id;
    }
  },
  mounted() {
    this.isActive = this.campaing.status.id === 3;
    this.isFinished = this.campaing.status.id === 5;

    if (this.campaing.bussinessId) {
      this.getConvenioName(this.campaing.bussinessId);

      this.setBusinessUsed(this.campaing.bussinessId);
    }
  },
  methods: {
    moment,
    handleClick() {
      this.loading = !this.loading;
    },
    async onChangeSwitch(active) {
      if (active && this.campaing.products.length === 0) {
        this.$notification["error"]({
          message: "No hay productos relacionados a esta campaña.",
          description: `Agrega unos antes de activar la campaña.`
        });
        this.isActive = false;
      } else if (active) {
        const response = await this.$axios.put(`campaingstore/active`, {
          id: this.campaing.id,
          storeId: this.campaing.store.id
        });

        if (response.data.status === 3) {
          this.$notification["success"]({
            message: "Ya existe una campaña activa",
            description: `Solo puedes tener una campaña activa.
          `
          });
          this.isActive = false;
        } else if (response.data.status === 0) {
          this.replaceCampaing(response.data.campaing);
          this.$message.success("Campaña activada.");
          this.isActive = true;
        }
      } else if (!active) {
        const response = await this.$axios.put(`campaingstore/inactive`, {
          id: this.campaing.id,
          storeId: this.campaing.store.id
        });
        if (response.data.status === 0) {
          this.replaceCampaing(response.data.campaing);
          this.$message.success("Campaña desactivada.");
        }
        this.isActive = false;
      }
    },
    async onDeleteCampaing() {
      try {
        const response = await this.$axios.delete(
          `campaingstore/${this.campaing.id}`
        );
        this.$message.success("Se ha eliminado con éxito.");
        this.replaceCampaing(response.data.campaing);
        this.restoreData();
      } catch (error) {
        this.$notification["success"]({
          message: "Ah ocurrido un error al eliminar ",
          description: `La campaña ${this.campaing.name} no ha podido ser eliminada, intente de nuevo o comuniquese con soporte.
          ${error.message}
          `
        });
      }
    },
    async onCloseCampaing() {
      try {
        const DeactivateCampaingStoreDTO = {
          id: this.campaing.id,
          storeId: this.campaing.store.id
        };
        const response = await this.$axios.put(
          `campaingstore/finish`,
          DeactivateCampaingStoreDTO
        );
        if (response.data.status === 0) {
          this.$message.success("Se ha cerrado con éxito.");
          this.replaceCampaing(response.data.campaing);
        }
        response.data.status === 1 &&
          this.$message.error(
            "La campaña ya no existe o no está relacionada a esta tienda."
          );
      } catch (error) {
        this.$notification["success"]({
          message: "Ah ocurrido un error al cancelar ",
          description: `La campaña ${this.campaing.name} no ha podido ser cancelada, intente de nuevo o comuniquese con soporte.
          ${error.message}
          `
        });
      }
    },
    onGoToStore() {
      this.changeStepStore(1);
      this.onAddProductsToCampaing(this.campaing);
    },
    async getConvenioName(id) {
      try {
        const response = await this.$axios.get(`campaingstore/convenio/${id}`);
        this.convenioName = response.data.convenio;
      } catch (error) {
        this.$notification["success"]({
          message: "Ah ocurrido un error",
          description: `${error.message}, intente de nuevo o comuniquese con soporte.
          ${error.message}
          `
        });
      }
    }
  }
};
</script>

<style scoped>
.guter-col {
  margin-top: 1rem;
  min-height: 100%;
  height: 96%;
}
.ant-card {
  min-height: 96%;
}
.ant-col {
  min-height: 96%;
}
</style>
