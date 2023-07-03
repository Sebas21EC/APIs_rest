const { Router } = require("express");
const router = Router();


//Comentarios
const  {
    get_all_comentarios,
    insert_comment,
    update_comment,
    delete_commet
} = require("../controllers/comentario_controller.js");

//Mixed get

const {
    get_posts_and_comments,
    get_authors_and_their_post,
    get_comments_on_a_post,
    get_post_and_their_comment_numbers,
    get_post_comments_and_number_likes,
    get_category_post_comments_and_numbers_likes,
    get_authors_categories_number_posts_number_likes
}=require("../controllers/mixed_controllers.js");

// Routers
const{


}= require("../controllers/mixed_controllers.js");

router.get("/blog/comentarios/",get_all_comentarios);

//insertar comentario
router.post("/blog/comentario/",insert_comment);

//actualizar comentario
router.put("/blog/comentario/",update_comment);

// eliminar comentario
router.delete("/blog/comentario/",delete_commet);

//mixed 
router.get("/blog/1/",get_posts_and_comments);
router.get("/blog/2/",get_authors_and_their_post);
router.get("/blog/3/:pub_id",get_comments_on_a_post);
router.get("/blog/4/",get_post_and_their_comment_numbers);
router.get("/blog/5/",get_post_comments_and_number_likes);
router.get("/blog/6/",get_category_post_comments_and_numbers_likes);
router.get("/blog/7/",get_authors_categories_number_posts_number_likes);







module.exports = router;