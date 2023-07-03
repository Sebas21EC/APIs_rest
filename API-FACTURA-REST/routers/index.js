const { Router } = require("express");
const router = Router();

//Facturas
const {
  insert_factura,
  update_factura,
  delete_factura,
  get_all_facturas,
  get_factura,
  get_factura_their_productos,
} = require("../controllers/factura_controller.js");

//Producto
const {
  insert_producto_to_factura,
  delet_producto_of_factura,
} = require("../controllers/producto_controler.js");

//Cliente
const {
  get_clientes_and_their_facturas,
  get_cliente_and_their_facturas_whit_productos
} = require("../controllers/cliente_controller.js");

// Insertar factura
router.post("/factura/", insert_factura);

//Actualizar factura
router.put("/factura/", update_factura);

//Eliminar fatura
router.delete("/factura/", delete_factura);

//Todas las facturas
router.get("/factura/", get_all_facturas);

// Una factura por id
router.get("/factura/:id", get_factura);

// Un producto a una factura
router.post("/producto_factura/", insert_producto_to_factura);

//Eliminar un producto de factura
router.delete("/producto_factura/", delet_producto_of_factura);

// Clientes y sus facturas

router.get("/cliente_facturas/", get_clientes_and_their_facturas);


// Factura y sus productos
router.get("/factura_productos/:id", get_factura_their_productos);

// Cliente con sus facturas y sus productos
router.get("/cliente_facturas_producto/:id", get_cliente_and_their_facturas_whit_productos);


module.exports = router;
