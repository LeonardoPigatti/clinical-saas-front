<template>
  <div id="app">
    <DashboardPage v-if="isLoggedIn" :user="user" />
    <LoginUser v-else />
  </div>
</template>

<script>
import DashboardPage from "./components/Dashboard.vue";
import LoginUser from "./components/LoginUser.vue";

export default {
  name: "App",
  components: { DashboardPage, LoginUser },
  data() {
    const token = localStorage.getItem("token");
    const userJson = localStorage.getItem("user");
    return {
      isLoggedIn: !!token && !!userJson,
      user: userJson ? JSON.parse(userJson) : null,
    };
  },
};
</script>
