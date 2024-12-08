const express = require('express');
const path = require('path');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const verifyToken = require('./middlewares/authMiddleware');
const app = express();


const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Conectar a MongoDB
connectDB();

// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rutas API
app.use('/auth', require('./routes/authRoutes'));
app.use('/api/client',  verifyToken,require('./routes/clientsRoutes'));
app.use('/api/bill',  verifyToken,require('./routes/billsRoutes'));
app.use('/api/detail',  verifyToken,require('./routes/detailsRoutes'));
app.use('/api/category',  verifyToken,require('./routes/categorysRoutes'));
app.use('/api/product',  verifyToken,require('./routes/productsRoutes'));

// Ruta principal protegida
app.get('/', verifyToken, (req, res) => {
  res.render('index', { userId: req.userId }); // Renderiza la vista principal
});

// Levantar el servidor
const PORT = process.env.PORT || 1500;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
