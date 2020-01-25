<template>
	<div class="wall horizontal" v-bind:class="{ active: isActive }"></div>
</template>

<script>
export default {
	props: {
		isActive: {
			type: Boolean
		}
	}
}
</script>
