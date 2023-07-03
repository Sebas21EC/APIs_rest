const { db } = require("../config/conection.js");

// Todos los comentarios
const get_all_comentarios = async (req, res) => {
  const response = await db.any("SELECT * FROM comentario;");
  res.json(response);
};

// Insertar un comentario
const insert_comment = async (req, res) => {
  const { pub_id, aut_id, description } = req.query;
  try {
    const response = await db.query(
      "INSERT INTO comentario(pub_id,aut_id,com_descripcion) VALUES($1,$2,$3) RETURNING *;",
      [pub_id, aut_id, description]
    );

    res.json({
      message: "Ingresado con éxito",
      body: {
        comentario: {
          id: response[0].com_id,
          pub_id,
          aut_id,
          description,
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

// actuzalizar comentaario de una publicacion
const update_comment = async (req, res) => {
  const {id,description } = req.query;
  try {
    const response = await db.query(
      "UPDATE comentario SET com_descripcion=$2 WHERE com_id=$1 RETURNING *;",
      [id, description]
    );

    res.json({
      message: "Actualización correcta",
      body: {
        comentario: { id, pub_id:response[0].pub_id,description },
      },
    });
  } catch (error) {
    res.json8({
      message: "Error!!",
      body: {
        error,
      },
    });
  }
};


// eliminar comentario 
const delete_commet = async (req,res)=>{
  const {id}=req.query
  try{
    const response = await db.query(
      "DELETE FROM comentario WHERE com_id=$1",
      [id]
    );

    res.json({
      message:"Registro eliminado"
    })

  }
  catch(error){
    res.json({
      message:"Error",
      body:{
        error
      }
    })
  }
}


module.exports = {
  get_all_comentarios,
  insert_comment,
  update_comment,
  delete_commet
};
