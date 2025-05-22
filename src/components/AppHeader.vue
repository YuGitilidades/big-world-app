<template>
  <header class="header">

    <nav class="nav">
      <ul class="nav-list">
        <h1 class="company-name">
          <img src='@/assets/logo.png' alt="Logo" class="company-logo" />
          YugiUtilidades
        </h1>
        <li class="nav-item"><router-link :to="{name: 'HomePage'}">Home</router-link></li>
<!--     <li class="nav-item"><router-link :to="{name: 'DatabaseYugi'}">Database de cartas</router-link></li>*/  --> 
        <li class="nav-item"><router-link :to="{name: 'SmallWorld'}">Small World</router-link></li>
        <li class="nav-item"><router-link :to="{name: 'MetalTronus'}">Metaltronus</router-link></li>
        <li class="nav-item"><router-link :to="{name: 'YgoProb'}">YugiohPro(babilidade)</router-link></li>
        <li class="nav-item"><router-link :to="{name: 'SeventhTachyon'}">Seventh Tachyon</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
};
</script>

<style scoped>
@import '../App.css';
</style>