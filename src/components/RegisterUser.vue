<template>
  <div class="register">
    <h1>Cadastro de Usuário</h1>

    <form @submit.prevent="handleRegister">
      <div>
        <label>Nome:</label>
        <input v-model="name" type="text" required />
      </div>

      <div>
        <label>Email:</label>
        <input v-model="email" type="email" required />
      </div>

      <div>
        <label>Senha:</label>
        <input v-model="password" type="password" required />
      </div>

      <div>
        <label>Role:</label>
        <select v-model="role" required>
          <option value="" disabled>Escolha o role</option>
          <option value="admin">Admin</option>
          <option value="doctor">Doctor</option>
          <option value="staff">Staff</option>
        </select>
      </div>

      <div>
        <label>Company ID:</label>
        <input v-model="companyId" type="text" required />
      </div>

      <button type="submit">Cadastrar</button>
    </form>

    <p v-if="successMessage" style="color: green">{{ successMessage }}</p>
    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import { client } from "../apollo/client";
import { gql } from "@apollo/client/core";

export default {
  setup() {
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const role = ref(""); // agora vai pegar o enum
    const companyId = ref("");

    const successMessage = ref("");
    const errorMessage = ref("");

    const REGISTER_USER = gql`
      mutation RegisterUser(
        $name: String!
        $email: String!
        $password: String!
        $role: Role!
        $companyId: String!
      ) {
        registerUser(
          name: $name
          email: $email
          password: $password
          role: $role
          companyId: $companyId
        ) {
          id
          name
          email
        }
      }
    `;

    const handleRegister = async () => {
      try {
        // converte role para enum literal (não colocar aspas)
        const variables = {
          name: name.value,
          email: email.value,
          password: password.value,
          role: role.value, // role agora é passado como Role enum
          companyId: companyId.value,
        };

        const result = await client.mutate({
          mutation: REGISTER_USER,
          variables,
        });

        const data = result.data;

        successMessage.value = `Usuário ${data.registerUser.name} cadastrado com sucesso!`;
        errorMessage.value = "";

        name.value = "";
        email.value = "";
        password.value = "";
        role.value = "";
        companyId.value = "";
      } catch (err) {
        errorMessage.value = err.message;
        successMessage.value = "";
      }
    };

    return {
      name,
      email,
      password,
      role,
      companyId,
      successMessage,
      errorMessage,
      handleRegister,
    };
  },
};
</script>

<style scoped>
.register {
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

input,
select {
  width: 100%;
  padding: 6px;
  box-sizing: border-box;
}

button {
  padding: 8px 12px;
  cursor: pointer;
}
</style>
