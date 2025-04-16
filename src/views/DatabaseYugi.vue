<template>
  <div class="app-container">
    <div class="main-content-container">
      <CartaA />
    </div>
  </div>
</template>

<script>
import CartaA from '../components/CartaA.vue';

export default {
  name: 'DatabaseYugi',
  components: {
    CartaA
  }
};
</script>

<style scoped>
@import '/src/App.css'; /* Importa o arquivo CSS */
</style>