const { db } = require("../config/conection.js");

const get_posts_and_comments = async (req, res) => {
  const response = await db.any(
    `SELECT pu.pub_id,pu.pub_titulo,au.aut_usuario,co.com_descripcion
    FROM autor au JOIN comentario co on au.aut_id = co.aut_id
    JOIN publicacion pu on au.aut_id = co.aut_id order by pu.pub_id;`
  );
  res.json(response);
};

const get_authors_and_their_post = async (req, res) => {
  const response = await db.any(
    `SELECT au.aut_usuario,au.aut_nombre,pu.pub_titulo,pu.pub_descripcion
     FROM autor au JOIN publicacion pu ON au.aut_id = pu.aut_id;`
  );
  res.json(response);
};

const get_comments_on_a_post = async (req, res) => {
  const pub_id = req.params.pub_id;
  const response = await db.any(
    `SELECT pu.pub_id,pu.pub_titulo,au.aut_usuario,co.com_descripcion
        FROM  autor au JOIN publicacion pu on au.aut_id=pu.aut_id
        JOIN comentario co on au.aut_id = co.aut_id where pu.pub_id=$1;`,
    [pub_id]
  );
  res.json(response);
};

const get_post_and_their_comment_numbers = async (req, res) => {
  const response = await db.any(
    `SELECT pu.pub_titulo, count(co.com_id) FROM publicacion pu
      JOIN comentario co ON pu.pub_id=co.pub_id
      GROUP BY pu.pub_id;`
  );
  res.json(response);
};

const get_post_comments_and_number_likes = async (req, res) => {
    const response = await db.any(
      `SELECT pu.pub_titulo,co.com_descripcion,COUNT(re.rea_like)
      FROM publicacion pu
      JOIN comentario co ON pu.pub_id=co.pub_id
      JOIN reaccion re ON  co.com_id=re.com_id
      WHERE re.rea_like=true
      GROUP BY pu.pub_id,co.com_descripcion;`
    );
    res.json(response);
  };


  const get_category_post_comments_and_numbers_likes = async (req, res) => {
    const response = await db.any(
      `SELECT ca.cat_titulo,pu.pub_titulo,co.com_descripcion,
      COUNT(re.rea_like) AS "n LIKES",COUNT(DISTINCT au.aut_id) AS "n autoresXcomentarios"
      FROM publicacion pu
      JOIN categoria ca ON pu.cat_id=ca.cat_id
      JOIN comentario co ON pu.pub_id=co.pub_id
      JOIN autor au ON  co.aut_id=au.aut_id
      JOIN reaccion re ON  co.com_id=re.com_id
      WHERE re.rea_like=true
      GROUP BY pu.pub_id,co.com_descripcion,ca.cat_titulo;`
    );
    res.json(response);
  };

  const get_authors_categories_number_posts_number_likes = async (req, res) => {
    const response = await db.any(
      `SELECT AU.AUT_NOMBRE, ca.cat_titulo,
      COUNT(DISTINCT pu.pub_id) AS "n publicaciones",
      COUNT(rea.rea_id) AS "n likes"
      FROM autor au
      JOIN publicacion pu ON au.aut_id = pu.aut_id
      JOIN categoria ca ON pu.cat_id = ca.cat_id
      LEFT JOIN comentario com ON com.pub_id = pu.pub_id
      LEFT JOIN reaccion rea ON com.com_id = rea.com_id
      GROUP BY AU.AUT_NOMBRE, ca.cat_titulo;      
      `
    );
    res.json(response);
  };

module.exports = {
  get_posts_and_comments,
  get_authors_and_their_post,
  get_comments_on_a_post,
  get_post_and_their_comment_numbers,
  get_post_comments_and_number_likes,
  get_category_post_comments_and_numbers_likes,
  get_authors_categories_number_posts_number_likes
};
