<template>
    <div class="app-container">
      <h1><center>Metaltronus</center></h1>
      <div class="main-content-container">
            <MetalTronusA />
            <MetalTronusB />
      </div>
    </div>
  </template>
  
  <script>
  import MetalTronusA from '../components/MetalTronusA.vue';
  import MetalTronusB from '../components/MetalTronusB.vue';

  
  export default {
    name: 'MetalTronus',
    components: {
     MetalTronusA,
     MetalTronusB
    }
  };
  </script>
  
  <style scoped>
  @import '/src/App.css'; /* Importa o arquivo CSS */
  </style>