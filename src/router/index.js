import { createRouter, createWebHistory } from "vue-router";

import AdminLoginView from "../views/AdminLoginView.vue";
import OrdersView from "../views/OrdersView.vue";
import OrderDetailView from "../views/OrderDetailView.vue";
import ConfiguratorView from "../views/ConfiguratorView.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/admin/login",
      component: AdminLoginView,
    },
    {
      path: "/admin/orders",
      component: OrdersView,
      meta: { requiresAdmin: true },
    },
    {
      path: "/admin/orders/:id",
      component: OrderDetailView,
      meta: { requiresAdmin: true },
    },
    {
      path: "/",
      component: ConfiguratorView,
    },
  ],
});

router.beforeEach((to) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (to.meta.requiresAdmin && !isAdmin) {
    return "/admin/login";
  }
});

export default router;