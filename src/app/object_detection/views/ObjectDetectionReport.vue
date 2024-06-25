<template>
  <div class="d-flex flex-column h-100 sign-up-input">
    <div class="card">
      <Panel header="사용자 정보">
        <table class="table table-bordered object-detection-report-table" style="text-align:center">
          <colgroup>
            <col style="width:12.5%">
            <col style="width:12.5%">
            <col style="width:12.5%">
            <col style="width:12.5%">
            <col style="width:12.5%">
            <col style="width:12.5%">
            <col style="width:12.5%">
            <col style="width:12.5%">
          </colgroup>

          <tbody>
            <tr>
              <th>이름</th>
              <td></td>
              <th>아이디</th>
              <td></td>
              <th>성별</th>
              <td></td>
              <th>생년월일</th>
              <td></td>
            </tr>

            <tr>
              <th>주소</th>
              <td colspan="3"></td>
              <th>이메일</th>
              <td colspan="3"></td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </div>

    <div>
      <Splitter style="height: 150px" class="mt-2 mb-2">
        <SplitterPanel class="flex align-items-center justify-content-center object-detection-report-splited-panel" :class="selectedPanel==0 ? 'selected':''" @click="onClickSplitedPanelArea(0)"> 오늘의 기분 </SplitterPanel>
        <SplitterPanel class="flex align-items-center justify-content-center object-detection-report-splited-panel" :class="selectedPanel==1 ? 'selected':''" @click="onClickSplitedPanelArea(1)"> 컨디션 검사 </SplitterPanel>
        <SplitterPanel class="flex align-items-center justify-content-center object-detection-report-splited-panel" :class="selectedPanel==2 ? 'selected':''" @click="onClickSplitedPanelArea(2)"> 수면 검사 </SplitterPanel>
        <SplitterPanel class="flex align-items-center justify-content-center object-detection-report-splited-panel" :class="selectedPanel==3 ? 'selected':''" @click="onClickSplitedPanelArea(2)"> 자세 검사 </SplitterPanel>
      </Splitter>
    </div>

    <div class="d-flex">
      <input type="text" class="form-control" id="chatbotInput" placeholder="챗봇에 질문하기" v-model="chatbotInputText" readonly>
      <button type="button" class="btn btn-primary" style="margin-left: 10px;width: 105px">{{'질문하기'}}</button>
    </div>
    
    <div class="card mt-2" style="flex:1">
      <ScrollPanel style="width: 100%; height: 100%">
        <p style="padding:5px">
          {{chatbotOutputText}}
        </p>

      </ScrollPanel>
    </div>

    <div class="d-flex mt-2" style="justify-content:center">
      <button type="button" class="btn btn-primary" style="margin-left: 10px;width: 150px">관련 추천받기</button>
    </div>
  </div>

</template>

<script>
import { onMounted, reactive, toRefs, watch } from "vue";
import axiosHttp from "@/utils/axiosHttp";

import Panel from "primevue/panel";
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import ScrollPanel from 'primevue/scrollpanel';

export default {
  name: "ObjectDetectionReport",
  components: {
    Panel,
    Splitter,
    SplitterPanel,
    ScrollPanel,
  },
  props: {},
  setup() {
    const state = reactive({
      chatbotInputText: "",
      chatbotOutputText: "",
      selectedPanel: null,
    })

    watch(()=>state.selectedPanel, ()=> {
      setChatBotInputText();
    })

    function onClickSplitedPanelArea(selectedPanel) {
      state.selectedPanel = selectedPanel;
    }

    function setChatBotInputText() {
      switch (state.selectedPanel) {
        case 0: {
          state.chatbotInputText = '';
          break;
        }
        case 1: {
          state.chatbotInputText = '';
          break;
        }
        case 2: {
          state.chatbotInputText = '';
          break;
        }
        case 3: {
          state.chatbotInputText = '';
          break;
        }
        default: {
          state.chatbotInputText = '';
          break;
        }
      }
    }

    async function getReportData() {
      await axiosHttp.post("/api/objectDetectionReport/getReportData", null, {})
        .then((res) => {
          console.log(res.data);

        }).catch((error) => {
          console.log(error);
        });
    }

    onMounted(()=> {

    })


    return {
      ...toRefs(state),
      onClickSplitedPanelArea,
    }
  }
};
</script>

<style scoped>
.sign-up-input {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 20%;
  margin-right: 20%;
}

.object-detection-report-table {
  th {
    background: #b9d5ff;
  }
  td {
    text-align:left;
  }
}

.object-detection-report-splited-panel {
  &.selected{
    background: #b9d5ff;

  }
}
</style>