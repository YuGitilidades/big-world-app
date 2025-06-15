<template>
  <div>

    <!-- Inputs para os parâmetros gerais -->
    <div>
      <label for="deckSize">Tamanho do Deck (N):</label>
      <input type="number" v-model.number="deckSize" placeholder="Ex.: 40" />

      <label for="sampleSize">Número de cartas na mão (n):</label>
      <input type="number" v-model.number="sampleSize" placeholder="Ex.: 5" />
    </div>

    <h2>Conjuntos de Cartas</h2>

    <!-- Lista dinâmica de conjuntos -->
    <div v-for="(set, index) in cardSets" :key="index" class="card-set">
      <h3>
        <input
          type="text"
          v-model="set.name"
          placeholder="Nome do Conjunto"
          class="set-name-input"
        />
      </h3>
      <label for="successes">Número de cartas no deck (K):</label>
      <input type="number" v-model.number="set.successes" placeholder="Ex.: 3" />

      <label for="desiredSuccesses">Número de cópias desejadas na mão (k):</label>
      <input type="number" v-model.number="set.desiredSuccesses" placeholder="Ex.: 1" />

      <!-- Botão para remover o conjunto -->
      <button @click="removeCardSet(index)">Remover Conjunto</button>
    </div>

    <!-- Botão para adicionar mais conjuntos -->
    <button @click="addCardSet">Adicionar Conjunto</button>

    <!-- Botão para calcular -->
    <div>
      <button @click="calculateProbability">Calcular Probabilidade</button>
    </div>

    <!-- Resultado -->
    <div v-if="probability !== null">
        <h2>Resultado:</h2>
        <p>{{ formatSmallNumber(probability) }} ≈ {{ formatAsFraction(probability) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProbCalc',
  data() {
    return {
      deckSize: null, // Tamanho do deck (N)
      sampleSize: null, // Tamanho da amostra (n)
      cardSets: [
        {
          name: 'Conjunto 1',
          successes: null, // Número de sucessos no deck (K)
          desiredSuccesses: null // Número de sucessos desejados na mão (k)
        }
      ], // Lista de conjuntos de cartas
      probability: null // Resultado da probabilidade
    };
  },
  methods: {
    calculateCombination(n, k) {
      // Função para calcular combinações (nCk)
      if (k > n) return 0;
      let numerator = 1;
      for (let i = 0; i < k; i++) {
        numerator *= n - i;
      }
      let denominator = 1;
      for (let i = 1; i <= k; i++) {
        denominator *= i;
      }
      return numerator / denominator;
    },
    calculateProbability() {
          const N = this.deckSize;
          const n = this.sampleSize;

          // Verifica se todos os campos estão preenchidos
          if (N === null || n === null || this.cardSets.some(set => set.successes === null || set.desiredSuccesses === null)) {
            alert('Por favor, preencha todos os campos.');
            return;
          }

          // Verifica se a soma das cartas desejadas <= tamanho da mão
          const totalDesired = this.cardSets.reduce((sum, set) => sum + set.desiredSuccesses, 0);
          if (totalDesired > n) {
            this.probability = 0;
            return;
          }

          // Calcula o total de cartas NÃO pertencentes a nenhum conjunto
          const totalOtherCards = N - this.cardSets.reduce((sum, set) => sum + set.successes, 0);

          // Numerador: (produtório das combinações de cada conjunto) * combinações das cartas restantes
          let numerator = 1;
          for (const set of this.cardSets) {
            numerator *= this.calculateCombination(set.successes, set.desiredSuccesses);
          }
          numerator *= this.calculateCombination(totalOtherCards, n - totalDesired);

          // Denominador: combinações totais
          const denominator = this.calculateCombination(N, n);

          this.probability = numerator / denominator;

       
    },
    addCardSet() {
        // Adiciona um novo conjunto de cartas
        const newSetIndex = this.cardSets.length + 1;
        this.cardSets.push({
          name: `Conjunto ${newSetIndex}`, 
          successes: null,
          desiredSuccesses: null
        });
    },
    removeCardSet(index) {
      // Remove o conjunto de cartas pelo índice
      this.cardSets.splice(index, 1);
    },
    formatSmallNumber(num) {
        // Se o número for "grande" o suficiente, mostra como porcentagem normal
        if (num >= 0.0001) {
          return (num * 100).toFixed(5) + '%';
        }

        // Para números muito pequenos:
        const str = num.toExponential(5); // Ex: "1.51974e-6"
        const [base, exponent] = str.split('e-');
        
        // Converte para fração decimal (opcional)
        const decimalForm = `0.${'0'.repeat(parseInt(exponent) - 1)}${base.replace('.', '')}%`;
        
        // Retorna ambas as formas (notação científica e decimal)
        return `${decimalForm} (${str})`;
    },
    formatAsFraction(num) {
        const denominator = Math.round(1 / num);
        return `1 em ${denominator.toLocaleString()}`;
    }
  }
};
</script>

<style scoped>
     @import '../App.css'; /* Importa o arquivo CSS */
</style>