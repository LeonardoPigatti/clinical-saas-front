<template>
  <div class="fullscreen-root">
    <div class="container" :class="{ 'right-panel-active': isRightPanelActive }">

      <!-- SIGN UP (visual apenas por enquanto) -->
      <div class="form-container sign-up-container">
        <form @submit.prevent>
          <h1>Create Account</h1>

          <span>Use your email</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign Up</button>
        </form>
      </div>

      <!-- SIGN IN (LOGIN REAL) -->
      <div class="form-container sign-in-container">
        <form @submit.prevent="handleLogin">
          <h1>Sign In</h1>

          <input v-model="email" type="email" placeholder="Email" required />
          <input v-model="password" type="password" placeholder="Password" required />

          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
          <p v-if="successMessage" class="success">{{ successMessage }}</p>

          <button type="submit">Entrar</button>
        </form>
      </div>

      <!-- OVERLAY -->
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>Login with your personal info</p>
            <button class="ghost" @click="activateSignIn">Sign In</button>
          </div>

          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your details and start</p>
            <button class="ghost" @click="activateSignUp">Sign Up</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { client } from "../apollo/client";
import { gql } from "@apollo/client/core";
import router from "../router";

const isRightPanelActive = ref(false);
const email = ref("");
const password = ref("");
const successMessage = ref("");
const errorMessage = ref("");

const activateSignUp = () => {
  isRightPanelActive.value = true;
};

const activateSignIn = () => {
  isRightPanelActive.value = false;
};

const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        role
        companyId
      }
    }
  }
`;

const handleLogin = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  try {
    const result = await client.mutate({
      mutation: LOGIN_USER,
      variables: {
        email: email.value,
        password: password.value,
      },
    });

    const data = result.data.login;

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    successMessage.value = "Login realizado com sucesso!";

    setTimeout(() => {
      router.push("/dashboard");
    }, 800);

  } catch (err) {
    errorMessage.value = err.message || "Erro ao fazer login";
  }
};
</script>

<style scoped>
/* FULLSCREEN ROOT */
:global(html),
:global(body) {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: 'Montserrat', sans-serif;
  background: #f6f5f7;
}

.fullscreen-root {
  width: 100vw;
  height: 100vh;
}

.container {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: #fff;
}

.form-container {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  transition: all 0.6s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign-in-container {
  left: 0;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
}

form {
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

input {
  width: 280px;
  padding: 10px;
  margin: 8px 0;
  border: none;
  background: #eee;
}

button {
  margin-top: 10px;
  padding: 12px 40px;
  border-radius: 20px;
  border: none;
  background: #FF4B2B;
  color: white;
  cursor: pointer;
}

button.ghost {
  background: transparent;
  border: 1px solid white;
}

.overlay-container {
  position: absolute;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: linear-gradient(to right, #FF4B2B, #FF416C);
  color: white;
  position: relative;
  left: -100%;
  width: 200%;
  height: 100%;
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
}

.error {
  color: red;
  font-size: 14px;
}

.success {
  color: green;
  font-size: 14px;
}
</style>
