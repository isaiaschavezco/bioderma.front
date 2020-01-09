<template>
  <div>
    <div v-if="User" style="background:#f0f2f5; 0">
      <a-row type="flex" :gutter="1">
        <a-col :lg="{span: 6}" :md="{span: 20}" :sm="{span: 24}" :xs="{span: 24}">
          <a-card class="imgPosition">
            <a-upload-dragger
              v-decorator="[
              'upload',
              {rules:[{ required: false, message: 'Favor de cargar un archivo JPG, PNG o JPGE' }]}]"
              name="photo"
              action="http://localhost:3000/upload/1"
              accept=".png, .jpg, jpge"
              @change="handleChange"
            >
              <img alt="editProfile" src="../assets/user.png" class="imgSize" />
            </a-upload-dragger>
          </a-card>
        </a-col>
        <a-col :lg="{span: 16,offset:1}" :md="{span:16, offset:4}" :sm="{span:24}" :xs="{span:24}">
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
                <a-col :lg="{span: 9}" :md="{span:9}" :sm="{span:20}" :xs="{span:20}" :offset="2">
                  <a-form-item>
                    <a-input
                      setFieldsValue="name"
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
                <a-col :lg="{span: 9}" :md="{span:9}" :sm="{span:20}" :xs="{span:20}" :offset="2">
                  <a-form-item>
                    <a-input
                      setFieldsValue="lastName"
                      placeholder="APELLIDOS"
                      v-decorator="[
                    'lastName',
                    {
                      rules: [{ required: true, message: 'Ingrese sus apellidos', whitespace: true }]
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
                  <span>Fecha de cumpleaños &nbsp;</span>
                  <a-date-picker
                    setFieldsValue="birthDate"
                    v-decorator="[
                    'birthDate',
                    { rules: [{ required: true, message: 'Seleccione su fecha' }] },
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
              <a-col :lg="{span: 5}" :md="{span:5}" :sm="{span:20}" :xs="{span:20}" :offset="2">
                <a-form-item style="margin-bottom: 15px">
                  <a-select
                    setFieldsValue="state"
                    optionFilterProp="children"
                    v-decorator="[
                    'state',
                    { rules: [{ required: true, message: 'Seleccione su Estado' }] },
                  ]"
                    placeholder="Estado"
                    @change="onStateChange"
                  >
                    <a-select-option
                      :value="state.id"
                      v-for="state in states"
                      :key="state.id"
                    >{{state.name}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :lg="{span: 5}" :md="{span:5}" :sm="{span:20}" :xs="{span:20}" :offset="2">
                <a-form-item style="margin-botton: 15px">
                  <a-select
                    optionFilterProp="children"
                    setFieldsValue="city"
                    v-decorator="[
                      'city',
                      { rules: [{ required: true, message: 'Seleccione su municipio' }] },
                    ]"
                    placeholder="Municipio"
                    @change="handleSelectChange"
                  >
                    <a-select-option
                      :value="city.id"
                      v-for="city in cities"
                      :key="city.id"
                    >{{city.name}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col
                :span="5"
                :lg="{span: 5}"
                :md="{span:5}"
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
                      { rules: [{ required: true, message: 'Seleccione su posicición NAOS' }] },
                    ]"
                    placeholder="Posición NAOS"
                    @change="handleSelectChange"
                  >
                    <a-select-option
                      :value="position.id"
                      v-for="position in workPositions"
                      :key="position.id"
                    >{{position.name}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>

              <a-col :span="20" :offset="2">
                <a-form-item>
                  <a-input
                    type="tel"
                    pattern="[0-9]{10}"
                    setFieldsValue="phone"
                    v-decorator="[
                      'phone',
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
                    setFieldsValue="email"
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

              <a-col :lg="{span: 9}" :md="{span:9}" :sm="{span:20}" :xs="{span:20}" :offset="2">
                <a-form-item help="Contraseña al menos 8 caracteres">
                  <a-input
                    pattern=".{8,}"
                    placeholder="CONTRASEÑA"
                    setFieldsValue="password"
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

              <a-col :lg="{span: 9}" :md="{span:9}" :sm="{span:20}" :xs="{span:20}" :offset="2">
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
              {rules:[{ required: false, message: 'Favor de cargar un archivo JPG, PNG o JPGE' }]}]"
              name="photo"
              action="http://localhost:3000/upload/1"
              accept=".png, .jpg, jpge"
              @change="handleChange"
            >
              <img alt="editProfile" src="../assets/user.png" class="imgSize" />
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
                    rules: [{ required: true, message: 'Ingrese su nickname', whitespace: true }]
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
                            rules: [{ required: true, message: 'Ingrese su nombre', whitespace: true }]
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
                            rules: [{ required: true, message: 'Ingrese sus apellidos', whitespace: true }]
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
                  <!-- <a-col :span="10" :offset="2"></a-col> -->
                  <a-col :span="18" :offset="2">
                    <a-form-item>
                      <span>Fecha de cumpleaños &nbsp;</span>
                      <a-date-picker
                        setFieldsValue="birthDate"
                        v-decorator="[
                    'birthDate',
                    { rules: [{ required: true, message: 'Seleccione su fecha' }] },
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
                    { rules: [{ required: true, message: 'Seleccione su cadena' }] },
                  ]"
                      placeholder="Cadena"
                      @change="handleSelectChange"
                    >
                      <a-select-option
                        :value="chains.id"
                        v-for="chains in chains"
                        :key="chains.id"
                      >{{chains.name}}</a-select-option>
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
                      rules: [{ required: true, message: 'Ingrese su Sucursal', whitespace: true }]
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
                    { rules: [{ required: true, message: 'Seleccione su Estado' }] },
                  ]"
                      placeholder="Estado"
                      @change="onStateChange"
                    >
                      <a-select-option
                        :value="state.id"
                        v-for="state in states"
                        :key="state.id"
                      >{{state.name}}</a-select-option>
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
                    { rules: [{ required: true, message: 'Seleccione su municipio' }] },
                  ]"
                        placeholder="Municipio"
                        @change="handleSelectChange"
                      >
                        <a-select-option
                          :value="city.id"
                          v-for="city in cities"
                          :key="city.id"
                        >{{city.name}}</a-select-option>
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
                      rules: [{ required: true, message: 'Ingrese su Ciudad', whitespace: true }]
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
                      rules: [{ required: true, message: 'Ingrese su Colonia', whitespace: true }]
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
                      rules: [{ required: true, message: 'Ingrese su Còdigo Postal', whitespace: true }]
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
                      rules: [{ required: true, message: 'Ingrese su Cargo', whitespace: true }]
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
                      setFieldsValue="email"
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
                <a-col :lg="{span: 9}" :md="{span:9}" :sm="{span:20}" :xs="{span:20}" :offset="2">
                  <a-form-item help="Contraseña al menos 8 caracteres">
                    <a-input
                      pattern=".{8,}"
                      placeholder="CONTRASEÑA"
                      setFieldsValue="password"
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

                <a-col
                  :lg="{span: 9}"
                  :md="{span:9}"
                  :sm="{span:20}"
                  :xs="{span:20}"
                  :offset="2"
                  style="margin-bottom:10px"
                >
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
      dateFormat: "YYYY-MM-DD",
      states: [],
      selectedState: 1,
      workPositions: [],
      cities: [],
      chains: [],
      confirmDirty: false,
      autoCompleteResult: []
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  mounted() {
    this.getStates();
    this.getPosition();
    this.getChains();
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
    failEmail() {
      this.$error({
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
    height: 280px;
    margin-left: 24rem !important;
    margin-top: 2.5rem !important;
  }
  .imgSize {
    width: 220px;
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
    width: 220px;
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
    width: 9rem;
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
    width: 9rem;
    height: 8rem;
  }
}
</style>
