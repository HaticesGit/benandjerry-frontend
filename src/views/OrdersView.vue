<script setup>
import { ref, onMounted } from "vue";

const orders = ref([]);

onMounted(async () => {
  const response = await fetch("http://localhost:3000/orders");
  orders.value = await response.json();
});
</script>

<template>
  <h1>Orders</h1>

  <div v-for="order in orders" :key="order._id">
    <router-link :to="`/admin/orders/${order._id}`">
      {{ order.customerName }}
    </router-link>

    <p>{{ order.flavor }} - {{ order.topping }}</p>
    <p>Status: {{ order.status }}</p>

    <hr />
  </div>
</template>