<template>
  <div class="componente-fundo-branco">
      <h1><center>Carta A (Revele do Extra Deck)</center></h1>
      <!-- Dropdown Digitável -->
    <label for="dropdown">Escolha qual No. voce quer revelar:</label>
    <p></p>
    <div class="dropdown-container">
        <input
          id="dropdown"
          type="text"
          v-model="textInput"
          placeholder="Digite para filtrar..."
          @input="filterSuggestions"
        />
        <!-- Lista de Sugestões Filtradas abaixo do input -->
        <ul v-if="filteredSuggestions.length && textInput.trim() !== ''" class="suggestions-list">
          <li 
            v-for="(suggestion, index) in filteredSuggestions" 
            :key="index" 
            @click="selectSuggestion(suggestion)"
            class="suggestion-item"
          >
            {{ suggestion }}
          </li>
        </ul>
    </div>

    <!-- Display Card Info -->
    <div v-if="cardInfo && !cardInfo.error">
      <h2>Informações da Carta:</h2>
      <div v-if="cardInfo.name">
        <h3>{{ cardInfo.name }}</h3>
        <p><strong>Atributo:</strong> {{ cardInfo.attribute }}</p>
        <p><strong>Tipo:</strong> {{ cardInfo.race }}</p>
        <p><strong>Descrição:</strong> {{ cardInfo.desc }}</p>
        <p><strong>ATK/DEF:</strong> {{ cardInfo.atk }}/{{ cardInfo.def }}</p>
        <p><strong>Nivel/Rank:</strong> {{ cardInfo.level }}</p>
        <img 
          v-if="cardInfo.card_images && cardInfo.card_images[0]" 
          :src="cardInfo.card_images[0].image_url" 
          :alt="cardInfo.name"
          style="max-width: 300px;"
        >
      </div>
      <pre v-else>{{ cardInfo }}</pre>
    </div>
    <div v-else-if="cardInfo && cardInfo.error">
      <p class="error">{{ cardInfo.error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  
  name: 'SeventhA',
  data() {
  return {
    textInput: '', // Texto digitado pelo usuário
    selectedOption: '', // Opção selecionada no dropdown
    suggestions: [
      'Number 101: Silent Honor ARK',
      'Number C101: Silent Honor DARK',
      'Number 102: Star Seraph Sentry',
      'Number C102: Archfiend Seraph',
      'Number 103: Ragnazero',
      'Number C103: Ragnafinity',
      'Number 104: Masquerade',
      'Number C104: Umbral Horror Masquerade',
      "Number 105: Battlin' Boxer Star Cestus",
      "Number C105: Battlin' Boxer Comet Cestus",
      'Number 106: Giant Hand',
      'Number C106: Giant Red Hand',
      'Number 107: Galaxy-Eyes Tachyon Dragon',
      'Number C107: Neo Galaxy-Eyes Tachyon Dragon'
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
  },
  selectSuggestion(suggestion) {
    // Atualiza o campo de entrada com a sugestão selecionada
    this.selectedOption = suggestion;
    this.textInput = suggestion;
    this.filteredSuggestions = [];
    this.fetchCardInfo();
  },
  async fetchCardInfo() {
    if (!this.selectedOption) return;

    try {
      const response = await axios.get('http://localhost:3000/api/card', {
        params: { name: this.selectedOption }
      });

      // Verifica se a resposta tem a estrutura esperada
      if (response.data && typeof response.data === 'object') {
        this.cardInfo = response.data;
      } else {
        this.cardInfo = { error: 'Formato de dados inválido da API' };
      }
    } catch (error) {
      console.error('Erro ao buscar informações da carta:', error);
      this.cardInfo = { 
        error: error.response?.data?.error || 
              'Erro ao buscar informações da carta.' 
      };
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