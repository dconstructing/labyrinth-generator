<template>
	<div class="wall vertical" v-bind:class="{ active: isActive }"></div>
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
