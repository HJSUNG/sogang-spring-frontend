<template>
  <div class="d-flex h-100" style="flex-direction: column">
    <div class="d-flex p-1" style="gap:10px">
      <div class="d-flex" style="flex-direction: column;">
        <div style="flex:1">
          <video ref="video" class="w-100" style="max-height: 340px" autoplay></video>
          <canvas ref="canvas" class="w-100" style="display: none;"></canvas>
        </div>
        <div class="d-flex" style="justify-content:center">
          <button class="btn btn-primary py-2" type="submit" @click="captureImage">화면 캡쳐</button>
        </div>
      </div>
      <div style="flex:1;border: 1px blue solid">
        <img :src="capturedImage">
      </div>
    </div>
    <div style="flex:1;max-height: 387px;">
      <table class="table">
        <colgroup>
          <col style="width: 100px">
          <col style="width: 200px">
          <col style="width: 150px">
          <col>
        </colgroup>

        <thead>
          <tr>
            <th >#</th>
            <th >판정일시</th>
            <th >① 직립여부</th>
            <th scope="col"></th>
          </tr>
        </thead>
      </table>

      <div style="max-height: 325px;overflow: auto">
        <table class="table">
          <colgroup>
            <col style="width: 100px">
            <col style="width: 200px">
            <col style="width: 150px">
            <col>
          </colgroup>

          <tbody>
            <tr v-for="(data,index) in judgeResultHistoryTBData">
              <th>{{index+1}}</th>
              <td>{{data.judge_dttm}}</td>
              <td>{{data.case1}}</td>
              <td></td>
            </tr>


          </tbody>
        </table>
      </div>

    </div>

  </div>
</template>

<script>

import { onBeforeUnmount, onMounted, reactive, ref, toRefs } from "vue";
import axiosHttp from "@/utils/axiosHttp";

export default {
  name: "ObjectDetection",
  components: {},
  setup() {
    const state = reactive({
      stream: null,
      capturedImage: null,

      judgeResultHistoryTBData: [
        // {judge_dttm: '2024-05-18 17:04:28', case1: 0.718},
      ],
    });
    const video = ref(null);
    const canvas = ref(null);

    async function initWebcam() {
      try {
        state.stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.value.srcObject = state.stream;
      } catch (err) {
        console.error("Error accessing webcam: ", err);
      }
    }

    function captureImage() {
      if (!video.value || !canvas.value) return;

      const context = canvas.value.getContext("2d");
      context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
      const image = canvas.value.toDataURL("image/png");
      state.capturedImage = image;
      sendImage(image);
    }

    async function sendImage(image) {
      await axiosHttp.post("/api/objectDetection/sendImage", JSON.stringify({ image }), {})
        .then((res) => {
          console.log(res.data);
          state.judgeResultHistoryTBData.push(res.data.judge_result)
        }).catch((error) => {
          console.log(error);
        });
    }

    function unMountWebcam() {
      if (state.stream) {
        state.stream.getTracks().forEach(track => track.stop());
      }
    }

    onMounted(() => {
      initWebcam();
    });

    onBeforeUnmount(() => {
      unMountWebcam();
    });

    return {
      ...toRefs(state),
      video, canvas,
      captureImage
    };
  }
};
</script>


<style scoped>

</style>