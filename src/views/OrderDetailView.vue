<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const order = ref(null);
const router = useRouter();

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

const deleteOrder = async () => {
    await fetch(
        `http://localhost:3000/orders/${route.params.id}`,
    {
        method: "DELETE",
    }
  );

  router.push("/admin/orders");
};

</script>

<template>
  <div class="detail-page" v-if="order">
    <div class="detail-card">
      <h1>{{ order.customerName }}</h1>

      <p><strong>Address:</strong> {{ order.address }}</p>
      <p><strong>Flavor:</strong> {{ order.flavor }}</p>
      <p><strong>Topping:</strong> {{ order.topping }}</p>
      <p><strong>Status:</strong> {{ order.status }}</p>
      <p><strong>Total:</strong> €{{ order.totalPrice }}</p>

      <div class="status-buttons">
        <button @click="updateStatus('te verwerken')">Te verwerken</button>
        <button @click="updateStatus('verzonden')">Verzonden</button>
        <button @click="updateStatus('geannuleerd')">Geannuleerd</button>
      </div>

      <button class="delete-button" @click="deleteOrder">
        Delete Order
      </button>

      <router-link to="/admin/orders" class="back-link">
        Back to orders
      </router-link>
    </div>
  </div>
</template> 

<style scoped>
.detail-page {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #aee0ff;
}

.detail-card {
    background: white;
    padding: 40px;
    border-radius: 16px;
    width: 500px;
    box-shadow: 0 2px 14px rgba(0, 0, 0, 0.15);
}

h1 {
    color: #352c2b;
}

p {
     margin: 12px 0;
}

.status-buttons {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}

button {
    padding: 12px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.delete-button {
    width: 100%;
    background: #e6302a;
    color: white;
    margin-top: 20px;
}

.back-link {
    display: block;
    margin-top: 20px;
    color: #352c2b;
    font-weight: bold;
}
</style>