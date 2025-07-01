<template>
    <div>
      <h1><center>Procure carta que quiser :D</center></h1>
       <!-- Dropdown Digitável -->
      <label for="dropdown">Procure o monstro:</label>
      <p></p>
    <div class="dropdown-container">
        <input
          id="dropdown"
          type="text"
          v-model="textInput"
          placeholder="Digite para filtrar..."
          @input="filterSuggestions"
        />
        <!-- Dropdown com Sugestões Filtradas -->
        <select v-if="filteredSuggestions.length" v-model="selectedOptionId" @change="onSelectSuggestion">
          <option v-for="suggestion in filteredSuggestions" :key="suggestion.id" :value="suggestion.id">
            {{ suggestion.name }}
          </option>
        </select>
      </div>
    <!-- Display Card Info -->
    <div v-if="cardInfo && !cardInfo.error">
      <h2>Informações da Carta:</h2>
      <div v-if="cardInfo.name">
        <h3>{{ cardInfo.name }}</h3>
        <p><strong>Atributo:</strong> {{ cardInfo.attribute }}</p>
        <p><strong>Tipo:</strong> {{ cardInfo.type }}</p>
        <p v-if="cardInfo.race"><strong>Tipo/Raça:</strong> {{ cardInfo.race }}</p>
        <p v-if="cardInfo.atk !== undefined && cardInfo.def !== undefined"><strong>ATK/DEF:</strong> {{ cardInfo.atk }}/{{ cardInfo.def }}</p>
        <p v-else-if="cardInfo.atk !== undefined"><strong>ATK:</strong> {{ cardInfo.atk }}</p>
        <p v-else-if="cardInfo.def !== undefined"><strong>DEF:</strong> {{ cardInfo.def }}</p>
        <p v-if="cardInfo.level"><strong>Nível:</strong> {{ cardInfo.level }}</p>
        <p v-if="cardInfo.desc"><strong>Descrição:</strong> {{ cardInfo.desc }}</p>
        <img v-if="cardInfo.imageUrl" :src="getImageUrl(cardInfo.imageUrl)" :alt="cardInfo.name" style="max-width:200px;" />
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
  // Use only process.env for Vue CLI/Webpack
  const API_BASE = process.env.VUE_APP_API_BASE;
  const API_TOKEN = process.env.VUE_APP_API_TOKEN;

  function getAuthHeaders() {
    return API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {};
  }
  
  export default {
    name: 'ShowDataBase',
    data() {
      return {
        textInput: '',
        selectedOptionId: '',
        suggestions: [],
        filteredSuggestions: [],
        cardInfo: null
      };
    },
    methods: {
      async fetchSuggestions() {
        try {
          const response = await axios.get(`${API_BASE}/cards/summary`, { headers: getAuthHeaders() });
          this.suggestions = response.data.map(card => ({
            id: card.name,
            name: card.name
          }));
          this.filteredSuggestions = this.suggestions;
        } catch (e) {
          this.suggestions = [];
          this.filteredSuggestions = [];
        }
      },
      filterSuggestions() {
        const input = this.textInput.trim().toLowerCase();
        if (!input) {
          this.filteredSuggestions = this.suggestions;
          return;
        }
        this.filteredSuggestions = this.suggestions.filter(s =>
          s.name.toLowerCase().includes(input)
        );
      },
      async onSelectSuggestion() {
        if (!this.selectedOptionId) return;
        await this.fetchCardInfo(this.selectedOptionId);
      },
      async selectSuggestion(suggestion) {
        await this.fetchCardInfo(suggestion.id);
      },
      async fetchCardInfo(idOrName) {
        this.cardInfo = null;
        try {
          // Try by ID first
          let response = await axios.get(`${API_BASE}/cards/id/${idOrName}`, { headers: getAuthHeaders() });
          this.cardInfo = response.data;
        } catch (e) {
          // Fallback to name
          try {
            let response = await axios.get(`${API_BASE}/cards/${encodeURIComponent(idOrName)}`, { headers: getAuthHeaders() });
            this.cardInfo = response.data;
          } catch (err) {
            this.cardInfo = { error: 'Carta não encontrada.' };
          }
        }
      },
      getImageUrl(imageUrl) {
        if (!imageUrl) return '';
        // If the API returns just the filename, prepend a base path if needed
        if (/^https?:\/\//.test(imageUrl)) return imageUrl;
        return `${API_BASE}/images/${imageUrl}`;
      }
    },
    mounted() {
      this.fetchSuggestions();
    }
  };
  </script>
  
  <style scoped>
      @import '../App.css'; /* Importa o arquivo CSS */
  </style>