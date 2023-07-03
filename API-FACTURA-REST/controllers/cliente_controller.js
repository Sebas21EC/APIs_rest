const { db } = require("../config/conection.js");



  // registros clientes y sus facturas
  const get_clientes_and_their_facturas = async (req, res) => {
    try {

        let sql = `select cl.cli_id, cl.cli_nombre, fa.fac_id, fa.fac_fecha 
        from cliente  cl join factura fa 
        on cl.cli_id=fa.cli_id ;`;

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


  // Clientes con sus facturas y sus productos
  const get_cliente_and_their_facturas_whit_productos = async (req, res) => {
    try {

        const id = req.params.id;

      const response = await db.any(`
      select  cl.cli_nombre, fa.fac_id, pr.pro_nombre, pr.pro_pvp, fp.facpro_cantidad
        from factura fa 
        join factura_producto fp on fa.fac_id = fp.fac_id
        join cliente cl on cl.cli_id = fa.cli_id
        join producto pr on fp.pro_id = pr.pro_id where cl.cli_id=$1 ;
      `,[id]);
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
    get_clientes_and_their_facturas,
    get_cliente_and_their_facturas_whit_productos,
    
  
  };
  