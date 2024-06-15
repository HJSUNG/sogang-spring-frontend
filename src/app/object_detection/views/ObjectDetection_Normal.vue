<template>
  <ObjectDetection :test-type="'normal'"></ObjectDetection>

</template>

<script>
import ObjectDetection from "@@/object_detection/views/ObjectDetection.vue";
export default {
  name: "ObjectDetection_Normal",
  components: {
    ObjectDetection,
  },
  setup() {

  }
};
</script>


<style scoped>

</style>