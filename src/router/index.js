import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

// Layout components
import AuthLayout from "@/layouts/AuthLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";

// Pages
const Home = () => import("@/views/Home.vue");
const Login = () => import("@/views/auth/Login.vue");
const Register = () => import("@/views/auth/Register.vue");
const Templates = () => import("@/views/templates/TemplateList.vue");
// const TemplatePreview = () => import("@/views/templates/TemplatePreview.vue");
const TemplateEdit = () => import("@/views/templates/TemplateEdit.vue");
const Dashboard = () => import("@/views/Dashboard.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "login",
        name: "login",
        component: Login,
      },
      {
        path: "register",
        name: "register",
        component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "/templates",
        name: "templates",
        component: Templates,
      },
      // {
      //   path: "/templates/:id/preview",
      //   name: "template-preview",
      //   component: TemplatePreview,
      //   props: true,
      // },
      {
        path: "/templates/:id/edit",
        name: "template-edit",
        component: TemplateEdit,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route guards
// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore();

//   if (to.meta.requiresAuth && !authStore.isAuthenticated) {
//     next({ name: "login" });
//   } else if (
//     (to.name === "login" || to.name === "register") &&
//     authStore.isAuthenticated
//   ) {
//     next({ name: "dashboard" });
//   } else {
//     next();
//   }
// });

export default router;
