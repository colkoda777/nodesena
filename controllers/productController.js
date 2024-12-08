const Producto = require("../models/product");
const Categoria = require("../models/category"); // Asumiendo que tienes un modelo de categorías

// Obtener todos los productos
exports.getProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.render('product/index', { productos, error: null });
  } catch (err) {
    res.status(500).render('product/index', {
      productos: [],
      error: err.message
    });
  }
};

// Mostrar formulario para crear un producto
exports.createProductoForm = async (req, res) => {
  try {
    // Obtener las categorías para el formulario
    const categorias = await   Categoria.find();
    res.render('product/create', { categorias });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Obtener un producto por su ID
exports.getProductoById = async (req, res) => {
  try {
    const idProduct = req.params.id_producto;
    const producto = await Producto.findOne({ id_producto: idProduct });

    if (!producto) {
      return res.status(404).render('product/show',{
        error: "Producto no encontrado",
      });
    }

    res.render('product/show', { producto});
  } catch (err) {
    console.error(err.message);
    res.status(500).render('product/show',{
      error: 'Error al buscar producto',
    });
  }
};

// Crear un nuevo producto
exports.createProducto = async (req, res) => {
  try {
    const { id_producto, nombre, precio, stock, id_categoria } = req.body;
    const nuevoProducto = new Producto({
      id_producto,
      nombre,
      precio,
      stock,
      id_categoria
    });

    await nuevoProducto.save();
    res.redirect('/api/product');
  } catch (err) {
    console.error(err.message);
    res.status(500).render('product/create',{
      error: 'Error al crear un producto. intenta de nuevo',

    });
  }
};

// Actualizar un producto
exports.updateProducto = async (req, res) => {
  try {
    const idproduct = req.params.id_producto;

    const producto = await Producto.findOneAndUpdate(
      { id_producto: idproduct },
      req.body,
      { new: true }
    );

    // Si no se encuentra, responde con un 404
    if (!producto) {
      return res.status(404).render('product/edit', {
        error: 'Producto no encontrado',
        producto: req.body,
      });
    }

    // Responde con el producto actualizado
    res.redirect('/api/product?success=Producto actualizado exitosamente');
  } catch (err) {
    console.error(err.message);
    res.status(500).render('product/edit', {
      error: 'Error al actualizar producto',
      producto: req.body,
    });
  }
};



// Eliminar un producto
exports.deleteProducto = async (req, res) => {
  try {
    const idProduct = req.params.id_producto;
    console.log('Eliminar producto con id', idProduct);


    const producto = await Producto.findOneAndDelete({ id_producto: idProduct });

    if (!producto){
      return res.status(404).render('product/index',{
        error:'prodcuto no encontrado',
      });
    } 

    res.redirect('/api/product');
  } catch (err) {
    console.error(err.message);
    res.status(500).render('product/index',{
      error: 'Error al eliminar un producto',
    });
  }
};

exports.getProductoEditForm = async (req, res) => {
  try {
    const idProducto = req.params.id_producto; // Asegúrate de que tu ruta envíe este parámetro
    console.log("Buscar producto con número", idProducto);

    // Buscar el producto en la base de datos
    const producto = await Producto.findOne({ id_producto: idProducto });

    if (!producto) {
      console.log("Producto no encontrado.");
      return res.status(404).render('product/edit', {
        error: 'Producto no encontrado',
        producto: {}, // Pasar un objeto vacío para evitar errores en la vista
      });
    }

    console.log("Producto encontrado:", producto);
    res.render('product/edit', { producto }); // Pasar el producto a la vista
  } catch (err) {
    console.error("Error al cargar el formulario de edición:", err.message);
    res.status(500).render('product/edit', { // Corrige el nombre de la vista aquí
      error: 'Error al cargar el formulario de edición',
      producto: {}, // Pasar un objeto vacío
    });
  }
};

