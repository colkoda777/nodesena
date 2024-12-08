const express = require('express');
const { register, login, getAuth, showRegisterForm, showLoginForm, logout } = require('../controllers/authController');
const router = express.Router();

// Mostrar formularios
router.get('/register', showRegisterForm);
router.get('/login', showLoginForm);

// Procesar datos
router.post('/register', register);
router.post('/login', login);

// Vista principal protegida
router.get('/index', getAuth);
// Ruta para cerrar sesión
router.get('/logout', logout);
module.exports = router;
