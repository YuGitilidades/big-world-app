<template>
  <div>
    <!-- Botão de Help no topo -->
    <button 
      v-if="showHelpButton"
      @click="showTutorialHandler"
      class="tutorial-help-btn"
      :title="helpButtonTitle"
    >
      {{ helpButtonText }}
    </button>

    <!-- Modal Tutorial -->
    <div 
      v-if="showTutorial"
      class="tutorial-overlay"
      @click="handleOverlayClick"
    >
      <div 
        class="tutorial-modal" 
        :class="modalClass"
        @click.stop
      >
        <!-- Header -->
        <div class="tutorial-header">
          <button @click="handleClose" class="tutorial-close-btn">×</button>
          <div class="tutorial-header-content">
            <h2>{{ currentSlideData.title }}</h2>
          </div>
        </div>

        <!-- Conteúdo -->
        <div class="tutorial-content">
          <!-- Área da imagem (opcional) -->
          <div v-if="showImages" class="tutorial-image-container">
            <img 
              v-if="currentSlideData.image && !imageErrors[currentSlide]"
              :key="`slide-${currentSlide}-${currentSlideData.image}`"
              :src="currentSlideData.image" 
              :alt="currentSlideData.title"
              class="tutorial-image"
              @error="handleImageError"
              @load="handleImageLoad"
            />
            <div v-else-if="currentSlideData.image && imageErrors[currentSlide]" class="tutorial-image-error">
              <span>❌ Erro ao carregar imagem</span>
            </div>
            <div v-else class="tutorial-image-placeholder">
              📖
            </div>
          </div>

          <!-- Texto explicativo -->
          <div class="tutorial-text">
            {{ currentSlideData.content }}
          </div>

          <!-- Indicadores de slide -->
          <div v-if="slides.length > 1" class="tutorial-indicators">
            <button
              v-for="(slide, index) in slides"
              :key="index"
              @click="goToSlide(index)"
              :class="['tutorial-dot', { active: index === currentSlide }]"
            ></button>
          </div>

          <!-- Controles de navegação -->
          <div v-if="slides.length > 1" class="tutorial-navigation">
            <button
              @click="prevSlide"
              :disabled="currentSlide === 0"
              :class="['tutorial-nav-btn', { disabled: currentSlide === 0 }]"
            >
              ← {{ prevButtonText }}
            </button>

            <span class="tutorial-counter">
              {{ currentSlide + 1 }} de {{ slides.length }}
            </span>

            <button
              @click="nextSlide"
              :disabled="currentSlide === slides.length - 1"
              :class="['tutorial-nav-btn', { disabled: currentSlide === slides.length - 1 }]"
            >
              {{ nextButtonText }} →
            </button>
          </div>

          <!-- Checkbox "Não mostrar novamente" (opcional) 
          <div v-if="showDontShowAgain" class="tutorial-checkbox-section">
            <label class="tutorial-checkbox-label">
              <input
                type="checkbox"
                v-model="dontShowAgain"
                class="tutorial-checkbox"
              />
              {{ dontShowAgainText }}
            </label>
          </div>-->

          <!-- Botão de fechar -->
          <div class="tutorial-footer">
            <button @click="handleClose" class="tutorial-finish-btn">
              {{ currentSlide === slides.length - 1 ? finishButtonText : closeButtonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TutorialModal',
  props: {
    // Dados dos slides
    slides: {
      type: Array,
      required: true,
      validator: (slides) => {
        return slides.every(slide => slide.title && slide.content);
      }
    },
    
    // Controle de visibilidade
    autoShow: {
      type: Boolean,
      default: true
    },
    
    localStorageKey: {
      type: String,
      default: 'hasSeenTutorial'
    },
    
    // Configurações do botão de ajuda
    showHelpButton: {
      type: Boolean,
      default: true
    },
    
    helpButtonText: {
      type: String,
      default: 'Alguma dúvida?'
    },
    
    helpButtonTitle: {
      type: String,
      default: 'Tutorial'
    },
    
    // Configurações de imagens
    showImages: {
      type: Boolean,
      default: true
    },
    
    // Configurações de controles
    showDontShowAgain: {
      type: Boolean,
      default: true
    },
    
    // Textos personalizáveis
    prevButtonText: {
      type: String,
      default: 'Anterior'
    },
    
    nextButtonText: {
      type: String,
      default: 'Próximo'
    },
    
    closeButtonText: {
      type: String,
      default: 'Fechar'
    },
    
    finishButtonText: {
      type: String,
      default: 'Finalizar'
    },
    
    dontShowAgainText: {
      type: String,
      default: 'Não mostrar este tutorial novamente'
    },
    
    // Classe CSS personalizada
    modalClass: {
      type: String,
      default: ''
    },
    
    // Controle externo de visibilidade
    visible: {
      type: Boolean,
      default: null
    }
  },
  
  data() {
    return {
      showTutorial: false,
      currentSlide: 0,
      dontShowAgain: false,
      imageErrors: {}, // Controla quais imagens falharam
      imageLoaded: {}   // Controla quais imagens carregaram com sucesso
    };
  },
  
  computed: {
    currentSlideData() {
      return this.slides[this.currentSlide] || {};
    }
  },
  
  watch: {
    visible(newValue) {
      if (newValue !== null) {
        this.showTutorial = newValue;
      }
    },
    
    showTutorial(newValue) {
      this.$emit('visibility-changed', newValue);
      
      // Reset do estado das imagens quando o modal é aberto
      if (newValue) {
        this.resetImageStates();
      }
    }
  },
  
  mounted() {
    if (this.visible !== null) {
      this.showTutorial = this.visible;
    } else if (this.autoShow) {
      // Removido localStorage por limitações do ambiente
      // const hasSeenTutorial = localStorage.getItem(this.localStorageKey);
      // if (!hasSeenTutorial) {
        this.showTutorial = true;
      // }
    }
  },
  
  methods: {
    resetImageStates() {
      this.imageErrors = {};
      this.imageLoaded = {};
    },
    
    handleClose() {
      this.showTutorial = false;
      
      // Removido localStorage por limitações do ambiente
      // if (this.dontShowAgain && this.showDontShowAgain) {
      //   localStorage.setItem(this.localStorageKey, 'true');
      // }
      
      this.$emit('close', {
        dontShowAgain: this.dontShowAgain,
        currentSlide: this.currentSlide
      });
    },
    
    handleOverlayClick(e) {
      if (e.target === e.currentTarget) {
        this.handleClose();
      }
    },
    
    nextSlide() {
      if (this.currentSlide < this.slides.length - 1) {
        this.currentSlide++;
        this.$emit('slide-changed', this.currentSlide);
      }
    },
    
    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
        this.$emit('slide-changed', this.currentSlide);
      }
    },
    
    goToSlide(index) {
      if (index >= 0 && index < this.slides.length) {
        this.currentSlide = index;
        this.$emit('slide-changed', this.currentSlide);
      }
    },
    
    showTutorialHandler() {
      this.showTutorial = true;
      this.currentSlide = 0;
      this.resetImageStates();
      this.$emit('tutorial-opened');
    },
    
    handleImageError(e, slideIndex) {
      // Marca este slide como tendo erro de imagem
      this.imageErrors[slideIndex] = true;
      
      this.$emit('image-error', {
        slide: this.currentSlide,
        imageSrc: e.target.src
      });
    },
    
    handleImageLoad(e, slideIndex) {
      this.imageLoaded[slideIndex] = true;
      
      this.$emit('image-loaded', {
        slide: this.currentSlide,
        imageSrc: e.target.src
      });
    },
    
    // Métodos públicos para controle externo
    show() {
      this.showTutorialHandler();
    },
    
    hide() {
      this.handleClose();
    },
    
    goTo(slideIndex) {
      this.goToSlide(slideIndex);
    },
    
    // Método para resetar erros de imagem específicos
    retryImage(slideIndex) {
      this.imageLoaded[slideIndex] = false;
      this.imageErrors[slideIndex] = false;
    },
    
    // Método para resetar todos os erros de imagem
    retryAllImages() {
      Object.keys(this.imageErrors).forEach(idx => {
      this.imageErrors[idx] = false;
      this.imageLoaded[idx] = false;
    });
    }
  }
};
</script>

<style>
/* Importa os estilos do tutorial */
@import './tutorial.css';

/* Estilos adicionais para tratamento de erro de imagem */
.tutorial-image-error {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  background-color: #f5f5f5;
  border: 2px dashed #ddd;
  border-radius: 8px;
  color: #666;
  font-size: 14px;
}

.tutorial-image-error span {
  text-align: center;
}

/* Garante que a imagem seja sempre visível quando carregada */
.tutorial-image {
  display: block !important;
  max-width: 100%;
  height: auto;
}
</style>