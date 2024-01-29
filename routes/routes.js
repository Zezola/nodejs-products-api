const express = require('express');

const productController = require('../controller/productController');
const userController = require('../controller/userController');

const auth = require('../middleware/auth');
const role = require('../middleware/role');
const validate = require('../middleware/validate');
const log = require('../middleware/logger');

/* Import validation schemas */
const joiValidationSchemas = require('../helper/validationHelper');

const router = express.Router();


/* -- PRODUCT ROUTES -- */

router.post("/products", auth, role(['SUPERADMIN','ADMIN']), 
validate(joiValidationSchemas.productSaveSchema), productController.save);

router.get("/products", auth, productController.getAll);

router.get("/products/:id", auth, productController.getById);

router.patch("/products/:id", auth, role(['SUPERADMIN','ADMIN']), 
validate(joiValidationSchemas.productUpdateSchema),productController.updateById);

router.delete("/products/:id", auth, role(['SUPERADMIN','ADMIN']), productController.deleteById);
/* -------------------- */

/* -- USER ROUTES -- */
router.post("/register", validate(joiValidationSchemas.userRegisterSchema), userController.register);

router.post("/login", userController.login);

router.get("/users", auth, role(['SUPERADMIN','ADMIN']), userController.getAll);

router.get("/users/:id", auth, role(['SUPERADMIN','ADMIN']), userController.getUserById);

router.patch("/users/:id", auth, role(['SUPERADMIN','ADMIN']),
validate(joiValidationSchemas.userUpdateSchema), userController.updateUser);

router.delete("/users/:id", auth, role(['SUPERADMIN','ADMIN']), userController.deleteUser);

module.exports = router;