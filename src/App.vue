<template>
  <div id="app">
    <RegisterUser />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import RegisterUser from "./components/RegisterUser.vue";

export default defineComponent({
  components: { RegisterUser },
});
</script>

<style>
/* Se quiser, coloque estilos globais aqui */
</style>
