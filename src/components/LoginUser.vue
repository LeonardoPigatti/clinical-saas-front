<template>
  <div class="login">
    <h1>Login</h1>

    <form @submit.prevent="handleLogin">
      <div>
        <label>Email:</label>
        <input v-model="email" type="email" required />
      </div>

      <div>
        <label>Senha:</label>
        <input v-model="password" type="password" required />
      </div>

      <button type="submit">Entrar</button>
    </form>

    <p v-if="successMessage" style="color: green">{{ successMessage }}</p>
    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import { client } from "../apollo/client";
import { gql } from "@apollo/client/core";
import router from '../router';


export default {
  setup() {
    const email = ref("");
    const password = ref("");

    const successMessage = ref("");
    const errorMessage = ref("");

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
  try {
    const result = await client.mutate({
      mutation: LOGIN_USER,
      variables: { email: email.value, password: password.value },
    });

    const data = result.data.login;

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    // Redireciona para dashboard
    router.push('/dashboard');

  } catch (err) {
    errorMessage.value = err.message;
    successMessage.value = '';
  }
};


    return {
      email,
      password,
      successMessage,
      errorMessage,
      handleLogin,
    };
  },
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

form div {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 4px;
}

input {
  width: 100%;
  padding: 6px;
  box-sizing: border-box;
}

button {
  padding: 8px 12px;
  cursor: pointer;
}
</style>
