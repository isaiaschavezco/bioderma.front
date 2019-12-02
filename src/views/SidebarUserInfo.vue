<template>
	<a-col span=8 id="sidebar-info">
		<h2>
			Alias de usuario
		</h2>
		
		<img src="../assets/icons/Usuarios_Activo.png" alt="Usuario" id="sidebar-user-img">
		
		<div id="sidebar-total-points">
			<h4 class="title-points">PUNTOS TOTALES</h4>
			<p class="total-points-user">2570</p>
		</div>

		<div id="sidebar-general-info">
			<div id="sidebar-name">
				Nombre, Apellidos
			</div>

			<div class="sidebar-info">
				<span class="label-info">Fecha cumpleaños:</span>
				<span class="data-info">12 Ago</span>
			</div>

			<div class="sidebar-info">
				<span class="label-info">Genero:</span>
				<span class="data-info">Mujer</span>
			</div>

			<div class="sidebar-info">
				<span class="label-info">Ciudad:</span>
				<span class="data-info">12 Ago</span>
			</div>

			<div class="sidebar-info">
				<span class="label-info">Farmacia:</span>
				<span class="data-info">12 Ago</span>
			</div>

			<div class="sidebar-info">
				<span class="label-info">Cadena:</span>
				<span class="data-info">12 Ago</span>
			</div>

			<div class="sidebar-info">
				<span class="label-info">Direccòn:</span>
				<span class="data-info">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit tempora sit voluptatibus perferendis. Nobis nemo hic nostrum commodi eaque! Ea, molestias natus. Exercitationem, officia a. Nulla aliquid ad dicta ratione.
				</span>
			</div>

			<div class="sidebar-info">
				<span class="label-info">Cargo / Posiciòn:</span>
				<span class="data-info">12 Ago</span>
			</div>

			<div class="sidebar-info">
				<span class="label-info">Celular:</span>
				<span class="data-info">12 Ago</span>
			</div>

			<div class="sidebar-info">
				<span class="label-info">Correo electronico:</span>
				<span class="data-info">user.01@user.com</span>
			</div>
		</div>
	</a-col>
</template>

<script>
export default {
	name: 'SidebarUserInfo'
}
</script>

<style scoped>
h2 {
	width: 35%;
	text-align: center;
}

#sidebar-info {
	padding-left: 2.5rem;
}

#sidebar-user-img {
	width: 40%;
}

#sidebar-total-points {
	width: 40%;
	text-align: center;
}

#sidebar-name {
	font-weight: bold;
}

.title-points {
	color: inherit;
	font-weight: 620;
}

.sidebar-info, #sidebar-name {
	margin-bottom: 0.4rem;
	line-height: 1.7rem;
}

.label-info {
	color: dimgrey!important;

}

.data-info {
	color: #526987;
	font-weight: bold;
}
</style>