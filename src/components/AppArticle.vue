<template>
  <div id="AppArticle" class="d-flex h-100">
    <slot></slot>
  </div>

</template>

<script>
export default {
  name: "AppArticle"
};
</script>


<style scoped>
#AppArticle {
  flex-direction: column;
}

</style>