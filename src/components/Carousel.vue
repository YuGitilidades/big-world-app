<template>
    <div class="carousel">
      <Carousel
        :value="items"
        :numVisible="3"
        :numScroll="1"
        :circular="true"
        :autoplayInterval="3000"
        :responsiveOptions="responsiveOptions"
      >
        <template #item="slotProps">
          <div class="carousel-item">
            <div class="carousel-item-content">
              <h3>{{ slotProps.data.name }}</h3>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
  </template>
  
  <script>
  import { Carousel } from 'primevue/carousel';
  import 'primevue/resources/themes/saga-blue/theme.css'; // Escolha um tema
  import 'primevue/resources/primevue.min.css';
  import 'primeicons/primeicons.css';
  import './Carousel.css'; // Importa o arquivo CSS do Carousel
  
  export default {
    name: 'CustomCarousel',
    components: {
      Carousel
    },
    data() {
      return {
        items: [
          { name: 'Item 1' },
          { name: 'Item 2' },
          { name: 'Item 3' },
          { name: 'Item 4' },
          { name: 'Item 5' },
          { name: 'Item 6' }
          // Adicione mais itens conforme necessário
        ],
        responsiveOptions: [
          {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 1
          },
          {
            breakpoint: '600px',
            numVisible: 1,
            numScroll: 1
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  @import './Carousel.css'; /* Importa o arquivo CSS para o Carousel */
  </style>