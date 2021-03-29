import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import TheContent from "@/components/layout/TheContent.vue";
import Registration from "@/pages/Registration.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/content",
        name: "TheContent",
        component: TheContent,
        children: [
          {
            path: "/registration",
            name: "Registration",
            component: Registration,
          },
        ],
      },
    ],
  },
  // {
  //   path: "/status",
  //   name: "Status",
  //   component: QueueStatus,
  //   // path: "/about",
  //   // name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // component: () =>
  //   //   import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
