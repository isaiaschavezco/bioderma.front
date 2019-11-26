<template>
  <div>
    <a-row>
      <a-col :xs="{ span: 15 }" style="margin-top: 30px; margin-left: 24px">
        <div style="margin-right:25px; margin-bottom:20px">
          <a-card title="TITULO DEL BLOG" class="container">
            <a-form :form="fileForm">
              <a-form-item>
                <a-input
                  placeholder="SECCION ASIGNADA (BIODERMA GAMES / CAPACITACION)"
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
                <a-input
                  placeholder="Subtitulo"
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
            </a-form>

            <a-divider class="divider" />

            <a-row class="group-filter">
              <div class="filter contain-one">
                <a-card class="mycard" title="AGREGAR FILTRO +">
                  <!-- <p :style="{ marginBottom: '20px' }">
                    <a-checkbox :checked="checked" :disabled="disabled" @change="onChange"></a-checkbox>
                  </p>
                  <p>
                    <a-button
                      type="primary"
                      size="small"
                      @click="toggleChecked"
                    >{{!checked ? 'Check' : 'Uncheck'}}</a-button>
                    <a-button
                      :style="{ marginLeft: '10px' }"
                      type="primary"
                      size="small"
                      @click="toggleDisable"
                    >{{!disabled ? 'Disable' : 'Enable'}}</a-button>
                  </p>-->

                  <a-row class="container-option">
                    <a-row class="container-item">
                      <a-row class="select-item">
                        <a-checkbox>Todos los nombres</a-checkbox>
                      </a-row>
                      <a-row class="select-item">
                        <a-checkbox>
                          <a-radio-group name="radioGroup" :defaultValue="1">
                            <a-radio :value="1">NAOS</a-radio>
                            <a-radio :value="2">Farmacia</a-radio>
                          </a-radio-group>
                        </a-checkbox>
                      </a-row>
                      <a-row class="select-item">
                        <!-- Row checkbox -->
                        <a-checkbox @click="ableItem" @change="onChange" style="margin-right:7px; "></a-checkbox>
                        <a-select
                          showSearch
                          placeholder="Estado"
                          optionFilterProp="children"
                          style="width: 170px"
                          @change="handleChange"
                          :filterOption="filterOption"
                          :disabled="disabledItem"
                        >
                          <a-select-option value="jack">Jack</a-select-option>
                          <a-select-option value="lucy">Lucy</a-select-option>
                          <a-select-option value="tom">Tom</a-select-option>
                        </a-select>
                      </a-row>
                      <a-row class="select-item">
                        <a-checkbox
                          @click="ableItemOne"
                          @change="onChange"
                          style="margin-right:7px; "
                        ></a-checkbox>
                        <a-select
                          showSearch
                          placeholder="Municipio"
                          optionFilterProp="children"
                          style="width: 170px"
                          @change="handleChange"
                          :filterOption="filterOption"
                          :disabled="disabledItemOne"
                        >
                          <a-select-option value="jack">Jack</a-select-option>
                          <a-select-option value="lucy">Lucy</a-select-option>
                          <a-select-option value="tom">Tom</a-select-option>
                        </a-select>
                      </a-row>
                      <!-- Row checkbox -->
                      <a-row class="select-item">
                        <!-- Row checkbox -->
                        <a-checkbox
                          @click="ableItemTwo"
                          @change="onChange"
                          style="margin-right:7px; "
                        ></a-checkbox>
                        <a-select
                          showSearch
                          placeholder="Colonia"
                          optionFilterProp="children"
                          style="width: 170px"
                          @change="handleChange"
                          :filterOption="filterOption"
                          :disabled="disabledItemTwo"
                        >
                          <a-select-option value="jack">Jack</a-select-option>
                          <a-select-option value="lucy">Lucy</a-select-option>
                          <a-select-option value="tom">Tom</a-select-option>
                        </a-select>
                      </a-row>

                      <!-- Row checkbox -->
                      <a-row class="select-item">
                        <a-checkbox
                          @click="ableItemThree"
                          @change="onChange"
                          style="margin-right:7px; "
                        ></a-checkbox>
                        <a-select
                          showSearch
                          placeholder="Cadena"
                          optionFilterProp="children"
                          style="width: 170px"
                          @change="handleChange"
                          :filterOption="filterOption"
                          :disabled="disabledItemThree"
                        >
                          <a-select-option value="jack">Jack</a-select-option>
                          <a-select-option value="lucy">Lucy</a-select-option>
                          <a-select-option value="tom">Tom</a-select-option>
                        </a-select>
                      </a-row>
                      <!-- Row checkbox -->
                      <a-row class="select-item">
                        <a-checkbox @click="ableItemFour" @change="onChange"></a-checkbox>
                        <span>Edad</span>
                        <a-input-number
                          :min="18"
                          :max="100"
                          :disabled="disabledItemFour"
                          style="width: 60px; margin-right: 3px; margin-left: -6px"
                        />
                        <span>a</span>
                        <a-input-number
                          :min="18"
                          :max="100"
                          :disabled="disabledItemFour"
                          style="width: 60px; margin-left: 2px"
                        />
                      </a-row>
                    </a-row>
                  </a-row>
                  <div class="container-btn">
                    <a-button
                      type="primary"
                      style="background-color:#009FD1; border: none; margin-top:15px"
                    >Agregar filtro a la lista</a-button>
                  </div>
                </a-card>
              </div>
              <div class="filter">
                <a-card class="mycard" title="FILTROS AGREGADOS"></a-card>
              </div>
            </a-row>

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
const notifications = [];
export default {
  components: {
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
      disabledItem: true,
      disabledItemOne: true,
      disabledItemTwo: true,
      disabledItemThree: true,
      disabledItemFour: true

      // checked: true,
      // disabled: false
    };
  },
  computed: {},
  methods: {
    ableItem() {
      this.disabledItem = !this.disabledItem;
    },
    ableItemOne() {
      this.disabledItemOne = !this.disabledItemOne;
    },
    ableItemTwo() {
      this.disabledItemTwo = !this.disabledItemTwo;
    },
    ableItemThree() {
      this.disabledItemThree = !this.disabledItemThree;
    },
    ableItemFour() {
      this.disabledItemFour = !this.disabledItemFour;
    },

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
