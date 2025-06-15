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
        <SeventhA />
        <SeventhB />
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import TutorialModal from '../components/TutorialModal.vue';
  import SeventhA from '../components/SeventhA.vue';
  import SeventhB from '../components/SeventhB.vue';
  
  export default {
    name: 'SeventhTachyon',
    components: {
      TutorialModal,
      SeventhA,
      SeventhB
    },
    data() {
    return {
      tutorialSlides: [
        {
          title: "Bem-vindo ao Small World!",
          content: "Esta é uma introdução ao funcionamento da nossa plataforma. Use as setas ou clique nos indicadores para navegar pelo tutorial e conhecer cada seção.",
          image: "/src/assets/images/tutorial-welcome.png"
        },
        {
          title: "Seção A - Principais Funcionalidades",
          content: "Na seção superior esquerda, você encontrará as principais funcionalidades do sistema. Aqui você pode acessar os recursos mais importantes e realizar as operações centrais da plataforma.",
          image: "/src/assets/images/tutorial-section-a.png"
        },
        {
          title: "Seção B - Ferramentas Auxiliares",
          content: "A seção superior direita contém ferramentas auxiliares e configurações avançadas. Essas funcionalidades complementam o sistema principal e permitem personalizar sua experiência.",
          image: "/src/assets/images/tutorial-section-b.png"
        },
        {
          title: "Seção C - Dashboard Central",
          content: "A seção inferior é seu dashboard principal, onde você verá informações consolidadas, relatórios e poderá monitorar todas as suas atividades de forma centralizada.",
          image: "/src/assets/images/tutorial-section-c.png"
        }
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
    }
  }
  };
  </script>
  
  <style scoped>
  @import '/src/App.css'; /* Importa o arquivo CSS */
  </style>