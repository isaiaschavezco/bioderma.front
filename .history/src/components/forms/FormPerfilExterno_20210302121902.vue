<template>
  <a-Row :gutter="1">
    <a-col
      :xs="{ span: 24 }"
      :sm="{ span: 24 }"
      :md="{ span: 5, offset: 1 }"
      :lg="{ span: 5, offset: 1 }"
    >
      <a-card class="imgPosition">
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
          action="https://bioderma-api-inmersys.herokuapp.com/upload/5"
          accept=".png, .jpg, jpge"
          @change="handleChangeFileUpload"
          listType="picture"
          :fileList="fileList"
        >
          <img
            alt="editProfile"
            src="https://bioderma-space.sfo2.cdn.digitaloceanspaces.com/assets/Usuario.png"
            class="imgSize"
          />
        </a-upload-dragger>
      </a-card>
    </a-col>
    <a-col
      :lg="{ span: 16, offset: 1 }"
      :md="{ span: 16, offset: 1 }"
      :sm="{ span: 24 }"
      :xs="{ span: 24 }"
    >
      <a-card :title="titleCard" class="forms">
        <a-form :form="form" @submit="handleSubmitExterno">
          <a-col>
            <a-col
              :lg="{ span: 9 }"
              :md="{ span: 9 }"
              :sm="{ span: 20 }"
              :xs="{ span: 20 }"
              :offset="2"
            >
              <a-form-item>
                <a-input
                  setFieldsValue="nickName"
                  v-decorator="[
                    'nickName',
                    {
                      rules: [
                        {
                          required: true,
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
            <a-col
              :lg="{ span: 9 }"
              :md="{ span: 9 }"
              :sm="{ span: 20 }"
              :xs="{ span: 20 }"
              :offset="2"
            >
              <a-form-item>
                <a-input
                  setFieldsValue="name"
                  placeholder="NOMBRE"
                  v-decorator="[
                    'name',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Ingrese su nombre',
                          whitespace: true
                        }
                      ]
                    }
                  ]"
                />
              </a-form-item>
            </a-col>
            <a-col
              :lg="{ span: 9 }"
              :md="{ span: 9 }"
              :sm="{ span: 20 }"
              :xs="{ span: 20 }"
              :offset="2"
            >
              <a-form-item>
                <a-input
                  setFieldsValue="lastName"
                  placeholder="APELLIDOS"
                  v-decorator="[
                    'lastName',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Ingrese sus apellidos',
                          whitespace: true
                        }
                      ]
                    }
                  ]"
                />
              </a-form-item>
            </a-col>
          </a-col>
          <!-- <a-col :span="10" :offset="2">
              </a-col>-->
          <a-col :span="18" :offset="2">
            <a-form-item>
              <span>Fecha de nacimiento &nbsp;</span>
              <a-date-picker
                setFieldsValue="birthDate"
                v-decorator="[
                  'birthDate',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Seleccione su fecha de nacimiento'
                      }
                    ]
                  }
                ]"
                option.initialValue="moment('01-01-2000', dateFormat)"
                :format="dateFormat"
              />
            </a-form-item>
          </a-col>

          <a-col
            :lg="{ span: 22 }"
            :md="{ span: 22 }"
            :sm="{ span: 24 }"
            :xs="{ span: 24 }"
            :offset="2"
          >
            <a-form-item>
              <a-radio-group
                setFieldsValue="gender"
                v-decorator="[
                  'gender',
                  {
                    rules: [{ required: true, message: 'Seleccione su genero' }]
                  }
                ]"
                name="radioGroup"
              >
                <span>GENERO&nbsp;</span>
                <a-radio :value="1">Hombre</a-radio>
                <a-radio :value="2">Mujer</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="9" :offset="2">
            <a-form-item>
              <a-input
                setFieldsValue="phone"
                v-decorator="[
                  'phone',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Ingrese su numero telefonico',
                        whitespace: true
                      },
                      {
                        pattern: '[0-9,+,(,)]',
                        message: 'Únicamente números'
                      },
                      {
                        min: 10,
                        message: 'Mínimo 10 dígitos'
                      }
                    ]
                  }
                ]"
                placeholder="NUMERO TELEFONICO"
              />
            </a-form-item>
          </a-col>
          <a-col
            :lg="{ span: 8 }"
            :md="{ span: 8 }"
            :sm="{ span: 20 }"
            :xs="{ span: 20 }"
            :offset="2"
          >
            <a-form-item style="margin-bottom: 15px">
              <a-select
                setFieldsValue="state"
                optionFilterProp="children"
                v-decorator="[
                  'state',
                  {
                    rules: [{ required: true, message: 'Seleccione su Estado' }]
                  }
                ]"
                placeholder="Estado"
                @change="onStateChange"
              >
                <a-select-option
                  :value="state.id"
                  v-for="state in states"
                  :key="state.id"
                  >{{ state.name }}</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>

          <a-col
            :lg="{ span: 9 }"
            :md="{ span: 9 }"
            :sm="{ span: 20 }"
            :xs="{ span: 20 }"
            :offset="3"
          >
            <a-form-item style="margin-botton: 15px">
              <a-select
                optionFilterProp="children"
                setFieldsValue="city"
                v-decorator="[
                  'city',
                  {
                    rules: [
                      { required: true, message: 'Seleccione su municipio' }
                    ]
                  }
                ]"
                placeholder="Municipio"
                @change="handleSelectChange"
              >
                <a-select-option
                  :value="city.id"
                  v-for="city in cities"
                  :key="city.id"
                  >{{ city.name }}</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>

          <a-col>
            <a-col
              :lg="{ span: 9 }"
              :md="{ span: 9 }"
              :sm="{ span: 20 }"
              :xs="{ span: 20 }"
              :offset="2"
            >
              <a-form-item>
                <a-input
                  setFieldsValue="street"
                  v-decorator="[
                    'street',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Ingrese su calle',
                          whitespace: true
                        }
                      ]
                    }
                  ]"
                  placeholder="CALLE"
                />
              </a-form-item>
            </a-col>
            <a-col
              :lg="{ span: 9 }"
              :md="{ span: 9 }"
              :sm="{ span: 20 }"
              :xs="{ span: 20 }"
              :offset="2"
            >
              <a-form-item>
                <a-input
                  setFieldsValue="colonia"
                  placeholder="COLONIA"
                  v-decorator="[
                    'colonia',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Ingrese su colonia',
                          whitespace: true
                        }
                      ]
                    }
                  ]"
                />
              </a-form-item>
            </a-col>
            <a-col
              :lg="{ span: 9 }"
              :md="{ span: 9 }"
              :sm="{ span: 20 }"
              :xs="{ span: 20 }"
              :offset="2"
            >
              <a-form-item>
                <a-input
                  setFieldsValue="municipality"
                  placeholder="MUNICIPIO"
                  v-decorator="[
                    'municipality',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Ingrese su municipio',
                          whitespace: true
                        }
                      ]
                    }
                  ]"
                />
              </a-form-item>
            </a-col>
            <a-col
              :lg="{ span: 9 }"
              :md="{ span: 9 }"
              :sm="{ span: 20 }"
              :xs="{ span: 20 }"
              :offset="2"
            >
              <a-form-item>
                <a-input
                  setFieldsValue="cp"
                  placeholder="CÓDIGO POSTAL"
                  v-decorator="[
                    'cp',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Ingrese su código postal.',
                          whitespace: true
                        }
                      ]
                    }
                  ]"
                />
              </a-form-item>
            </a-col>
            <a-col
              :lg="{ span: 9 }"
              :md="{ span: 9 }"
              :sm="{ span: 20 }"
              :xs="{ span: 20 }"
              :offset="2"
            >
              <a-form-item>
                <a-input
                  setFieldsValue="city"
                  placeholder="CIUDAD"
                  v-decorator="[
                    'city',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Ingrese su ciudad.',
                          whitespace: true
                        }
                      ]
                    }
                  ]"
                />
              </a-form-item>
            </a-col>
            <a-col
              :lg="{ span: 9 }"
              :md="{ span: 9 }"
              :sm="{ span: 20 }"
              :xs="{ span: 20 }"
              :offset="2"
            >
              <a-form-item>
                <a-input
                  setFieldsValue="estate_province"
                  placeholder="ESTADO"
                  v-decorator="[
                    'estate_province',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Ingrese su estado.',
                          whitespace: true
                        }
                      ]
                    }
                  ]"
                />
              </a-form-item>
            </a-col>
          </a-col>
          <!-- <a-col :span="10" :offset="2">
              </a-col>-->
          <a-col :span="18" :offset="2">
            <a-form-item>
              <span>Fecha de nacimiento &nbsp;</span>
              <a-date-picker
                setFieldsValue="birthDate"
                v-decorator="[
                  'birthDate',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Seleccione su fecha de nacimiento'
                      }
                    ]
                  }
                ]"
                option.initialValue="moment('01-01-2000', dateFormat)"
                :format="dateFormat"
              />
            </a-form-item>
          </a-col>

          <!-- Email -->
          <a-col :span="20" :offset="2">
            <a-form-item>
              <a-input
                setFieldsValue="email"
                placeholder="EMAIL"
                :disabled="isEmailInputDisable"
                v-decorator="[
                  'email',
                  {
                    rules: [
                      {
                        type: 'email',
                        message: 'Correo electronico no valido'
                      },
                      {
                        required: true,
                        message: 'Ingrese su correo electronico'
                      }
                    ],
                    initialValue: userEmail
                  }
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col
            :lg="{ span: 9 }"
            :md="{ span: 9 }"
            :sm="{ span: 20, offset: 2 }"
            :xs="{ span: 20 }"
            :offset="2"
          >
            <a-form-item help="Contraseña al menos 8 caracteres">
              <a-input-search
                enterButton="Mostrar"
                @search="showPassword"
                class="password"
                pattern=".{8,}"
                placeholder="CONTRASEÑA"
                setFieldsValue="password"
                v-decorator="[
                  'password',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Ingrese su contraseña'
                      },
                      {
                        validator: validateToNextPassword
                      }
                    ]
                  }
                ]"
                :type="passw"
              />
            </a-form-item>
          </a-col>
          <a-col
            :lg="{ span: 9 }"
            :md="{ span: 9 }"
            :sm="{ span: 20 }"
            :xs="{ span: 20 }"
            :offset="2"
          >
            <a-form-item>
              <a-input-search
                enterButton="Mostrar"
                @search="showConfirmPw"
                placeholder="CONFIRMAR CONTRASEÑA"
                v-decorator="[
                  'confirm',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Confirme su contraseña'
                      },
                      {
                        validator: compareToFirstPassword
                      }
                    ]
                  }
                ]"
                :type="passwCon"
                @blur="handleConfirmBlur"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item>
              <a-button
                type="primary"
                style="
                    background-color: #001529;
                    border: 1px solid #001529;
                    width: 100%;
                  "
                @click="onSubmitFileForm"
                html-type="submit"
                >Registrar</a-button
              >
            </a-form-item>
          </a-col>
        </a-form>
      </a-card>
    </a-col>
  </a-Row>
</template>

<script>
import moment from "moment";

export default {
  props: {
    success: Function,
    fail: Function,
    titleCard: String,
    success: Function,
    failEmail: Function,
    failIncorrect: Function,
    failToken: Function,
    onStateChange: Function,
    states: Array,
    cities: Array,
    workPositions: Array,
    isEmailInputDisable: Boolean,
    userEmail: String,
    userToken: String,
    validateToNextPassword: Function
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  data() {
    return {
      fileList: [],
      dateFormat: "DD-MM-YYYY",
      passw: "password",
      passwCon: "password",
      confirmDirty: false
    };
  },
  methods: {
    handleSubmitExterno(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          console.log("Datos recibidos: ", values);
          try {
            const response = await this.$axios.post("user/esthederm", {
              name: values.name.toUpperCase(),
              lastName: values.lastName.toUpperCase(),
              nickName: values.nickName,
              photo:
                this.fileList.length > 0
                  ? this.fileList[0].response
                  : "https://bioderma-space.sfo2.cdn.digitaloceanspaces.com/assets/Usuario.png",
              birthDate: values.birthDate,
              gender: values.gender == 1 ? false : true,
              phone: values.phone,
              email: values.email.toLowerCase(),
              password: values.password,
              postalCode: values.postalCode,
              state: values.state,
              city: values.city,
              clinic: values.chain,
              town: values.town,
              mayoralty: values.mayoralty,
              charge: values.charge,
              userToken: this.userToken
            });
            if (response.data.status == 0) {
              this.success();
            } else if (response.data.status == 5) {
              this.failEmail();
            } else if (response.data.status == 3) {
              this.failIncorrect();
            } else if (response.data.status == 13) {
              this.failToken();
            }
          } catch (error) {
            this.fail();
          }
        } else {
          console.log(err);
        }
      });
    },
    handleChangeFileUpload(info) {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      this.fileList = fileList;
    },
    onSubmitFileForm() {},
    handleSelectChange() {},
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("No coinciden sus contraseñas");
      } else {
        callback();
      }
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    showPassword() {
      if (this.passw == "password") this.passw = "text";
      else this.passw = "password";
    },
    showConfirmPw() {
      if (this.passwCon == "password") this.passwCon = "text";
      else this.passwCon = "password";
    }
  }
};
</script>

<style>
.imgPosition {
  margin-top: 2.5rem !important;
}
.forms {
  margin-top: 2.5rem !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.imgSize {
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-height: 20%;
}
</style>
