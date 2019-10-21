<template>
  <div>
    <div v-if="User">
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
                v-decorator="[
                  'nickname',
                  {
                    rules: [{ required: true,
                    message: 'Ingrese su nickname',
                    whitespace: true
                      }
                    ]
                  }
                ]"
                placeholder="NICKNAME"
              />
            </a-form-item>
          </a-col>

          <!-- <a-col :span="10" :offset="2">
          </a-col>-->
          <a-col :span="10" :offset="2">
            <a-form-item>
              <span>Fecha de cumpleaños</span>
              <a-date-picker
                v-decorator="[
              'date',
              {
              rules: [{required: true,
              message: 'Seleccione su fecha de nacimiento'
              }]
              }]
              "
                :defaultValue="moment('01-01-2000', dateFormat)"
                :format="dateFormat"
              />
            </a-form-item>
          </a-col>

          <a-col :span="22" :offset="2">
            <a-form-item>
              <a-radio-group
                v-decorator="[
                  'genero',
                  { rules: [{ required: true, message: 'Seleccione su genero' }] },
                ]"
                name="radioGroup"
              >
                <span>GENERO&nbsp;</span>
                <a-radio :value="1">Hombre</a-radio>
                <a-radio :value="2">Mujer</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>

          <a-col :span="20" :offset="2">
            <a-form-item style="margin-botton: 15px">
              <a-select
                v-decorator="[
                  'city',
                  { rules: [{ required: true, message: 'Seleccione su ciudad' }] },
                ]"
                placeholder="Ciudad"
                @change="handleSelectChange"
              >
                <a-select-option value="mexico">Mexico</a-select-option>
                <a-select-option value="morelos">Morelos</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="20" :offset="2">
            <a-form-item style="margin-botton: 15px">
              <a-select
                v-decorator="[
                  'naos',
                  { rules: [{ required: true, message: 'Seleccione su posicion NAOS' }] },
                ]"
                placeholder="Posicion naos"
                @change="handleSelectChange"
              >
                <a-select-option value="naos1">Naos 1</a-select-option>
                <a-select-option value="naos2">Naos 2</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="20" :offset="2">
            <a-form-item>
              <a-input
                v-decorator="[
                  'phonenumber',
                    {
                      rules: [{ required: true, message: 'Ingrese su numero telefonico', whitespace: true }]
                    }
                  ]"
                placeholder="NUMERO TELEFONICO"
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
            <a-form-item>
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

    <div v-if="Pharmacy" style="background:#f0f2f5; padding:80px 0">
      <a-card title="Registro de Farmacias" style="width: 50%; margin: 0 auto">
        <!-- <h1 style="text-align:center">Registro de Farmacias</h1> -->
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
              <!-- <a-col :span="10" :offset="2"></a-col> -->
              <a-col :span="9" :offset="2">
                <a-form-item>
                  <span>Fecha de cumpleaños &nbsp;</span>
                  <a-date-picker
                    v-decorator="[
                  'date',
                  { rules: [{ required: true, message: 'Seleccione su fecha' }] },
                ]"
                    :defaultValue="moment('2000/01/01', dateFormat)"
                    :format="dateFormat"
                  />
                </a-form-item>
              </a-col>
            </a-col>
            <!-- Genero -->
            <a-col :span="22" :offset="2">
              <a-form-item>
                <a-radio-group
                  v-decorator="[
                  'genero',
                  { rules: [{ required: true, message: 'Seleccione su genero' }] },
                ]"
                  name="radioGroup"
                >
                  <span>GENERO&nbsp;</span>
                  <a-radio :value="1">Hombre</a-radio>
                  <a-radio :value="2">Mujer</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <!-- Ciudad -->
            <a-col>
              <a-col :span="6" :offset="2">
                <a-form-item style="margin-bottom: 15px">
                  <a-select
                    v-decorator="[
                  'city',
                  { rules: [{ required: true, message: 'Seleccione su ciudad' }] },
                ]"
                    placeholder="Ciudad"
                    @change="handleSelectChange"
                  >
                    <a-select-option value="Mexico">Mexico</a-select-option>
                    <a-select-option value="Morelos">Morelos</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <!-- Farmacia -->
              <a-col :span="6" :offset="1">
                <a-form-item style="margin-bottom: 15px">
                  <a-select
                    v-decorator="[
                  'pharmacy',
                  { rules: [{ required: true, message: 'Seleccione su farmacia' }] },
                ]"
                    placeholder="Farmacia"
                    @change="handleSelectChange"
                  >
                    <a-select-option value="Del ahorro">Del ahorro</a-select-option>
                    <a-select-option value="Similares">Similares</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <!-- Cadena -->
              <a-col :span="6" :offset="1">
                <a-form-item style="margin-bottom: 15px">
                  <a-select
                    v-decorator="[
                  'network',
                  { rules: [{ required: true, message: 'Seleccione su cadena' }] },
                ]"
                    placeholder="Cadena"
                    @change="handleSelectChange"
                  >
                    <a-select-option value="cadena1">Cadena 1</a-select-option>
                    <a-select-option value="cadena2">Cadena 2</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <!-- Sucursal -->
              <a-col :span="6" :offset="2">
                <a-form-item style="margin-bottom: 15px">
                  <a-select
                    v-decorator="[
                  'branch',
                  { rules: [{ required: true, message: 'Seleccione su sucursal' }] },
                ]"
                    placeholder="Sucursal"
                    @change="handleSelectChange"
                  >
                    <a-select-option value="sucursalNorte">Sucursal Norte</a-select-option>
                    <a-select-option value="sucursalSur">Sucursal Sur</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <!-- Cargo -->
              <a-col :span="6" :offset="1">
                <a-form-item style="margin-bottom: 15px">
                  <a-select
                    v-decorator="[
                  'position',
                  { rules: [{ required: true, message: 'Seleccione su cargo' }] },
                ]"
                    placeholder="Cargo"
                    @change="handleSelectChange"
                  >
                    <a-select-option value="SEO">SEO</a-select-option>
                    <a-select-option value="CPO">CPO</a-select-option>
                  </a-select>
                </a-form-item>
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

            <a-col :span="20" :offset="2" style="margin-bottom:10px">
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
              <a-form-item>
                <a-button
                  class="btn-submit"
                  type="primary"
                  style="background-color:#001529; height: 60px; border: 1px solid #001529; width: 100%"
                  @click="onSubmitFileForm"
                  html-type="submit"
                >Registrar</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import "moment/locale/es";
moment.locale("es");
export default {
  data() {
    return {
      visible: false,
      value: 1,
      dateFormat: "YYYY-MM-DD",
      confirmDirty: false,
      autoCompleteResult: []
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    success() {
      this.$success({
        // JSX support
        content: (
          <p style="text-align:center">
            HAS COMPLETADO TU REGISTRO PARA TERMINAR DESCARGA E INSTALA LA
            APLICACION PARA TU MOVIL
          </p>
        )
      });
    },

    moment,

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Datos recibidos: ", values);
          this.success();
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
  },
  computed: {
    User() {
      return this.$route.query.type === "1";
    },
    Pharmacy() {
      return this.$route.query.type === "2";
    }
  }
};
</script>
<style>
</style>
