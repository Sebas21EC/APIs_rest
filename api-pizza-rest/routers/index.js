const { Router } = require("express");
const router = Router();

const {
  getPizzas,
  getPizzasByName,
  getPizzasLikeName,
  createPizza,
  updatePizza,
  deletePizza,
} = require("../controllers/pizza-controller");

//router.get('/pizza', getPizzas);
router.get("/pizza/like/:name", getPizzasLikeName);
router.post("/pizza/crear/", createPizza);
router.put("/pizza/", updatePizza);
router.delete("/pizza/", deletePizza);

module.exports = router;
