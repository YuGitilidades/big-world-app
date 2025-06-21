<template>
    <div class="componente-fundo-branco">
        <h1><center>Carta B (Adicionar para mão)</center></h1>
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
  name: 'SeventhB',
  props: {
    cardA: Object // Recebe a carta selecionada em SeventhA
  },
  data() {
    return {
      textInput: '',
      selectedOption: '',
      suggestions: [
        
        'Ext Ryzeal',
        'Effect Veiler',
        'Ice Ryzeal',
        'Ryzeal Detonator',
        'Nibiru, The Primal Being',
        'Droll & Lock Bird',
        'Ghost Belle & Haunted Mansion',
        'Ghost Ogre & Snow Rabbit',
        'Ash Blossom & Joyous Spring',
        'Maxx "C"',
        'Artifact Lancea',
        'Tornado Dragon',
        'D.D. Crow',
      ],
      filteredSuggestions: [],
      cardInfo: null
    };
  },
  watch: {
    cardA: {
      handler() {
        this.textInput = '';
        this.selectedOption = '';
        this.cardInfo = null;
        this.filterSuggestions();
      },
      immediate: true
    },
    textInput() {
      this.filterSuggestions();
    }
  },
  methods: {
    async filterSuggestions() {
      const input = this.textInput.trim().toLowerCase();

      if (!this.cardA) {
        this.filteredSuggestions = this.suggestions.filter(suggestion =>
          suggestion.toLowerCase().includes(input)
        );
        return;
      }

      const filtered = [];
      for (const suggestion of this.suggestions) {
        if (!suggestion.toLowerCase().includes(input)) continue;
        try {
          const response = await axios.get('http://localhost:3000/api/card', {
            params: { name: suggestion }
          });
          const cardB = response.data;
          // Filtro: mesmo level E (mesmo tipo OU mesmo atributo)
          const levelMatch = cardB.level === this.cardA.level;
          const typeMatch = cardB.race === this.cardA.race;
          const attrMatch = cardB.attribute === this.cardA.attribute;
          if (levelMatch && (typeMatch || attrMatch)) {
            filtered.push(suggestion);
          }
        } catch (e) {
          // ignora erros de fetch individual
        }
      }
      this.filteredSuggestions = filtered;
    },
    selectSuggestion(suggestion) {
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
        if (response.data && typeof response.data === 'object') {
          this.cardInfo = response.data;
        } else {
          this.cardInfo = { error: 'Formato de dados inválido da API' };
        }
      } catch (error) {
        this.cardInfo = { 
          error: error.response?.data?.error || 
                'Erro ao buscar informações da carta.' 
        };
      }
    }
  },
  mounted() {
    this.filterSuggestions();
  }
};
  </script>
  
  <style scoped>
      @import '../App.css'; /* Importa o arquivo CSS */
  </style>