<script setup>
import { ref, onMounted } from "vue";

const orders = ref([]);

onMounted(async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`);
  orders.value = await response.json();
});
</script>

<template>
  <div class="orders-page">
    <router-link
      to="/"
      class="back-button"
    >
      ← Back to Configurator
    </router-link>

    <h1>Orders</h1>

    <div class="orders-grid">
      <div
        v-for="order in orders"
        :key="order._id"
        class="order-card"
      >
        <h2>{{ order.customerName }}</h2>

        <p>
          {{ order.flavor }}
        </p>

        <p>
          {{ order.topping }}
        </p>

        <p class="status">
          {{ order.status }}
        </p>

        <router-link
          :to="`/admin/orders/${order._id}`"
          class="view-button"
        >
          View Order
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.orders-page {
  padding: 40px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

h1, h2, h3, h4, h5 p{
  color: #352c2b;
}

.orders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.order-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.order-card h2 {
  margin-bottom: 15px;
}

.status {
  font-weight: bold;
  margin: 15px 0;
}

.view-button {
  display: inline-block;
  text-decoration: none;
  background: #ffd800;
  color: #352c2b;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: bold;
}

.back-button {
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px 16px;
  color: #352c2b;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
}
</style>