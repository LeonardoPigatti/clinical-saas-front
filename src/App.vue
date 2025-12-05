<template>
  <div id="app">
    <LoginUser />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import LoginUser from "./components/LoginUser.vue";

export default defineComponent({
  components: { LoginUser },
});
</script>

<style>
/* Se quiser, coloque estilos globais aqui */
</style>
