<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const sceneContainer = ref(null);
const iceCreamModel = ref(null);

const flavors = [
  "Chunky Monkey",
  "Chocolate Fudge Brownie",
  "Strawberry Doughnut-eee",
  "Brookieees & Cream",
];

const toppings = ["Oreo", "Banana", "Sprinkles"];

const selectedFlavor = ref("");
const selectedTopping = ref("");
const selectedCupOrCone = ref("");
const customerName = ref("");
const address = ref("");

const selectFlavor = (flavor) => {
    selectedFlavor.value = flavor;

    const colors = {
        "Chunky Monkey": "#f5d76e",
        "Chocolate Fudge Brownie": "#5c3317",
        "Strawberry Doughnut-eee": "#ff9ecb",
        "Brookieees & Cream": "#f2f2f2",
    };

    if (!iceCreamModel.value) return;

    iceCreamModel.value.traverse((child) => {
        if (child.isMesh) {
        child.material.color.set(colors[flavor]);
        }
    });
};

onMounted(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(400, 400);
    renderer.setClearColor("#bdefff");

    sceneContainer.value.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight("#ffffff", 1.5);
    scene.add(ambientLight);

    const light = new THREE.DirectionalLight("#ffffff", 2);
    light.position.set(2, 2, 5);
    scene.add(light);

    const loader = new GLTFLoader();

    loader.load(
        "/models/icecream.glb",
        (gltf) => {
        const model = gltf.scene;

        model.scale.set(2, 2, 2);
        model.position.y = -1;

        iceCreamModel.value = model;

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

        if (iceCreamModel.value) {
            iceCreamModel.value.rotation.y += 0.005;
        }

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
  <div ref="sceneContainer" style="width: 400px; height: 400px; margin: auto;"></div>

  <h1>Create Your Ice Cream</h1>
  <h2>Choose a flavor</h2>
  <button v-for="flavor in flavors":key="flavor"@click="selectFlavor(flavor)">{{ flavor }}</button>

  <h2>Choose a topping</h2>
  <button v-for="topping in toppings":key="topping"@click="selectedTopping = topping">{{ topping }}</button>

  <h2>Cup or Cone</h2>
  <button @click="selectedCupOrCone = 'Cup'">Cup</button>
  <button @click="selectedCupOrCone = 'Cone'">Cone</button>

  <h2>Your Selection</h2>
  <p>Flavor:{{ selectedFlavor }}</p>
  <p>Topping:{{ selectedTopping }}</p>
  <p>Cup or Cone:{{ selectedCupOrCone }}</p>

  <h2>Your Information</h2>
  <input v-model="customerName" placeholder="Your name" />
  <input v-model="address" placeholder="Your address" />

  <button @click="placeOrder">Place Order</button>
</template>