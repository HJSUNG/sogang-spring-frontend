<template>
  <div class="d-flex h-100" style="flex-direction: column">
    <div class="d-flex p-1" style="gap:10px">
      <div class="d-flex" style="flex-direction: column;">
        <div style="flex:1">
          <video ref="video" class="w-100" style="max-height: 340px" autoplay></video>
          <canvas ref="canvas" class="w-100" style="display: none;"></canvas>
        </div>
        <div class="d-flex" style="justify-content:center">
          <button class="btn py-2" :class="isSending ? 'btn-warning' : 'btn-primary'" type="submit" :disabled="isFinished" @click="toggleInterval">{{ isSending ? "검사 종료" : "검사 시작" }}</button>
        </div>
      </div>
      <div style="flex:1;border: 1px grey solid;border-radius: 10px; padding: 10px">
        <h5 style="font-weight: bolder">{{detection_no ? '○ 검사번호 : ' + detection_no : "○ 검사번호"}}</h5>
        <h5 style="font-weight: bolder">{{detection_start_dttm ? '○ 검사 시작시간 : ' + detection_start_dttm : "○ 검사 시작시간"}}</h5>
        <h5 style="font-weight: bolder">{{detection_end_dttm ? '○ 검사 종료시간 : ' + detection_end_dttm : "○ 검사 종료시간"}}</h5>
        <h5 style="font-weight: bolder">{{'○ 검사 유형 : ' + (testType == 'normal' ? '일상검사' : testType == 'sleeping' ? '수면검사' : '자세검사')}}</h5>
        <h5 style="font-weight: bolder">○ 검사 정보</h5>
        <ul>
          <li v-for="(detection, detectionIndex) in detectionList()" style="font-weight: bold">
            {{detection.title + " : " + detection.description}}
          </li>
        </ul>

      </div>
    </div>

    <div style="flex:1;max-height: 387px;">
      <table class="table">
        <colgroup>
          <col style="width: 100px">
          <col style="width: 200px">

          <template v-if="testType=='normal'">
            <col style="width: 150px">
            <col style="width: 150px">
            <col style="width: 150px">
          </template>

          <template v-if="testType=='sleeping'">
            <col style="width: 150px">
          </template>

          <template v-if="testType=='pose'">
            <col style="width: 150px">
          </template>

          <col>
        </colgroup>

        <thead>
          <tr>
            <th>#</th>
            <th>판정일시</th>

            <template v-if="testType=='normal'">
              <th>하품</th>
              <th>눈비비기</th>
              <th>감정</th>
            </template>

            <template v-if="testType=='sleeping'">
              <th>수면자세</th>
            </template>

            <template v-if="testType=='pose'">
              <th>목/허리</th>
            </template>

            <th scope="col"></th>
          </tr>
        </thead>
      </table>

      <div style="max-height: 325px;overflow: auto">
        <table class="table">
          <colgroup>
            <col style="width: 100px">
            <col style="width: 200px">

            <template v-if="testType=='normal'">
              <col style="width: 150px">
              <col style="width: 150px">
              <col style="width: 150px">
            </template>

            <template v-if="testType=='sleeping'">
              <col style="width: 150px">
            </template>

            <template v-if="testType=='pose'">
              <col style="width: 150px">
            </template>

            <col>
          </colgroup>

          <tbody>
            <tr v-for="(data,index) in judgeResultHistoryTBData">
              <th>{{index+1}}</th>
              <td>{{data.judge_dttm}}</td>

              <template v-if="testType=='normal'">
                <td>{{data.yawn}}</td>
                <td>{{data.eye_rubbing}}</td>
                <td>{{data.facial_emotion}}</td>
              </template>

              <template v-if="testType=='sleeping'">
                <td>{{data.sleeping}}</td>
              </template>

              <template v-if="testType=='pose'">
                <td>{{data.pose}}</td>
              </template>

              <td></td>
            </tr>


          </tbody>
        </table>
      </div>

    </div>


  </div>

</template>

<script>

import { onBeforeUnmount, onMounted, reactive, ref, toRefs, watch } from "vue";
import axiosHttp from "@/utils/axiosHttp";

export default {
  name: "ObjectDetection",
  components: {},
  props: {
    testType: {
      type:String,
      default: 'normal',
    }
  },
  setup(props) {
    const state = reactive({
      apiUrl: function() {
        return props.testType == 'pose' ? 'detectPose' : props.testType == 'sleeping' ? 'detectSleeping' : 'detectNormal';
      },
      stream: null,
      capturedImage: null,

      judgeResultSummaryTBData: {
        case1:0,
        case2:0,
      },

      judgeResultHistoryTBData: [
        // {judge_dttm: '2024-05-18 17:04:28', case1: 0.718},
      ],

      isSending: false,
      isFinished: false,

      detection_no: '',
      detection_start_dttm: '',
      detection_end_dttm: '',

      detection_detail_no: 0,

      detectionListDB : [
        {test_type: 'normal', title: '하품', description : '하품 여부를 2개 Class 로 분류합니다.'},
        {test_type: 'normal', title: '눈비비기', description : '눈비비기 여부를 2개 Class 로 분류합니다.'},
        {test_type: 'normal', title: '감정', description : '감정을 4개 Class 로 분류합니다.'},
        {test_type: 'sleeping', title: '수면자세', description : '수면할 때의 자세를 14개 Class 로 분류합니다.'},
        {test_type: 'pose', title: '자세', description : '앉은 자세를 N개 Class 로 분류합니다.'},
      ],

      detectionList: function() {
        let returnList = [];

        returnList = state.detectionListDB.filter((row)=>{return row.test_type == props.testType})

        return returnList;
      }
    });

    const video = ref(null);
    const canvas = ref(null);

    let interval = null;

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

    async function getDetectionNo() {
      await axiosHttp.post("/api/objectDetection/startDetection", JSON.stringify({"test_type": props.testType}), {})
        .then((res) => {
          console.log(res.data);
          state.detection_no = res.data.detection_no;
          state.detection_start_dttm = res.data.start_dttm;
        }).catch((error) => {
          console.log(error);
        });
    }

    async function endDetection() {
      await axiosHttp.post("/api/objectDetection/endDetection", JSON.stringify({ "detection_no": state.detection_no }), {})
        .then((res) => {
          console.log(res.data);
          state.detection_end_dttm = res.data.end_dttm;
        }).catch((error) => {
          console.log(error);
        });
    }

    async function sendImage(image) {
      state.detection_detail_no += 1;
      await axiosHttp.post("/api/objectDetection/"+ state.apiUrl(), JSON.stringify({ image, "detection_no": state.detection_no, "detection_detail_no" : state.detection_detail_no, "test_type": props.testType }), {})
        .then((res) => {
          console.log(res.data);
          state.judgeResultHistoryTBData.push(res.data.judge_result)
        }).catch((error) => {
          console.log(error);
        });
    }

    async function toggleInterval() {
      if(state.isSending) {
        await endDetection();
        clearInterval()
        state.isSending = !state.isSending;
        state.isFinished = true;
      } else {
        await getDetectionNo();
        if(state.detection_no) {
          startInterval();
          state.isSending = !state.isSending;
        }
      }
    }

    function startInterval() {
      interval = setInterval(() => {
        captureImage();
      }, 3000);
    }

    function clearInterval(){
      if (interval) {
        window.clearInterval(interval);
        interval = null;
      }
    }

    function unMountWebcam() {
      if (state.stream) {
        state.stream.getTracks().forEach(track => track.stop());
        console.log('@@@ webcam unmounted')
      }
    }

    onMounted(() => {
      initWebcam();
    });

    onBeforeUnmount(() => {
      unMountWebcam();

      if (state.isSending) {
        clearInterval();
      }
    });

    return {
      ...toRefs(state),
      video, canvas,
      toggleInterval,
    };
  }
};
</script>


<style scoped>

</style>