<template>
  <div class="fl">
    <a-menu
      style="background: #526987; "
      theme="dark"
      mode="inline"
      :selectedKeys="defaultKey"
    >
      <!-- @click="onMenuSelect" -->
      <a-menu-item class="item" key="0">
        <img
          src="../assets/icons/Club_Bioderma_Inactivo.png"
          class="icon"
          alt
        />
        <span v-if="!collapsed">TIENDA</span>
      </a-menu-item>
      <a-menu-item class="item" key="1">
        <img src="../assets/icons/Trivia_Inactivo.png" class="icon" alt />
        <span v-if="!collapsed">CAMPAÑAS</span>
      </a-menu-item>
    </a-menu>

    <a-col :xs="{ span: 20 }">
      <a-tabs default-active-key="1" tab-position="top">
        <a-tab-pane key="1" tab="NAOS">
          <a-layout>
            <a-layout-header
              style="background:white; display:flex; justify-content:flex-end; align-items:center;"
            >
              <a-form-item
                label="Note"
                style="display:flex; justify-items:center;"
              >
                <a-switch default-checked />
              </a-form-item>
              <!-- @change="onChange" -->
            </a-layout-header>

            <a-layout-content
              class="card-container"
              style="height: 50rem; margin-top: 10px;"
            >
              <a-skeleton :loading="isLoagindProducts" active>
                <a-list
                  :grid="{ gutter: 16, column: 4 }"
                  :dataSource="proudcts"
                  :style="{ overflow: 'scroll' }"
                  style="height: 100%;"
                >
                  <a-list-item slot="renderItem" slot-scope="item">
                    <a-card style="min-height: 30rem;">
                      <div class="campaing__header">
                        <a-row :gutter="12">
                          <a-col :lg="{ span: '24' }" :xl="{ span: '15' }">
                            <h2>
                              {{
                                item.title.length > 19
                                  ? item.title.substring(0, 18) + "..."
                                  : item.title
                              }}
                            </h2>
                          </a-col>
                          <a-col :lg="{ span: '24' }" :xl="{ span: '9' }">
                            <a-row
                              class="camapaing__actions"
                              type="flex"
                              justify="space-between"
                            >
                              <a-col span="8">
                                <a-icon
                                  class="campaing__action"
                                  type="edit"
                                  @click="
                                    gettingId(item.id),
                                      gettingData(
                                        item.title,
                                        item.description,
                                        item.points,
                                        item.image
                                      )
                                  "
                                />
                              </a-col>

                              <a-col span="8">
                                <a-icon
                                  class="campaing__action"
                                  type="delete"
                                  @click="
                                    (deleteProductModal = true),
                                      gettingId(item.id)
                                  "
                                />
                              </a-col>
                            </a-row>
                          </a-col>
                        </a-row>
                      </div>
                      <a-divider />
                      <p class="center">
                        <strong>{{ item.points }} puntos</strong>
                      </p>
                      <div style="height:9rem; text-align:center;">
                        <img
                          class="campaing__img"
                          alt="example"
                          :src="item.image"
                        />
                      </div>
                      <div style="height: 5rem;" class="productDescription">
                        <span style="font-weight: 700;">{{
                          item.description
                        }}</span>
                      </div>
                      <!-- <template class="ant-card-actions" slot="actions">
                  <a-icon
                    type="edit"
                    @click="gettingId(item.id), gettingData(item.title,item.description,item.points,item.image)"
                  />
                  <a-icon type="delete" @click="(deleteProductModal=true), gettingId(item.id)" />
                  </template>-->
                    </a-card>
                  </a-list-item>
                </a-list>
              </a-skeleton>
            </a-layout-content>
          </a-layout>
        </a-tab-pane>
        <a-tab-pane
          key="2"
          tab="FARMACIAS"
          style="height: 50rem; margin-top: 10px;"
        >
          <div class="card-container" style="height: 50rem; margin-top: 10px;">
            <a-skeleton :loading="isLoagindProducts" active>
              <a-list
                :grid="{ gutter: 16, column: 4 }"
                :dataSource="proudcts"
                :style="{ overflow: 'scroll' }"
                style="height: 100%;"
              >
                <a-list-item slot="renderItem" slot-scope="item">
                  <a-card style="min-height: 30rem;">
                    <div class="campaing__header">
                      <a-row :gutter="12">
                        <a-col :lg="{ span: '24' }" :xl="{ span: '15' }">
                          <h2>
                            {{
                              item.title.length > 19
                                ? item.title.substring(0, 18) + "..."
                                : item.title
                            }}
                          </h2>
                        </a-col>
                        <a-col :lg="{ span: '24' }" :xl="{ span: '9' }">
                          <a-row
                            class="camapaing__actions"
                            type="flex"
                            justify="space-between"
                          >
                            <a-col span="8">
                              <a-icon
                                class="campaing__action"
                                type="edit"
                                @click="
                                  gettingId(item.id),
                                    gettingData(
                                      item.title,
                                      item.description,
                                      item.points,
                                      item.image
                                    )
                                "
                              />
                            </a-col>

                            <a-col span="8">
                              <a-icon
                                class="campaing__action"
                                type="delete"
                                @click="
                                  (deleteProductModal = true),
                                    gettingId(item.id)
                                "
                              />
                            </a-col>
                          </a-row>
                        </a-col>
                      </a-row>
                    </div>
                    <a-divider />
                    <p class="center">
                      <strong>{{ item.points }} puntos</strong>
                    </p>
                    <div style="height:9rem; text-align:center;">
                      <img
                        class="campaing__img"
                        alt="example"
                        :src="item.image"
                      />
                    </div>
                    <div style="height: 5rem;" class="productDescription">
                      <span style="font-weight: 700;">{{
                        item.description
                      }}</span>
                    </div>
                    <!-- <template class="ant-card-actions" slot="actions">
                  <a-icon
                    type="edit"
                    @click="gettingId(item.id), gettingData(item.title,item.description,item.points,item.image)"
                  />
                  <a-icon type="delete" @click="(deleteProductModal=true), gettingId(item.id)" />
                  </template>-->
                  </a-card>
                </a-list-item>
              </a-list>
            </a-skeleton>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="CONVENIOS">
          <div class="card-container" style="height: 50rem; margin-top: 10px;">
            <a-skeleton :loading="isLoagindProducts" active>
              <a-list
                :grid="{ gutter: 16, column: 4 }"
                :dataSource="proudcts"
                :style="{ overflow: 'scroll' }"
                style="height: 100%;"
              >
                <a-list-item slot="renderItem" slot-scope="item">
                  <a-card style="min-height: 30rem;">
                    <div class="campaing__header">
                      <a-row :gutter="12">
                        <a-col :lg="{ span: '24' }" :xl="{ span: '15' }">
                          <h2>
                            {{
                              item.title.length > 19
                                ? item.title.substring(0, 18) + "..."
                                : item.title
                            }}
                          </h2>
                        </a-col>
                        <a-col :lg="{ span: '24' }" :xl="{ span: '9' }">
                          <a-row
                            class="camapaing__actions"
                            type="flex"
                            justify="space-between"
                          >
                            <a-col span="8">
                              <a-icon
                                class="campaing__action"
                                type="edit"
                                @click="
                                  gettingId(item.id),
                                    gettingData(
                                      item.title,
                                      item.description,
                                      item.points,
                                      item.image
                                    )
                                "
                              />
                            </a-col>

                            <a-col span="8">
                              <a-icon
                                class="campaing__action"
                                type="delete"
                                @click="
                                  (deleteProductModal = true),
                                    gettingId(item.id)
                                "
                              />
                            </a-col>
                          </a-row>
                        </a-col>
                      </a-row>
                    </div>
                    <a-divider />
                    <p class="center">
                      <strong>{{ item.points }} puntos</strong>
                    </p>
                    <div style="height:9rem; text-align:center;">
                      <img
                        class="campaing__img"
                        alt="example"
                        :src="item.image"
                      />
                    </div>
                    <div style="height: 5rem;" class="productDescription">
                      <span style="font-weight: 700;">{{
                        item.description
                      }}</span>
                    </div>
                  </a-card>
                </a-list-item>
              </a-list>
            </a-skeleton>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-col>
    <a-col
      class="column-right-club"
      :xs="{ span: 2 }"
      style="text-align:center; margin-top: 78px"
    >
      <a-row>
        <a-col>
          <a-button
            shape="circle"
            icon="plus"
            size="large"
            @click="onOpenNewProductModal"
          />
        </a-col>
        <a-col class="title-span-tag">AÑADIR PRODUCTO</a-col>
      </a-row>
      <br />
    </a-col>
    <a-modal
      title="ELIMINAR PRODUCTO"
      v-model="deleteProductModal"
      @ok="deletingModal"
      okText="ELIMINAR"
      cancelText="CANCELAR"
      okType="danger"
    >
      <p>¿Estás seguro de querer eliminar este producto?</p>
    </a-modal>
    <a-modal
      title="EDITAR PRODUCTO"
      v-model="editProductModal"
      :maskClosable="false"
      centered
    >
      <a-form :form="fileFormEdit">
        <a-form-item>
          <a-input
            setFieldsValue="title"
            v-decorator="[
              'title',
              {
                initialValue: this.newTitle,
                rules: [{ required: true, message: 'Favor de llenar el campo' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item>
          <a-textarea
            setFieldsValue="description"
            :rows="4"
            v-decorator="[
              'description',
              {
                initialValue: this.newDescription,
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
              listType="picture"
              @change="handleChangeFileUpload"
              :beforeUpload="beforeUpload"
              :fileList="fileList"
            >
              <p class="ant-upload-drag-icon">
                <img
                  style="max-width:13rem; max-height:8rem;"
                  alt="example"
                  :src="this.newImage"
                />
              </p>
              <p class="ant-upload-text">
                Selecciona o suelta una imagen para tu producto
              </p>
              <p class="ant-upload-hint">
                Unicamente archivos .png, .jpg o .jpge
              </p>
            </a-upload-dragger>
          </div>
        </a-form-item>
        <a-form-item class="center">
          Costo
          <a-input-number
            type="number"
            :min="1"
            setFieldsValue="points"
            class="input-cost"
            size="small"
            v-decorator="[
              'points',
              {
                initialValue: this.newPoints,
                rules: [{ required: true, message: 'Favor de llenar el campo' }]
              }
            ]"
          />&nbsp;Pts
        </a-form-item>
      </a-form>
      <template slot="footer">
        <div style="text-align:center;">
          <a-button
            type="primary"
            style="background-color:#009FD1; border-radius: 24px; width: 200px; margin-bottom: 20px;"
            @click="onSubmitEditProduct"
            >EDITAR</a-button
          >
        </div>
      </template>
    </a-modal>
    <a-modal
      title="NUEVO PRODUCTO"
      v-model="addProductModal"
      :maskClosable="false"
      centered
    >
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
                      required: true,
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
              listType="picture"
            >
              <p class="ant-upload-drag-icon">
                <a-icon type="picture" />
              </p>
              <p class="ant-upload-text">
                Selecciona o suelta una imagen para tu producto
              </p>
              <p class="ant-upload-hint">
                Unicamente archivos .png, .jpg o .jpge
              </p>
            </a-upload-dragger>
          </div>
        </a-form-item>
        <a-form-item class="center">
          Costo
          <a-input-number
            type="number"
            :min="1"
            setFieldsValue="points"
            placeholder="Pts"
            class="input-cost"
            size="small"
            v-decorator="[
              'points',
              {
                rules: [{ required: true, message: 'Favor de llenar el campo' }]
              }
            ]"
          />&nbsp;Pts
        </a-form-item>
      </a-form>
      <template slot="footer">
        <div style="text-align: center;">
          <a-button
            type="primary"
            style="background-color:#009FD1; border-radius: 24px; width: 200px; margin-bottom: 20px;"
            @click="onSubmitPictureForm"
            >PUBLICAR</a-button
          >
        </div>
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
      newImage: "",
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
      fileList: [],
      uploadFileStatus: true,
      isLoagindProducts: false
    };
  },
  mounted() {
    this.getListProducts();
  },
  methods: {
    async getListProducts() {
      try {
        this.isLoagindProducts = true;
        const responseList = await this.$axios.get("product");
        //console.log(responseList.data.products);
        this.proudcts = responseList.data.products;
        this.isLoagindProducts = false;
      } catch (err) {
        this.isLoagindProducts = false;
        this.$notification["error"]({
          message: "Error al cargar productos",
          description: "Ha ocurrido un error al cargar los productos."
        });
      }
    },
    onOpenNewProductModal() {
      this.fileForm.resetFields();
      this.fileList = [];
      this.addProductModal = true;
    },
    deletingModal() {
      this.deleteProduct(this.newId);
      this.deleteProductModal = false;
    },
    gettingData(title, description, points, image) {
      this.fileList = [];
      this.newTitle = title;
      this.newDescription = description;
      this.newPoints = points;
      this.newImage = image;
      this.fileFormEdit.resetFields();
      this.editProductModal = true;
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
          // console.log("Datos recibidos: ", image);
          try {
            // console.log("VALUES: ", values);
            const response = await this.$axios.put("product", {
              productId: this.newId,
              title: values.title,
              image:
                typeof this.fileList === "undefined" ||
                this.fileList.length == 0
                  ? this.newImage
                  : values.upload.fileList[0].response,
              description: values.description,
              points: values.points
            });
            if (response.data.status == 0) {
              this.fileFormEdit.resetFields();
              this.fileList = [];
              this.getListProducts();
            } else {
              this.failEditingProduct();
            }
            this.editProductModal = false;
          } catch (error) {
            this.$notification["error"]({
              message: "Ha ocurrido un error",
              description: "Ha ocurdido un error durante esta acción."
            });
          }
        }
      });
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
        message: "Error al añadir un producto",
        description:
          "Se ha producido un error al añadir un producto, favor de intentarlo más tarde."
      });
    },
    failEditingProduct() {
      this.$notification["error"]({
        message: "Error al editar el producto",
        description:
          "Se ha producido un error al editar este producto, favor de intentarlo más tarde."
      });
    },
    successDeletingProduct() {
      this.$notification["success"]({
        message: "Producto eliminado",
        description: "El producto se elimino correctamente."
      });
      this.getListProducts();
    },
    failDeletingProduct() {
      this.$notification["error"]({
        message: "Error al eliminar el producto",
        description:
          "Se ha producido un error al eliminar este producto, favor de intentarlo más tarde."
      });
    },
    onSubmitPictureForm() {
      //alert("Subir");
      this.fileForm.validateFields(async (err, values) => {
        if (!err) {
          // console.log("Datos recibidos: ", values);
          try {
            const response = await this.$axios.post("product", {
              title: values.title,
              image: values.upload.fileList[0].response,
              description: values.description,
              points: values.points
            });
            if (response.data.status == 0) {
              this.success();
              this.fileForm.resetFields();
              this.fileList = [];
            } else {
              this.failAddingProduct();
            }
            this.addProductModal = false;
          } catch (error) {
            this.$notification["error"]({
              message: "Ha ocurrido un error",
              description: "Ha ocurdido un error para esta acción."
            });
          }
        }
      });
    },
    handleChangeFileUpload(info) {
      if (this.uploadFileStatus) {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1);
        this.fileList = fileList;
      }
    },
    beforeUpload(file) {
      let status = true;
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";

      if (!isJPG && !isPNG) {
        this.$message.error("Este formato no esta permido.");
        status = false;
      }

      if (isJPG || isPNG) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error("La imagen debe ser menor a 2MB.");
          status = false;
        }
      }

      // console.log("STATUS: ", status);
      this.uploadFileStatus = status;
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

.side_inner {
  max-height: 100%;
  height: 100%;
  flex: 1;
  background: #526987;
  /* padding-right: 12px;
  padding-left: 8px; */
}
.fl {
  display: flex;
}
</style>
