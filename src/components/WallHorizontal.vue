<template>
  <div class="wall horizontal" :class="{ active: isActive }"></div>
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
