<template>
  <div class="h-100" style="padding-left: 20%; padding-right: 20%; padding-top:10px; padding-bottom:10px; background: #f8f9fa; overflow: auto">
    <div class="d-flex" style="justify-content: center">
<!--      <h2 style="font-weight: bolder">SSAI - Sogang Spring AI</h2>-->
      <img :src="imageSrc_logo">
    </div>

    <div class="d-flex mt-4" style="justify-content: center; height: 200px">
      <img :src="imageSrc_gif">
    </div>

    <div class="mt-4" style="justify-content: center">
      <h3 style="font-weight: bolder">"사전건강지키미 플랫폼" 유비무환은, </h3>
      <ul class="pl-4" style="font-style: italic; font-weight: bold">
        <li>당신의 움직임을 영상으로 인식합니다.</li>
        <li>검사 결과 통계 리포트를 시각화하여 제공합니다. </li>
        <li>결과를 기반으로 LLM 텍스트 형태의 보고서를 제공합니다. </li>
      </ul>
    </div>

    <div class="mt-4" style="justify-content: center">
      <h3 style="font-weight: bolder">이런 분들에게 추천합니다. </h3>
      <ul class="pl-4" style="font-style: italic; font-weight: bold">
        <li>평소 내 컨디션이 어떤지 궁금한 사람</li>
        <li>잠에서 깼을 때, 왠지 모르게 피곤한 사람</li>
        <li>나의 평소 자세가 어떤지 궁금한 사람 </li>
      </ul>
    </div>

    <div class="mt-4" style="justify-content: center">
      <h3 style="font-weight: bolder">이러한 검사를 지원합니다. </h3>
      <ul class="pl-4" style="font-style: italic; font-weight: bold">
        <li>일상 검사 - 평소 일할 때, 얼마나 피곤한지 검사합니다.</li>
        <li>수면 검사 - 잠잘 때, 어떤 자세로 수면하는지 검사합니다.</li>
        <li>자세 검사 - 평소 일할 때, 어떤 자세로 일하는지 검사합니다.</li>
      </ul>
    </div>
  </div>
</template>


<script>
import { reactive, toRefs } from "vue";
import { useToast } from 'primevue/usetoast';

export default {
  name: "Home",
  props: {

  },
  setup() {
    const toast = useToast();
    const state = reactive({
      imageSrc_logo: require('@/assets/images/yoube_title_transparent.png'),
      imageSrc_gif: require('@/assets/images/yoube.gif'),
    })

    function testToast(){
      console.log("@@@testToast")
      toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
    }


    return {
      ...toRefs(state),
      testToast,
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
