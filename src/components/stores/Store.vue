<template>
  <a-layout>
    <a-layout-content
      :style="{
        overflowY: 'scroll'
      }"
      class="card-container"
      style="height: 50rem; padding:3rem;background:white; padding-top: 10px;"
    >
      <!-- @change="onChange" -->
      <a-layout>
        <a-layout-header
          style="background: #fff; padding: 0; height:30%; margin-bottom:1rem;"
        >
          <a-steps
            v-if="
              stepStore === stepStoresCodes.createCampaing ||
                (stepStore === stepStoresCodes.addProducts &&
                  !isEditStoreTitleVisible)
            "
            :current="stepStore"
            size="small"
          >
            <a-step
              style="width:30rem; "
              title="Información de la Campaña"
              description="Indica los detalles de funcionamiento de tu tienda"
            />
            <a-step
              style="width:30%; margin-bottom:1rem; "
              :disabled="stepStore === stepStoresCodes.createCampaing"
              title="Configura la Tienda"
              description="Selecciona los productos que deseas agregar a la tienda."
            />
          </a-steps>
        </a-layout-header>
        <a-layout-content
          :style="{
            margin: '24px 16px',
            padding: '24px',
            height: '100%',
            minHeight: '30rem',
            marginTop: '1rem'
          }"
        >
          <a-skeleton :loading="loading" active>
            <a-row
              v-if="stepStore === null"
              type="flex"
              justify="space-around"
              :gutter="16"
            >
              <card-campaing
                v-for="campaing in campaings"
                :statusCodes="statusCodes"
                :stepStoresCodes="stepStoresCodes"
                :key="campaing.id"
                :campaing="campaing"
                :onEditCampaing="onEditCampaing"
                :changeStepStore="changeStepStore"
                :onAddProductsToCampaing="onAddProductsToCampaing"
                :replaceCampaing="replaceCampaing"
                :setBusinessUsed="setBusinessUsed"
                :restoreData="restoreData"
              />
              <a-result
                v-if="campaings.length === 0"
                title="Parece que no tienes campañas agregadas"
              >
              </a-result>
            </a-row>
            <AddCampaing
              :formm="form"
              :stepStore="stepStore"
              v-if="stepStore === 0"
              :dataForm="dataForm"
              :typeStore="typeStore"
              :statusCodes="statusCodes"
              :changeDataForm="changeDataForm"
              :initialState="initialState"
              :isEditing="isEditing"
              :businessUsed="businessUsed"
              :changeBlockState="changeBlockState"
              :selectCampaing="selectCampaing"
            />

            <!-- :loading="isLoagindProducts" -->
            <a-skeleton :loading="loading" v-if="stepStore === 1" active>
              <a-list
                :grid="{
                  gutter: 16,
                  xs: 1,
                  sm: 1,
                  md: 2,
                  lg: 2,
                  xl: 3,
                  xxl: 4
                }"
                :dataSource="proudcts"
                style="height: 100%;"
              >
                <a-list-item slot="renderItem" slot-scope="item">
                  <card-product
                    :isEditStoreTitleVisible="isEditStoreTitleVisible"
                    :item="item"
                    :selectProduct="selectProduct"
                  />
                </a-list-item>
              </a-list>
            </a-skeleton>
          </a-skeleton>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="display: flex; justify-content:flex-end;">
      <span style="margin-right:2rem; ">
        <a-button
          v-if="stepStore === 0"
          style="min-width:10rem;"
          @click="onBack"
          >ATRAS</a-button
        >
        <a-button
          v-if="stepStore === 1"
          style="min-width:10rem;"
          @click="onBack"
          >ATRAS</a-button
        >
        <!-- :loading="inviteUserLoading" -->
      </span>
      <span>
        <a-button
          @click="handleSubmit"
          v-if="stepStore === stepStoresCodes.createCampaing && !isEditing"
          type="primary"
          :loading="loading"
        >
          SIGUIENTE
        </a-button>
        <a-button
          :loading="loading"
          @click="handleEdit"
          v-if="isEditing && stepStore === 0"
          type="primary"
        >
          <!-- :loading="inviteUserLoading" -->
          EDITAR Y CONTINUAR
        </a-button>

        <a-button
          v-if="stepStore === 1"
          @click="handleSendProductsToCampaing"
          type="primary"
        >
          PUBLICAR EN TIENDA
        </a-button>
      </span>
    </a-layout-footer>
  </a-layout>
</template>

<script>
import CardCampaing from "./CardCampaing.vue";
import AddCampaing from "./AddCampaing.vue";
import moment from "moment";
import CardProduct from "./CardProduct.vue";
const statusCodes = {
  deleted: 1,
  paused: 2,
  active: 3,
  created: 4,
  finished: 5
};
const stepStoresCodes = {
  editStore: 5,
  createCampaing: 0,
  addProducts: 1
};
const initialState = {
  name: null,
  buymax: 20,
  convenio: null,
  startDate: "",
  finishDate: "",
  giftMax: 3,
  fecha: []
};
export default {
  components: {
    CardCampaing,
    AddCampaing,
    CardProduct
  },
  data() {
    return {
      statusCodes,
      initialState,
      stepStoresCodes,
      dataForm: { ...initialState },
      loading: true,
      campaings: [],
      campaingSelected: null,
      isEditing: false,
      productsSelected: [],
      businessUsed: [],
      isEditStoreTitleVisible: false
    };
  },
  props: {
    changeRestartSteps: Function,
    changeStepStore: Function,
    changeBlockState: Function,
    setProductsList: Function,
    proudcts: Array,
    typeStore: Number,
    stepStore: Number
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  beforeDestroy() {
    this.changeBlockState(false);
  },
  created() {
    this.getAllCampaings();
    this.productsSelected = [];
  },
  mounted() {},
  methods: {
    moment,
    async handleSubmit(e) {
      const {
        name,
        convenio,
        buymax,
        giftMax,
        startDate,
        finishDate,
        id
      } = this.dataForm;

      if (this.validateData()) {
        try {
          this.loading = true;
          const response = await this.$axios.post("store", {
            id,
            storeId: this.typeStore,
            bussinessId: convenio,
            name,
            startDate,
            finishDate,
            giftMax,
            buymax
          });
          this.loading = false;
          console.log({ response });
          if (response.data.status === 0) {
            this.$notification["success"]({
              message: "Campaña creada exitosamente",
              description: `Agregue productos a la campaña ${name}`
            });
            this.changeStepStore(1);
            this.changeBlockState(false);
            this.campaingSelected = response.data.campaing;
            console.log("?", response.data.campaing);
            this.campaings = [...this.campaings, response.data.campaing];
          } else if (response.data.status === 4) {
            this.$notification["error"]({
              message: "Ya existe una campaña similar",
              description: `Ya existe una campaña para este convenio.`
            });
          } else {
          }
        } catch (error) {
          this.loading = false;
          this.$notification["success"]({
            message: "Ah ocurrido un error ",
            description: `La campaña ${name} no ha podido ser creada, intente de nuevo o comuniquese con soporte.`
          });
        }
      }
    },
    async handleEdit() {
      try {
        const {
          name,
          convenio,
          buymax,
          giftMax,
          startDate,
          id,
          finishDate
        } = this.dataForm;
        let DTO = {
          id,
          storeId: this.typeStore,
          bussinessId: convenio,
          name,
          startedAt: startDate,
          finishedAt: finishDate,
          giftMax,
          buymax
        };
        this.loading = true;
        console.log({ DTO }, "UPDATE");
        const response = await this.$axios.put("campaingstore", DTO);
        this.loading = false;
        if (response.data.status === 0) {
          this.$notification["success"]({
            message: "Campaña actualizada correctamente",
            description: `La campaña ${name} ha sido actualizada.`
          });

          this.campaingSelected = response.data.campaing;
          this.replaceCampaing(response.data.campaing);
          this.changeStepStore(1);
          this.getListProducts();
          this.restoreData();
        }
      } catch (error) {
        this.isEditing = false;
        this.loading = false;
        this.$notification["success"]({
          message: "Ah ocurrido un error ",
          description: `La campaña  no ha podido ser creada, intente de nuevo o comuniquese con soporte. ${error.message}`
        });
      }
    },
    async handleSendProductsToCampaing() {
      if (this.productsSelected.length === 0) {
        this.$notification["error"]({
          message: "Debes seleccionar al menos un producto."
        });
      } else {
        console.log(this.productsSelected);
        try {
          if (this.campaingSelected) {
            const DTO = {
              id: this.campaingSelected.id,
              products: this.productsSelected
            };
            console.log({ DTO });
            const response = await this.$axios.post("campaingstore", DTO);

            if (response.data.status === 0) {
              this.$notification["success"]({
                message: "Productos agregados correctamente.",
                description: `Se han agregado los productos a la campaña "${this.campaingSelected.name}".`
              });
              console.log("NUEVOS DATOS", response.data.campaing);
              this.changeStepStore(null);
              this.getListProducts();
              this.isEditing = false;
              this.changeBlockState(false);
              this.replaceCampaing(response.data.campaing);
              this.productsSelected = [];
            }
            response.data.status === 2 &&
              this.$notification["success"]({
                message: "Los productos o la campaña ya no existen.",
                description: `No se han encontrado estos productos`
              });
          } else {
            this.changeStepStore(null);
            throw new Error("No hay una campaña seleccionada.");
          }
        } catch (error) {
          this.isEditing = false;
          this.loading = false;
          this.$notification["success"]({
            message: "Ah ocurrido un error ",
            description: `La no se han podido agregar los productos, intente de nuevo o comuniquese con soporte. ${error.message}`
          });
        }
      }
    },
    validateData() {
      let valid = true;
      const { name, convenio, startDate, finishDate } = this.dataForm;
      if (!name || !name.trim() || name.trim() === "") {
        this.$notification["error"]({
          message: "Ingresa un nombre para la campaña"
        });
        valid = false;
      }

      if (this.typeStore === 4) {
        //Convenio
        if (!convenio || convenio === null || convenio === "") {
          this.$notification["error"]({
            message: "Debe escoger un convenio"
          });
          valid = false;
        }
      } else if (this.typeStore === 1) {
        console.log(startDate, finishDate);
        if (
          !startDate ||
          startDate === null ||
          !finishDate ||
          finishDate === null
        ) {
          this.$notification["error"]({
            message: "Debe escoger un rango válido"
          });
          valid = false;
        }
      }
      return valid;
    },
    restoreData() {
      this.dataForm = { ...initialState };
      this.isEditing = false;
      this.productsSelected = [];
      this.isEditStoreTitleVisible = false;
      this.loading = false;
    },
    changeDataForm(newDataForm, isEdit) {
      this.dataForm = newDataForm;
      this.isEditing = isEdit;
      this.loading = false;
    },
    async getAllCampaings() {
      try {
        this.loading = true;

        const { data, status } = await this.$axios.get(
          `campaingstore/${this.typeStore}`
        );
        if (data.status === 0) {
          this.campaings = data.campaings;
        }

        this.loading = false;
        console.log("GETING ALL CAMPAING");
        console.log({ data });
      } catch (error) {
        alert("Error");
        this.loading = false;
      }
    },
    selectCampaing(campaing) {
      this.campaingSelected = campaing;
      console.log(this.campaingSelected);
    },
    selectProduct(product, status) {
      if (status) {
        this.productsSelected.push(product);
      } else {
        this.productsSelected = this.productsSelected.filter(
          item => item !== product
        );
      }
      console.log(this.productsSelected);
    },
    onEditCampaing(campaing) {
      if (true) {
        this.isEditing = true;
        this.campaingSelected = campaing;
        this.changeBlockState(true);
        this.changeStepStore(0);
        const {
          name,
          buymax,
          giftMax,
          startedAt,
          finishedAt,
          bussinessId,
          id
        } = campaing;
        this.dataForm = {
          id,
          name,
          buymax,
          convenio: bussinessId,
          startDate: moment(startedAt).format("YYYY/MM/DD"),
          finishDate: moment(finishedAt).format("YYYY/MM/DD"),
          fecha: [moment(startedAt), moment(finishedAt)],
          giftMax
        };
      } else {
      }
    },
    onAddProductsToCampaing(campaing) {
      this.campaingSelected = campaing;
      console.log(
        "this.campaingSelected.products",
        this.campaingSelected.products
      );
      this.setProductsList(this.campaingSelected.products);
      this.isEditStoreTitleVisible = true;
    },
    onBack() {
      this.dataForm = initialState;
      this.changeRestartSteps();
      this.isEditing = false;
      this.productsSelected = [];
    },
    replaceCampaing(campaing) {
      console.log({ campaing }, this.campaings);
      this.campaings = this.campaings.map(item => {
        if (item.id !== campaing.id) {
          return item;
        } else {
          return campaing;
        }
      });
    },
    setBusinessUsed(bussinessid) {
      const exist = this.businessUsed.find(id => id === bussinessid);
      console.log({ exist });
      if (!exist) {
        console.log("EXISTE");
        this.businessUsed.push(bussinessid);
        console.log(this.businessUsed);
      }
    },
    async getListProducts() {
      try {
        this.isLoagindProducts = true;
        const responseList = await this.$axios.get("product");
        this.proudcts = responseList.data.products;
        this.isLoagindProducts = false;
        this.isEditing = false;
        console.log({ responseList });
      } catch (err) {
        this.isLoagindProducts = false;
        this.$notification["error"]({
          message: "Error al cargar productos",
          description: "Ha ocurrido un error al cargar los productos."
        });
      }
    }
  }
};
</script>

<style></style>
