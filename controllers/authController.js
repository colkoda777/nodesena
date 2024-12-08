const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Mostrar la vista principal protegida
exports.getAuth = async (req, res) => {
    try {
        res.render('auth/index', { message: null, error: null });
    } catch (err) {
        res.status(500).render('auth/index', { message: null, error: err.message });
    }
};

// Mostrar el formulario de registro
exports.showRegisterForm = (req, res) => {
    res.render('auth/register', { message: null, error: null });
};



// Procesar registro
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear y guardar el usuario
        const user = new User({ username, password: hashedPassword });
        await user.save();

        // Enviar mensaje de éxito
        res.render('auth/register', { message: "Usuario registrado con éxito", error: null });
    } catch (error) {
        // Enviar mensaje de error
        res.render('auth/register', { message: null, error: error.message });
    }
};

// Procesar login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Buscar el usuario en la base de datos
        const user = await User.findOne({ username });
        if (!user) {
            // Usuario no encontrado
            return res.render('auth/login', { message: null, error: "Usuario no encontrado" });
        }

        // Validar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            // Contraseña incorrecta
            return res.render('auth/login', { message: null, error: "Contraseña incorrecta" });
        }

        // Generar el token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Guardar el token en cookies
        res.cookie('auth_token', token, { httpOnly: true });

        // Redirigir a la página principal
        return res.redirect('/');
    } catch (error) {
        // En caso de error, enviar mensaje genérico
        return res.render('auth/login', { message: null, error: "Ocurrió un error en el servidor" });
    }
};

// Mostrar el formulario de login
exports.showLoginForm = (req, res) => {
    res.render('auth/login', { message: null, error: null }); // Asegura que estas variables siempre se envíen
};

exports.logout = (req, res) => {
    // Elimina la cookie del token
    res.clearCookie('auth_token');
    // Redirige al formulario de login
    res.redirect('/auth/login');
};
