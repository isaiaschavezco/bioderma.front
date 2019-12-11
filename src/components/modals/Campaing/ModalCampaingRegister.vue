<template>
  <div>
    <a-form :form="fileForm">
      <a-form-item>
        <a-input
          placeholder="Ingresa un nombre para la campaña"
          v-decorator="[
								'name',
								{
									rules: [{ required: true, message: 'Favor de llenar el campo' }]
								}
							]"
        />
      </a-form-item>

      <a-form-item>
        <div class="dropbox">
          <a-upload-dragger
            v-decorator="[
									'upload',
									{
										rules: [
											{
												required: true,
												message: 'Favor de cargar una imagen'
											}
										]
									}
								]"
            name="upload"
            action="https://bioderma-api-inmersys.herokuapp.com/upload/3"
            accept=".png, .jpg, jpeg"
            @change="handleChangeFileUpload"
            :beforeUpload="beforeUpload"
            :fileList="fileList"
          >
            <p class="ant-upload-drag-icon">
              <a-icon type="picture" />
            </p>
            <p class="ant-upload-text">Selecciona o suelta una imagen para la campaña</p>
            <p class="ant-upload-hint">Únicamente archivos .png, .jpg o .jpeg</p>
          </a-upload-dragger>
        </div>
      </a-form-item>
    </a-form>
    <a-divider :style="{ margin: '10px 0px', border: '1px solid rgba(0,0,0,0.1)' }" />

    <CampaingFilter @filterAdded="addFilter" />

    <a-row>
      <a-col span="24" class="text-center">
        <a-button
          type="primary"
          style="background-color:#009FD1; border-radius: 24px; width: 200px; margin-bottom: 20px;"
          @click="onSubmitFileForm"
        >SUBIR</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import CampaingFilter from "../../forms/filters/CampaingFilter.vue";

export default {
  name: "ModalCampaingRegister",
  components: {
    CampaingFilter
  },
  props: {
    biodermaGames: Boolean
  },
  data() {
    return {
      filters: [],
      fileList: [],
      loadingFileForm: false,
      isBiodermaGame: this.biodermaGames,
      fileForm: this.$form.createForm(this)
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    showNotification(type, title, message) {
      this.$notification[type]({
        message: title,
        description: message
      });
    },
    addFilter(filter) {
      this.filters.push(filter.id);
    },
    handleChangeFileUpload(info) {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      this.fileList = fileList;
    },
    beforeUpload(file) {
      let status = true;
      this.fileForm.validateFields((err, values) => {
        if (err) {
          if (err.menu || err.submenu || err.title) {
            status = false;
          }
        }
      });
      return status;
    },
    onSubmitFileForm() {
      this.fileForm.validateFields(async (err, values) => {
        if (!err) {
          if (this.filters.length > 0) {
            const urlRegisterCampaing =
              "https://bioderma-api-inmersys.herokuapp.com/campaing";

            try {
              console.log(values);

              const campaingData = {
                name: values.name,
                portrait: values.upload.fileList[0].response,
                isBiodermaGame: this.biodermaGames,
                targets: [...this.filters]
              };

              console.log("%cRegister new campaing:", "color:green;");
              console.log(campaingData);

              const response = await this.$axios.post(
                urlRegisterCampaing,
                campaingData
              );

              // Clear array of filter ids.
              this.filters.splice(0, this.filters.length);
              this.loadFileModal = false;
              this.fileForm.resetFields();
              this.fileList = [];

              this.closeModal();

              if (response.data.status === 0) {
                this.$emit("campaingAdded");
                this.showNotification(
                  "success",
                  "Archivo cargado",
                  "Se ha cargado el archivo correctamente."
                );
              } else {
                this.showNotification(
                  "warning",
                  "Archivo existente",
                  "La sección ya cuenta con un archivo, si desea registrar uno nuevo elimine el archivo actual."
                );
              }
            } catch (err) {
              this.showNotification(
                "error",
                "Error al realizar el registro",
                "Ha ocurrido un error al registrar esta sección."
              );
            }
          } else {
            this.showNotification(
              "warning",
              "Filtros insuficientes",
              "La campaña debe tener al menos un filtro."
            );
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>