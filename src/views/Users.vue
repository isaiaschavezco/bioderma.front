<template>
  <div>
    <a-row>
      <a-col :xs="{ span: 22 }">
        <div class="card-container">
          <a-tabs type="card">
            <a-tab-pane tab="Usuarios" key="1">
              <a-input-search placeholder="Buscar usuario" @search="onSearch" enterButton />
              <a-table :columns="columns" :dataSource="data">
                <span slot="action" slot-scope="text, record">
                  <a-button shape="circle" icon="info" size="large" />
                  <a-divider type="vertical" />
                  <a-button shape="circle" icon="delete" size="large" />
                </span>
              </a-table>
            </a-tab-pane>
            <a-tab-pane tab="Cadenas" key="2">
              <p>Contenido cadenas</p>
              <p>Contenido cadenas</p>
              <p>Contenido cadenas</p>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-col>
      <a-col :xs="{ span: 2 }" style="text-align:center;">
        <a-row>
          <a-col>
            <a-button shape="circle" icon="reload" size="large" />
          </a-col>
          <a-col>Resetear puntos</a-col>
        </a-row>
        <a-row style="margin-top:2rem;">
          <a-col>
            <a-button
              shape="circle"
              icon="user-add"
              size="large"
              @click="() => modal2Visible = true"
            />
          </a-col>
          <a-col>Nuevo usuario</a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-modal
      title="Invita a un nuevo miembro a ser parte de Bioderma"
      centered
      v-model="modal2Visible"
      @ok="() => modal2Visible = false"
      okText="INVITAR"
    >
      <p>
        <a-input placeholder="Ingresa el correo electrónico del nuevo usuario" />
      </p>
      <p>
        <a-radio-group v-model="value">
          <a-radio :value="1">NAOS</a-radio>
          <a-radio :value="2">Farmacia</a-radio>
        </a-radio-group>
      </p>
      <template slot="footer">
        <a-button
          key="submit"
          type="primary"
          style="background-color:#001529; border: 1px solid #001529;"
        >INVITAR</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
const columns = [
  {
    dataIndex: "name",
    key: "name",
    title: "Nombre de usuario",
    align: "center"
  },
  {
    title: "E MAIL",
    dataIndex: "email",
    key: "email",
    align: "center"
  },
  {
    title: "Perfil",
    dataIndex: "profile",
    key: "profile",
    align: "center",
    sorter: (a, b) => {
      if (a.profile < b.profile) {
        return -1;
      }
      if (a.profile > b.profile) {
        return 1;
      }
      return 0;
    }
  },
  {
    title: "Posición",
    dataIndex: "position",
    key: "position",
    align: "center",
    sorter: (a, b) => {
      if (a.position < b.position) {
        return -1;
      }
      if (a.position > b.position) {
        return 1;
      }
      return 0;
    }
  },
  {
    title: "Puntos acumulados",
    dataIndex: "points",
    key: "points",
    align: "center"
  },
  {
    title: "",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    email: "prueba@inmersys.com",
    profile: "NAOS",
    position: "Gerente",
    points: 500
  },
  {
    key: "2",
    name: "Jim Green",
    email: "prueba@inmersys.com",
    profile: "NAOS",
    position: "Gerente",
    points: 500
  },
  {
    key: "3",
    name: "Joe Black",
    email: "prueba@inmersys.com",
    profile: "Farmacia",
    position: "-",
    points: 500
  }
];
export default {
  data() {
    return {
      collapsed: false,
      data,
      columns,
      modal2Visible: false,
      value: 1
    };
  },
  methods: {
    callback(key) {
      console.log(key);
    }
  }
};
</script>
<style>
.card-container {
  background: #f0f2f5;
  overflow: hidden;
  padding: 24px;
}
.card-container > .ant-tabs-card > .ant-tabs-content {
  height: 120px;
  margin-top: -16px;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
  border-color: #fff;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
  background: transparent;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}
</style>
