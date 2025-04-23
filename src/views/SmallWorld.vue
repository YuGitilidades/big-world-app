<template>
    <div class="app-container">
      <div class="main-content-container">
            <CartaA />
            <CartaB />
      </div>
      <div class="main-content-container2">
            <CartaC />
      </div>
    </div>
  </template>
  
  <script>
  import CartaA from '../components/CartaA.vue';
  import CartaB from '../components/CartaB.vue';
  import CartaC from '../components/CartaC.vue'; 

  
  export default {
    name: 'SmallWorld',
    components: {
     CartaA,
     CartaB,
     CartaC
    }
  };
  </script>
  
  <style scoped>
  @import '/src/App.css'; /* Importa o arquivo CSS */
  </style>