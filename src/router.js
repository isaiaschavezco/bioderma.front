import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Main from "./views/Main.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/Main",
      name: "main",
      component: Main,
      children: [{
        path: 'Users',
        name: 'users',
        component: () => import(/* webpackChunkName: "Plataforma" */ './views/Users.vue')
      }
      ]
      // beforeEnter(to, from, next) {
      //   if (localStorage.getItem("token") && localStorage.getItem("role")) {
      //     next();
      //   } else {
      //     next({ name: "login" });
      //   }
      // }
    },
  ]
});
