const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
const port = 5000;

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/admin-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Middleware
app.use(cors()); // Habilitar CORS
app.use(express.json());

// Usar las rutas
app.use('/api', itemRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
