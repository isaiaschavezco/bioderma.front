<template>
  <div>
    <a-row>
      <a-col :xs="{ span: 15 }" style="margin-top: 30px; margin-left: 24px">
        <div style="margin-right:25px; margin-bottom:20px">
          <a-card title="NUEVA NOTIFICACIÓN" class="container">
            <a-form :form="fileForm">
              <a-form-item>
                <a-input
                  placeholder="Ingresa el titulo de la notificación"
                  v-decorator="[
                    'name',
                    {
                      rules: [
                        { required: true, message: 'Favor de llenar el campo' }
                      ]
                    }
                  ]"
                />
              </a-form-item>
              <a-form-item>
                <a-textarea
                  placeholder="Ingresa la descripcion de la notificación"
                  :rows="4"
                  v-decorator="[
                    'description',
                    {
                      rules: [
                        { required: true, message: 'Favor de llenar el campo' }
                      ]
                    }
                  ]"
                />
              </a-form-item>
            </a-form>

            <a-divider class="divider" />

            <CampaingFilter/>

            <a-divider class="divider" />

            <div class="container-btn">
              <a-button
                type="primary"
                style="background-color:#009FD1; border: none; "
                @click="onSubmitNotificationForm"
              >Enviar</a-button>
            </div>
          </a-card>
        </div>
      </a-col>
      <a-col :xs="{ span: 7 }" style="margin-top: 30px">
        <div class="container-notification" style>
          <a-card title="HISTORIAL DE NOTIFICACIONES" style="text-align:left;">
            <a-list :dataSource="data">
              <div slot="renderItem" slot-scope="item, index" style="padding: 15px">
                <span style="font-weight: bold;">{{ item.date }}</span>
                <p style="margin-bottom:30px">{{ item.description }}</p>
                <a-divider class="divider" />
              </div>
            </a-list>
          </a-card>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import CampaingFilter from "../components/forms/filters/CampaingFilter.vue";

const notifications = [];
export default {
  components: {
    CampaingFilter
    //  FormFilter
  },
  data() {
    return {
      data: [
        {
          id: 1,
          date: "01/01/2020",
          title: "Titlo 1",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
          id: 2,
          date: "01/01/2020",
          title: "Titlo 1",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
          id: 3,
          date: "01/01/2020",
          title: "Titlo 1",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }
      ],
      fileForm: this.$form.createForm(this),
      // checked: true,
      // disabled: false
    };
  },
  computed: {},
  methods: {
    onSubmitNotificationForm() {
      //alert("Subir");
      this.fileForm.validateFields((err, values) => {
        if (!err) {
          console.log("Datos recibidos: ", values);
          this.showConfirm();
          // this.notifications = values;
          // console.log("Datos guardados: ", this.notifications);
          //alert("Exito");
        }
      });
    },
    showConfirm() {
      this.$confirm({
        title: "¿Estás seguro que deseas enviar esta notificación?",
        content: h => <div style="color:#000;"></div>,
        onOk() {
          console.log("ENVIAR");
        },
        onCancel() {
          console.log("ATRAS");
        },
        class: "test"
      });
    },
    // toggleChecked() {
    //   this.checked = !this.checked;
    // },
    toggleDisable() {
      this.disabled = !this.disabled;
    },
    onChange(e) {
      this.checked = e.target.checked;
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    // handleBlur() {
    //   console.log("blur");  
    // },
    // handleFocus() {
    //   console.log("focus");
    // },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    }
  }
};
</script>
<style>
.container-btn {
  display: flex;
  justify-content: center;
}
.group-filter {
  display: flex;
}
.filter {
  width: 50%;
  padding: 8px;
}
.mycard {
  border: none;
  border-bottom: none;
}
.container-option {
  width: 100%;
  display: flex;
}
.container-item {
  margin: 0 auto;
}
.select-item {
  margin-bottom: 20px;
}
.divider {
  border: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
