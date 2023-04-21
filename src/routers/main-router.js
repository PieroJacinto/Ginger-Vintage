const { Router } = require("express");
const router = Router();
module.exports = router;

const mainController = require("../controllers/mainController");
const multerMiddleware = require("../middlewares/multerMiddleware");


router.get("/", mainController.home);


//NEW PRODUCT
//Renderizacion de vista del formulario para crear nuevo producto
router.get("/newProduct", mainController.newProduct);
//Carga de informacion para nuevo producto
router.post("/newProduct", multerMiddleware.array("fotosDelProducto", 10), mainController.chargeProduct)

//PRODUCT FILTER

//PRODUCT DETAIL
router.get("/detail/:id", mainController.productDetail);

router.get("/:categoriaId/:pagina", mainController.categoryList); 

router.post("/:categoriaId/:pagina", mainController.filterProduct);
