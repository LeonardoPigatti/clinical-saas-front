<template>
  <div class="dashboard">
    <h1>Bem-vindo ao Dashboard!</h1>
    <p>Usuário: {{ user.name }}</p>
  </div>
</template>

<script>
export default {
      name: "DashboardPage",

  data() {
    return {
      user: JSON.parse(localStorage.getItem('user') || '{}')
    };
  }
};
</script>

<style scoped>
.dashboard {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 6px;
}
</style>
