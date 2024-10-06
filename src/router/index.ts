import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: async () => {
      const chunk = await import(
        /* webpackChunkName: "HomePage" */ "../pages/HomePage.vue"
      );
      return chunk;
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
