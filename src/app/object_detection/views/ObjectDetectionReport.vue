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
              <td>{{userInfo.name}}</td>
              <th>아이디</th>
              <td>{{userInfo.id}}</td>
              <th>성별</th>
              <td>{{userInfo.gender}}</td>
              <th>생년월일</th>
              <td>{{userInfo.birthday}}</td>
            </tr>

            <tr>
              <th>주소</th>
              <td colspan="3">{{userInfo.address}}</td>
              <th>이메일</th>
              <td colspan="3">{{userInfo.email}}</td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </div>

    <div>
      <Splitter style="height: 150px" class="mt-2 mb-2">
        <SplitterPanel class="align-items-center justify-content-center object-detection-report-splited-panel" :class="{'selected': selectedPanel==0, 'flex': testData.textSentimentAnalysis.analysisResult == '' }" @click="onClickSplitedPanelArea(0)">
          <div class="h-100 p-2" v-if="testData.textSentimentAnalysis.analysisResult != ''">
            <h4>오늘의 기분</h4>
            <ul>
              <li>{{testData.textSentimentAnalysis.analysisResult + '적'}}</li>
              <li>{{ '검사일시 : ' + testData.textSentimentAnalysis.dttm }}</li>
            </ul>
          </div>

          <div v-else>오늘의 기분 검사를 진행해보세요.</div>
        </SplitterPanel>
        <SplitterPanel class="align-items-center justify-content-center object-detection-report-splited-panel" :class="{'selected': selectedPanel==1, 'flex': testData.normalTest.detectionNo ==0 }" @click="onClickSplitedPanelArea(1)">
          <div class="h-100 p-2" v-if="testData.normalTest.detectionNo != 0">
            <h4>컨디션 검사</h4>
            <ul>
              <li>{{ '검사번호 : ' + testData.normalTest.detectionNo}}</li>
              <li>{{ '검사일시 : ' + testData.normalTest.startDttm }}</li>
              <li>{{ '하품 : ' + testData.normalTest.yawn + '회'}}</li>
              <li>{{ '눈비비기 : ' + testData.normalTest.eyeRubbing + '회' }}</li>

            </ul>
          </div>

          <div v-else>컨디션 검사를 진행해보세요.</div>
        </SplitterPanel>
        <SplitterPanel class="align-items-center justify-content-center object-detection-report-splited-panel" :class="{'selected': selectedPanel==2, 'flex': testData.sleepingTest.detectionNo ==0 }" @click="onClickSplitedPanelArea(2)">
          <div class="h-100 p-2" v-if="testData.sleepingTest.detectionNo != 0">
            <h4>수면 검사</h4>
            <ul>
              <li>{{ '검사번호 : ' + testData.sleepingTest.detectionNo}}</li>
              <li>{{ '검사일시 : ' + testData.sleepingTest.startDttm }}</li>
              <li>{{ '검사결과 : ' + testData.sleepingTest.class }}</li>
            </ul>
          </div>

          <div v-else>수면 검사를 진행해보세요.</div>
        </SplitterPanel>
        <SplitterPanel class="align-items-center justify-content-center object-detection-report-splited-panel" :class="{'selected': selectedPanel==3, 'flex': testData.poseTest.detectionNo ==0 }" @click="onClickSplitedPanelArea(3)">
          <div class="h-100 p-2" v-if="testData.poseTest.detectionNo != 0">
            <h4>자세 검사</h4>
            <ul>
              <li>{{ '검사번호 : ' + testData.poseTest.detectionNo}}</li>
              <li>{{ '검사일시 : ' + testData.poseTest.startDttm }}</li>
              <li>{{ '검사결과 : ' + testData.poseTest.class }}</li>
            </ul>
          </div>

          <div v-else>자세 검사를 진행해보세요.</div>
        </SplitterPanel>
      </Splitter>
    </div>

    <div class="d-flex">
      <input type="text" class="form-control" id="chatbotInput" placeholder="챗봇에 질문하기" v-model="chatbotInputText" readonly>
      <button type="button" class="btn btn-primary" style="margin-left: 10px;width: 105px" @click="getLLMResult">{{'질문하기'}}</button>
    </div>
    
    <div class="card mt-2" style="flex:1">
      <ScrollPanel style="width: 100%; height: 100%">
        <div class="card flex h-100 justify-content-center" v-if="isShowSpinner">
          <ProgressSpinner />
        </div>
        <p v-else style="padding:5px" v-html="chatbotOutputText.replace(/\n/g, '<br>')"></p>
      </ScrollPanel>
    </div>

    <div class="d-flex mt-2" style="justify-content:center">
      <button type="button" class="btn btn-primary" style="margin-left: 10px;width: 150px" @click="onClickRecommendationBtn" :disabled="recommendation == ''">관련 추천받기</button>
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
import ProgressSpinner from "primevue/progressspinner";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";

export default {
  name: "ObjectDetectionReport",
  components: {
    Panel,
    Splitter,
    SplitterPanel,
    ScrollPanel,
    ProgressSpinner,
  },
  props: {},
  setup() {
    const toast = useToast();
    const store = useStore()
    const state = reactive({
      userInfo: {
        name: store.getters['login/userInfo'].USER_NM,
        id: store.getters['login/userInfo'].USER_ID,
        gender: store.getters['login/userInfo'].USER_GENDER,
        birthday: store.getters['login/userInfo'].USER_BIRTH_DT,
        address: store.getters['login/userInfo'].USER_ADDR,
        email: store.getters['login/userInfo'].USER_EMAIL_ADDR,
      },

      selectedPanel: null,

      testData:{
        textSentimentAnalysis: {
          dttm: '',
          analysisResult: '',
        },

        normalTest: {
          detectionNo: 0,
          startDttm:'',
          endDttm: '',
          yawn: 0,
          eyeRubbing:0,
          facialEmotion:'',
        },

        sleepingTest: {
          detectionNo: 0,
          startDttm:'',
          endDttm: '',
          class:'',
        },

        poseTest: {
          detectionNo: 0,
          startDttm:'',
          endDttm: '',
          class: '',
        }
      },

      chatbotInputText: "",
      chatbotOutputText: "",
      isShowSpinner: false,

      recommendation: '',
    })

    watch(()=>state.selectedPanel, ()=> {
      setChatBotInputText();
      state.chatbotOutputText = '';
    })

    function onClickSplitedPanelArea(selectedPanel) {
      state.selectedPanel = selectedPanel;
    }

    function setChatBotInputText() {
      switch (state.selectedPanel) {
        case 0: {
          if(state.testData.textSentimentAnalysis.analysisResult!='') {
            state.chatbotInputText = '오늘 감정이 ' + state.testData.textSentimentAnalysis.analysisResult + '적인데, 어떤 활동을 하면 좋을까?';
            state.recommendation = '공원';
          } else {
            state.chatbotInputText = '';
            state.recommendation = '';
          }
          break;
        }
        case 1: {
          if(state.testData.normalTest.detectionNo != 0) {
            if (state.testData.normalTest.yawn >= state.testData.normalTest.eyeRubbing) {
              state.chatbotInputText = '오늘 하품이 많이 나오는데, 하품이 많이 나오는 질병이 있나?'
              state.recommendation = '내과';
            } else {
              state.chatbotInputText = '오늘 눈을 계속 비비게 되는데, 눈 비비면 걸리는 질병이 있나?';
              state.recommendation = '안과';
            }
          } else {
            state.chatbotInputText = '';
            state.recommendation = '';
          }
          break;
        }
        case 2: {
          if(state.testData.sleepingTest.detectionNo != 0) {
            state.chatbotInputText = '잘 때 올바른 자세로 자지 않으면 어떤 문제가 생길까?'
            state.recommendation = '정형외과';
          } else {
            state.chatbotInputText = ''
            state.recommendation = '';
          }
          break;
        }
        case 3: {
          if(state.testData.poseTest.detectionNo != 0) {
            state.chatbotInputText = '목을 자주 꺾으면 어떤 문제가 생길까?'
            state.recommendation = '정형외과';
          } else {
            state.chatbotInputText = ''
            state.recommendation = '';
          }
          break;
        }
        default: {
          state.chatbotInputText = '';
          state.recommendation = '';
          break;
        }
      }
    }

    function setTestData(data) {
      if(data.text_sentiment_analysis.length>0) {
        state.testData.textSentimentAnalysis.dttm = data.text_sentiment_analysis[0].ANALYSIS_DTTM;
        state.testData.textSentimentAnalysis.analysisResult = data.text_sentiment_analysis[0].ANALYSIS_RESULT;
      }

      if(data.normal_test.length>0) {
        state.testData.normalTest.detectionNo = data.normal_test[0].DETECTION_NO;
        state.testData.normalTest.startDttm = data.normal_test[0].START_DTTM;
        state.testData.normalTest.endDttm = data.normal_test[0].END_DTTM;

        let yawn = data.normal_test_detail.filter((row)=>{return row.DETECTION_TP == 'yawn' && row.DETECTION_TP_CLASS == 'yawn';});
        state.testData.normalTest.yawn = yawn[0].COUNTING;

        let eye_rubbing = data.normal_test_detail.filter((row)=>{return row.DETECTION_TP == 'eye_rubbing' && row.DETECTION_TP_CLASS == 'eye-rubbing';});
        state.testData.normalTest.eyeRubbing = eye_rubbing[0].COUNTING;

        let facialEmotion = data.normal_test_detail.filter((row)=> {return row.DETECTION_TP == 'facial_emotion';});
        facialEmotion.sort((a,b)=> {
          if(a.COUNTING > b.COUNTING) {return -1}
          if(a.COUNTING < b.COUNTING) {return 1}
          if(a.DETECTION_TP_CLASS > b.DETECTION_TP_CLASS) {return 1}
          if(a.DETECTION_TP_CLASS > b.DETECTION_TP_CLASS) {return -1}
        });
        state.testData.normalTest.facialEmotion = facialEmotion[0].DETECTION_TP_CLASS;
      }

      if(data.sleeping_test.length>0) {
        state.testData.sleepingTest.detectionNo = data.sleeping_test[0].DETECTION_NO;
        state.testData.sleepingTest.startDttm = data.sleeping_test[0].START_DTTM;
        state.testData.sleepingTest.endDttm = data.sleeping_test[0].END_DTTM;

        let sleeping = data.sleeping_test_detail.filter((row)=> {return row.DETECTION_TP_CLASS != 'C5';});
        sleeping.sort((a,b)=> {
          if(a.COUNTING > b.COUNTING) {return -1}
          if(a.COUNTING < b.COUNTING) {return 1}
          if(a.DETECTION_TP_CLASS > b.DETECTION_TP_CLASS) {return 1}
          if(a.DETECTION_TP_CLASS > b.DETECTION_TP_CLASS) {return -1}
        });
        state.testData.sleepingTest.class = sleeping[0].DETECTION_TP_CLASS;
      }

      if(data.pose_test.length>0) {
        state.testData.poseTest.detectionNo = data.pose_test[0].DETECTION_NO;
        state.testData.poseTest.startDttm = data.pose_test[0].START_DTTM;
        state.testData.poseTest.endDttm = data.pose_test[0].END_DTTM;

        let pose = data.pose_test_detail.filter((row)=> {return true});
        pose.sort((a,b)=> {
          if(a.COUNTING > b.COUNTING) {return -1}
          if(a.COUNTING < b.COUNTING) {return 1}
          if(a.DETECTION_TP_CLASS > b.DETECTION_TP_CLASS) {return 1}
          if(a.DETECTION_TP_CLASS > b.DETECTION_TP_CLASS) {return -1}
        });
        state.testData.poseTest.class = pose[0].DETECTION_TP_CLASS;
      }
    }

    function onClickRecommendationBtn() {
      let url = "https://map.naver.com/p/search/서강대학교%20" + state.recommendation + "?c=14.00,0,0,0,dh";
      window.open(url, '_blank');
    }

    async function getReportData() {
      await axiosHttp.post("/api/objectDetectionReport/getReportData", null, {})
        .then((res) => {
          console.log(res.data);
          setTestData(res.data);
        }).catch((error) => {
          console.log(error);
        });
    }

    async function getLLMResult() {
      if(state.chatbotInputText == '') {
        toast.add({ severity: 'warn', summary: '챗봇 실패', detail: '질문 유형을 선택하세요.', life: 3000 });
      } else {
        state.isShowSpinner = true;
        await axiosHttp.post("/api/objectDetectionReport/getLLMResult", JSON.stringify({ "llm_input": state.chatbotInputText }), {})
          .then((res) => {
            console.log(res.data);
            state.chatbotOutputText = res.data.result_text;

          }).catch((error) => {
            console.log(error);
          }).finally(() => {
            state.isShowSpinner = false;
          });
      }
    }

    onMounted(()=> {
      getReportData();
      // getLLMResult();
    })


    return {
      ...toRefs(state),
      onClickSplitedPanelArea,getLLMResult,onClickRecommendationBtn,
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