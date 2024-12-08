const Cliente = require("../models/client");

// Obtener todos los clientes y renderizar la vista principal
exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.render('client/index', { clientes, error: null });
  } catch (err) {
    // console.error(err.message);
    res.status(500).render('client/index', {
      clientes: [], error: err.message
    });
  }
};

// Obtener un cliente por su ID
exports.getClienteById = async (req, res) => {
  try {
    const idClient = req.params.id_client;
    const cliente = await Cliente.findOne({ id_client: idClient });

    if (!cliente) {
      return res.status(404).render('client/show', {
        error: "Cliente no encontrado",
      });
    }

    res.render('client/show', { cliente });
  } catch (err) {
    console.error(err.message);
    res.status(500).render('client/show', {
      error: 'Error al buscar el cliente.',
    });
  }
};


// Renderizar el formulario para crear un cliente
exports.createClienteForm = (req, res) => {
  res.render('client/create', {error: null, token: null}); 

};


// Crear un nuevo cliente y redirigir a la lista
exports.createCliente = async (req, res) => {
  try {
    const { id_client, nombre, apellido, direccion, fecha_nacimiento, telefono, email } = req.body;
    const nuevoCliente = new Cliente({ id_client, nombre, apellido, direccion, fecha_nacimiento, telefono, email });

    await nuevoCliente.save();
    res.redirect('/api/client');
  } catch (err) {
    console.error(err.message);
    res.status(500).render('client/create', {
      error: 'Error al crear el cliente. Intenta nuevamente.',
    });
  }
};

// Controlador para mostrar el formulario de edición
exports.getClienteEditForm = async (req, res) => {
  try {
    const idClient = req.params.id_client;
    console.log("Buscando cliente con ID:", idClient);

    // Primero busca el cliente
    const cliente = await Cliente.findOne({ id_client: idClient });

    if (!cliente) {
      console.log("Cliente no encontrado.");
      // Renderiza la vista edit.ejs y envía el cliente
      return res.status(404).render('client/edit', {
        error: 'Cliente no encontrado.',
        cliente: {}, // Envía un objeto vacío si no se encuentra
      });
    }

    // Si el cliente se encuentra, lo mostramos
    console.log("Cliente encontrado:", cliente);
    res.render('client/edit', { cliente }); // Renderiza la vista con los datos del cliente
  } catch (err) {
    console.error("Error al cargar el formulario de edición:", err.message);
    res.status(500).render('client/edit', {
      error: 'Error al cargar el formulario de edición.',
      cliente: {}, // En caso de error, envía un objeto vacío
    });
  }
};

// Actualizar un cliente
exports.updateCliente = async (req, res) => {
  try {
    const idClient = req.params.id_client;

    // Actualizar el cliente
    const cliente = await Cliente.findOneAndUpdate({ id_client: idClient }, req.body, { new: true });

    // Si no se encuentra el cliente, renderiza el formulario con un mensaje de error
    if (!cliente) {
      return res.status(404).render('client/edit', {
        error: 'Cliente no encontrado.',
        cliente: req.body, // Para pre-poblar el formulario con los datos del cliente intentado actualizar
      });
    }

    // Si todo va bien, redirige a la vista de cliente con un mensaje de éxito
    res.redirect('/api/client?success=Cliente actualizado exitosamente');

  } catch (err) {
    console.error(err.message);
    // En caso de error, renderiza nuevamente con un mensaje de error
    res.status(500).render('client/edit', {
      error: 'Error al actualizar el cliente.',
      cliente: req.body, // Para pre-poblar el formulario con los datos intentados
    });
  }
};


// Eliminar un cliente
exports.deleteCliente = async (req, res) => {
  try {
    const idClient = req.params.id_client;
    console.log("Eliminando cliente con ID:", idClient);  // Para depurar

    const cliente = await Cliente.findOneAndDelete({ id_client: idClient });

    if (!cliente) {
      return res.status(404).render('clientes/index', {
        error: 'Cliente no encontrado.',
      });
    }

    res.redirect('/api/client');
  } catch (err) {
    console.error(err.message);
    res.status(500).render('clientes/index', {
      error: 'Error al eliminar el cliente.',
    });
  }
};

