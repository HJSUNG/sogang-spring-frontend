<template>

  <div class="sign-up-input">
    <div class="bd-example pt-3">
      <Card>
        <template #title>오늘의 날씨</template>
        <template #content>
          <div v-if="Object.keys(weatherInfo).length > 0">
            <table class="table table-bordered" style="text-align:center">
              <colgroup>
                <col style="width: 200px">
                <col style="width: 200px">
                <col style="width: 200px">
              </colgroup>

              <thead>
              <tr>
                <th>기온</th>
                <th>미세먼지</th>
                <th>초미세먼지</th>
              </tr>
              </thead>
              <tr>
                <td>{{weatherInfo.temp}}</td>
                <td>{{weatherInfo.dust}}</td>
                <td>{{weatherInfo.ultra_dust}}</td>
              </tr>
              <tbody>

              </tbody>
            </table>

            <p style="font-weight:bold; text-align:center">{{weatherInfo.weather.slice(0,2).join(' ')}}</p>
          </div>
        </template>
      </Card>
    </div>

    <div class="bd-example pt-3">
      <label for="exampleFormControlInput1" class="form-label">오늘의 기분은 어떤가요?</label>
      <div class="d-flex">
        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" v-model="inputText" >
        <button type="button" v-if="!isRecording" class="btn btn-secondary" style="margin-left: 10px;width: 105px" @click="onClickSTTBtn">{{'STT 시작'}}</button>
        <button type="button" v-else class="btn btn-warning" style="margin-left: 10px;width: 105px" @click="onClickSTTBtn">{{'STT 종료'}}</button>
      </div>

      <div class="d-flex pt-4 pb-4" style="justify-content:center;">
        <button type="button" class="btn btn-primary" style="margin-left: 10px;width: 105px" @click="textSentimentAnalysis" :disabled="isRecording">{{'분석'}}</button>
      </div>

      <div class="card">
        <div class="card-header">
          오늘의 컨디션
        </div>
        <div class="card-body">
          <h5 class="card-title">{{sentimentAnalysisResult.length > 0 ? "당신의 오늘 컨디션은 " + sentimentAnalysisResult[0] + "적 입니다." : "컨디션을 체크하려면, 감정분석을 진행해보세요."}}</h5>
          <p class="card-text">{{sentimentAnalysisDetailResultText()}}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from "vue";
import axiosHttp from "@/utils/axiosHttp";
import router from "@/router";
import { useToast } from 'primevue/usetoast';
import Card from 'primevue/card';
import { useRouter } from "vue-router";

export default {
  name: "Intro",
  components: {
    Card,
  },
  setup() {
    const toast = useToast();
    const router = useRouter();
    const state = reactive({
      inputText: '',
      weatherInfo: {},
      isRecording: false,

      sentimentAnalysisResult: [],
      sentimentAnalysisDetailResultText: function() {
        if(state.sentimentAnalysisResult.length > 0) {
          if(state.sentimentAnalysisResult[0] == '긍정') {
            return "오늘은 컨디션이 좋은데, 평소 하고 싶었던 활동을 하면 좋을 것 같아요 !";
          } else {
            return "컨디션이 좋지 않으니, 실내에서 잔잔한 활동을 하는 걸 추천해요 !"
          }
        } else {
          return "";
        }
      }
    })

    function onClickSTTBtn() {
      if(state.isRecording) {
        stopRecording();
      } else {
        startRecording();
      }

      state.isRecording = !state.isRecording;
    }
    
    async function getWeatherInfo() {
      await axiosHttp.post("/api/common/getWeatherInfo", null, {})
        .then((res) => {
          console.log(res.data);
          state.weatherInfo = res.data.weather_info;

        }).catch((error) => {
          console.log(error);
        });
    }

    const recognition = ref(null);

    const startRecording = () => {
      if (!('webkitSpeechRecognition' in window)) {
        alert('Your browser does not support Web Speech API');
        return;
      }

      recognition.value = new webkitSpeechRecognition();
      recognition.value.continuous = true;
      recognition.value.interimResults = true;
      recognition.value.lang = 'ko-KR'; // 한국어 설정

      recognition.value.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            state.inputText += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        console.log('Interim Transcript:', interimTranscript);
      };

      recognition.value.onerror = (event) => {
        console.error('Speech recognition error:', event);
      };

      recognition.value.onend = () => {
        console.log('Speech recognition ended.');
      };

      recognition.value.start();
    };

    const stopRecording = () => {
      if (recognition.value) {
        recognition.value.stop();
      }
    };

    async function textSentimentAnalysis() {
      await axiosHttp.post("/api/common/textSentimentAnalysis", JSON.stringify({"inputText": state.inputText}), {})
        .then((res) => {
          console.log(res.data);
          state.sentimentAnalysisResult = res.data.analysis_result;
        }).catch((error) => {
          console.log(error);
        });
    }

    if(process.env.NODE_ENV == 'development') {
      console.log("Intro.vue > Development mode");
    } else {
      console.log("Intro.vue > " + process.env.NODE_ENV.toString() + " mode - 해당 화면은 개발 환경에서만 실행됩니다.");
      toast.add({ severity: 'error', summary: '사용 불가', detail: '해당 화면은 AWS 이슈로 Local 환경에서만 사용합니다.', life: 3000 });
      router.push('/home');
    }

    onMounted(()=> {
      if(process.env.NODE_ENV == 'development') {
        getWeatherInfo();
      }
    })


    return {
      ...toRefs(state),
      recognition,
      onClickSTTBtn,textSentimentAnalysis
    }
  }
};
</script>


<style scoped>
.sign-up-terms {
  margin-top: 30px;
  margin-left: 20%;
  margin-right: 20%;
  border: 1px lightgrey solid;
  border-radius: 10px;
  box-sizing: border-box;

  .navbar{
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    input {
      margin-left:5px;
    }
  }

  textarea {
    height: 500px;
    border:none
  }

}

.sign-up-input {
  margin-top:10px;
  padding-bottom: 10px;
  margin-left: 20%;
  margin-right: 20%;
  margin-bottom: 10px;


  .bd-example {
    text-align: left;

    label::before{
      content: "○ ";
    }
  }
}


</style>