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
        <SmallWorldA />
        <SmallWorldB />
        <SmallWorldC />
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
      tutorialSlides: [
        {
          title: "Bem-vindo ao Small World!",
          content: "Revele 1 monstro na sua mão, selecione 1 monstro do seu Deck que tenha exatamente 1 do mesmo Tipo, Atributo, Nível, ATK ou DEF e bana o monstro revelado da sua mão, com a face para baixo. Depois, adicione do Deck à sua mão, 1 monstro que tenha exatamente 1 do mesmo Tipo, Atributo, Nível, ATK ou DEF que o do monstro selecionado do seu Deck e bana o card selecionado do Deck, com a face para baixo. Você só pode ativar 1 'Mundo Pequeno' por turno.",
          image: tutorialWelcomeImg
        },
        {
          title: "Seção A - Principais Funcionalidades",
          content: "Na seção superior esquerda, você encontrará as principais funcionalidades do sistema. Aqui você pode acessar os recursos mais importantes e realizar as operações centrais da plataforma.",
          image: tutorialSectionAImg
        },
        {
          title: "Seção B - Ferramentas Auxiliares",
          content: "A seção superior direita contém ferramentas auxiliares e configurações avançadas. Essas funcionalidades complementam o sistema principal e permitem personalizar sua experiência.",
          image: tutorialSectionBImg
        },
        {
          title: "Seção C - Dashboard Central",
          content: "A seção inferior é seu dashboard principal, onde você verá informações consolidadas, relatórios e poderá monitorar todas as suas atividades de forma centralizada.",
          image: tutorialSectionCImg
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
@import '/src/App.css';
</style>