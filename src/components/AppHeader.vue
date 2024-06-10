<template>
  <header class="p-3 text-bg-dark">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-between">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
            <use xlink:href="#bootstrap"></use>
          </svg>
        </a>

        <ul class="nav me-auto mb-2 mb-lg-0">
          <li><a class="nav-link px-2 text-secondary" style="cursor: pointer" @click="routerPush('/home')">Home</a></li>
          <li><a class="nav-link px-2 text-white" style="cursor: pointer" @click="routerPush('/ObjectDetection')">검사</a></li>
          <li><a class="nav-link px-2 text-white" style="cursor: pointer" @click="routerPush('/ObjectDetectionReport')">검사이력</a></li>
          <!-- <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li> -->
          <!-- <li><a href="#" class="nav-link px-2 text-white">About</a></li> -->
        </ul>

        <div class="text-white me-3">
          {{USER_NM == "" ? "" : USER_NM + " 님 환영합니다."}}
        </div>

        <div class="text-end">
          <button type="button" class="btn btn-outline-light me-2" v-if="!isLogin" @click="onClickLoginBtn">Login</button>
          <button type="button" class="btn btn-outline-light me-2" v-if="isLogin" @click="onClickLogoutBtn">Logout</button>
          <button type="button" class="btn btn-warning" v-if="!isLogin" @click="onClickSignUpBtn">Sign-up</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>


import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "AppHeader",
  setup() {
    const router = useRouter();
    const store = useStore();

    const USER_NM = computed(()=>store.getters['login/userInfo'].USER_NM);
    const accessToken = computed(()=>store.getters['login/userInfo'].accessToken);
    const isLogin = computed(() => accessToken.value !== "");
    function routerPush(url) {
      router.push(url)
    }

    function onClickLoginBtn() {
      router.push('login');
    }

    function onClickLogoutBtn() {
      store.commit('login/logout', {});
    }

    function onClickSignUpBtn() {
      router.push('signUp')
    }

    return {
      USER_NM,accessToken,isLogin,
      routerPush,
      onClickLoginBtn,onClickSignUpBtn,onClickLogoutBtn,
    }
  }
};
</script>


<style scoped>

</style>