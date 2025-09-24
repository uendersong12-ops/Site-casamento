require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔹 Middleware global — força UTF-8 e desativa cache nas respostas JSON
app.use((req, res, next) => {
  // força Content-Type com charset
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  // evita cache na borda/CDN enquanto depuramos
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.charset = "utf-8";
  next();
});

// 🔹 Conexão com Postgres
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Rota raiz (JSON)
app.get("/", (req, res) => {
  res
    .status(200)
    .type("application/json; charset=utf-8")
    .send(JSON.stringify({ msg: "API Lista de Presentes funcionando ✅" }));
});

// Listar presentes
app.get('/presentes', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, nome, valor, imagem, maxassinaturas, assinaturasrestantes, assinantes
      FROM presentes 
      ORDER BY id ASC
    `);

    res
      .status(200)
      .type("application/json; charset=utf-8")
      .send(JSON.stringify(result.rows));
  } catch (err) {
    console.error('Erro ao buscar presentes:', err);
    res
      .status(500)
      .type("application/json; charset=utf-8")
      .send(JSON.stringify({ erro: "Erro ao buscar presentes" }));
  }
});

// Admin (opcional)
app.get('/admin/reservas', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, nome, valor, imagem, maxassinaturas, assinaturasrestantes, assinantes
      FROM presentes 
      ORDER BY id ASC
    `);
    res
      .status(200)
      .type("application/json; charset=utf-8")
      .send(JSON.stringify(result.rows, null, 2));
  } catch (err) {
    console.error('Erro ao buscar reservas:', err);
    res
      .status(500)
      .type("application/json; charset=utf-8")
      .send(JSON.stringify({ erro: "Erro ao buscar reservas" }));
  }
});

// Reservar presente
app.post('/assinar', async (req, res) => {
  const { id, nome } = req.body;
  if (!nome || !nome.trim()) {
    return res
      .status(400)
      .type("application/json; charset=utf-8")
      .send(JSON.stringify({ erro: "Nome é obrigatório para reservar um presente" }));
  }

  try {
    const presente = await pool.query('SELECT * FROM presentes WHERE id = $1', [id]);
    if (presente.rows.length === 0) {
      return res
        .status(404)
        .type("application/json; charset=utf-8")
        .send(JSON.stringify({ erro: "Presente não encontrado" }));
    }
    const restante = presente.rows[0].assinaturasrestantes;
    if (restante <= 0) {
      return res
        .status(400)
        .type("application/json; charset=utf-8")
        .send(JSON.stringify({ erro: "Este presente já foi totalmente assinado" }));
    }

    const atualizado = await pool.query(
      `UPDATE presentes 
       SET assinaturasrestantes = assinaturasrestantes - 1,
           assinantes = array_append(assinantes, $2)
       WHERE id = $1 
       RETURNING *`,
      [id, nome]
    );

    res
      .status(200)
      .type("application/json; charset=utf-8")
      .send(JSON.stringify(atualizado.rows[0], null, 2));
  } catch (err) {
    console.error('Erro ao assinar presente:', err);
    res
      .status(500)
      .type("application/json; charset=utf-8")
      .send(JSON.stringify({ erro: "Erro ao assinar presente" }));
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
