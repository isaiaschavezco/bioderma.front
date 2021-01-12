<template>
	<a-col span="16" class="user-points-info">
		<div class="points-info points-info-total-points">
			<a-row>
				<a-col span="12">
					<span class="points-info-label">PUNTOS TOTALES</span>
				</a-col>
				<a-col span="12">
					<span class="points-info-amount total-points-user points-info-user-amount">{{ dataPoints.total }}</span>
				</a-col>
			</a-row>
		</div>
		<div class="points-info points-info-total-points">
			<a-row>
				<a-col span="12">
					<span class="points-info-label">PUNTOS BIODERMA GAMES</span>
				</a-col>
				<a-col span="12">
					<a-row>
						<a-col span="6">
							<span class="points-info-amount points-info-user-amount">{{ dataPoints.biodermaGame }}</span>
						</a-col>
						<a-col span="18" v-if="false">
							<a-button type="primary" size="large" class="user-points-btn-modify" @click="onModifyPoints" >Modificar</a-button>
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
		dataPoints : Object
	},
	mounted() {
			console.log("D",this.dataPoints)
	},

	//
	watch: {
		dataPoints: function() {
			console.log("Nuevo historial: ", this.dataPoints);
			this.history = this.dataPoints.pointsHistory;
		}
	},
	data() {
		return {
			accumulatedPoints: {
					name: 'Bioderma games',
					points: this.dataPoints.biodermaGame
			},
			total: this.dataPoints.total,
			history: this.dataPoints.pointsHistory
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
	padding-left: 6rem;
	width: 100%;
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