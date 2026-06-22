import { createRouter, createWebHistory } from "vue-router";

import AdminLoginView from "../views/AdminLoginView.vue";
import OrdersView from "../views/OrdersView.vue";
import OrderDetailView from "../views/OrderDetailView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
    {
        path: "/",
        redirect: "/admin/login",
    },
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
    ],
});

export default router;