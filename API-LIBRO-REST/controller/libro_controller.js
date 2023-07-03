const { db } = require("../config/conection.js");

// Insertar un autor a libro
const insert_autor_to_book = async (req, res) => {
  const { id_autor, id_book, first } = req.query;
  try {
    const response = await db.query(
      "INSERT INTO autor_libro values (default,$1,$2,$3) RETURNING *;",
      [id_autor, id_book, first]
    );

    res.json({
      message: "Ingresado con éxito",
      body: {
        autor_libro: {
          id: response[0].aut_lib_id,
          id_autor,
          id_book,
          first,
        },
      },
    });
  } catch (error) {
    res.json({
      message: "Error!!",
      body: {
        error,
      },
    });
  }
};

// Eliminar un autor de un libro
const delete_autor_to_book = async (req, res) => {
  const { id_autor, id_book } = req.query;
  try {
    const response = await db.query(
      "DELETE FROM autor_libro WHERE aut_id=$1 and lib_id=$2",
      [id_autor, id_book]
    );

    res.json({
      message: "Registro eliminado",
    });
  } catch (error) {
    res.json({
      message: "Error",
      body: {
        error,
      },
    });
  }
};

// Libros y sus autores
const get_all_book_and_their_autor = async (req, res) => {
  try {
    let sql = `select li.lib_id,li.lib_titulo,li.lib_editorial,au.aut_id,au.aut_nombre,au.aut_pais from autor_libro al
        join autor au on au.aut_id=al.aut_id
        join libro li on li.lib_id=al.lib_id;`;
    const response = await db.any(sql);
    res.json(response);
  } catch (error) {
    res.json({
      message: "Error",
      body: {
        error,
      },
    });
  }
};

//autores de un libro
const get_book_and_their_autor = async (req, res) => {
  try {
    const id_book = req.params.id_book;
    const response = await db.any(
      `select au.aut_id,au.aut_nombre,au.aut_pais,li.lib_titulo as "Nombre Libro" from autor_libro al
      join autor au on au.aut_id=al.aut_id
      join libro li on li.lib_id=al.lib_id
      where li.lib_id=$1;`,
      [id_book]
    );
    res.json(response);
  } catch (error) {
    res.json({
      message: "Error",
      body: {
        error,
      },
    });
  }
};

//autores principales de un libro
const get_all_book_and_their_first_autor = async (req, res) => {
    try {
      const response = await db.any(
        `select li.lib_id, li.lib_titulo, count(al.aut_lib_autor_principal) as "N autores principales" from autor_libro al
        join autor au on au.aut_id=al.aut_id
        join libro li on li.lib_id=al.lib_id
        where al.aut_lib_autor_principal=true
        group by li.lib_titulo,li.lib_id;`
      );
      res.json(response);
    } catch (error) {
      res.json({
        message: "Error",
        body: {
          error,
        },
      });
    }
  };

module.exports = {
  insert_autor_to_book,
  delete_autor_to_book,
  get_all_book_and_their_autor,
  get_book_and_their_autor,
  get_all_book_and_their_first_autor,
};
