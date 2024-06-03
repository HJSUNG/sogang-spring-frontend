<template>
  <div class="d-flex h-100 p-2">
    <div class="h-100" style="border-right: 1px gray solid">
      <table class="table">
        <colgroup>
          <col style="width: 100px">
          <col style="width: 200px">
          <col style="width: 200px">
          <col>
        </colgroup>

        <thead>
        <tr>
          <th>검사번호</th>
          <th>검사시작일시</th>
          <th>검사종료일시</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="(detectionNo, detectionNoIndex) in detectionNoList" @click="onClickDetectionNoTableRow(detectionNo.uid)">
          <td :style="{'background': detectionNo.uid == selectedDetectionNo ? '#98f6fa': ''}">{{detectionNo.uid}}</td>
          <td :style="{'background': detectionNo.uid == selectedDetectionNo ? '#98f6fa': ''}">{{detectionNo.START_DTTM}}</td>
          <td :style="{'background': detectionNo.uid == selectedDetectionNo ? '#98f6fa': ''}">{{detectionNo.END_DTTM}}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="h-100" style="margin-left:5px; flex:1;border: 1px grey solid;border-radius: 10px; padding: 10px">

      <h5 style="font-weight: bolder">{{detection_no ? '○ 검사번호 : ' + detection_no : "○ 검사번호"}}</h5>
      <h5 style="font-weight: bolder">{{detection_start_dttm ? '○ 검사 시작시간 : ' + detection_start_dttm : "○ 검사 시작시간"}}</h5>
      <h5 style="font-weight: bolder">{{detection_end_dttm ? '○ 검사 종료시간 : ' + detection_end_dttm : "○ 검사 종료시간"}}</h5>

      <div style="font-weight: bold">■ 일상생활</div>
      <div>
        <table class="table">
          <colgroup>
            <col style="width: 200px">
            <col style="width: 200px">
            <col style="width: 200px">
          </colgroup>

          <thead>
            <tr>
              <th>Class 0 - 눈 비비기</th>
              <th>Class 1 - 정상</th>
              <th>Class 2 - 하품</th>
            </tr>
          </thead>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tbody>

          </tbody>
        </table>
      </div>


      <div style="font-weight: bold">■ 감정</div>
      <div>
        <table class="table">
          <colgroup>
            <col style="width: 200px">
            <col style="width: 200px">
            <col style="width: 200px">
          </colgroup>

          <thead>
          <tr>
            <th>Class 0 - 눈 비비기</th>
            <th>Class 1 - 정상</th>
            <th>Class 2 - 하품</th>
          </tr>
          </thead>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tbody>

          </tbody>
        </table>
      </div>


      <div style="font-weight: bold">■ 수면자세</div>
      <div>
        <table class="table">
          <colgroup>
            <col style="width: 200px">
            <col style="width: 200px">
            <col style="width: 200px">
          </colgroup>

          <thead>
          <tr>
            <th>Class 0 - 눈 비비기</th>
            <th>Class 1 - 정상</th>
            <th>Class 2 - 하품</th>
          </tr>
          </thead>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tbody>

          </tbody>
        </table>
      </div>

    </div>
  </div>

</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import axiosHttp from "@/utils/axiosHttp";

export default {
  name: "ObjectDetectionReport",
  components: {},
  props: {},
  setup() {
    const state = reactive({
      detectionNoList: [],

      selectedDetectionNo:'',
    })

    function onClickDetectionNoTableRow(detectionNo) {
      state.selectedDetectionNo = detectionNo;
    }

    async function getDetectionNo() {
      await axiosHttp.post("/api/objectDetectionReport/getDetectionNoList", null, {})
        .then((res) => {
          console.log(res.data);
          state.detectionNoList = res.data.detection_no_list;
        }).catch((error) => {
          console.log(error);
        });
    }

    onMounted(()=> {
      getDetectionNo()
    })


    return {
      ...toRefs(state),
      onClickDetectionNoTableRow
    }
  }
};
</script>

<style scoped>

</style>