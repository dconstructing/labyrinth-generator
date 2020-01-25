<template>
	<button class="regenerate" v-on:click="regenerate">Regenerate</button>
</template>

<script>
export default {
	methods: {
		regenerate: function(event) {
			console.log('regeneration triggered');
			this.$emit('regenerate')
		}
	}
}
</script>
