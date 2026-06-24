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

const toppings = [
    "Oreo", 
    "Banana", 
    "Sprinkles"
];

const selectedFlavor = ref("");
const selectedTopping = ref("");
const customerName = ref("");
const address = ref("");
const message = ref("");
const isMenuOpen = ref(false);

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
        if (child.isMesh && child.name === "IceCream_3_3") {
            child.material.color.set(colors[flavor]);
        }
    });  
};

const selectTopping = (topping) => {
    selectedTopping.value = topping;
    const toppingColors = {
        "Oreo": "#1c1c1c",
        "Banana": "#ffe066",
        "Sprinkles": "#ff4fd8",
    };

    if (!iceCreamModel.value) return;
    iceCreamModel.value.traverse((child) => {
        if (child.isMesh && child.name === "IceCream_3_2") {
            child.material.color.set(toppingColors[topping]);
        }
    });
};  
const flavorClass = (flavor) => {
    const classes = {
        "Chunky Monkey": "chunky-monkey",
        "Chocolate Fudge Brownie": "chocolate",
        "Strawberry Doughnut-eee": "strawberry",
        "Brookieees & Cream": "brookie",
    };
  return classes[flavor];
};

const toppingClass = (topping) => {
  const classes = {
    Oreo: "oreo",
    Banana: "banana",
    Sprinkles: "sprinkles",
  };
  return classes[topping];
};

onMounted(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(650, 650);
    renderer.setClearColor("#aee0ff");

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

    model.scale.set(4, 4, 4);

    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());

    model.position.x = -center.x;
    model.position.y = -center.y;
    model.position.z = -center.z;

    iceCreamModel.value = model;

    scene.add(model);
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
    if (!selectedFlavor.value || !selectedTopping.value || !customerName.value || !address.value){
        message.value = "Please complete your order.";
        return;
    }
    const order = {
        customerName: customerName.value,
        address: address.value,
        flavor: selectedFlavor.value,
        topping: selectedTopping.value,
        totalPrice: 4.5,
    };

    await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    });

    message.value = "Order placed!";
};
</script>

<template>
  <div class="configurator-page">
    <button class="menu-button" @click="isMenuOpen = !isMenuOpen">
  ☰
</button>
        <div class="ice-preview">
            <div ref="sceneContainer" class="scene">
            </div>
        </div>

        <div class="configurator-panel":class="{ open: isMenuOpen }">
            <h1>Create your ice cream</h1>

            <h2>Choose a flavor</h2>
            <div class="option-grid">
                <button v-for="flavor in flavors":key="flavor":class="[flavorClass(flavor),{ selected: selectedFlavor === flavor }]"@click="selectFlavor(flavor)">
                    {{ flavor }}
                </button>
            </div>

            <h2>Sprinkle flavour</h2>
            <div class="option-row">
                <button v-for="topping in toppings":key="topping":class="[toppingClass(topping),{ selected: selectedTopping === topping }]"@click="selectTopping(topping)">
                    {{ topping }}
                </button>
            </div>

            <div class="form-row">
                <input v-model="customerName" placeholder="Name" />
                <input v-model="address" placeholder="Address" />
            </div>

            <button class="order-button" @click="placeOrder">
                Place order
            </button>

            <p v-if="message" class="message">{{ message }}</p>
        </div>
    </div>
</template>



<style scoped>
.configurator-page {
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
}

.ice-preview {
    background-color: #aee0ff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.scene {
    width: 550px;
    height: 550px;
}

.configurator-panel {
    background-color: #352c2b;
    padding: 30px;
    color: white;
    display: flex;
    flex-direction: column;
}

h1 {
    color: #ffd800;
    font-size: 3rem;
    margin: 0 0 15px 0;
}

h2 {
    color: white;
    font-size: 1.8rem;
    margin-top: 15px;
    margin-bottom: 10px;
}

.option-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
}

.option-row {
    display: flex;
    gap: 15px;
}

button {
    border: none;
    border-radius: 10px;
    background-color: #563838;
    color: white;
    padding: 18px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: 0.2s;
}

button:hover {
    transform: scale(1.02);
}

.selected {
    outline: 4px solid white;
    transform: scale(1.03);
}

.form-row {
    display: flex;
    gap: 15px;
    margin-top: 20px;
}

input {
    flex: 1;
    padding: 15px;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    text-align: center;
}

.order-button {
    width: 100%;
    margin-top: 20px;
    background-color: #ffd800;
    color: #352c2b;
    font-size: 1.6rem;
    font-weight: bold;
    padding: 18px;
}

.order-button:hover {
    background-color: #ffe54d;
}

.selection-box {
    margin-top: 15px;
    background-color: rgba(255, 255, 255, 0.08);
    padding: 15px;
    border-radius: 10px;
}

.selection-box p {
    margin: 8px 0;
}

.message {
    margin-top: 15px;
    color: #ffd800;
    font-weight: bold;
}

.chunky-monkey {
    background-color: #f7d774;
    color: #352c2b;
}

.chocolate {
    background-color: #6f4e37;
    color: white;
}

.strawberry {
    background-color: #ff8fb8;
    color: white;
}

.brookie {
    background-color: #e8d9c5;
    color: #352c2b;
}

.oreo {
    background-color: #2d2424;
    color: white;
}

.banana {
    background-color: #ffe066;
    color: #352c2b;
}

.sprinkles {
    background-color: #ff4fd8;
    color: white;
}
.menu-button {
  display: none;
}

@media (max-width: 900px) {
  .configurator-page {
    height: 100vh;
    width: 100vw;
    display: block;
    overflow: hidden;
  }

  .ice-preview {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  .scene {
    width: 100vw;
    height: 100vh;
    transform: none;
  }

  .menu-button {
    display: block;
    position: fixed;
    top: 16px;
    right: 16px;
    z-index: 20;
    background: #ffd800;
    color: #352c2b;
    border-radius: 50%;
    width: 52px;
    height: 52px;
    font-size: 28px;
    padding: 0;
  }

  .configurator-panel {
    position: fixed;
    top: 0;
    right: -100vw;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 32px;
    box-sizing: border-box;
    transition: right 0.3s ease;
  }

  .configurator-panel.open {
    right: 0;
  }

  .form-row {
    flex-direction: column;
  }

  .option-row {
    flex-wrap: wrap;
  }

  input {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>