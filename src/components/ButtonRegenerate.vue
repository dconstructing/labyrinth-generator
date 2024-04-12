<template>
  <button class="regenerate" @click="regenerate">Regenerate</button>
</template>

<script>
export default {
  methods: {
    regenerate: function () {
      console.log('regeneration triggered')
      this.$emit('regenerate')
    }
  }
}
</script>
