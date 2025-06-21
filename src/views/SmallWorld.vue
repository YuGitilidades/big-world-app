<template>
  <div>
    <!-- Componente Tutorial -->
    <TutorialModal
      :slides="tutorialSlides"
      :auto-show="true"
      local-storage-key="smallWorldTutorial"
      @close="onTutorialClose"
      @slide-changed="onSlideChanged"
      @tutorial-opened="onTutorialOpened"
    />

    <!-- Seu conteúdo existente -->
    <div class="app-container">
      <h1><center>Small World</center></h1>
      <div class="main-content-container">
        <SmallWorldA @card-selected="onCardASelected" />
        <SmallWorldB :cardA="cardA" @card-selected="onCardBSelected" />
        <SmallWorldC :cardB="cardB" />
      </div>
    </div>
  </div>
</template>

<script>
import TutorialModal from '../components/TutorialModal.vue';
import SmallWorldA from '../components/SmallWorldA.vue';
import SmallWorldB from '../components/SmallWorldB.vue';
import SmallWorldC from '../components/SmallWorldC.vue';
import tutorialWelcomeImg from '/src/assets/small-world/tutorial-welcome.png';
import tutorialSectionAImg from '/src/assets/small-world/tutorial-section-a.png';
import tutorialSectionBImg from '/src/assets/small-world/tutorial-section-b.png';
import tutorialSectionCImg from '/src/assets/small-world/tutorial-section-c.png';



export default {
  name: 'SmallWorld',
  components: {
    TutorialModal,
    SmallWorldA,
    SmallWorldB,
    SmallWorldC
  },
  data() {
    return {
      cardA: null,
      cardB: null,
      tutorialSlides: [
        {
          title: "Mundo Pequeno, grandes possibilidades!",
          content: "Revele 1 monstro na sua mão, selecione 1 monstro do seu Deck que tenha exatamente 1 do mesmo Tipo, Atributo, Nível, ATK ou DEF e bana o monstro revelado da sua mão, com a face para baixo. Depois, adicione do Deck à sua mão, 1 monstro que tenha exatamente 1 do mesmo Tipo, Atributo, Nível, ATK ou DEF que o do monstro selecionado do seu Deck e bana o card selecionado do Deck, com a face para baixo. Você só pode ativar 1 'Mundo Pequeno' por turno.",
          image: tutorialWelcomeImg
        },
        {
          title: "Seção A - Monstro Revelado da mão",
          content: "Nessa tela, poderá pesquisar e selecionar o monstro A que deseja revelar da sua mão. As informações do monstro A serão exibidas para referência.",
          image: tutorialSectionAImg
        },
        {
          title: "Seção B - Monstro banido do Deck",
          content: "Nessa tela, poderá pesquisar e selecionar o monstro B que deseja banir do seu Deck. O monstro B deve ter exatamente 1 do mesmo Tipo, Atributo, Nível, ATK ou DEF que o monstro A. As informações do monstro B serão exibidas para referência.",
          image: tutorialSectionBImg
        },
        {
          title: "Seção C - Monstro adicionado à mão",
          content: "Nessa tela, poderá pesquisar e selecionar o monstro C que deseja adicionar à sua mão. O monstro C deve ter exatamente 1 do mesmo Tipo, Atributo, Nível, ATK ou DEF que o monstro B. As informações do monstro C serão exibidas para referência.",
          image: tutorialSectionCImg
        }
      ]
    };
  },
  methods: {
    onCardASelected(cardInfo) {
      this.cardA = cardInfo;
      this.cardB = null; // Limpa a carta B quando A é selecionada
      // Você pode executar ações específicas quando a carta A é selecionada
    },
    onCardBSelected(cardInfo) {
      this.cardB = cardInfo;
      this.cardC = null; // Limpa a carta C quando B é selecionada
      // Você pode executar ações específicas quando a carta B é selecionada
    },
    onTutorialClose(data) {
      console.log('Tutorial fechado:', data);
      // Você pode executar ações específicas quando o tutorial é fechado
    },
    
    onSlideChanged(slideIndex) {
      console.log('Slide mudou para:', slideIndex);
      // Você pode executar ações específicas quando o slide muda
    },
    
    onTutorialOpened() {
      console.log('Tutorial aberto');
      // Você pode executar ações específicas quando o tutorial é aberto
    }
  }
};
</script>

<style scoped>
@import '/src/App.css';
</style>