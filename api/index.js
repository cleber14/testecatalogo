import express from "express";

const app = express();

// ================= CONFIGURAÇÕES =================
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

// ================= GOOGLE SHEETS =================
const SHEETS_ID = "1pQNS_DuruJkdYSspDufIb5bGa5ZpMKNPnxnrKVJVpwM";
const SHEET_NAME = "products";

const SHEETS_URL = `https://docs.google.com/spreadsheets/d/${SHEETS_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

// ================= FUNÇÃO DE LEITURA =================
async function getProducts() {
    const response = await fetch(SHEETS_URL);
    const text = await response.text();
  
    // 🔥 LIMPEZA COMPLETA do retorno do Google
    const jsonString = text
      .replace("/*O_o*/", "")
      .replace("google.visualization.Query.setResponse(", "")
      .replace(");", "");
  
    const data = JSON.parse(jsonString);
  
    return data.table.rows
    .map(row => ({
      id: row.c[0]?.v ?? "",
      name: row.c[1]?.v ?? "",
      price: row.c[2]?.v ?? 0,
      image: row.c[3]?.v ?? "",
      category: row.c[4]?.v ?? "",
      description: row.c[5]?.v ?? "",
      active: row.c[6]?.v === true
    }))
    .filter(product => product.active);
  }
  
// ================= ROTAS =================
app.get("/catalogo", async (req, res) => {
    try {
      const products = await getProducts();
      res.render("catalogo", { products });
    } catch (error) {
      console.error("🔥 ERRO REAL:", error);
      res.status(500).send(error.message);
    }
  });

export default app;
