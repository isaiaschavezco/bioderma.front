<template>
  <div>
    <a-row>
      <a-col :xs="{ span: 22 }">
        <div class="card-container" style="height: 50rem; margin-top: 54px;">
          <a-list
            :grid="{ gutter: 16, column: 3 }"
            :dataSource="proudcts"
            :style="{ overflow: 'scroll'}"
            style="height: 100%;"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a-tooltip
                placement="topLeft"
                title="Da click en la imágen para ver las los productos"
              >
                <a-card :title="item.title">
                  <p class="center">{{item.points}}</p>
                  <img alt="example" :src="item.image" slot="cover" />
                  <span style="font-weight: 700;">{{item.description}}</span>
                  <br />
                  <span>{{item.description}}</span>
                  <template class="ant-card-actions" slot="actions">
                    <a-icon type="edit" />
                    <a-icon type="delete" @click="deleteConfirm" />
                  </template>
                </a-card>
              </a-tooltip>
            </a-list-item>
          </a-list>
        </div>
      </a-col>
      <a-col
        class="column-right-club"
        :xs="{ span: 2 }"
        style="text-align:center; margin-top: 78px"
      >
        <a-row>
          <a-col>
            <a-button shape="circle" icon="plus" size="large" @click="addProductModal = true" />
          </a-col>
          <a-col class="title-span-tag">AÑADIR PRODUCTO</a-col>
        </a-row>
        <br />
        <a-row>
          <a-switch defaultChecked @click="showConfirm">
            <a-icon type="check" slot="checkedChildren" />
            <a-icon type="close" slot="unCheckedChildren" />
          </a-switch>
          <a-row class="title-span-tag">Activar/Desactivar Tienda</a-row>
        </a-row>
      </a-col>
    </a-row>
    <a-modal v-modal="confirmClose"></a-modal>
    <a-modal title="NUEVO PRODUCTO" v-model="addProductModal" centered>
      <a-form :form="fileForm">
        <a-form-item>
          <a-input
            setFieldsValue="title"
            placeholder="Ingresa el nombre del producto"
            v-decorator="[
          'title',
          {rules: [{ required: true, message: 'Favor de llenar el campo'}]}
          ]"
          />
        </a-form-item>
        <a-form-item>
          <a-textarea
            setFieldsValue="description"
            placeholder="Ingresa la descripcion del producto"
            :rows="4"
            v-decorator="[
          'description',
          {rules: [{required: true, message: 'Favor de llenar el campo'}]}
          ]"
          />
        </a-form-item>
        <a-form-item>
          <div class="dropbox">
            <a-upload-dragger
              v-decorator="[
              'image',
              {rules:[{ required: false, message: 'Favor de cargar un archivo JPG, PNG o JPGE' }]}]"
              name="upload"
              action="http://localhost:3000/upload/1"
              accept=".png, .jpg, jpge"
              @change="handleChange"
            >
              <p class="ant-upload-drag-icon">
                <a-icon type="picture" />
              </p>
              <p class="ant-upload-text">Selecciona o suelta una imagen para tu producto</p>
              <p class="ant-upload-hint">Unicamente archivos .png, .jpg o .jpge</p>
            </a-upload-dragger>
          </div>
        </a-form-item>
        <a-form-item class="center">
          Costo
          <a-input
            setFieldsValue="points"
            class="input-cost"
            size="small"
            v-decorator="[
          'points',
          {rules: [{ required:true, message: 'Favor de llenar el campo' }]}]"
          />Pts
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button
          type="primary"
          style="background-color:#009FD1; border-radius: 24px; width: 200px; margin-bottom: 20px;"
          @click="onSubmitPictureForm"
        >Publicar</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
export default {
  components: {
    //  FormFilter
  },
  data() {
    return {
      title: "",
      image:
        "http://dev.fuxcorp.net/memo/Bioderma/Imgs/nuestrapiel_con_marcaDagua.jpg",
      description: "",
      points: "",
      proudcts: [
        {
          id: 0,
          title: "",
          image: "",
          description: "",
          points: 100,
          isActive: true
        }
      ],
      fileForm: this.$form.createForm(this),
      addProductModal: false
    };
  },
  mounted() {
    this.getListProducts();
  },
  methods: {
    async getListProducts() {
      const responseList = await this.$axios("product");
      //console.log(responseList.data.products);
      this.proudcts = responseList.data.products;
    },
    handleChange() {},
    confirmClose() {},
    cancelPictureForm() {
      alert("Cancelar");
    },
    successAddingProduct() {
      this.$success({
        content: (
          <p style="text-align:center">
            SE HA AÑADIDO EL PRODUCTO CORRECTAMENTE
          </p>
        )
      });
    },
    failAddingProduct() {
      this.$success({
        content: (
          <p style="text-align:center">
            SE HA PRODUCIDO UN ERROR AÑADIENDO EL PRODUCTO, INTENTALO MÁS TARDE
          </p>
        )
      });
    },
    onSubmitPictureForm() {
      //alert("Subir");
      this.fileForm.validateFields(async (err, values) => {
        if (!err) {
          console.log("Datos recibidos: ", values);
          try {
            const response = await this.$axios.post(
              "https://bioderma-api-inmersys.herokuapp.com/product",
              {
                title: values.title,
                image: this.image,
                description: values.description,
                points: values.points
              }
            );
            if (response.data.status == 0) {
              this.successAddingProduct();
            } else {
              this.failAddingProduct();
            }
          } catch (error) {
            alert(error);
          }
        }
      });
    },
    deleteConfirm() {
      this.$confirm({
        title: "¿ESTAS SEGURO DE ELIMINAR ESTE PRODUCTO?",
        content: "",
        async onOK() {},
        onCancel() {}
      });
    },
    showConfirm() {
      this.$confirm({
        title: "¿ESTAS SEGURO QUE DESEAS DESACTIVAR LA TIENDA?",
        content: "",
        onOk() {
          return new Promise((resolve, reject) => {
            alert("Tienda desactivada");
            setTimeout(Math.random() > 0.5 ? resolve : reject, 0.5);
          }).catch(() => console.log("Oops errors!"));
        },
        onCancel() {}
      });
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
</style>