<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const sceneContainer = ref(null);

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

onMounted(() => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    400 / 400,
    0.1,
    1000
  );

  camera.position.z = 4;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  renderer.setSize(400, 400);
  renderer.setClearColor(0xbdefff);

  sceneContainer.value.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(
    0xffffff,
    3
  );

  light.position.set(2, 2, 5);
  scene.add(light);

  const loader = new GLTFLoader();

  loader.load(
    "/models/icecream.glb",

    (gltf) => {
      const model = gltf.scene;

      model.scale.set(2, 2, 2);
      model.position.y = -1;

      scene.add(model);

      console.log("Model loaded!");
    },

    undefined,

    (error) => {
      console.error(error);
    }
  );

  const animate = () => {
    requestAnimationFrame(animate);

    scene.rotation.y += 0.005;

    renderer.render(scene, camera);
  };

  animate();
});

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
  <div
    ref="sceneContainer"
    style="width: 400px; height: 400px; margin: auto;"
  ></div>

  <h1>Create Your Ice Cream</h1>

  <h2>Choose a flavor</h2>

  <button
    v-for="flavor in flavors"
    :key="flavor"
    @click="selectedFlavor = flavor"
  >
    {{ flavor }}
  </button>

  <h2>Choose a topping</h2>

  <button
    v-for="topping in toppings"
    :key="topping"
    @click="selectedTopping = topping"
  >
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

  <p>Flavor: {{ selectedFlavor }}</p>
  <p>Topping: {{ selectedTopping }}</p>
  <p>Cup or Cone: {{ selectedCupOrCone }}</p>

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