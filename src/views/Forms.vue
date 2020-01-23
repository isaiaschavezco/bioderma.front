<template>
  <div :style="{ height: 'calc(100vh - 64px)' }" breakpoint="md" collapsed-width="0">
    <div v-if="User" style="background:#f0f2f5; 0">
      <a-Row :gutter="1">
        <a-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 6}">
          <a-card class="imgPosition">
            <a-upload-dragger
              v-decorator="[
                'photo',
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
              @change="handleChange"
            >
              <img alt="editProfile" src="https://bioderma-space.sfo2.cdn.digitaloceanspaces.com/assets/Usuario.png" class="imgSize" />
            </a-upload-dragger>
          </a-card>
        </a-col>
        <a-col :lg="{span: 16,offset:1}" :md="{span:18, offset: 3}" :sm="{span:24}" :xs="{span:24}">
          <a-card title="Registro NAOS" class="forms">
            <a-form :form="form" @submit="handleSubmit1">
              <a-col>
                <a-col :lg="{span: 9}" :md="{span:9}" :sm="{span:20}" :xs="{span:20}" :offset="2">
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
                <a-col :lg="{span: 9}" :md="{span:9}" :sm="{span:20}" :xs="{span:20}" :offset="2">
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
                <a-col :lg="{span: 9}" :md="{span:9}" :sm="{span:20}" :xs="{span:20}" :offset="2">
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
                      },
                    ]"
                    option.initialValue="moment('01-01-2000', dateFormat)"
                    :format="dateFormat"
                  />
                </a-form-item>
              </a-col>

              <a-col :lg="{span: 22}" :md="{span:22}" :sm="{span:24}" :xs="{span:24}" :offset="2">
                <a-form-item>
                  <a-radio-group
                    setFieldsValue="gender"
                    v-decorator="[
                      'gender',
                      {
                        rules: [
                          { required: true, message: 'Seleccione su genero' }
                        ]
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
              <a-col :lg="{span: 8}" :md="{span:8}" :sm="{span:20}" :xs="{span:20}" :offset="2">
                <a-form-item style="margin-bottom: 15px">
                  <a-select
                    setFieldsValue="state"
                    optionFilterProp="children"
                    v-decorator="[
                      'state',
                      {
                        rules: [
                          { required: true, message: 'Seleccione su Estado' }
                        ]
                      }
                    ]"
                    placeholder="Estado"
                    @change="onStateChange"
                  >
                    <a-select-option
                      :value="state.id"
                      v-for="state in states"
                      :key="state.id"
                    >{{ state.name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :lg="{span: 8}" :md="{span:8}" :sm="{span:20}" :xs="{span:20}" :offset="2">
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
                    >{{ city.name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col
                :span="5"
                :lg="{span: 12}"
                :md="{span:12}"
                :sm="{span:20}"
                :xs="{span:20}"
                :offset="2"
              >
                <a-form-item style="margin-botton: 15px">
                  <a-select
                    optionFilterProp="children"
                    setFieldsValue="naosPosition"
                    v-decorator="[
                      'naosPosition',
                      {
                        rules: [
                          {
                            required: true,
                            message: 'Seleccione su posicición NAOS'
                          }
                        ]
                      }
                    ]"
                    placeholder="Posición NAOS"
                    @change="handleSelectChange"
                  >
                    <a-select-option
                      :value="position.id"
                      v-for="position in workPositions"
                      :key="position.id"
                    >{{ position.name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>

              <a-col :span="20" :offset="2">
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

              <!-- Email -->
              <a-col :span="20" :offset="2">
                <a-form-item>
                  <a-input
                    setFieldsValue="email"
                    placeholder="EMAIL"
                    :disabled= "true"
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
              <a-col :lg="{span: 9}" :md="{span:9}" :sm="{span:20,offset:2}" :xs="{span:20}" :offset="2">
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
              <a-col :lg="{span: 9}" :md="{span:9}" :sm="{span:20}" :xs="{span:20}" :offset="2">
                <a-form-item >
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
                    style="background-color:#001529; border: 1px solid #001529; width: 100%"
                    @click="onSubmitFileForm"
                    html-type="submit"
                  >Registrar</a-button>
                </a-form-item>
              </a-col>
            </a-form>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <div v-if="Pharmacy" style="background:#f0f2f5; 0">
      <a-row :gutter="1">
        <a-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 6}">
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
              name="photo"
              action="https://bioderma-api-inmersys.herokuapp.com/upload/5"
              accept=".png, .jpg, jpge"
              @change="handleChange"
            >
              <img alt="editProfile" src="https://bioderma-space.sfo2.cdn.digitaloceanspaces.com/assets/Usuario.png" class="imgSize" />
            </a-upload-dragger>
          </a-card>
        </a-col>
        <a-col :lg="{span: 16,offset:1}" :md="{span:18, offset: 3}" :sm="{span:24}" :xs="{span:24}">
          <a-card title="Registro de Farmacias" class="forms">
            <!-- <h1 style="text-align:center">Registro de Farmacias</h1> -->
            <a-form :form="form" @submit="handleSubmit2">
              <a-row>
                <a-col :span="20" :offset="2">
                  <a-form-item>
                    <a-input
                      setFieldsValue="nickName"
                      placeholder="NICKNAME"
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
                    />
                  </a-form-item>
                </a-col>
                <a-col>
                  <a-col :lg="{span: 9}" :md="{span:9}" :sm="{span:20}" :xs="{span:20}" :offset="2">
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
                    :lg="{span: 9}"
                    :md="{span: 9}"
                    :sm="{span:20}"
                    :xs="{span:20}"
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

                <a-col>
                  <!-- Genero -->
                  <a-col
                    :lg="{span: 22}"
                    :md="{span:22}"
                    :sm="{span:24}"
                    :xs="{span:24}"
                    :offset="2"
                  >
                    <a-form-item>
                      <a-radio-group
                        setFieldsValue="gender"
                        v-decorator="[
                          'gender',
                          {
                            rules: [
                              {
                                required: true,
                                message: 'Seleccione su genero'
                              }
                            ]
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
                  <!-- <a-col :span="10" :offset="2"></a-col> -->
                  <a-col :span="18" :offset="2">
                    <a-form-item>
                      <span>Fecha de nacimiento &nbsp;</span>
                      <a-date-picker
                        setFieldsValue="birthDate"
                        v-decorator="[
                          'birthDate',
                          {
                            rules: [
                              { required: true, message: 'Seleccione su fecha de nacimiento' }
                            ]
                          }
                        ]"
                        option.initialValue="moment('01-01-2000', dateFormat)"
                        :format="dateFormat"
                      />
                    </a-form-item>
                  </a-col>
                </a-col>
                <!-- Cadena -->
                <a-col :lg="{span: 9}" :md="{span:9}" :sm="{span:20}" :xs="{span:20}" :offset="2">
                  <a-form-item style="margin-bottom: 15px">
                    <a-select
                      setFieldsValue="chain"
                      v-decorator="[
                        'chain',
                        {
                          rules: [
                            { required: true, message: 'Seleccione su cadena' }
                          ]
                        }
                      ]"
                      placeholder="Cadena"
                      @change="handleSelectChange"
                    >
                      <a-select-option
                        :value="chains.id"
                        v-for="chains in chains"
                        :key="chains.id"
                      >{{ chains.name }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <!-- Sucursal -->
                <a-col :lg="{span: 9}" :md="{span:9}" :sm="{span:20}" :xs="{span:20}" :offset="2">
                  <a-form-item>
                    <a-input
                      placeholder="Sucursal"
                      setFieldsValue="drugStore"
                      v-decorator="[
                        'drugStore',
                        {
                          rules: [
                            {
                              required: true,
                              message: 'Ingrese su Sucursal',
                              whitespace: true
                            }
                          ]
                        }
                      ]"
                    />
                  </a-form-item>
                </a-col>
                <!-- Estado -->
                <a-col :lg="{span: 9}" :md="{span:9}" :sm="{span:20}" :xs="{span:20}" :offset="2">
                  <a-form-item style="margin-bottom: 15px">
                    <a-select
                      optionFilterProp="children"
                      setFieldsValue="state"
                      v-decorator="[
                        'state',
                        {
                          rules: [
                            { required: true, message: 'Seleccione su Estado' }
                          ]
                        }
                      ]"
                      placeholder="Estado"
                      @change="onStateChange"
                    >
                      <a-select-option
                        :value="state.id"
                        v-for="state in states"
                        :key="state.id"
                      >{{ state.name }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <!-- Municipio -->
                <a-col>
                  <a-col :lg="{span: 9}" :md="{span:9}" :sm="{span:20}" :xs="{span:20}" :offset="2">
                    <a-form-item style="margin-bottom: 15px">
                      <a-select
                        optionFilterProp="children"
                        setFieldsValue="city"
                        v-decorator="[
                          'city',
                          {
                            rules: [
                              {
                                required: true,
                                message: 'Seleccione su municipio'
                              }
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
                        >{{ city.name }}</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <!-- Ciudad -->
                  <a-col :span="20" :offset="2">
                    <a-form-item>
                      <a-input
                        placeholder="Ciudad"
                        setFieldsValue="town"
                        v-decorator="[
                          'town',
                          {
                            rules: [
                              {
                                required: true,
                                message: 'Ingrese su Ciudad',
                                whitespace: true
                              }
                            ]
                          }
                        ]"
                      />
                    </a-form-item>
                  </a-col>
                  <!-- Colonia -->
                  <a-col :lg="{span: 9}" :md="{span:9}" :sm="{span:20}" :xs="{span:20}" :offset="2">
                    <a-form-item>
                      <a-input
                        placeholder="Colonia"
                        setFieldsValue="mayoralty"
                        v-decorator="[
                          'mayoralty',
                          {
                            rules: [
                              {
                                required: true,
                                message: 'Ingrese su Colonia',
                                whitespace: true
                              }
                            ]
                          }
                        ]"
                      />
                    </a-form-item>
                  </a-col>
                  <!-- Codigo Postal -->
                  <a-col :lg="{span: 9}" :md="{span:9}" :sm="{span:20}" :xs="{span:20}" :offset="2">
                    <a-form-item>
                      <a-input
                        pattern="[0-9]{5}"
                        setFieldsValue="postalCode"
                        placeholder="Código Postal"
                        v-decorator="[
                          'postalCode',
                          {
                            rules: [
                              {
                                required: true,
                                message: 'Ingrese su Còdigo Postal',
                                whitespace: true
                              }
                            ]
                          }
                        ]"
                      />
                    </a-form-item>
                  </a-col>
                  <!-- Cargo -->
                  <a-col :lg="{span: 9}" :md="{span:9}" :sm="{span:20}" :xs="{span:20}" :offset="2">
                    <a-form-item>
                      <a-input
                        placeholder="Cargo"
                        setFieldsValue="charge"
                        v-decorator="[
                          'charge',
                          {
                            rules: [
                              {
                                required: true,
                                message: 'Ingrese su Cargo',
                                whitespace: true
                              }
                            ]
                          }
                        ]"
                      />
                    </a-form-item>
                  </a-col>
                </a-col>
                <a-col :lg="{span: 9}" :md="{span:9}" :sm="{span:20}" :xs="{span:20}" :offset="2">
                  <a-form-item>
                    <a-input
                      pattern="[0-9]{10}"
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

                <!-- Email -->
                <a-col :span="20" :offset="2">
                  <a-form-item>
                    <a-input
                      placeholder="EMAIL"
                      setFieldsValue="email"
                      :disabled= "true"
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
                <a-col :lg="{span: 9}" :md="{span:9}" :sm="{span:20}" :xs="{span:20}" :offset="2">
                  <a-form-item help="Contraseña al menos 8 caracteres">
                    <a-input-search
                    enterButton="Mostrar"
                    @search="showPassword"
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
                  :lg="{span: 9}"
                  :md="{span: 9}"
                  :sm="{span:20}"
                  :xs="{span:20}"
                  :offset="2"
                  style="margin-bottom:10px"
                >
                  <a-form-item help="Confirme su contraseña">
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
                      class="btn-submit"
                      type="primary"
                      style="background-color:#001529; border: 1px solid #001529; width: 100%"
                      @click="onSubmitFileForm"
                      html-type="submit"
                    >Registrar</a-button>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import "moment/locale/es";
import { async } from "q";
moment.locale("es");
export default {
  data() {
    return {
      passw:"password",
      passwCon:"password",
      name: "",
      photo: "URL",
      lastName: "",
      nickName: "",
      birthDate: "1996-06-11",
      gender: false,
      phone: "",
      email: "",
      password: "",
      postalCode: "",
      state: 1,
      city: 1,
      naosPosition: 1,
      chain: 1,
      drugStore: "",
      town: "",
      mayoralty: "",
      charge: "",
      visible: false,
      value: 2,
      dateFormat: "DD-MM-YYYY",
      states: [],
      selectedState: 1,
      workPositions: [],
      cities: [],
      chains: [],
      confirmDirty: false,
      autoCompleteResult: [],
      userEmail: this.$route.query.email
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  mounted() {
    this.getStates();
    this.getPosition();
    this.getChains();
    //this.success();
    //this.successRegisterModal = true;
  },
  methods: {
    handleChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    async onStateChange(stateid) {
      console.log("stateid: ", stateid);
      this.getCities(stateid);
      /*const direction = "city/" + stateid;
      const responseCity = await this.$axios(direction);
      console.log("ResponseCity: ", responseCity.data);
      this.cities = responseCity.data.name;*/
    },
    onSubmitFileForm() {},
    success() {
      this.$info({
        iconType: "null",
        centered: true,
        content: (
          <div>
            <p style="text-align:center">
              HAS COMPLETADO TU REGISTRO PARA TERMINAR DESCARGA E INSTALA LA
              APLICACION PARA TU MOVIL
            </p>
            <a href="http://localhost:8080/#/Main/">
              <img
                alt="android"
                src="https://www.codere.es/_catalogs/masterpage/codere/img/FooterdescargaAndroid.png"
                style="width: 130px; height:45px;"
              />
            </a>
            <a href="http://localhost:8080/#/Main/">
              <img
                alt="ios"
                src="data:image/png;base64,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"
                style="width: 135px; height:50px;"
              />
            </a>
          </div>
        )
      });
    },
    failEmail() {
      this.$error({
        centered: true,
        content: (
          <p style="text-align:center">
            ERROR AL COMPLETAR TU REGISTRO, INTRODUCE UN CORREO DIFERENTE
          </p>
        )
      });
    },
    failIncorrect() {
      this.$error({
        content: (
          <p style="text-align:center">
            ERROR AL COMPLETAR TU REGISTRO, UN CAMPO NO TIENE EL FORMATO
            CORRECTO
          </p>
        )
      });
    },
    fail() {
      this.$error({
        content: (
          <p style="text-align:center">
            HA OCURRIDO UN ERROR DURANTE EL REGISTRO, FAVOR DE INTENTARLO MÁS
            TARDE
          </p>
        )
      });
    },
    async getStates() {
      const responseStates = await this.$axios("state");
      this.states = responseStates.data.states;
      // axios.get('state.json').then( response => {
      //   this.state = response.data
      // })
    },
    showPassword(){
      if(this.passw=="password") this.passw="text";
      else this.passw="password";
    },
    showConfirmPw(){
      if(this.passwCon=="password") this.passwCon="text";
      else this.passwCon="password";
    },
    async getPosition() {
      const responsePosition = await this.$axios("position");
      this.workPositions = responsePosition.data.workPositions;
    },
    async getChains() {
      const responseChains = await this.$axios("chain");
      this.chains = responseChains.data.chains;
    },
    async getCities(num) {
      const direction = "city/" + num;
      const responseCity = await this.$axios(direction);
      this.cities = responseCity.data.cities;
    },
    moment,
    handleSelectChange() {},
    handleSubmit1(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          console.log("Datos recibidos: ", values);
          try {
            const response = await this.$axios.post(
              "https://bioderma-api-inmersys.herokuapp.com/user/naos",
              {
                name: values.name,
                lastName: values.lastName,
                nickName: values.nickName,
                photo: "URL",
                birthDate: values.birthDate,
                gender: values.gender,
                phone: values.phone,
                email: values.email,
                password: values.password,
                state: values.state,
                city: values.city,
                naosPosition: values.naosPosition
              }
            );
            console.log(response.data.status);
            if (response.data.status == 0) {
              this.success();
            } else if (response.data.status == 5) {
              this.failEmail();
            } else if (response.data.status == 3) {
              this.failIncorrect();
            }
          } catch (error) {
            this.fail();
          }
        } else {
          console.log(err);
        }
      });
    },
    handleSubmit2(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          console.log("Datos recibidos: ", values);
          try {
            const response = await this.$axios.post(
              "https://bioderma-api-inmersys.herokuapp.com/user/drugstore",
              {
                name: values.name,
                lastName: values.lastName,
                nickName: values.nickName,
                photo: "URL",
                birthDate: values.birthDate,
                gender: values.gender,
                phone: values.phone,
                email: values.email,
                password: values.password,
                postalCode: values.postalCode,
                state: values.state,
                city: values.city,
                chain: values.chain,
                drugStore: values.drugStore,
                town: values.town,
                mayoralty: values.mayoralty,
                charge: values.charge
              }
            );
            if (response.data.status == 0) {
              this.success();
            } else if (response.data.status == 5) {
              this.failEmail();
            } else if (response.data.status == 3) {
              this.failIncorrect();
            }
          } catch (error) {
            THIS.fail();
          }
        } else {
          console.log(err);
        }
      });
    },
    onSubmitPictureForm() {
      //alert("Subir");
      this.fileForm.validateFields(err => {
        if (!err) {
          alert("Exito");
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
<style scoped>
.forms {
  margin-top: 2.5rem !important;
  margin-left: auto !important;
  margin-right: auto !important;
}
@media (min-width: 1200px) {
  .forms {
    width: 70% !important;
  }
  .imgPosition {
    width: 300px;
    height: 300px;
    margin-left: 22rem !important;
    margin-top: 2.5rem !important;
  }
  .imgSize {
    width: 180px;
    height: 180px;
  }
}
@media (min-width: 993px) and (max-width: 1199px) {
  .forms {
    width: 70% !important;
  }
  .imgPosition {
    width: 300px;
    height: 280px;
    margin-left: 4.5rem !important;
    margin-top: 2.5rem !important;
  }
  .imgSize {
    width: 180px;
    height: 180px;
  }
}
@media (min-width: 577px) and (max-width: 992px) {
  .forms {
    width: 100% !important;
  }
  .imgPosition {
    width: 17rem;
    height: 13rem;
    margin-left: 15rem !important;
    margin-top: 2.5rem !important;
    margin: auto;
  }
  .imgSize {
    width: 8rem;
    height: 8rem;
  }
}
@media (max-width: 576px) {
  .forms {
    width: 100% !important;
  }
  .imgPosition {
    width: 17rem;
    height: 13rem;
    margin-top: 2.5rem !important;
    margin: auto;
  }
  .imgSize {
    width: 8rem;
    height: 8rem;
  }
}
</style>
