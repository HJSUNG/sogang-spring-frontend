<template>
  <div class="d-flex flex-column h-100 sign-up-input">
    <div class="card">
      <Panel header="사용자 정보">
        <p class="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Panel>
    </div>

    <div>
      <Splitter style="height: 150px" class="mt-2 mb-2">
        <SplitterPanel class="flex align-items-center justify-content-center"> Panel 1 </SplitterPanel>
        <SplitterPanel class="flex align-items-center justify-content-center"> Panel 2 </SplitterPanel>
        <SplitterPanel class="flex align-items-center justify-content-center"> Panel 3 </SplitterPanel>
      </Splitter>
    </div>

    <div class="d-flex">
      <input type="text" class="form-control" id="chatbotInput" placeholder="챗봇에 질문하기" v-model="chatbotInputText">
      <button type="button" class="btn btn-primary" style="margin-left: 10px;width: 105px">{{'질문하기'}}</button>
    </div>
    
    <div class="card mt-2" style="flex:1">
      <ScrollPanel style="width: 100%; height: 100%">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
          voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
        </p>
        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
          officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
        </p>
        <p class="m-0">
          Quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non
          recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat
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
    })

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
  margin-bottom: 10px;
}
</style>