<template>
	<a-row class="user-points-history">
		<h3>HISTORIAL DE PUNTOS</h3>
		<a-list size="large" :dataSource="history">
			<a-list-item class="points-history" slot="renderItem" slot-scope="record, index" :key="index">
				<a-row style="width: 100%;">
					<a-col class="main-history-info" span="10" offset="2">
						<p class="date-history-info">
							Fecha {{ record.date }}
						</p>
						<p class="name-history-info"> {{ record.product.name.toUpperCase() }} </p>
					</a-col>
					<a-col class="amount-history-info" span="12">
						<p>{{ record.product.points }} PTS</p>
					</a-col>
				</a-row>
			</a-list-item>
		</a-list>
	</a-row>
</template>

<script>
export default {
	name: 'UserPointsHistoryInfo',
	props: {
		pointsHistory : Array
	},
	data() {
		return {
			history: this.pointsHistory
		};
	}
}
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

.name-history-info, .amount-history-info {
	font-size: 1rem;
	font-weight: bold;
}

.amount-history-info {
	height: 100%;
	display: flex;
	align-items: flex-end;
}
</style>