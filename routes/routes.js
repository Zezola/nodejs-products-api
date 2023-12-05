const express = require('express');

const productController = require('../controller/productController');
const userController = require('../controller/userController');

const auth = require('../middleware/auth');
const role = require('../middleware/role');

const router = express.Router();


/* -- PRODUCT ROUTES -- */

router.post("/products", auth, role, productController.save);

router.get("/products", auth, productController.getAll);

router.get("/products/:id", auth, productController.getById);

router.patch("/products/:id", auth, role, productController.updateById);

router.delete("/products/:id", auth, role, productController.deleteById);
/* -------------------- */

/* -- USER ROUTES -- */
router.post("/register", userController.register);

router.post("/login", userController.login);

module.exports = router;