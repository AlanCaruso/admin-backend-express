const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const itemRoutes = require("./routes/itemRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();
const port = 5000;

// Conectar a MongoDB
mongoose
  .connect("mongodb://localhost:27017/admin-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Middleware
app.use(cors()); // Habilitar CORS
app.use(express.json());

app.get("/", (req, res) => {
  res.send("¡Hola desde el servidor backend!");
});
// Usar las rutas
app.use("/api/items", itemRoutes);
app.use("/api/categories", categoryRoutes);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});
