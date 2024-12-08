const Categoria = require("../models/category");

exports.getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.render('category/index', { categorias, error: null });
  } catch (err) {
    res.status(500).render('category/index', {
      categorias: [],
      error: err.message,
    });
  }
};

// Renderizar el formulario para crear una categoría
exports.createCategoryForm = (req, res) => {
  res.render('category/create', { error: null });
};

// Crear una nueva categoría
exports.createCategoria = async (req, res) => {
  try {
    const { id_categoria, nombre, descripcion } = req.body;
    const nuevaCategoria = new Categoria({ id_categoria, nombre, descripcion });
    await nuevaCategoria.save();
    res.redirect('/api/category');
  } catch (err) {
    res.status(500).render('category/create', {
      error: 'Error al crear la categoría. Intenta nuevamente.',
    });
  }
};

// Mostrar una categoría específica
exports.getCategoriaById = async (req, res) => {
  try {
    const idCategoria = req.params.id_categoria;
    const categoria = await Categoria.findOne({ id_categoria: idCategoria });

    if (!categoria) {
      return res.status(404).render('category/show',{
        error: "Categoria no encontrada",
      });
    }
    res.render('category/show',{categoria});
  } catch (err) {
    console.error(err.message);
    res.status(500).render('category/show',{
      error: 'Error al buscar categoria',
    });
  }
};


// Renderizar el formulario para editar una categoría
exports.getCategoriaEditForm = async (req, res) => {
  try {
    const idCategoria = req.params.id_categoria;
    const categoria = await Categoria.findOne({ id_categoria: idCategoria });

    if (!categoria) {
      return res.status(404).render('category/edit', {
        error: 'Categoría no encontrada.',
        categoria: {},
      });
    }
    res.render('category/edit', { categoria });
  } catch (err) {
    res.status(500).render('category/edit', {
      error: 'Error al cargar el formulario de edición.',
      categoria: {},
    });
  }
};

// Actualizar una categoría
exports.updateCategoria = async (req, res) => {
  try {
    const idCategoria = req.params.id_categoria;
    const categoria = await Categoria.findOneAndUpdate(
      { id_categoria: idCategoria },
      req.body,
      { new: true }
    );

    if (!categoria) {
      return res.status(404).render('category/edit', {
        error: 'Categoría no encontrada.',
      });
    }
    res.redirect('/api/category?success=Categoría actualizada exitosamente');
  } catch (err) {
    res.status(500).render('category/edit', {
      error: 'Error al actualizar la categoría.',
    });
  }
};

// Eliminar una categoría
exports.deleteCategoria = async (req, res) => {
  try {
    const idCategoria = req.params.id_categoria;
    const categoria = await Categoria.findOneAndDelete({ id_categoria: idCategoria });

    if (!categoria) {
      return res.status(404).render('category/index', {
        error: 'Categoría no encontrada.',
      });
    }
    res.redirect('/api/category');
  } catch (err) {
    res.status(500).render('category/index', {
      error: 'Error al eliminar la categoría.',
    });
  }
};
