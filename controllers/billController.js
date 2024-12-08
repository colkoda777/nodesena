const Factura = require("../models/bill");
const Cliente = require("../models/client")

exports.getFacturas = async (req, res) => {
  try {
    const facturas = await Factura.find();
        res.render('bill/index', { facturas, error: null });
  } catch (err) {
    res.status(500).render('bill/index', {
      facturas: [],
      error: err.message
    });
  }
};

// Renderizar el formulario para crear un cliente
// Controlador para mostrar el formulario de creación de factura
// paso 2 
exports.createFacturaForm = async (req, res) => {
  try {
    // Obtener todos los clientes de la base de datos
    const clientes = await Cliente.find(); 

    // Pasar la lista de clientes a la vista
    res.render('bill/create', { clientes });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};


exports.getFacturaById = async (req, res) => {
  try {
    const idbill = req.params.num_factura;
    const factura = await Factura.findOne({ num_factura: idbill });


    if (!factura) {
      return res.status(404).render('bill/show',{
        error: 'Factura no encontrada',
      });
    }

    res.render('bill/show',{factura});
  } catch (err) {
    console.error(err.message);
    // En caso de error, responde con un estado 500
    res.status(500).render('bill/show',{
      error: 'Eror al buscar factura',
    });
  }
};

// paso 3
exports.createFactura = async (req, res) => {
  try {
    const { num_factura, id_cliente, fecha, num_pago } = req.body;
    const nuevaFactura = new Factura({
      num_factura,
      id_cliente,
      fecha,
      num_pago
    });

    await nuevaFactura.save();
    res.redirect('/api/bill');
  } catch (err) {
    console.error(err.message);
    res.status(500).render('bill/create', {
      error: 'Error al crear factura. intenta nuevamente',
    });
  }
};

exports.updateFactura = async (req, res) => {
  try {
    const idbill = req.params.num_factura;

    const factura = await Factura.findOneAndUpdate(
      { num_factura: idbill },
      req.body,
      { new: true }
    );

    // Si no se encuentra, responde con un 404
    if (!factura){
      return res.status(404).render('bill/edit', {
        error: 'Factura no encontrada',
        cliente: req.body,
      });
    }

    // Responde con el cliente actualizado
    res.redirect('/api/bill?success=Factura actualizada exitosamente');
  } catch (err) {
    // Manejo de errores
    res.status(500).render('bill/edit', {
      error: 'error al actualizar factura',

    });
  }
};

exports.deleteFactura = async (req, res) => {
  try {
    const idbill = req.params.num_factura;
    console.log("Eliminar cliente con id", idbill);

    const factura = await Factura.findOneAndDelete({ num_factura: idbill });

    if (!factura) {
      return res.status(404).render('bill/index',{
        error: 'Factura no encontrada',
      });
    }
      
  
    // Responde con un mensaje de éxito
    res.redirect('/api/bill');
  } catch (err) {
    // Manejo de errores
    res.status(500).render('bill/index',{
      error:'Error al eliminar una factura',
    });
  }
};

exports.getFacturaEditForm = async (req, res) => { 
  try {
    const idFactura = req.params.num_factura;
    console.log("Buscando factura con número:", idFactura);

    // Busca la factura
    const factura = await Factura.findOne({ num_factura: idFactura });

    if (!factura) {
      console.log("Factura no encontrada.");
      return res.status(404).render('bill/edit', {
        error: 'Factura no encontrada.',
        factura: {}, // Envía un objeto vacío si no se encuentra
      });
    }
    console.log("Factura encontrada:", factura);
    res.render('bill/edit', { factura }); // Renderiza la vista con los datos de la factura
  } catch (err) {
    console.error("Error al cargar el formulario de edición:", err.message);
    res.status(500).render('bill/edit', {
      error: 'Error al cargar el formulario de edición.',
      factura: {}, // En caso de error, envía un objeto vacío
    });
  }
};
