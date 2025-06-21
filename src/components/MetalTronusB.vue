<template>
  <div class="componente-fundo-branco">
    <h1><center>Carta B (Monstro que vem do Main/Extra Deck)</center></h1>
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
  name: 'MetalTronusB',
  props: {
    cardA: Object // Recebe a carta selecionada em A
  },
  data() {
    return {
      textInput: '',
      selectedOption: '',
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
        'Number C107: Neo Galaxy-Eyes Tachyon Dragon',
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
    // Sempre que cardA mudar, refiltra as sugestões
    cardA: {
      handler() {
        this.filterSuggestions();
      },
      immediate: true
    }
  },
  methods: {
    async filterSuggestions() {
      const input = this.textInput.trim().toLowerCase();

      // Se não há cardA, filtra normalmente
      if (!this.cardA) {
        this.filteredSuggestions = this.suggestions.filter(suggestion =>
          suggestion.toLowerCase().includes(input)
        );
        return;
      }

      // Busca infos das sugestões
      const filtered = [];
      for (const suggestion of this.suggestions) {
        if (!suggestion.toLowerCase().includes(input)) continue;
        try {
          const response = await axios.get('http://localhost:3000/api/card', {
            params: { name: suggestion }
          });
          const cardB = response.data;
          let match = 0;
          if (cardB.atk === this.cardA.atk) match++;
          if (cardB.race === this.cardA.race) match++;
          if (cardB.attribute === this.cardA.attribute) match++;
          if (match === 2) filtered.push(suggestion);
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
        console.error('Erro ao buscar informações da carta:', error);
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
