import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Main from "./views/Main.vue";
import Forms from "./views/Forms.vue";
import Recovery from "./views/Recovery.vue";

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
      path: "/Recovery",
      name: "recovery",
      component: Recovery
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
          path: "Business",
          name: "business",
          component: () =>
            import(/* webpackChunkName: "Plataforma" */ "./views/Stores.vue")
        },
        {
          path: "Training",
          name: "training",
          component: () =>
            import(/* webpackChunkName: "Plataforma" */ "./views/Training.vue")
        },
        {
          path: "Blog",
          name: "blog",
          component: () =>
            import(/* webpackChunkName: "Plataforma" */ "./views/Blog.vue")
        },
        {
          path: "Campaing",
          name: "campaing",
          component: () =>
            import(/* webpackChunkName: "Plataforma" */ "./views/Campaing.vue")
        },
        {
          path: "ViewCampaing",
          name: "viewcampaing",
          component: () =>
            import(
              /* webpackChunkName: "Plataforma" */ "./views/ViewCampaing.vue"
            )
        },
        {
          path: "Club",
          name: "club",
          component: () =>
            import(/* webpackChunkName: "Plataforma" */ "./views/Club.vue")
        },
        {
          path: "Stores",
          name: "stores",
          component: () =>
            import(/* webpackChunkName: "Plataforma" */ "./views/Club.vue")
        },
        {
          path: "Notification",
          name: "notification",
          component: () =>
            import(
              /* webpackChunkName: "Plataforma" */ "./views/Notification.vue"
            )
        },
        {
          path: "Messaging",
          name: "messaging",
          component: () =>
            import(/* webpackChunkName: "Plataforma" */ "./views/Messaging.vue")
        },
        {
          path: "Themes",
          name: "themes",
          component: () =>
            import(/* webpackChunkName: "Plataforma" */ "./views/Themes.vue")
        },
        {
          path: "CampaingDetail",
          name: "campaingDetail",
          props: true,
          component: () =>
            import(
              /* webpackChunkName: "Plataforma" */ "./views/CampaingDetail.vue"
            )
        },
        {
          path: "EditCampaing",
          name: "editCampaing",
          component: () =>
            import(
              /* webpackChunkName: "Plataforma" */ "./views/EditCampaing.vue"
            )
        },
        {
          path: "QuizzDetail",
          name: "quizzDetail",
          component: () =>
            import(
              /* webpackChunkName: "Plataforma" */ "./views/QuizzDetail.vue"
            )
        },
        {
          path: "NewBlog",
          name: "newblog",
          component: () =>
            import(/* webpackChunkName: "Plataforma" */ "./views/NewBlog.vue")
        }
      ],
      beforeEnter(to, from, next) {
        if (localStorage.getItem("token")) {
          next();
        } else {
          next({ name: "login" });
        }
      }
    }
  ]
});
