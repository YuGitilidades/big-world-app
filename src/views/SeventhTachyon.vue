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
      <h1><center>Seventh Tachyon</center></h1>
      <div class="main-content-container">
        <SeventhA @card-selected="onCardASelected" />
        <SeventhB :cardA="cardA" />
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import TutorialModal from '../components/TutorialModal.vue';
  import SeventhA from '../components/SeventhA.vue';
  import SeventhB from '../components/SeventhB.vue';
  import tutorialWelcomeImg from '/src/assets/seventh-tachyon/tutorial-welcome.png';
  import tutorialSectionAImg from '/src/assets/seventh-tachyon/tutorial-section-a.png';
  import tutorialSectionBImg from '/src/assets/seventh-tachyon/tutorial-section-b.png';
  
  export default {
    name: 'SeventhTachyon',
    components: {
      TutorialModal,
      SeventhA,
      SeventhB
    },
    data() {
    return {
      cardA: null,
      tutorialSlides: [
        {
          title: "Seventh Tachyon, moldando o destino dos Barian!",
          content: "Revele 1 Monstro Xyz 'Número' no seu Deck Adicional com um número entre '101' e '107' em seu nome; adicione 1 monstro do seu Deck à sua mão com o mesmo Tipo ou Atributo que o desse monstro, e o mesmo Nível que a Classe desse monstro e, depois, coloque 1 card da sua mão no topo do Deck e, além disso, pelo resto deste turno depois que este card resolver, você não pode Invocar por Invocação-Especial do Deck Adicional, exceto Monstros Xyz. Você só pode ativar 1 'Táquion do Sétimo' por turno.",
          image: tutorialWelcomeImg
        },
        {
          title: "Seção A - Principais Funcionalidades",
          content: "Nessa tela, poderá pesquisar e selecionar o monstro A que deseja revelar do seu Deck Adicional. As informações do monstro A serão exibidas para referência.",
          image: tutorialSectionAImg
        },
        {
          title: "Seção B - Ferramentas Auxiliares",
          content: "Nessa tela, poderá pesquisar e selecionar o monstro B que deseja adicionar à sua mão. As informações do monstro B serão exibidas para referência.",
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