<template>
  <div>
    <a-row>
      <a-col :xs="{ span: 22 }">
        <div class="card-container" style="height: 50rem; margin-top: 54px;">
          <a-list
            :grid="{ gutter: 16, column: 3 }"
            :dataSource="data"
            :style="{ overflow: 'scroll'}"
            style="height: 100%;"
          >
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-tooltip
                placement="topLeft"
                title="Da click en la imágen para ver las los productos"
              >
                <a-card :title="item.name">
                  <p class="center">{{item.points}}</p>
                  <img alt="example" :src="item.portrait" slot="cover" />
                  <span style="font-weight: 700;">DESCRIPCION</span>
                  <br />
                  <span>{{item.description}}</span>
                  <template class="ant-card-actions" slot="actions">
                    <a-icon type="edit" />
                    <a-icon type="delete" />
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
          <a-col>AÑADIR PRODUCTO</a-col>
        </a-row>
        <br />
        <a-row>
          <a-switch defaultChecked @click="showConfirm">
            <a-icon type="check" slot="checkedChildren" />
            <a-icon type="close" slot="unCheckedChildren" />
          </a-switch>
          <a-row>Activar/Desactivar Tienda</a-row>
        </a-row>
      </a-col>
    </a-row>
    <a-modal v-model="confirmClose"></a-modal>
    <a-modal title="NUEVO PRODUCTO" v-model="addProductModal" centered>
      <a-form :form="fileForm">
        <a-form-item>
          <a-input
            placeholder="Ingresa el nombre del producto"
            v-decorator="[
          'name',
          {rules: [{ required: true, message: 'Favor de llenar el campo'}]}
          ]"
          />
        </a-form-item>
        <a-form-item>
          <a-textarea
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
              'upload',
              {rules:[{ required: true, message: 'Favor de cargar un archivo JPG, PNG o JPGE' }]}]"
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
            class="input-cost"
            size="small"
            v-decorator="[
          'points',
          {rules: [{ required:true, message: 'Favor de llenar el campo' }]}]"
          />Pts
        </a-form-item>
      </a-form>
      <template slot="footer">
        <!--  <a-button
          type="primary"
          style="background-color:#001529; border: 1px solid #001529;"
          @click="cancelPictureForm"
        >Cancelar</a-button>-->
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
      data: [
        {
          id: 1,
          name: "Nombre producto 1",
          points: "100 PTS",
          portrait:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQvZBYT2ojOnMqeyDX0rtMtzObcawQSug5-C4n7fASfjpnSu_Yx",
          isActive: true,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nisl ex, hendrerit eget fermentum in, iaculis ac turpis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras vitae commodo nisl. Morbi et luctus magna. Phasellus semper facilisis eleifend. Fusce non nulla leo. Etiam tristique rhoncus eros sodales rutrum. Donec lobortis auctor lacus, at mattis metus convallis non. "
        },
        {
          id: 2,
          name: "Nombre producto 2",
          points: "100 PTS",
          portrait:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQvZBYT2ojOnMqeyDX0rtMtzObcawQSug5-C4n7fASfjpnSu_Yx",
          isActive: true,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nisl ex, hendrerit eget fermentum in, iaculis ac turpis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras vitae commodo nisl. Morbi et luctus magna. Phasellus semper facilisis eleifend. Fusce non nulla leo. Etiam tristique rhoncus eros sodales rutrum. Donec lobortis auctor lacus, at mattis metus convall"
        },
        {
          id: 3,
          name: "Nombre producto 3",
          points: "100 PTS",
          portrait:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQvZBYT2ojOnMqeyDX0rtMtzObcawQSug5-C4n7fASfjpnSu_Yx",
          isActive: true,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nisl ex, hendrerit eget fermentum in, iaculis ac turpis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras vitae commodo nisl. Morbi et luctus magna. Phasellus semper facilisis eleifend. Fusce non nulla leo. Etiam tristique rhoncus eros sodales rutrum. Donec lobortis auctor lacus, at mattis metus convallis n"
        },
        {
          id: 4,
          name: "Nombre producto 4",
          points: "100 PTS",
          portrait:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQvZBYT2ojOnMqeyDX0rtMtzObcawQSug5-C4n7fASfjpnSu_Yx",
          isActive: true,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nisl ex, hendrerit eget fermentum in, iaculis ac turpis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras vitae commodo nisl. Morbi et luctus magna. Phasellus semper facilisis eleifend. Fusce non nulla leo. Etiam tristique rhoncus eros sodales rutrum. Donec lobortis auctor lacus, at mattis metus convalli."
        }
      ],
      fileForm: this.$form.createForm(this),
      addProductModal: false
    };
  },
  methods: {
    cancelPictureForm() {
      alert("Cancelar");
    },
    onSubmitPictureForm() {
      //alert("Subir");
      this.fileForm.validateFields(err => {
        if (!err) {
          alert("Exito");
        }
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