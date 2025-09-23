require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔹 Conexão com Postgres no Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Rota inicial de teste
app.get("/", (req, res) => {
  res.send("API Lista de Presentes funcionando ✅");
});

// 🧾 Listar todos os presentes
app.get('/presentes', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, nome, valor, imagem, maxassinaturas, assinaturasrestantes 
      FROM presentes 
      ORDER BY id ASC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar presentes:', err);
    res.status(500).send('Erro ao buscar presentes');
  }
});

// ✍️ Assinar (reservar) um presente
app.post('/assinar', async (req, res) => {
  const { id } = req.body;

  try {
    const presente = await pool.query(
      'SELECT * FROM presentes WHERE id = $1',
      [id]
    );

    if (presente.rows.length === 0) {
      return res.status(404).send('Presente não encontrado');
    }

    const restante = presente.rows[0].assinaturasrestantes;

    if (restante <= 0) {
      return res.status(400).send('Este presente já foi totalmente assinado');
    }

    const atualizado = await pool.query(
      `UPDATE presentes 
       SET assinaturasrestantes = assinaturasrestantes - 1 
       WHERE id = $1 
       RETURNING *`,
      [id]
    );

    res.json(atualizado.rows[0]);
  } catch (err) {
    console.error('Erro ao assinar presente:', err);
    res.status(500).send('Erro ao assinar presente');
  }
});

// 🚀 Inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

