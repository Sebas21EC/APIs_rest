const { Router } = require("express");
const router = Router();

//autor
const {
  insert_autor,
  update_autor,
  delete_autor,
  get_all_autor,
  get_autor,
} = require("../controller/autor_controller.js");

//libro
const {
  insert_autor_to_book,
  delete_autor_to_book,
  get_all_book_and_their_autor,
  get_book_and_their_autor,
  get_all_book_and_their_first_autor
} = require("../controller/libro_controller.js");

//insertar autor
router.post("/autor/", insert_autor);

//actualizar autor
router.put("/autor/", update_autor);

//eleiminar autor
router.delete("/autor/", delete_autor);

//todos los autores
router.get("/autor/", get_all_autor);

//un autor consulta
router.get("/autor/:id", get_autor);

// autor a libro
router.post("/autor_libro/", insert_autor_to_book);

//eleiminar autor de libro
router.delete("/autor_libro/", delete_autor_to_book);

// libros con sus autores
router.get("/autor_libro/", get_all_book_and_their_autor);

// autores de n libro
router.get("/autor_libro/:id_book", get_book_and_their_autor);

// autores principales de un libro
router.get("/first_autor_libro/",get_all_book_and_their_first_autor);


module.exports = router;

