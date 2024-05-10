<template>
  <section class="h-100">
    <slot></slot>
  </section>

</template>

<script>
export default {
  name: "AppSection"
};
</script>


<style scoped>
section {
  overflow: auto;
}

</style>