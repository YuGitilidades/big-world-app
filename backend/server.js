const express = require('express');
const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = 3000;

// Diretório para armazenar os dados das cartas
const DATA_DIR = path.join(__dirname, 'card-data');

// Endpoint para buscar informações da carta
app.get('/api/card', async (req, res) => {
  const cardName = req.query.name;

  if (!cardName) {
    return res.status(400).json({ error: 'O nome da carta é obrigatório.' });
  }

  const filePath = path.join(DATA_DIR, `${cardName}.json`);

  try {
    // Verifica se o arquivo já existe localmente
    if (await fs.pathExists(filePath)) {
      console.log(`Carregando informações da carta "${cardName}" do cache local.`);
      const cardData = await fs.readJson(filePath);
      return res.json(cardData);
    }

    // Faz a requisição à API externa
    console.log(`Buscando informações da carta "${cardName}" na API.`);
    const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php', {
      params: { name: cardName }
    });

    if (response.data && response.data.data && response.data.data.length > 0) {
      const cardData = response.data.data[0];

      // Salva as informações localmente
      await fs.ensureDir(DATA_DIR);
      await fs.writeJson(filePath, cardData);

      return res.json(cardData);
    } else {
      return res.status(404).json({ error: 'Carta não encontrada.' });
    }
  } catch (error) {
    console.error('Erro ao buscar informações da carta:', error.message);
    return res.status(500).json({ error: 'Erro ao buscar informações da carta.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});