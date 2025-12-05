<template>
  <div class="dashboard">
    <h1>Bem-vindo ao Dashboard!</h1>
    <p>Nome do usuário: {{ user.name }}</p>
    <button @click="logout">Sair</button>
  </div>
</template>

<script>
export default {
  name: "DashboardPage",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.dashboard {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 6px;
  text-align: center;
}
button {
  margin-top: 20px;
  padding: 8px 12px;
  cursor: pointer;
}
</style>
