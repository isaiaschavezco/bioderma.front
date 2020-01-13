<template>
	<a-col id="sidebar-info" span="8">
		<h2>
			{{ user.nickname }}
		</h2>
		
		<img :src="user.image" id="sidebar-user-img" alt="Usuario" v-if="user.image && user.image !== 'URL'">
		<a-avatar style="color: white; backgroundColor: #1890ff; font-size:5rem;" :size="150" v-if="!(user.image && user.image !== 'URL')">
			{{ `${user.name[0]}${user.lastName[0]}` }}
		</a-avatar>

		<div id="sidebar-general-info">
			<div id="sidebar-name">
				{{ user.name }}, {{ user.lastName }}
			</div>

			<div class="sidebar-info">
				<span class="label-info">Fecha cumpleaños:</span>
				<span class="data-info"> {{ user.birthday }}</span>
			</div>

			<div class="sidebar-info">
				<span class="label-info">Genero:</span>
				<span class="data-info"> {{ user.gender?"Hombre":"Mujer" }}</span>
			</div>

			<div class="sidebar-info">
				<span class="label-info">Ciudad:</span>
				<span class="data-info"> {{ user.address.city.name }}</span>
			</div>

			<div class="sidebar-info">
				<span class="label-info">Farmacia:</span>
				<span class="data-info"> {{ user.branchOffice }}</span>
			</div>

			<div class="sidebar-info">
				<span class="label-info">Cadena:</span>
				<span class="data-info"> {{ user.branchChain?user.branchChain.name:"" }}</span>
			</div>

			<div class="sidebar-info">
				<span class="label-info">Direccón:</span>
				<span class="data-info"> {{ getAddressFormat(user.address) }}</span>
			</div>

			<div class="sidebar-info">
				<span class="label-info">Cargo / Posición:</span>
				<span class="data-info"> {{ user.workPosition?user.workPosition.name:user.charge }}</span>
			</div>

			<div class="sidebar-info">
				<span class="label-info">Celular:</span>
				<span class="data-info"> {{ user.phonenumber }}</span>
			</div>

			<div class="sidebar-info">
				<span class="label-info">Correo electronico:</span>
				<span class="data-info"> {{ user.email }}</span>
			</div>
		</div>
	</a-col>
</template>

<script>
export default {
	name: 'SidebarUserInfo',
	props: {
		userInfo : Object
	},
	watch: {
		userInfo: function() {
			console.log("Sidebar:", this.user);
			this.user = this.userInfo;
	}
	},
	data() {
		return {
			user: this.userInfo
		};
	},
	methods: {
		getAddressFormat(address) {
			let format = [address.state.name, address.city.name, address.mayoralty, address.suburb];

			format = format.filter(val => val !== null);
			return format.join(',');
		}
	}
}
</script>

<style scoped>
span {
	font-size: 0.7rem;
}
h2 {
	width: 50%;
	text-align: center;
}
#sidebar-info {
	padding-left: 2.5rem;
	padding-right: 4.5rem;
}
#sidebar-user-img {
	width: 50%;
}
#sidebar-name {
	font-weight: bold;
}
#sidebar-general-info {
	margin-top: 3.5rem;
}
.title-points {
	color: inherit;
	font-weight: 620;
}
.sidebar-info, #sidebar-name {
	margin-bottom: 0rem;
	line-height: 1.5rem;
}
.label-info {
	color: dimgrey!important;

}
.data-info {
	color: #526987;
	font-weight: bold;
}
</style>