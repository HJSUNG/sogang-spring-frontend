import { createRouter, createWebHistory } from "vue-router";
import AppMain from "@/views/AppMain.vue";

const routes = [
  {
    path: "/",
    name: "AppMain",
    component: AppMain,
    redirect: '/objectDetection',
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
      {
        path: "objectDetection",
        name: "objectDetection",
        component: () =>  import("/src/app/object_detection/views/ObjectDetection.vue"),
      },
      {
        path: "ObjectDetectionReport",
        name: "ObjectDetectionReport",
        component: () =>  import("/src/app/object_detection/views/ObjectDetectionReport.vue"),
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
