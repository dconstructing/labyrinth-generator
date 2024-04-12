<template>
  <div class="wall vertical" :class="{ active: isActive }"></div>
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
