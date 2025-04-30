<template>
    <div class="app-container">
      <h1><center>Seventh Tachyon</center></h1>
      <div class="main-content-container">
        <SeventhA />
        <SeventhB />
      </div>
    </div>
  </template>
  
  <script>
  import SeventhA from '../components/SeventhA.vue';
  import SeventhB from '../components/SeventhB.vue';
  
  export default {
    name: 'SeventhTachyon',
    components: {
      SeventhA,
      SeventhB
    }
  };
  </script>
  
  <style scoped>
  @import '/src/App.css'; /* Importa o arquivo CSS */
  </style>