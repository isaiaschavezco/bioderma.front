<template>
  <div>
    <h1 style="text-align:center">Registro</h1>
    <a-form :form="form" @submit="handleSubmit">
      <a-row>
        <a-col>
          <a-col :span="9" :offset="2">
            <a-form-item>
              <a-input
                placeholder="NOMBRE"
                v-decorator="[
              'name',
              {
                rules: [{ required: true, message: 'Ingrese su nombre', whitespace: true }]
              }
            ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="10" :offset="1">
            <a-form-item>
              <a-input
                placeholder="APELLIDOS"
                v-decorator="[
              'lastname',
              {
                rules: [{ required: true, message: 'Ingrese sus apellidos', whitespace: true }]
              }
            ]"
              />
            </a-form-item>
          </a-col>
        </a-col>

        <a-col :span="20" :offset="2">
          <a-form-item>
            <a-input
              placeholder="NICKNAME"
              v-decorator="[
                'nickname',
                {
                  rules: [{ required: true, message: 'Ingrese su nickname', whitespace: true }]
                }
              ]"
            />
          </a-form-item>
        </a-col>

        <a-col>
          <a-col :span="10" :offset="2">
            <span>Fecha de cumpleaños</span>
          </a-col>

          <a-col :span="9" :offset="1">
            <a-form-item>
              <a-date-picker :defaultValue="moment('2000/01/01', dateFormat)" :format="dateFormat" />
            </a-form-item>
          </a-col>
        </a-col>

        <a-col :span="24">
          <a-form-item>
            <a-radio-group name="radioGroup" style="margin: 0 30%">
              <a-radio :value="1">Hombre</a-radio>
              <a-radio :value="2">Mujer</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>

        <a-col :span="20" :offset="2">
          <a-form-iem>
            <a-dropdown>
              <a-menu slot="overlay" @click="cityMenuClick">
                <a-menu-item key="1">
                  <a-icon type="user" />1st menu item
                </a-menu-item>
                <a-menu-item key="2">
                  <a-icon type="user" />2nd menu item
                </a-menu-item>
                <a-menu-item key="3">
                  <a-icon type="user" />3rd item
                </a-menu-item>
              </a-menu>
              <a-button style="width:100%; margin-bottom:20px">
                Ciudad
                <a-icon type="down" style="justify-content: end" />
              </a-button>
            </a-dropdown>
          </a-form-iem>
        </a-col>

        <a-col :span="20" :offset="2">
          <a-form-iem>
            <a-dropdown>
              <a-menu slot="overlay" @click="positionMenuClick">
                <a-menu-item key="1">
                  <a-icon type="user" />1st menu item
                </a-menu-item>
                <a-menu-item key="2">
                  <a-icon type="user" />2nd menu item
                </a-menu-item>
                <a-menu-item key="3">
                  <a-icon type="user" />3rd item
                </a-menu-item>
              </a-menu>
              <a-button style="width:100%; margin-bottom:20px">
                Posicion NAOS
                <a-icon type="down" style="justify-content: end" />
              </a-button>
            </a-dropdown>
          </a-form-iem>
        </a-col>

        <a-col :span="20" :offset="2">
          <a-form-item>
            <a-input
              placeholder="NUMERO TELEFONICO"
              v-decorator="[
                  'phonenumber',
                  {
                    rules: [{ required: true, message: 'Ingrese su numero telefonico', whitespace: true }]
                  }
                ]"
            />
          </a-form-item>
        </a-col>

        <!-- Email -->
        <a-col :span="20" :offset="2">
          <a-form-item>
            <a-input
              placeholder="EMAIL"
              v-decorator="[
                  'email',
                  {
                    rules: [{
                      type: 'email', message: 'Correo electronico no valido',
                    }, {
                      required: true, message: 'Ingrese su correo electronico',
                    }]
                  }
                ]"
            />
          </a-form-item>
        </a-col>

        <a-col :span="20" :offset="2">
          <a-form-item>
            <a-input
              placeholder="CONTRASEÑA DE ACCESO"
              v-decorator="[
                  'password',
                  {
                    rules: [{
                      required: true, message: 'Ingrese su contraseña',
                    }, {
                      validator: validateToNextPassword,
                    }],
                  }
                ]"
              type="password"
            />
          </a-form-item>
        </a-col>

        <a-col :span="20" :offset="2">
          <a-form-item>
            <a-input
              placeholder="CONFIRMAR CONTRASEÑA"
              v-decorator="[
                  'confirm',
                  {
                    rules: [{
                      required: true, message: 'Confirme su contraseña',
                    }, {
                      validator: compareToFirstPassword,
                    }],
                  }
                ]"
              type="password"
              @blur="handleConfirmBlur"
            />
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item v-bind="tailFormItemLayout">
            <a-button
              type="primary"
              style="background-color:#001529; border: 1px solid #001529; width: 100%"
              @click="onSubmitFileForm"
              html-type="submit"
            >Registrar</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <h1 style="text-align:center">Registro de Farmacias</h1>
    <a-form :form="form" @submit="handleSubmit">
      <a-row>
        <a-col>
          <a-col :span="9" :offset="2">
            <a-form-item>
              <a-input
                placeholder="NOMBRE"
                v-decorator="[
              'name',
              {
                rules: [{ required: true, message: 'Ingrese su nombre', whitespace: true }]
              }
            ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="10" :offset="1">
            <a-form-item>
              <a-input
                placeholder="APELLIDOS"
                v-decorator="[
              'lastname',
              {
                rules: [{ required: true, message: 'Ingrese sus apellidos', whitespace: true }]
              }
            ]"
              />
            </a-form-item>
          </a-col>
        </a-col>

        <a-col :span="20" :offset="2">
          <a-form-item>
            <a-input
              placeholder="NICKNAME"
              v-decorator="[
                'nickname',
                {
                  rules: [{ required: true, message: 'Ingrese su nickname', whitespace: true }]
                }
              ]"
            />
          </a-form-item>
        </a-col>

        <a-col>
          <a-col :span="10" :offset="2">
            <span>Fecha de cumpleaños</span>
          </a-col>

          <a-col :span="9" :offset="1">
            <a-form-item>
              <a-date-picker :defaultValue="moment('2000/01/01', dateFormat)" :format="dateFormat" />
            </a-form-item>
          </a-col>
        </a-col>

        <a-col :span="24">
          <a-form-item>
            <a-radio-group name="radioGroup" style="margin: 0 calc(80% / 2)">
              <a-radio :value="1">Hombre</a-radio>
              <a-radio :value="2">Mujer</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <!-- Ciudad -->
        <a-col>
          <a-col :span="6" :offset="2">
            <a-form-iem>
              <a-dropdown>
                <a-menu slot="overlay" @click="cityMenuClick">
                  <a-menu-item key="1">
                    <a-icon type="user" />1st menu item
                  </a-menu-item>
                </a-menu>
                <a-button style="width:100%; margin-bottom:20px">
                  Ciudad
                  <a-icon type="down" />
                </a-button>
              </a-dropdown>
            </a-form-iem>
          </a-col>

          <a-col :span="6" :offset="1">
            <a-form-iem>
              <a-dropdown>
                <a-menu slot="overlay" @click="positionMenuClick">
                  <a-menu-item key="1">
                    <a-icon type="user" />1st menu item
                  </a-menu-item>
                </a-menu>
                <a-button style="width:100%; margin-bottom:20px">
                  Farmacia
                  <a-icon type="down" />
                </a-button>
              </a-dropdown>
            </a-form-iem>
          </a-col>

          <a-col :span="6" :offset="1">
            <a-form-iem>
              <a-dropdown>
                <a-menu slot="overlay" @click="positionMenuClick">
                  <a-menu-item key="1">
                    <a-icon type="user" />1st menu item
                  </a-menu-item>
                </a-menu>
                <a-button style="width:100%; margin-bottom:20px">
                  Cadena
                  <a-icon type="down" />
                </a-button>
              </a-dropdown>
            </a-form-iem>
          </a-col>

          <a-col :span="6" :offset="2">
            <a-form-iem>
              <a-dropdown>
                <a-menu slot="overlay" @click="positionMenuClick">
                  <a-menu-item key="1">
                    <a-icon type="user" />1st menu item
                  </a-menu-item>
                </a-menu>
                <a-button style="width:100%; margin-bottom:20px">
                  Sucursal
                  <a-icon type="down" />
                </a-button>
              </a-dropdown>
            </a-form-iem>
          </a-col>

          <a-col :span="6" :offset="1">
            <a-form-iem>
              <a-dropdown>
                <a-menu slot="overlay" @click="positionMenuClick">
                  <a-menu-item key="1">
                    <a-icon type="user" />1st menu item
                  </a-menu-item>
                </a-menu>
                <a-button style="width:100%; margin-bottom:20px">
                  Cargo
                  <a-icon type="down" />
                </a-button>
              </a-dropdown>
            </a-form-iem>
          </a-col>
        </a-col>

        <a-col :span="20" :offset="2">
          <a-form-item>
            <a-input
              placeholder="NUMERO TELEFONICO"
              v-decorator="[
                  'phonenumber',
                  {
                    rules: [{ required: true, message: 'Ingrese su numero telefonico', whitespace: true }]
                  }
                ]"
            />
          </a-form-item>
        </a-col>

        <!-- Email -->
        <a-col :span="20" :offset="2">
          <a-form-item>
            <a-input
              placeholder="EMAIL"
              v-decorator="[
                  'email',
                  {
                    rules: [{
                      type: 'email', message: 'Correo electronico no valido',
                    }, {
                      required: true, message: 'Ingrese su correo electronico',
                    }]
                  }
                ]"
            />
          </a-form-item>
        </a-col>

        <a-col :span="20" :offset="2">
          <a-form-item>
            <a-input
              placeholder="CONTRASEÑA DE ACCESO"
              v-decorator="[
                  'password',
                  {
                    rules: [{
                      required: true, message: 'Ingrese su contraseña',
                    }, {
                      validator: validateToNextPassword,
                    }],
                  }
                ]"
              type="password"
            />
          </a-form-item>
        </a-col>

        <a-col :span="20" :offset="2">
          <a-form-item>
            <a-input
              placeholder="CONFIRMAR CONTRASEÑA"
              v-decorator="[
                  'confirm',
                  {
                    rules: [{
                      required: true, message: 'Confirme su contraseña',
                    }, {
                      validator: compareToFirstPassword,
                    }],
                  }
                ]"
              type="password"
              @blur="handleConfirmBlur"
            />
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item v-bind="tailFormItemLayout">
            <a-button
              type="primary"
              style="background-color:#001529; border: 1px solid #001529; width: 100%"
              @click="onSubmitFileForm"
              html-type="submit"
            >Registrar</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      value: 1,
      dateFormat: "DD/MM/YYYY",
      confirmDirty: false,
      residences,
      autoCompleteResult: []
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    onChange(e) {
      console.log("radio checked", e.target.value);
    },
    moment,
    cityMenuClick() {
      alert("Item City");
    },
    positionMenuClick() {
      alert("Item Position");
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Datos recibidos: ", values);
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("No coinciden sus contraseñas");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    }
  }
};
</script>