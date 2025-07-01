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
        <p><strong>Tipo:</strong> {{ cardInfo.type }}</p>
        <p v-if="cardInfo.race"><strong>Tipo/Raça:</strong> {{ cardInfo.race }}</p>
        <p v-if="cardInfo.atk !== undefined"><strong>ATK:</strong> {{ cardInfo.atk }}</p>
        <p v-if="cardInfo.def !== undefined"><strong>DEF:</strong> {{ cardInfo.def }}</p>
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
        suggestions: [], // {id, name}
        filteredSuggestions: [],
        cardInfo: null
      };
    },
    methods: {
      async fetchSuggestions() {
        try {
          // Always send the Bearer token
          const res = await axios.get(`${API_BASE}/cards/summary`, { headers: getAuthHeaders() });
          // If the API returns only names, add a fake id as the name for now
          this.suggestions = res.data.map(card => ({
            id: card.id || card.name, // fallback to name if id is missing
            name: card.name
          }));
          this.filteredSuggestions = this.suggestions;
        } catch (e) {
          this.suggestions = [];
          this.filteredSuggestions = [];
          this.cardInfo = { error: 'Erro ao buscar sugestões de cartas.' };
        }
      },
      filterSuggestions() {
        const input = this.textInput.trim().toLowerCase();
        this.filteredSuggestions = this.suggestions.filter(suggestion =>
          suggestion.name.toLowerCase().includes(input)
        );
      },
      async onSelectSuggestion() {
        if (!this.selectedOptionId) return;
        await this.fetchCardInfo(this.selectedOptionId);
      },
      async fetchCardInfo(idOrName) {
        try {
          // Try by id first, fallback to name if id is not a number
          let url = `${API_BASE}/cards/${idOrName}`;
          // If idOrName is not a number, try by name endpoint
          if (isNaN(Number(idOrName))) {
            url = `${API_BASE}/cards/${encodeURIComponent(idOrName)}`;
          }
          const res = await axios.get(url, { headers: getAuthHeaders() });
          this.cardInfo = res.data;
        } catch (e) {
          this.cardInfo = { error: 'Erro ao buscar informações da carta.' };
        }
      },
      getImageUrl(imageUrl) {
        if (!imageUrl) return '';
        if (imageUrl.startsWith('http')) return imageUrl;
        return `https://pub-831792ba11aa4f59a50770e8f03dcc87.r2.dev/${imageUrl}`;
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