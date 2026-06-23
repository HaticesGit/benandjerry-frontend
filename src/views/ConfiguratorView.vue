<script setup>
import { ref } from "vue";

const flavors = [
    "Chunky Monkey",
    "Chocolate Fudge Brownie",
    "Strawberry Doughnut-eee",
    "Brookieees & Cream",
];

const toppings = [
    "Oreo",
    "Banana",
    "Sprinkles",
];

const selectedFlavor = ref("");
const selectedTopping = ref("");
const selectedCupOrCone = ref("");
const customerName = ref("");
const address = ref("");
const totalPrice = ref(4.5);

const placeOrder = async () => {
const order = {
    customerName: customerName.value,
    address: address.value,
    flavor: selectedFlavor.value,
    topping: selectedTopping.value,
    cupOrCone: selectedCupOrCone.value,
    totalPrice: 4.5,
};

await fetch("http://localhost:3000/orders", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
});

alert("Order placed!");
};

</script>

<template>
    <h1>Create Your Ice Cream</h1>

    <h2>Choose a flavor</h2>

    <button v-for="flavor in flavors":key="flavor"@click="selectedFlavor = flavor">
        {{ flavor }}
    </button>

  <h2>Choose a topping</h2>

    <button v-for="topping in toppings":key="topping"@click="selectedTopping = topping">
        {{ topping }}
    </button>

    <h2>Cup or Cone</h2>

    <button @click="selectedCupOrCone = 'Cup'">
        Cup
    </button>

    <button @click="selectedCupOrCone = 'Cone'">
        Cone
    </button>

    <h2>Your Selection</h2>

    <p>Flavor:{{ selectedFlavor }}</p>
    <p>Topping:{{ selectedTopping }}</p>
    <p>Cup or Cone:{{ selectedCupOrCone }}</p>

    <h2>Your Information</h2>

    <input
    v-model="customerName"
    placeholder="Your name"
    />

    <input
    v-model="address"
    placeholder="Your address"
    />

    <button @click="placeOrder">
        Place Order
    </button>
</template>