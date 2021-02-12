<template>
  <a-modal
    centered
    width="70%"
    @cancel="$emit('cancel')"
    :visible="isVisible"
    :footer="null"
  >
    <a-row style="margin-top: 1rem;">
      <SidebarUserInfo :userInfo="user" />
      <UserPointsInfo
        :dataPoints="dataUserPoints"
        :restartPointsUser="restartPointsUser"
      />
    </a-row>
  </a-modal>
</template>

<script>
import SidebarUserInfo from './SidebarUserInfo.vue'
import UserPointsInfo from './UserPointsInfo.vue'

export default {
  name: 'ModalUserInfo',
  components: {
    SidebarUserInfo,
    UserPointsInfo
  },
  props: {
    userInfo: Object,
    visible: Boolean,
    getUsersListInfo: Function,
    onCloseInfoUser:Function
  },
  watch: {
    userInfo: function () {
      this.user = this.userInfo
      this.dataUserPoints = {
        pointsHistory: this.user.pointsHistory,
        total: this.userInfo.totalPoints,
        biodermaGame: this.userInfo.biodermaGamePoints
      }
    },
    visible: function () {
      this.isVisible = this.visible
    }
  },
  data () {
    return {
      user: this.userInfo,
      dataUserPoints: {
        pointsHistory: this.userInfo.pointsHistory,
        total: this.userInfo.totalPoints,
        biodermaGame: this.userInfo.biodermaGamePoints
      },
      isVisible: this.visible
    }
  },
  methods: {
    async restartPointsUser (id, quizz_id) {
      try {
        console.log(this.user)
        const dataToSend = {
          id: this.user.id,
          quizzId: id,
          quizz: quizz_id
        }
        console.log(dataToSend)
        const response = await this.$axios.put('quizz/user/remove', dataToSend)
        console.log('responseDEEEELEEETEEEEE', response)
        if (response.status === 200) {
          this.$notification['success']({
            message: 'Se eliminaron los datos'
          })
        }
        this.onCloseInfoUser()
        this.getUsersListInfo()
        console.log("HOLA")
      } catch (error) {
        console.log(error)
        this.$notification['error']({
            message: 'Ha ocurrido un error'
          })
      }

      /* 	const dataReiniciar = {
				triviaId: id,
				userId: this.user.id,
				userPoints: this.user.totalPoints
			} */
      console.log('Voy a restarurar:', id)
    }
  }
}
</script>

<style></style>
