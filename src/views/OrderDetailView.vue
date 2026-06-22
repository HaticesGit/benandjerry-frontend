<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const order = ref(null);

onMounted(async () => {
  const response = await fetch(
    `http://localhost:3000/orders/${route.params.id}`
  );

  order.value = await response.json();
});
</script>

<template>
  <div v-if="order">
    <h1>{{ order.customerName }}</h1>

    <p>Address: {{ order.address }}</p>
    <p>Flavor: {{ order.flavor }}</p>
    <p>Topping: {{ order.topping }}</p>
    <p>Cup or Cone: {{ order.cupOrCone }}</p>
    <p>Status: {{ order.status }}</p>
    <p>Total Price: €{{ order.totalPrice }}</p>
  </div>
</template>