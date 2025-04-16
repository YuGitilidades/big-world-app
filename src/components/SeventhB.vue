<template>
    <div>
      <h1><center>Carta B (Adicionar para mão)</center></h1>
      <!-- Dropdown Digitável -->
    <label for="dropdown">Procure o monstro:</label>
    <P></P>
    <div class="dropdown-container">
        <input
          id="dropdown"
          type="text"
          v-model="textInput"
          placeholder="Digite para filtrar..."
          @input="filterSuggestions"
        />
        <!-- Dropdown com Sugestões Filtradas -->
        <select v-if="filteredSuggestions.length" v-model="selectedOption" @change="fetchCardInfo">
          <option v-for="(suggestion, index) in filteredSuggestions" :key="index" :value="suggestion">
            {{ suggestion }}
          </option>  
        </select>
    </div>

    <!-- Display Selected Option -->
    <p v-if="selectedOption">Monstro selecionado: {{ selectedOption }}</p>
    <!-- Display Card Info -->
    <div v-if="cardInfo">
    <h2>Informações da Carta:</h2>
    <pre>{{ cardInfo }}</pre>
    </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    
    name: 'SeventhB',
    data() {
    return {
      textInput: '', // Texto digitado pelo usuário
      selectedOption: '', // Opção selecionada no dropdown
      suggestions: [
        'Number 101: Silent Honor ARK',
        'Number 102: Glow-Up Lightseraph',
        'Number C102: Archfiend Seraph',
        'Tornado Dragon',
        'Ext Ryzeal',
        'Number 103: Ragnazero',
        'Number 104: Masquerade',
        "Number 105: Battlin' Boxer Star Cestus",
        'Number 106: Giant Hand',
        'Number 107: Galaxy-Eyes Tachyon Dragon'
      ], // Lista de sugestões
      filteredSuggestions: [], // Sugestões filtradas
      cardInfo: null // Informações da carta selecionada
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
    },
    async fetchCardInfo() {
      if (!this.selectedOption) return;

      try {
        const response = await axios.get('http://localhost:3000/api/card', {
          params: { name: this.selectedOption }
        });

        this.cardInfo = response.data;
        console.log('Informações da carta:', this.cardInfo);
      } catch (error) {
        console.error('Erro ao buscar informações da carta:', error.message);
        this.cardInfo = { error: 'Erro ao buscar informações da carta.' };
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