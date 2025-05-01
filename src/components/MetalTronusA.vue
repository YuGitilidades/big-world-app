<template>
    <div>
      <h1><center>Carta A (Monstro do Oponente)</center></h1>
       <!-- Dropdown Digitável -->
      <label for="dropdown">Procure o monstro:</label>
      <P>  </P>
      <div class="dropdown-container">
          <input
            id="dropdown"
            type="text"
            v-model="textInput"
            placeholder="Digite para filtrar..."
            @input="filterSuggestions"
          />
          <select v-if="filteredSuggestions.length" v-model="selectedOption">
            <option v-for="(suggestion, index) in filteredSuggestions" :key="index" :value="suggestion">
              {{ suggestion }}
            </option>
          </select>
      </div>
    <!-- Display Selected Option -->
    <p v-if="selectedOption">Monstro selecionado: {{ selectedOption }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MetalTronusA',
    data() {
    return {
      textInput: '', // Texto digitado pelo usuário
      selectedOption: '', // Opção selecionada no dropdown
      suggestions: [
        'Number 101: Silent Honor ARK',
        'Number 102: Glow-Up Lightseraph',
        'Number C102: Archfiend Seraph',
        'Number 103: Ragnazero',
        'Number 104: Masquerade',
        "Number 105: Battlin' Boxer Star Cestus",
        'Number 106: Giant Hand',
        'Number 107: Galaxy-Eyes Tachyon Dragon'
      ], // Lista de sugestões
      filteredSuggestions: [] // Sugestões filtradas
    };
  },
  methods: {
    filterSuggestions() {
      // Filtra as sugestões com base no texto digitado
      this.filteredSuggestions = this.suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(this.textInput.toLowerCase())
      );
      // Define a primeira sugestão como selecionada, se houver sugestões
      if (this.filteredSuggestions.length > 0) {
        this.selectedOption = this.filteredSuggestions[0];
      } else {
        this.selectedOption = ''; // Limpa a seleção se não houver sugestões
      }
    }
  },
  mounted() {
    // Inicializa as sugestões filtradas com todas as opções
    this.filteredSuggestions = this.suggestions;
  }
  };
  </script>
  
  <style scoped>
      @import '../App.css'; /* Importa o arquivo CSS */
  </style>