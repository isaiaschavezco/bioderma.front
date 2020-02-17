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
                    'title',
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
                  placeholder="Ingresa el contenido de la notificación"
                  :rows="4"
                  v-decorator="[
                    'content',
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

            <CampaingFilter @updateFilters="updateFilters" :resetFilters="deleteFilters" />

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
        <div class="container-notification" style="height: 52rem !important; overflow-y: auto;">
          <a-card title="HISTORIAL DE NOTIFICACIONES" style="text-align:left;">
            <a-list :dataSource="notificationList">
              <div slot="renderItem" slot-scope="item, index" style="padding: 15px ">
                <span style="font-weight: bold;">{{ item.header }}</span>
                <span style="font-weight: bold; margin-left:30%;">{{ item.createdAt }}</span>
                <p style="margin-bottom:0.5rem; margin-top:0.5rem;">{{ item.content }}</p>
                <a-divider class="divider" />
              </div>
            </a-list>
          </a-card>
        </div>
      </a-col>
    </a-row>
    <a-modal
      :title="`¿Seguro que deseas enviar la notifiación?`"
      v-model="visibleRemove"
      :footer="null"
      @cancel="onCloseRemoveConfirmation"
    >
      <div class="info-confirmation">
        <p>Escribe tu contraseña para confirmar el envío de la notificación</p>
        <a-form :form="passwordForm">
          <a-form-item>
            <a-input
              placeholder="Contraseña"
              type="password"
              v-decorator="[
                'password',
                {
                  rules: [{ required: true, message: 'Favor de llenar el campo' }]
                }
              ]"
            />
          </a-form-item>
        </a-form>
      </div>
      <template>
        <div class="footer-confirmation">
          <a-button @click="onCloseRemoveConfirmation">Cancelar</a-button>
          <a-button @click="onSubmitSendNotification" type="primary">Enviar</a-button>
        </div>
      </template>
    </a-modal>
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
      visibleRemove: false,
      notificationList: [],
      fileForm: this.$form.createForm(this),
      passwordForm: this.$form.createForm(this),
      deleteFilters: false,
      filters: [],
      notificationTitle: "",
      notificationContent: ""
    };
  },
  computed: {},
  methods: {
    onSubmitNotificationForm() {
      this.fileForm.validateFields((err, values) => {
        if (!err) {
          if (this.filters.length > 0) {
            this.notificationTitle = values.title;
            this.notificationContent = values.content;
            this.showConfirm(this.sendNotification);
          } else {
            this.showNotification(
              "warning",
              "Filtros insuficientes",
              "La notificación debe tener al menos un filtro."
            );
          }
        }
      });
    },
    onCloseRemoveConfirmation() {
      this.visibleRemove = false;
    },
    showConfirm(sendData) {
      this.visibleRemove = true;
    },
    onSubmitSendNotification() {
      try {
        this.passwordForm.validateFields(async (err, values) => {
          if (!err) {
            const notificationData = {
              email: localStorage.getItem("email"),
              password: values.password.trim(),
              title: this.notificationTitle,
              content: this.notificationContent,
              targets: [...this.filters]
            };
            //console.log("JSON: ",notificationData);
            const response = await this.$axios.post(
              "notification/send",
              notificationData
            );

            if (response.data.status == 0) {
              this.getLastNotifications();
              this.fileForm.resetFields();
              this.deleteFilters = true;
              this.onCloseRemoveConfirmation();
              this.showNotification(
                "success",
                "Notificación enviada",
                "Se ha enviado la notificación exitosamente."
              );
            } else if (response.data.status == 1) {
              this.showNotification(
                "warning",
                "Usuario no encontrado",
                "No se ha encontrado un usuario asociado a este correo."
              );
            } else if (response.data.status == 2) {
              this.showNotification(
                "warning",
                "Contraseña incorrecta",
                "La contraseña no coincide para este usuario."
              );
            }
            this.passwordForm.resetFields();
          }
        });
      } catch (err) {
        this.passwordForm.resetFields();
        this.showNotification(
          "error",
          "Error al enviar la notificación",
          "Ha ocurrido un error en el envío de la notificación."
        );
      }
    },
    updateFilters(filters, resetFilters) {
      this.filters = filters.slice();
      this.deleteFilters = resetFilters;
    },
    showNotification(type, title, message) {
      this.$notification[type]({
        message: title,
        description: message
      });
    },
    async sendNotification() {
      try {
        const notificationData = {
          title: this.notificationTitle,
          content: this.notificationContent,
          targets: [...this.filters]
        };
        //console.log("JSON: ",notificationData);
        const response = await this.$axios.post(
          "notification/send",
          notificationData
        );
        if (response.data.status == 0) {
          this.getLastNotifications();
          this.fileForm.resetFields();
          this.deleteFilters = true;
          this.showNotification(
            "success",
            "Notificación enviada",
            "Se ha enviado la notificación exitosamente."
          );
        }
      } catch (err) {
        //console.log("err: ", err);
      }
    },
    async getLastNotifications() {
      try {
        const response = await this.$axios("notification/list");
        //console.log("response: ", response.data);
        this.notificationList = response.data.notificacions;
      } catch (err) {
        //console.log("err: ", err);
      }
    }
  },
  mounted() {
    this.getLastNotifications();
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
.footer-confirmation {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10rem;
  margin-top: 1rem;
}
</style>
