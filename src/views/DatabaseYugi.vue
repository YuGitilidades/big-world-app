<template>
  <div class="app-container">
    <h1><center>Database</center></h1>
    <div class="main-content-container">
      <ShowDataBase />
    </div>
  </div>
</template>

<script>
import ShowDataBase from '../components/ShowDataBase.vue';

export default {
  name: 'DatabaseYugi',
  components: {
    ShowDataBase
  }
};
</script>

<style scoped>
@import '/src/App.css'; /* Importa o arquivo CSS */
</style>