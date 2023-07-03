const { db } = require("../config/conection.js");

// Insertar un producto a factura
const insert_producto_to_factura = async (req, res) => {
  const { pro_id, fac_id, amout, cost } = req.query;
  try {
    const response = await db.query(
      "INSERT INTO factura_producto values ($1,$2,$3,$4) RETURNING *;",
      [pro_id, fac_id, amout, cost]
    );

    res.json({
      message: "Ingresado con éxito",
      body: {
        producto_factura: {
          pro_id,
          fac_id,
          amout,
          cost,
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

//Eliminar producto de factura
const delet_producto_of_factura = async (req, res) => {
  const { pro_id, fac_id } = req.query;
  try {
    const response = await db.query(
      "DELETE FROM factura_producto WHERE pro_id=$1 AND fac_id=$2 ;",
      [ pro_id, fac_id]
    );

    res.json({
      message: "Registro eliminado",
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

module.exports = {
  insert_producto_to_factura,
  delet_producto_of_factura,

};
