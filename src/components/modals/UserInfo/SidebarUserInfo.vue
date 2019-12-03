<template>
	<a-col id="sidebar-info" span="8">
		<h2>
			Alias de usuario
		</h2>
		
		<img src="../../../assets/icons/Usuarios_Activo.png" id="sidebar-user-img" alt="Usuario">
		
		<div id="sidebar-total-points">
			<h4 class="title-points">PUNTOS TOTALES</h4>
			<p class="total-points-user points-info-user-amount">{{ user.totalPoints }}</p>
		</div>

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
				<span class="data-info"> {{ user.gender }}</span>
			</div>

			<div class="sidebar-info">
				<span class="label-info">Ciudad:</span>
				<span class="data-info"> {{ user.city }}</span>
			</div>

			<div class="sidebar-info">
				<span class="label-info">Farmacia:</span>
				<span class="data-info"> {{ user.pharmacy }}</span>
			</div>

			<div class="sidebar-info">
				<span class="label-info">Cadena:</span>
				<span class="data-info"> {{ user.chain }}</span>
			</div>

			<div class="sidebar-info">
				<span class="label-info">Direccòn:</span>
				<span class="data-info"> {{ user.address }}</span>
			</div>

			<div class="sidebar-info">
				<span class="label-info">Cargo / Posiciòn:</span>
				<span class="data-info"> {{ user.position }}</span>
			</div>

			<div class="sidebar-info">
				<span class="label-info">Celular:</span>
				<span class="data-info"> {{ user.phone }}</span>
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
	data() {
		return {
			user: this.userInfo
		};
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

#sidebar-total-points {
	width: 40%;
	text-align: center;
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