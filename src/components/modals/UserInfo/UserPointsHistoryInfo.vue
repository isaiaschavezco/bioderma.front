<template>
  <a-row class="user-points-history">
    <h3>HISTORIAL DE PUNTOS</h3>
    <a-list size="large" :dataSource="history" class="scroll">
      <a-list-item
        class="points-history"
        slot="renderItem"
        slot-scope="record, index"
        :key="index"
      >
        <a-row style="width: 100%;">
          <a-col class="main-history-info" span="10" offset="2">
            <p class="date-history-info">Fecha {{ record.createdAt }}</p>
            <p class="name-history-info">{{ record.name.toUpperCase() }}</p>
          </a-col>
          <a-col class="amount-history-info" span="12">
            <p>
              {{ record.points }} PTS
              <Space size="middle">
                <a-tag
                  class="ml-4"
                  v-if="record.points.includes('-')"
                  color="blue"
                >
                  canje
                </a-tag>
              </Space>
            </p>
          </a-col>
          <a-col class="amount-history-info" span="12">
            <Space size="middle">
              <a-button
                class="mt-4"
                @click="handleRestartTrivia(record.id, record)"
                >Reiniciar trivia</a-button
              >
            </Space>
          </a-col>
        </a-row>
      </a-list-item>
    </a-list>
  </a-row>
</template>

<script>
export default {
  name: "UserPointsHistoryInfo",
  props: {
    pointsHistory: Array,
    restartPointsUser: Function
  },
  watch: {
    pointsHistory: function() {
      this.history = this.pointsHistory;
    }
  },
  mounted() {
    console.log("this.pointsHistory", this.pointsHistory);
  },
  data() {
    return {
      history: this.pointsHistory
    };
  },
  methods: {
    handleRestartTrivia(id, record) {
      console.log("record",record)
      let restart = this.restartPointsUser
      this.$confirm({
        title: "¿Estás seguro que deseas eliminar estos puntos?",
        okText: "Si, lo estoy",
        okType: "info",
        cancelText: "CANCELAR",
        centered: true,
        onOk() {
          restart(id);
        },
        onCancel() {}
      });
    }
  }
};
</script>

<style>
h3 {
  font-weight: bold;
  text-align: center;
  width: 60%;
  margin: auto;
}

p {
  margin: 0;
}

.scroll {
  overflow-y: auto;
  max-height: 400px;
}

.points-history {
  padding-left: 2.5rem;
}

.user-points-history {
  margin-top: 2rem;
}

.date-history-info {
  margin-bottom: 0.8rem;
  font-size: 0.8rem;
}

.name-history-info,
.amount-history-info {
  font-size: 1rem;
  font-weight: bold;
}

.amount-history-info {
  height: 100%;
  display: flex;
  align-items: flex-end;
}
.mt-4 {
  margin-top: 1rem;
}
</style>
