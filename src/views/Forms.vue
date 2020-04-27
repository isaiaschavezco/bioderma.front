<template>
  <div :style="{ height: 'calc(100vh - 64px)' }" breakpoint="md" collapsed-width="0">
    <div v-if="User" style="background:#f0f2f5; 0">
      <a-Row :gutter="1">
        <a-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 5, offset:1}" :lg="{span: 5, offset:1}">
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
              <img alt="editProfile" src="https://bioderma-space.sfo2.cdn.digitaloceanspaces.com/assets/Usuario.png" class="imgSize" />
            </a-upload-dragger>
          </a-card>
        </a-col>
        <a-col :lg="{span: 16,offset:1}" :md="{span:16, offset: 1}" :sm="{span:24}" :xs="{span:24}">
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
                    :disabled= "isEmailInputDisable"
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
        <a-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 5, offset:1}" :lg="{span: 5, offset:1}">
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
              <img alt="editProfile" src="https://bioderma-space.sfo2.cdn.digitaloceanspaces.com/assets/Usuario.png" class="imgSize" />
            </a-upload-dragger>
          </a-card>
        </a-col>
        <a-col :lg="{span: 16,offset:1}" :md="{span:16, offset: 1}" :sm="{span:24}" :xs="{span:24}">
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
                      :disabled= "isEmailInputDisable"
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
      userEmail: this.$route.query.email,
      userToken: this.$route.query.token,
      fileList: [],
      isEmailInputDisable: this.$route.query.email ? true : false
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  mounted() {
    this.getStates();
    this.getPosition();
    this.getChains();
    // console.log("userToken: ", this.userToken);
    // this.success();
    // this.successRegisterModal = true;
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
      // console.log("stateid: ", stateid);
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
        closable: false,
        okButtonProps: {
            props: { disabled: true },
        },
        okText: '',
        content: (
          <div>
            <p style="text-align:center">
              HAS COMPLETADO TU REGISTRO PARA TERMINAR DESCARGA E INSTALA LA
              APLICACION PARA TU MOVIL
            </p>
            <a href="https://play.google.com/store/apps/details?id=com.inmersys.bioderma">
              <img
                alt="android"
                src="data:image/png;base64,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"
                style="width: 130px; height:45px;"
              />
            </a>
            <a href="http://www.inmersysapps.com/apps/bioderma">
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
      this.$info({
        centered: true,
        content: (
          <p style="text-align:center">
            Este correo ya se encuentra registrado
          </p>
        )
      });
    },
    failToken() {
      this.$info({
        centered: true,
        content: (
          <p style="text-align:center">
            Error con token de autenticación, favor de comunicarse con el equipo de soporte de NAOS.
          </p>
        )
      });
    },
    failIncorrect() {
      this.$info({
        content: (
          <p style="text-align:center">
            Uno de los campos no cuenta con el formado correcto
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
          // console.log("Datos recibidos: ", values);
          try {
  
              const response = await this.$axios.post(
              "user/naos",
              {
                name: values.name.toUpperCase(),
                lastName: values.lastName.toUpperCase(),
                nickName: values.nickName,
                photo: this.fileList.length > 0 ? this.fileList[0].response : "https://bioderma-space.sfo2.cdn.digitaloceanspaces.com/assets/Usuario.png",
                birthDate: values.birthDate,
                gender: values.gender == 1 ? false : true,
                phone: values.phone,
                email: values.email.toLowerCase(),
                password: values.password,
                state: values.state,
                city: values.city,
                naosPosition: values.naosPosition,
                userToken: this.userToken
              }
            );

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
            console.log("error: ", error);
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
          // console.log("Datos recibidos: ", values);
          try {
            const response = await this.$axios.post(
              "user/drugstore",
              {
                name: values.name.toUpperCase(),
                lastName: values.lastName.toUpperCase(),
                nickName: values.nickName,
                photo: this.fileList.length > 0  ? this.fileList[0].response : "https://bioderma-space.sfo2.cdn.digitaloceanspaces.com/assets/Usuario.png",
                birthDate: values.birthDate,
                gender: values.gender == 1 ? false : true,
                phone: values.phone,
                email: values.email.toLowerCase(),
                password: values.password,
                postalCode: values.postalCode,
                state: values.state,
                city: values.city,
                chain: values.chain,
                drugStore: values.drugStore,
                town: values.town,
                mayoralty: values.mayoralty,
                charge: values.charge,
                userToken: this.userToken
              }
            );
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
    },
    handleChangeFileUpload(info) {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      this.fileList = fileList;
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

.imgSize {
    width: 100%;
    height: 100%;
    object-fit: contain;
    max-height: 20%;
  }

.imgPosition {
    margin-top: 2.5rem !important;
  }

@media (min-width: 1200px) {
  /* .forms {
    width: 70% !important;
  } */
  /* .imgPosition {
    width: 300px;
    height: 300px;
    margin-left: 22rem !important;
    margin-top: 2.5rem !important;
  }
  .imgSize {
    width: 180px;
    height: 180px;
  } */
}
@media (min-width: 993px) and (max-width: 1199px) {
  /* .forms {
    width: 70% !important;
  } */
  /* .imgPosition {
    width: 300px;
    height: 280px;
    margin-left: 4.5rem !important;
    margin-top: 2.5rem !important;
  }
  .imgSize {
    width: 180px;
    height: 180px;
  } */
}
@media (min-width: 577px) and (max-width: 992px) {
  /* .forms {
    width: 100% !important;
  } */
  /* .imgPosition {
    width: 17rem;
    height: 13rem;
    margin-left: 15rem !important;
    margin-top: 2.5rem !important;
    margin: auto;
  }
  .imgSize {
    width: 8rem;
    height: 8rem;
  } */
}
@media (max-width: 576px) {
  /* .forms {
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
  } */
}
</style>
