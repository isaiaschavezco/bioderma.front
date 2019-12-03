<template>
	<a-col span="16" class="user-points-info">
		<div class="points-info points-info-total-points">
			<a-row>
				<a-col span="12">
					<span class="points-info-label">PUNTOS TOTALES</span>
				</a-col>
				<a-col span="12">
					<span class="points-info-amount total-points-user points-info-user-amount">2570</span>
				</a-col>
			</a-row>
		</div>
		<div class="points-info points-info-total-points" v-for="(pointsInfo, index) in accumulatedPoints" :key="index">
			<a-row>
				<a-col span="12">
					<span class="points-info-label">PUNTOS {{ pointsInfo.name.toUpperCase() }}</span>
				</a-col>
				<a-col span="12">
					<a-row>
						<a-col span="6">
							<span class="points-info-amount points-info-user-amount">{{ pointsInfo.points }}</span>
						</a-col>
						<a-col span="18">
							<a-button type="primary" size="large" class="user-points-btn-modify" @click="onModifyPoints">Modificar</a-button>
						</a-col>
					</a-row>
				</a-col>
			</a-row>
		</div>
		<UserPointsHistoryInfo :pointsHistory="history"/>
  </a-col>
</template>

<script>
import UserPointsHistoryInfo from "./UserPointsHistoryInfo.vue";

export default {
	name: 'UserPointsInfo',
	components: {
		UserPointsHistoryInfo
	},
	props: {
		pointsHistory : Array
	},
	data() {
		return {
			accumulatedPoints: [
				{
					name: 'Bioderma games',
					points: 2000
				},
				{
					name: 'Campaña 1',
					points: 570
				}
			],
			history: this.pointsHistory
		};
	},
	methods: {
		onModifyPoints() {
			console.log("%cModifcando puntos", "color:orange;font-size:0.9rem;")
		}
	}
}
</script>

<style>
.user-points-info {
	margin-top: 3.2rem;
}

.points-info {
	border-bottom-style: solid;
	border-bottom-width: 2px;
	border-bottom-color: black;
	margin-bottom: 1rem;
	padding-bottom: 0.4rem;
}

.points-info-label, .points-info-amount {
	width: 50%;
	line-height: 3.2rem;
}

.points-info-label {
	margin: auto;
	display: block;
	font-weight: bold;
	font-size: 1rem;
}


.points-info-amount {
	font-size: 2.5rem;
	height: 100%;
}

.user-points-btn-modify {
	margin-left: 3rem;
	height: 2.25rem;
	width: 9.5rem;
}
</style>