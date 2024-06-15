<template>
  <ObjectDetection :test-type="'pose'"></ObjectDetection>

</template>

<script>
import ObjectDetection from "@@/object_detection/views/ObjectDetection.vue";
export default {
  name: "ObjectDetection_Pose",
  components: {
    ObjectDetection,
  },
  setup() {

  }
};
</script>


<style scoped>

</style>