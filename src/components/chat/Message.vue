<template>
	<div class="message">
		<a-row type="flex" align="middle" class="message-user-info" v-if="showName">
				<a-col :span="1">
					<a-avatar icon="user" />
				</a-col>

				<a-col :span="23">
					<div class="user-info-name">
						{{ message.data.name }}
					</div>
				</a-col>
		</a-row>
			
		<a-row style="margin-top:0.4rem;">
			<a-col :span="10" :offset="isOrigin?14:0">
				<div class="message-content">
					<div class="message-content__date">
						<span>06/01/20</span>
						<span>10:55am</span>
					</div>
					<div class="message-content__text">
						{{ message.data.msn }}
					</div>
				</div>
			</a-col>
		</a-row>
	</div>
</template>

<script>
export default {
	name: "Message",
	props: {
		isOrigin: {
			type: Boolean,
			default: true
		},
		infoUser: {
			type: Boolean,
			default: false
		},
		dataMessage: {
			type: Object,
			default: {
				data: null
			}
		}
	},
	data() {
		return {
			showName: this.infoUser,
			rightMessage: this.isOrigin,
			message: this.dataMessage
		};
	}
}
</script>

<style scoped>
.user-info-name {
	font-size: 0.8rem;
	font-weight: 620;
}
.message-content {
	background-color: rgba(230, 230, 230, 0.5);
	border-radius: 35px;
	padding: 5px  1.25rem 0.8rem 1.25rem;
	margin: 0;
}
.message-content__text {
	margin-top: 0.5rem;
}
.message-content__date {
	font-size: 0.6rem;
}
.message-content__date span:first-child {
	margin-right: 3rem;
}
</style>