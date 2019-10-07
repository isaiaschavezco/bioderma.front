<template>
  <div>
    <a-row>
      <a-col :span="12" style="text-align:center; font-weight: 700; color: black;">AGREGAR FILTRO</a-col>
      <a-col :span="12" style="text-align:center; font-weight: 700; color: black;">FILTROS AGREGADOS</a-col>
    </a-row>
    <a-row>
      <a-col :span="12" style="text-align:center; font-weight: 700; color: black;">
        <a-form :form="inviteUserForm">
          <a-form-item>
            <a-radio
              :value="1"
              v-decorator="[
          'type',
          {rules: [{ required: true, message: 'Favor de seleccionar un tipo de usuario' }]}
        ]"
            >NAOS</a-radio>
          </a-form-item>
          <a-form-item>
            <a-radio-group
              v-decorator="[
          'type',
          {rules: [{ required: true, message: 'Favor de seleccionar un tipo de usuario' }]}
        ]"
            >
              <a-radio :value="1">NAOS</a-radio>
              <a-radio :value="2">Farmacia</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="12" style="text-align:center; font-weight: 700; color: black;">-</a-col>
    </a-row>
  </div>
</template>
<script>
export default {};
</script>
<style>
</style>