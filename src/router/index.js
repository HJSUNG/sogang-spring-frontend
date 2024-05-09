import { createRouter, createWebHistory } from "vue-router";
import AppMain from "@/views/AppMain.vue";

const routes = [
  {
    path: "/",
    name: "AppMain",
    component: AppMain,
    children: [
      {
        path: "login",
        name: "login",
        component: () =>  import("/src/app/login/views/Login.vue"),
      },
      {
        path: "signUp",
        name: "signUp",
        component: () =>  import("/src/app/login/views/SignUp.vue"),
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
