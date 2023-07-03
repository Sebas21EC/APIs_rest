const { db } = require("../config/conection.js");

// Insertar un autor
const insert_autor = async (req, res) => {
  const { name, country } = req.query;
  try {
    const response = await db.query(
      "INSERT INTO autor VALUES(default,$1,$2) RETURNING *;",
      [name, country]
    );

    res.json({
      message: "Ingresado con éxito",
      body: {
        autor: {
          id: response[0].aut_id,
          name,
          country,
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

// actualizar un autor
const update_autor = async (req, res) => {
  const { id, name, country } = req.query;
  try {
    const response = await db.query(
      "UPDATE autor SET aut_nombre=$2, aut_pais=$3 WHERE aut_id=$1 RETURNING *;",
      [id, name, country]
    );

    res.json({
      message: "Actualiacación exitosa",
      body: {
        autor: {
          id,
          name,
          country,
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

// eliminar autor
const delete_autor = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await db.query("DELETE FROM autor WHERE aut_id=$1", [id]);

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

//datos de autores
const get_all_autor = async (req, res) => {
  try {
    const response = await db.any("SELECT * FROM autor;");
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

// dato de un autor
const get_autor = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await db.any(`SELECT * FROM  autor where aut_id=$1;`, [
      id,
    ]);
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
  insert_autor,
  update_autor,
  delete_autor,
  get_all_autor,
  get_autor,
};
