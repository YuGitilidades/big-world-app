<template>
  <div>
    <h1><center>Carta A (Revela do extra)</center></h1>

    <!-- Dropdown Não Digitável -->
    <label for="dropdown">Escolha um monstro "Number":</label><p></p>
    <select id="dropdown" v-model="selectedOption">
      <option v-for="(suggestion, index) in suggestions" :key="index" :value="suggestion">
        {{ suggestion }}
      </option>
    </select>

    <!-- Display Selected Option -->
    <p v-if="selectedOption">Monstro selecionado: {{ selectedOption }}</p>
  </div>
</template>
  
  <script>
  export default {
    name: 'SeventhA',
    data() {
    return {
      selectedOption: '', // Selected dropdown option
      suggestions: [
      'Number 101: Silent Honor ARK',
      'Number 102: Glow-Up Lightseraph',
      'Number C102: Archfiend Seraph',
      'Number 103: Ragnazero',
      'Number 104: Masquerade',
      "Number 105: Battlin' Boxer Star Cestus",
      'Number 106: Giant Hand',
      'Number 107: Galaxy-Eyes Tachyon Dragon'      
    ] // Predefined list of "No." monsters
    };
  }
  /*computed: {
    filteredSuggestions() {
      // Filter suggestions based on the input
      if (!this.textInput) {
        return this.suggestions;
      }
      return this.suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(this.textInput.toLowerCase())
      );
    }
  }*/
  };
  </script>
  
  <style scoped>
      @import '../App.css'; /* Importa o arquivo CSS */
  </style>