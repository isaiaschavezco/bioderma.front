<template>
  <a-modal :title="title" centered v-model="active">
    <p>
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item>
          <a-input
            :placeholder="placehold"
            v-decorator="[
              'clinic',
              {
                rules: [{ required: true, message: 'Favor de llenar el campo' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="Indica el porcentaje de descuento">
          <a-input-number
            :default-value="100"
            :min="0"
            :max="100"
            :formatter="value => `${value}%`"
            :parser="value => value.replace('%', '')"
          />
        </a-form-item>
      </a-form>
    </p>
    <template slot="footer">
      <a-button
        class="btn-center"
        @click="onOK"
        type="primary"
        style="background-color:#009FD1; border-radius: 24px; width: 200px; margin-bottom: 20px;"
        >REGISTRAR CLINICA</a-button
      >
    </template>
  </a-modal>
</template>

<script>
export default {
  props: {
    title: String,
    active: Boolean,
    form: Object,
    placehold: String,
    onOk: Function,
    isConvenio: Boolean
  }
};
</script>

<style></style>
