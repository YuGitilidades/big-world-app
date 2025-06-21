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
    <div class="app-container">
      <h1><center>Metaltronus</center></h1>
      <div class="main-content-container">
             <MetalTronusA @card-selected="onCardASelected" />
             <MetalTronusB :cardA="cardA" />
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import TutorialModal from '../components/TutorialModal.vue';
  import MetalTronusA from '../components/MetalTronusA.vue';
  import MetalTronusB from '../components/MetalTronusB.vue';
  import tutorialWelcomeImg from '/src/assets/metaltronus/tutorial-welcome.png';
  import tutorialSectionAImg from '/src/assets/metaltronus/tutorial-section-a.png';
  import tutorialSectionBImg from '/src/assets/metaltronus/tutorial-section-b.png';

  
  export default {
    name: 'MetalTronus',
    components: {
     TutorialModal,
     MetalTronusA,
     MetalTronusB
    },
    data() {
    return {
      cardA: null,
      tutorialSlides: [
        {
          title: "Metaltronus, pronto para resolver os problemas!",
          content: "Escolha 1 monstro com a face para cima que não seja Ficha que seu oponente controla; Invoque por Invocação-Especial 1 monstro da sua mão, do Deck ou do Deck Adicional que tenha 2 ou mais do mesmo Tipo, Atributo e/ou ATK (mas negue seus efeitos) e, se isso acontecer, negue os efeitos do monstro alvo e, além disso, depois, se esses monstros tiverem o mesmo nome, você pode banir os dois, com a face para baixo. Seu oponente não pode ativar os efeitos do monstro alvo em resposta à ativação deste card. Você só pode ativar 1 'Metaltronus' por turno.",
          image: tutorialWelcomeImg
        },
        {
          title: "Seção A - Acabe com eles!",
          content: "Nessa tela, poderá pesquisar e selecionar o monstro A que deseja banir do campo do seu oponente. As informações do monstro A serão exibidas para referência.",
          image: tutorialSectionAImg
        },
        {
          title: "Seção B - Aliado ou ...inimigo?",
          content: "Nessa tela, poderá pesquisar e selecionar o monstro B que deseja invocar do seu Deck ou do Deck Adicional. As informações do monstro B serão exibidas para referência.",
          image: tutorialSectionBImg
        },
      ]
    };
  },
  methods: {
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
    },
    
    onCardASelected(cardInfo) {
      this.cardA = cardInfo;
    }
  }
  };
  </script>
  
  <style scoped>
  @import '/src/App.css'; /* Importa o arquivo CSS */
  </style>