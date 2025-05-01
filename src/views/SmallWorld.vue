<template>
    <div class="app-container">
      <h1><center>Small World</center></h1>
      <div class="main-content-container">
            <SmallWorldA />
            <SmallWorldB />
      </div>
      <div class="main-content-container">
            <SmallWorldC />
      </div>
    </div>
  </template>
  
  <script>
  import SmallWorldA from '../components/SmallWorldA.vue';
  import SmallWorldB from '../components/SmallWorldB.vue';
  import SmallWorldC from '../components/SmallWorldC.vue'; 

  
  export default {
    name: 'SmallWorld',
    components: {
      SmallWorldA,
      SmallWorldB,
      SmallWorldC
    }
  };
  </script>
  
  <style scoped>
  @import '/src/App.css'; /* Importa o arquivo CSS */
  </style>