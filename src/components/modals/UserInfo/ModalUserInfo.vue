<template>
	<a-row style="margin-top: 1rem;">
		<SidebarUserInfo :userInfo="user"/>
		<UserPointsInfo :pointsHistory="user.pointsHistory"/>
	</a-row>
</template>

<script>
import SidebarUserInfo from "./SidebarUserInfo.vue";
import UserPointsInfo from "./UserPointsInfo.vue";

export default {
	name: 'ModalUserInfo',
	components: {
		SidebarUserInfo,
		UserPointsInfo
	},
	props: {
		userInfo : Object
	},
	data() {
		return{
			user: this.userInfo
		};
	}
}
</script>

<style>

</style>