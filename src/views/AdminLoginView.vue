<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const login = () => {
    if (email.value === "admin@admin.com" && password.value === "Admin") {
        localStorage.setItem("isAdmin", "true");
        router.push("/admin/orders");
    } 
    else {
        error.value = "Oopsie, something went wrong";
    }
};
</script>

<template>

    <h1>Admin Login</h1>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
    <p>{{ error }}</p>

</template>