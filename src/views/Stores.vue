<template>
  <div class="fl">
    <a-layout :xs="{ span: 24 }" style="min-width:78vw; max-width: 78vw;">
      <a-tabs
        default-active-key="1"
        tab-position="top"
        style="background:white; min-width:100%; max-width:100%;"
        class="ant-tabs-bar"
        @change="onChangeTab"
      >
        <a-tab-pane
          key="1"
          tab="NAOS"
          :disabled="blockStores && activeTab !== 1"
        >
          <store
            :typeStore="1"
            :stepStore="stepStore"
            :changeRestartSteps="changeRestartSteps"
            :changeStepStore="changeStepStore"
            :proudcts="proudcts"
            :changeBlockState="changeBlockState"
            :setProductsList="setProductsList"
          />
        </a-tab-pane>
        <a-tab-pane
          key="2"
          tab="FARMACIAS"
          :disabled="blockStores && activeTab !== 2"
        >
          <store
            :typeStore="2"
            :stepStore="stepStore"
            :changeRestartSteps="changeRestartSteps"
            :changeStepStore="changeStepStore"
            :proudcts="proudcts"
            :changeBlockState="changeBlockState"
            :setProductsList="setProductsList"
          />
        </a-tab-pane>
        <a-tab-pane
          :disabled="blockStores && activeTab !== 3"
          key="3"
          tab="CONVENIOS"
        >
          <store
            :typeStore="4"
            :stepStore="stepStore"
            :changeRestartSteps="changeRestartSteps"
            :changeStepStore="changeStepStore"
            :proudcts="proudcts"
            :changeBlockState="changeBlockState"
            :setProductsList="setProductsList"
          />
        </a-tab-pane>
      </a-tabs>
    </a-layout>
    <a-col
      class="column-right-club"
      :xs="{ span: 2 }"
      style="text-align:center; margin-top: 78px"
    >
      <a-row v-if="stepStore === null">
        <a-col>
          <a-button
            shape="circle"
            icon="plus"
            size="large"
            @click="onOpenNewCampaing"
          />
        </a-col>
        <a-col class="title-span-tag"> NUEVA CAMPAÑA</a-col>
      </a-row>
    </a-col>
  </div>
</template>
<script>
import moment from "moment";
import CardProduct from "../components/stores/CardProduct";
import AddCampaing from "../components/stores/AddCampaing.vue";
import Store from "../components/stores/Store.vue";

export default {
  components: {
    CardProduct,
    AddCampaing,
    Store
  },

  data() {
    return {
      title: "",
      stepStore: null,
      image:
        "http://dev.fuxcorp.net/memo/Bioderma/Imgs/nuestrapiel_con_marcaDagua.jpg",
      description: "",
      points: "",
      productId: "",
      newPoints: "",
      proudcts: [
        {
          id: 0,
          title: "",
          image: "",
          description: "",
          points: 0,
          isActive: true
        }
      ],
      blockStores: false,
      activeTab: 1,
      isLoagindProducts: false
    };
  },
  created() {
    this.blockStores = false;
  },

  mounted() {
    this.getListProducts();
  },
  methods: {
    moment,
    onChangeTab(activeTabKey) {
      this.activeTab = activeTabKey;
    },
    async getListProducts() {
      try {
        this.isLoagindProducts = true;
        const responseList = await this.$axios.get("product");
        this.proudcts = responseList.data.products;
        this.isLoagindProducts = false;
        console.log({ responseList });
      } catch (err) {
        this.isLoagindProducts = false;
        this.$notification["error"]({
          message: "Error al cargar productos",
          description: "Ha ocurrido un error al cargar los productos."
        });
      }
    },
    setProductsList(products) {
      this.proudcts = products;
    },
    onOpenNewCampaing() {
      this.stepStore = 0;
      this.blockStores = true;
    },
    changeRestartSteps() {
      this.stepStore = null;
      this.blockStores = false;
    },
    changeBlockState(state) {
      this.blockStores = state;
    },
    changeStepStore(step) {
      this.stepStore = step;
    }
  }
};
</script>
<style>
.input-cost {
  width: 70px;
}
.center {
  text-align: center;
}
.column-right-club {
  margin-top: 25px;
}
.Cards {
  position: relative;
  width: 350px;
  height: 350px;
}
.productDescription {
  overflow-y: auto;
  margin: 1rem 0 2rem 0;
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
.campaing__img {
  text-align: center;
  max-height: 100%;
  width: 100%;
  object-fit: contain;
  cursor: pointer;
}
.ant-tabs-bar {
  margin-bottom: 0 !important;
}
.fl {
  display: flex;
  min-width: 100%;
  min-height: 100vh;
}
*::-webkit-scrollbar {
  opacity: 0;
}
</style>
