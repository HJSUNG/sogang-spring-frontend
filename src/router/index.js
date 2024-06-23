import { createRouter, createWebHistory } from "vue-router";
import AppMain from "@/views/AppMain.vue";

const routes = [
  {
    path: "/",
    name: "AppMain",
    component: AppMain,
    redirect: '/home',
    children: [
      {
        path: "home",
        name: "home",
        component: () =>  import("/src/app/login/views/Home.vue"),
      },
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
        path: "objectDetection_normal",
        name: "objectDetection_normal",
        component: () =>  import("/src/app/object_detection/views/ObjectDetection_Normal.vue"),
      },
      {
        path: "objectDetection_pose",
        name: "objectDetection_pose",
        component: () =>  import("/src/app/object_detection/views/ObjectDetection_Pose.vue"),
      },
      {
        path: "objectDetection_sleeping",
        name: "objectDetection_sleeping",
        component: () =>  import("/src/app/object_detection/views/ObjectDetection_Sleeping.vue"),
      },
      {
        path: "ObjectDetectionReport",
        name: "ObjectDetectionReport",
        component: () =>  import("/src/app/object_detection/views/ObjectDetectionReport.vue"),
      },
      {
        path: "Intro",
        name: "Intro",
        component: () =>  import("/src/app/Intro.vue"),
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
