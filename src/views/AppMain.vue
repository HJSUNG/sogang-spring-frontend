<template>
  <div id="main" class="d-flex h-100">
    <AppHeader></AppHeader>
    <div id="wrap" class="wrap">
      <div class="content p-0" style="position: relative;flex:1;">
        <main class="content_body">
          <AppSection class="h-100">
            <AppArticle>
              <router-view></router-view>
            </AppArticle>
          </AppSection>
        </main>
      </div>
    </div>
    <AppFooter></AppFooter>
  </div>

  <Toast/>

</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import AppSection from "@/components/AppSection.vue";
import AppArticle from "@/components/AppArticle.vue";

import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

export default {
  name: "AppMain",
  components: {
    AppHeader,
    AppFooter,
    AppSection,
    AppArticle
  },
  setup() {
    const toast = useToast();
  }
};
</script>


<style scoped>
#main {
  flex-direction: column
}

.wrap {
  position: relative;
  display: flex;
  height: 100%;
  overflow: hidden;

  .content {
    //position: relative;
    display: flex;
    flex-direction: column;
    //flex: 1;
    padding: 8px;
    box-sizing: border-box;
    transition: all 0.1s;
    overflow-x: auto;

    .content_body {
      position: relative;
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      z-index: 2;
    }
  }
}

footer {
  position: relative;
  bottom: 0;
  width: 100%;
  background-color: #f8f9fa; /* 원하는 배경색으로 변경 가능 */
  padding: 20px; /* 원하는 패딩 값으로 변경 가능 */
}

</style>