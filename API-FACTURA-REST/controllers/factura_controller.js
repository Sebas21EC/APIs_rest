const { db } = require("../config/conection.js");

// Insertar registro de  factura
const insert_factura = async (req, res) => {
  const { date, customer } = req.query;
  try {
    const response = await db.query(
      "INSERT INTO factura VALUES(default,$1,$2) RETURNING *;",
      [customer, date]
    );

    res.json({
      message: "Ingresado con éxito",
      body: {
        factura: {
          id: response[0].fac_id,
          customer,
          date,
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





//Actualizar un regsitro de factura.
const update_factura = async (req, res) => {
    const { id, customer, date } = req.query;
    try {
      const response = await db.query(
        "UPDATE factura SET cli_id=$2, fac_fecha=$3 WHERE fac_id=$1 RETURNING *;",
        [id, customer, date]
      );
  
      res.json({
        message: "Actualiacación exitosa",
        body: {
          factura: {
            id,
            customer,
            date,
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



  // eliminar factura
const delete_factura = async (req, res) => {
    const { id } = req.query;
    try {
      const response = await db.query("DELETE FROM factura WHERE fac_id=$1", [id]);
  
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





  // registros de facturas
  const get_all_facturas = async (req, res) => {
    try {

        let sql = ` select fac.fac_id,fac.fac_fecha,cli.cli_id,cli.cli_nombre,cli.cli_correo,cli.cli_estado 
                    from factura fac join cliente  cli
                     on  fac.cli_id=cli.cli_id
                     order by fac.fac_id;`;

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

 // registros de una factura
 const get_factura = async (req, res) => {
    const id = req.params.id;

    try {


      const response = await db.any(` select fac.fac_id,fac.fac_fecha,cli.cli_id,cli.cli_nombre,cli.cli_correo,cli.cli_estado 
      from factura fac join cliente  cli
       on  fac.cli_id=cli.cli_id
       where fac.fac_id = $1;` , [id]);
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


  // Factura con sus productos
  const get_factura_their_productos = async (req, res) => {
    const id = req.params.id;

    try {
      const response = await db.any(` select fa.fac_id, pr.pro_id, pr.pro_nombre,fp.facpro_cantidad
      from factura fa join factura_producto fp on fa.fac_id = fp.fac_id
          join producto pr on fp.pro_id = pr.pro_id where fa.fac_id=$1;` , [id]);
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
    insert_factura,
    update_factura,
    delete_factura,
    get_all_facturas,
    get_factura,
  get_factura_their_productos,




  };
  