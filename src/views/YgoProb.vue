<template>
    <div class="app-container">
      <h1><center>Calculadora de Probabilidades</center></h1>
      <div class="main-content-container">
        <ProbCalc />
      </div>
    </div>
  </template>
  
  <script>
  import ProbCalc from '../components/ProbCalc.vue';
  
  export default {
    name: 'YgoProb',
    components: {
      ProbCalc
    }
  };
  </script>
  
  <style scoped>
  @import '/src/App.css'; /* Importa o arquivo CSS */
  </style>