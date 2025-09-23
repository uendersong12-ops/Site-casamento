import express from "express";
import cors from "cors";
import pkg from "pg";

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com PostgreSQL no Render
const pool = new Pool({
  connectionString: "postgresql://casamento_lista_user:2qJaLWDtANqUyh9TPIuN21SDDUwZhzqH@dpg-d38p61bipnbc738ci7o0-a.oregon-postgres.render.com/casamento_lista",
  ssl: { rejectUnauthorized: false }
});

// Rota de teste
app.get("/", (req, res) => {
  res.send("API Lista de Presentes funcionando ✅");
});

// Rota para buscar todos os presentes
app.get("/presentes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM presentes ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Erro detalhado no banco:", err);
    res.status(500).send("Erro ao buscar presentes");
  }
});

// Rota para adicionar presente manualmente (opcional)
app.post("/presentes", async (req, res) => {
  const { nome, valor, imagem, maxassinaturas, assinaturasrestantes } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO presentes (nome, valor, imagem, maxassinaturas, assinaturasrestantes) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nome, valor, imagem, maxassinaturas, assinaturasrestantes]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao adicionar presente:", err);
    res.status(500).send("Erro ao adicionar presente");
  }
});

// Rota para atualizar assinaturas
app.post("/presentes/:id/assinar", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `UPDATE presentes
       SET assinaturasrestantes = assinaturasrestantes - 1
       WHERE id = $1 AND assinaturasrestantes > 0
       RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(400).json({ error: "Não há mais assinaturas disponíveis" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao atualizar presente:", err);
    res.status(500).send("Erro ao atualizar presente");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
// Rota para reservar um presente
app.put("/presentes/:id/reservar", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `UPDATE presentes
       SET assinaturasrestantes = GREATEST(assinaturasrestantes - 1, 0)
       WHERE id = $1 AND assinaturasrestantes > 0
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(400).send("Presente esgotado ❌");
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao reservar presente:", err);
    res.status(500).send("Erro no servidor");
  }
});

