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
    },
    {
        path: "/admin/orders/:id",
        component: OrderDetailView,
    },
    {
         path: "/",
        component: ConfiguratorView,
    },
    ],
    
});

export default router;