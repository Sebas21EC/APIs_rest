const { db } = require("../config/conection.js");

const getPizzas = async (req, res) => {
  let sql =
    "select piz_name, piz_origin, sum(ing_calories)*sum(pizi_quantity) as calorias from pizza pi left join pizza_ingredient piin on piin.piz_id = pi.piz_id left join ingredient ing on piin.piz_id=ing.ing_id group by pi.piz_id;";

  const response = await db.any(sql);
  res.json(response);
};

const getPizzasByName = async (req, res) => {
  const name = req.params.name;
  console.log("Nombre recibido:", name);
  const response = await db.any("select * from pizza where piz_name=$1;", [
    name,
  ]);
  res.json(response);
};

//console.log("hola")
const getPizzasLikeName = async (req, res) => {
  const name = req.params.name;
  console.log("Nombre recibido:", name);
  const response = await db.any(
    "SELECT * FROM pizza WHERE piz_name LIKE '%$1#%';",
    [name]
  );
  res.json(response);
};

const createPizza = async (req, res) => {
  const { name, origin } = req.query;

  try {
    console.log("Nombre recibido:", name);
    //let sql = "INSERT INTO pizza(piz_name,piz_origin) VALUES ($1,$2)"
    const response = await db.query(
      "INSERT INTO pizza(piz_name,piz_origin) VALUES ($1,$2) returning *;",
      [name, origin]
    );

    res.json({
      message: "Pizza creada con éxito",
      body: {
        pizza: { id, name, origin },
      },
    });
  } catch (error) {
    res.json({
      message: "Pizza NO creada con éxito",
      body: {
        error,
      },
    });
  }
};

const updatePizza = async (req, res) => {
  const { id, name, origin } = req.query;

  try {
    const response = await db.query(
      "UPDATE pizza SET piz_name = $2, piz_origin = $3 WHERE piz_id=$1 returning *;",
      [id, name, origin]
    );

    res.json({
      message: "Pizza atualizada con éxito",
    });
  } catch (error) {
    res.json({
      message: "Pizza NO actualizada con éxito",
      body: {
        error,
      },
    });
  }
};

const deletePizza = async (req, res) => {
  const { id } = req.query;

  try {
    const response = await db.query("DELETE FROM pizza WHERE piz_id=$1 ;", [
      id,
    ]);
    res.json({
      message: "Registro eliminado",
    });
  } catch (error) {
    res.json({
      message: "Registro No eliminado",
      body: {
        error,
      },
    });
  }
};

module.exports = {
  getPizzas,
  getPizzasByName,
  getPizzasLikeName,
  createPizza,
  updatePizza,
  deletePizza,
};

/*
const result= db.any(sql).then(result => 
    {
        console.table(result);
    });0*/
