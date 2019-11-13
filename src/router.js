import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Main from "./views/Main.vue";
import Forms from "./views/Forms";
import { Form } from "ant-design-vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/Register",
      name: "forms",
      component: Forms
    },
    {
      path: "/Main",
      name: "main",
      component: Main,
      children: [
        {
          path: "Users",
          name: "users",
          component: () =>
            import(/* webpackChunkName: "Plataforma" */ "./views/Users.vue")
        },
        {
          path: "Training",
          name: "training",
          component: () =>
            import(/* webpackChunkName: "Plataforma" */ "./views/Training.vue")
        },
        {
          path: "Campaing",
          name: "campaing",
          component: () =>
            import(/* webpackChunkName: "Plataforma" */ "./views/Campaing.vue")
        },
        {
          path: "Club",
          name: "club",
          component: () =>
            import(/* webpackChunkName: "Plataforma" */ "./views/Club.vue")
        },
        {
          path: "Messaging",
          name: "messaging",
          component: () =>
            import(/* webpackChunkName: "Plataforma" */ "./views/Messaging.vue")
        }
      ]
      // beforeEnter(to, from, next) {
      //   if (localStorage.getItem("token") && localStorage.getItem("role")) {
      //     next();
      //   } else {
      //     next({ name: "login" });
      //   }
      // }
    }
  ]
});
