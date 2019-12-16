<template>
  <div>
    <a-row>
      <a-col :xs="{ span: 22 }">
        <div class="card-container" style="height: 50rem; margin-top: 54px;">
          <a-list
            :grid="{ gutter: 16, column: 4 }"
            :dataSource="proudcts"
            :style="{ overflow: 'scroll' }"
            style="height: 100%;"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a-tooltip
                placement="topLeft"
                title="Da click en la imágen para ver las los productos"
              >
                <a-card
                  hoverable
                  style="height: 25rem; width: 22rem;"
                  class="Cards"
                  :title="item.title"
                >
                  <p class="center">
                    <strong>{{ item.points }} puntos</strong>
                  </p>
                  <div style="height:90px;">
                    <img style="max-width:13rem; margin-left:50px;" alt="example" :src="item.image" />
                  </div>
                  <div style="height:115px">
                    <span style="font-weight: 700;">
                      <br />
                      <br />
                      <br />
                      <br />
                      {{ item.description }}
                    </span>
                  </div>
                  <template class="ant-card-actions" slot="actions">
                    <a-icon
                      type="edit"
                      @click="(editProductModal = true), gettingId(item.id), gettingData(item.title,item.description,item.points)"
                    />
                    <a-icon type="delete" @click="(deleteProductModal=true), gettingId(item.id)" />
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
      </a-col>
    </a-row>
    <a-modal
      title="ELIMINAR PRODUCTO"
      v-model="deleteProductModal"
      @ok="deletingModal"
      okText="si"
      cancelText="No"
    >
      <p>¿Estás seguro de querer eliminar este producto?</p>
    </a-modal>
    <a-modal title="EDITAR PRODUCTO" v-model="editProductModal" centered>
      <a-form :form="fileFormEdit">
        <a-form-item>
          <a-input
            setFieldsValue="title"
            :placeholder="this.newTitle"
            v-decorator="[
              'title',
              {
                rules: [{ required: true, message: 'Favor de llenar el campo' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item>
          <a-textarea
            setFieldsValue="description"
            :placeholder="this.newDescription"
            :rows="4"
            v-decorator="[
              'description',
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
                      required: false,
                      message: 'Favor de cargar un archivo JPG, PNG o JPGE'
                    }
                  ]
                }
              ]"
              name="upload"
              action="https://bioderma-api-inmersys.herokuapp.com/upload/2"
              accept=".png, .jpg, jpge"
              @change="handleChangeFileUpload"
              :beforeUpload="beforeUpload"
              :fileList="fileList"
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
            type="number"
            setFieldsValue="points"
            :placeholder="this.newPoints"
            class="input-cost"
            size="small"
            v-decorator="[
              'points',
              {
                rules: [{ required: true, message: 'Favor de llenar el campo' }]
              }
            ]"
          />Pts
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button
          type="primary"
          style="background-color:#009FD1; border-radius: 24px; width: 200px; margin-bottom: 20px;"
          @click="onSubmitEditProduct"
        >Aceptar</a-button>
      </template>
    </a-modal>
    <a-modal title="NUEVO PRODUCTO" v-model="addProductModal" centered>
      <a-form :form="fileForm">
        <a-form-item>
          <a-input
            setFieldsValue="title"
            placeholder="Ingresa el nombre del producto"
            v-decorator="[
              'title',
              {
                rules: [{ required: true, message: 'Favor de llenar el campo' }]
              }
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
                      required: false,
                      message: 'Favor de cargar un archivo JPG, PNG o JPGE'
                    }
                  ]
                }
              ]"
              name="upload"
              action="https://bioderma-api-inmersys.herokuapp.com/upload/2"
              accept=".png, .jpg, jpge"
              @change="handleChangeFileUpload"
              :beforeUpload="beforeUpload"
              :fileList="fileList"
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
            type="number"
            setFieldsValue="points"
            class="input-cost"
            size="small"
            v-decorator="[
              'points',
              {
                rules: [{ required: true, message: 'Favor de llenar el campo' }]
              }
            ]"
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
import { ok } from "assert";
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
      productId: "",
      newId: "",
      newTitle: "",
      newDescription: "",
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
      fileForm: this.$form.createForm(this),
      fileFormEdit: this.$form.createForm(this),
      addProductModal: false,
      editProductModal: false,
      deleteProductModal: false,
      fileList: []
    };
  },
  mounted() {
    this.getListProducts();
  },
  methods: {
    async getListProducts() {
      const responseList = await this.$axios.get("product");
      //console.log(responseList.data.products);
      this.proudcts = responseList.data.products;
    },
    deletingModal() {
      this.deleteProduct(this.newId);
      this.deleteProductModal = false;
    },
    gettingData(title, description, points) {
      this.newTitle = title;
      this.newDescription = description;
      this.newPoints = points;
    },
    gettingId(id) {
      this.newId = id;
    },
    async deleteProduct(id) {
      const responseDelete = await this.$axios.delete(`product/${id}`);
      if (responseDelete.data.status == 0) {
        this.successDeletingProduct();
      } else {
        this.failDeletingProduct();
      }
    },
    onSubmitEditProduct(id) {
      this.fileFormEdit.validateFields(async (err, values) => {
        if (!err) {
          console.log("Datos recibidos: ", values);
          try {
            const response = await this.$axios.put(
              "https://bioderma-api-inmersys.herokuapp.com/product",
              {
                productId: this.newId,
                title: values.title,
                image: values.upload.fileList[0].response,
                description: values.description,
                points: values.points
              }
            );
            console.log(response.data);
            if (response.data.status == 0) {
              this.success();
            } else {
              this.failEditingProduct();
            }
            this.editProductModal = false;
          } catch (error) {
            alert(error);
          }
        }
      });
      this.fileFormEdit.resetFields();
    },
    handleChange() {},
    confirmClose() {},
    cancelPictureForm() {
      alert("Cancelar");
    },
    success() {
      this.getListProducts();
    },
    failAddingProduct() {
      this.$notification["error"]({
        message: "ERROR AL AÑADIR UN PRODUCTO",
        description:
          "Se ha proudcido un error añdiendo un producto, favor de intentarlo más tarde."
      });
    },
    failEditingProduct() {
      this.$notification["error"]({
        message: "ERROR EDITANDO UN PRODUCTO",
        description:
          "Se ha proudcido un error editando un producto, favor de intentarlo más tarde."
      });
    },
    successDeletingProduct() {
      this.$notification["success"]({
        message: "ELIMINO UN PRODUCTO",
        description: "El producto se elimino correctamente."
      });
      this.getListProducts();
    },
    failDeletingProduct() {
      this.$notification["error"]({
        message: "ERROR ELIMINANDO UN PRODUCTO",
        description:
          "Se ha proudcido un error eliminando un producto, favor de intentarlo más tarde."
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
                image: values.upload.fileList[0].response,
                description: values.description,
                points: values.points
              }
            );
            if (response.data.status == 0) {
              this.success();
            } else {
              this.failAddingProduct();
            }
            this.addProductModal = false;
          } catch (error) {
            alert(error);
          }
        }
      });
      this.fileForm.resetFields();
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
</style>
