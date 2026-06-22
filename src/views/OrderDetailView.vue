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

const updateStatus = async (status) => {
    const response = await fetch(
        `http://localhost:3000/orders/${route.params.id}`,
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            status: status,
        }),
    }
    );

    order.value = await response.json();
};
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

    <button @click="updateStatus('te verwerken')">
        Te verwerken
    </button>

    <button @click="updateStatus('verzonden')">
        Verzonden
    </button>

    <button @click="updateStatus('geannuleerd')">
        Geannuleerd
    </button>
  </div>
</template>