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
  } else {
    error.value = "Oopsie, something went wrong";
  }
};
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <h1>Admin Login</h1>

      <p class="subtitle">
        Login to manage your ice cream orders.
      </p>

      <div class="form">
        <label>Email</label>
        <input
          v-model="email"
          type="email"
          placeholder="admin@admin.com"
          @keyup.enter="login"
        />

        <label>Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="Enter your password"
          @keyup.enter="login"
        />

        <p v-if="error" class="error">
          {{ error }}
        </p>

        <button @click="login">
          Login
        </button>
      </div>

      <router-link to="/" class="back-link">
        ← Back to configurator
      </router-link>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&display=swap");

.login-page {
  width: 100%;
  min-height: 100vh;
  background-color: #aee0ff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.login-card {
  width: 100%;
  max-width: 460px;
  background-color: #352c2b;
  padding: 45px;
  border-radius: 20px;
  box-sizing: border-box;
}

h1 {
  font-family: "Mochiy Pop One", sans-serif;
  color: #ffd800;
  font-size: 2.4rem;
  margin: 0 0 10px;
}

.subtitle {
  color: #ffffff;
  margin: 0 0 30px;
  opacity: 0.8;
}

.form {
  display: flex;
  flex-direction: column;
}

label {
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 7px;
}

input {
  width: 100%;
  padding: 15px 16px;
  margin-bottom: 20px;
  border: none;
  border-radius: 10px;
  background-color: #ffffff;
  color: #352c2b;
  font-size: 1rem;
  box-sizing: border-box;
  outline: none;
}

input:focus {
  outline: 3px solid #ffd800;
}

button {
  width: 100%;
  padding: 16px;
  margin-top: 5px;
  border: none;
  border-radius: 10px;
  background-color: #ffd800;
  color: #352c2b;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  background-color: #ffe54d;
  transform: scale(1.01);
}

.error {
  background-color: #ffdddd;
  color: #b42318;
  padding: 12px;
  border-radius: 8px;
  margin: 0 0 15px;
  font-size: 0.9rem;
}

.back-link {
  display: block;
  margin-top: 25px;
  color: #ffffff;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
}

.back-link:hover {
  color: #ffd800;
}

@media (max-width: 600px) {
  .login-card {
    padding: 30px 22px;
  }

  h1 {
    font-size: 1.9rem;
  }
}
</style>