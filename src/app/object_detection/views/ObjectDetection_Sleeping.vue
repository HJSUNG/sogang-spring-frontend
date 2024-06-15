<template>
  <ObjectDetection :test-type="'sleeping'"></ObjectDetection>

</template>

<script>
import ObjectDetection from "@@/object_detection/views/ObjectDetection.vue";
export default {
  name: "ObjectDetection_Sleeping",
  components: {
    ObjectDetection
  },
  setup() {

  }
};
</script>


<style scoped>

</style>