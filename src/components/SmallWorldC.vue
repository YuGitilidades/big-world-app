<template>
  <div class="componente-fundo-branco">
    <h1><center>Carta C (Adicionar para a mão)</center></h1>
     <!-- Dropdown Digitável -->
     <label for="dropdown">Escolha qual No. voce quer revelar:</label>
    <p></p>
    <div class="dropdown-container">
        <input
          v-model="textInput"
          @input="filterSuggestions"
        />
        <!-- Lista de Sugestões Filtradas abaixo do input -->
        <ul v-if="filteredSuggestions.length && textInput.trim() !== ''" class="suggestions-list">
          <li v-for="suggestion in filteredSuggestions" :key="suggestion.id" @click="selectSuggestion(suggestion)">
            {{ suggestion.name }}
          </li>
        </ul>
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
  const API_BASE = process.env.VUE_APP_API_BASE;
  const API_TOKEN = process.env.VUE_APP_API_TOKEN;

  function getAuthHeaders() {
    return API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {};
  }

  export default {
  name: 'SmallWorldC',
  props: {
    cardB: Object // Recebe a carta selecionada em SmallWorldB
  },
  data() {
    return {
      textInput: '',
      selectedOption: '',
      suggestions: [],
      filteredSuggestions: [],
      cardInfo: null
    };
  },
  watch: {
    cardB: {
      handler() {
        this.filterSuggestions();
      },
      immediate: true
    },
    textInput() {
      this.filterSuggestions();
    }
  },
  methods: {
    async fetchSuggestions() {
      try {
        const res = await axios.get(`${API_BASE}/cards/summary`, { headers: getAuthHeaders() });
        this.suggestions = res.data;
        this.filteredSuggestions = this.suggestions;
      } catch (e) {
        this.suggestions = [];
        this.filteredSuggestions = [];
      }
    },
    filterSuggestions() {
      const input = this.textInput.trim().toLowerCase();
      this.filteredSuggestions = this.suggestions.filter(suggestion =>
        suggestion.name.toLowerCase().includes(input)
      );
    },
    async selectSuggestion(suggestion) {
      this.selectedOption = suggestion.name;
      this.textInput = suggestion.name;
      this.filteredSuggestions = [];
      await this.fetchCardInfo(suggestion.id);
    },
    async fetchCardInfo(id) {
      try {
        const res = await axios.get(`${API_BASE}/cards/id/${id}`, { headers: getAuthHeaders() });
        this.cardInfo = res.data;
      } catch (e) {
        this.cardInfo = { error: 'Erro ao buscar informações da carta.' };
      }
    },
    getImageUrl(imageUrl) {
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