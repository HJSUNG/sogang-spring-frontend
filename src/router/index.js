import { createRouter, createWebHistory } from "vue-router";
import AppMain from "@/components/AppMain.vue";

const routes = [
  {
    path: "/",
    name: "AppMain",
    component: AppMain,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
