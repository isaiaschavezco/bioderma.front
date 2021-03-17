<template>
  <a-row type="flex" justify="space-around">
    <a-col :span="5">
      <a-space direction="vertical">
        <h4>Nombre de la campaña</h4>
        <p>Ingresa el nombre de la campaña que deseas crear</p>
        <a-form-item>
          <a-input
            setFieldsValue="name"
            v-decorator="[
              'name',
              {
                rules: [
                  {
                    required: true,
                    message: 'Ingrese el nombre de la campaña',
                    whitespace: true
                  }
                ]
              }
            ]"
            v-model="dataForm.name"
          >
          </a-input>
        </a-form-item>
      </a-space>
    </a-col>
    <a-col :span="6">
      <a-space direction="vertical">
        <h4>Vigencia</h4>
        <p>
          Selecciona el periodo de tiempo dentro del calendario.
        </p>
        <div style="display:flex;">
          <a-form-item>
            <a-range-picker
              :format="dateFormat"
              @change="onChangeDateForm"
              v-model="dataForm.fecha"
            />
          </a-form-item>
        </div>
      </a-space>
    </a-col>
    <a-col :span="4">
      <a-space direction="vertical">
        <h4>Compras permitidas</h4>
        <p>
          Indica el número de productos que los usuarios podrán comprar.
        </p>
        <a-form-item>
          <a-slider
            setFieldsValue="name"
            :max="100"
            :disabled="false"
            v-model="dataForm.buymax"
          />
        </a-form-item>
      </a-space>
    </a-col>
    <a-col :span="4" v-if="typeStore === 1">
      <a-space direction="vertical">
        <h4>Productos de regalo</h4>
        <p>
          Indíca el número de productos que regalarán a los usuarios.
        </p>
        <a-slider
          :max="15"
          id="test"
          :default-value="20"
          :disabled="false"
          v-model="dataForm.giftMax"
        />
      </a-space>
    </a-col>

    <a-col :span="4" v-if="typeStore === 4">
      <a-space direction="vertical">
        <h4>Selecciona una empresa</h4>
        <p>
          Selecciona el nombre de una empresa dentro del listado.
        </p>
        <!-- @change="handleChange" -->

        <a-select
          v-model="dataForm.convenio"
          placeholder="Empresa"
          style="width:100%"
        >
          <!-- @change="handleSelectChange" -->
          <a-select-option
            :value="position.id"
            v-for="position in convenios"
            :disabled="businessUsed.includes()"
            :key="position.id"
            >{{ position.name }}</a-select-option
          >
        </a-select>
      </a-space>
    </a-col>
  </a-row>
</template>

<script>
import moment from "moment";

export default {
  props: {
    changeStepStore: Function,
    changeDataForm: Function,
    changeBlockState: Function,
    selectCampaing: Function,
    stepStore: Number,
    formm: Object,
    dataForm: Object,
    typeStore: Number,
    statusCodes: Object,
    initialState: Object,
    isEditing: Boolean,
    businessUsed: Array
  },
  beforeCreate() {},
  data() {
    return {
      convenios: [],

      dateFormat: "YYYY/MM/DD"
    };
  },
  created() {},
  mounted() {
    if (!this.isEditing) {
      this.getIncompleteCampaing();
    }
    this.getConvenios();
  },
  methods: {
    moment,

    async getConvenios() {
      const responseConvenios = await this.$axios("convenio");
      const { data } = await this.$axios.post("campaingstore/conveniosused");
      console.log({ responseConvenios });

      const usedConvenios = data.convenios;
      let unusedConvenios = responseConvenios.data.convenios.filter(
        item => !usedConvenios.includes(item.id)
      );
      console.log(this.isEditing, this.dataForm.convenio);
      if (this.isEditing && this.dataForm.convenio) {
        let convenioEdit = responseConvenios.data.convenios.find(
          item => item.id === this.dataForm.convenio
        );
        unusedConvenios.push(convenioEdit);
      }
      console.log({ unusedConvenios });
      this.convenios = unusedConvenios;
    },
    onChangeDateForm(dates, dateStrings) {
      this.dataForm.startDate = dateStrings[0];
      this.dataForm.finishDate = dateStrings[1];
    },
    async getIncompleteCampaing() {
      try {
        const { data } = await this.$axios.get(
          `campaingstore/incomplete/${this.typeStore}`
        );
        if (data.status === 0) {
          const {
            startedAt,
            finishedAt,
            name,
            giftMax,
            buymax,
            targetstore,
            id
          } = data.campaing;
          const dataForm = {
            id,
            name,
            buymax,
            convenio: targetstore.bussinessId,
            startDate: moment(startedAt).format("YYYY/MM/DD"),
            finishDate: moment(finishedAt).format("YYYY/MM/DD"),
            fecha: [moment(startedAt), moment(finishedAt)],
            giftMax
          };
          this.changeDataForm(dataForm, true);
          console.log("data.campaing", data.campaing);
          this.selectCampaing(data.campaing);
        }
        if (data.status === 3) {
          this.changeDataForm(this.initialState, false);
        }
        console.log("INCOMPLETE", { data }, data.status);
      } catch (error) {
        console.log(error);
        this.$notification["error"]({
          message: "Ah ocurrido un error ",
          description: `${error.message}`
        });
      }
    },
    handleSubmit() {}
  }
};
</script>

<style></style>
