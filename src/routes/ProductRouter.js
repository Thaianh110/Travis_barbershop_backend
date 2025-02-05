const express = require('express');
const router = express.Router()
const ProductController = require("../controller/ProductController");
const { authMiddleWare } = require('../middleware/authMiddleWare');

router.post('/create', ProductController.createProduct)
router.put('/update/:id',authMiddleWare ,ProductController.updateProduct)
router.get('/get-details/:id', ProductController.getDetailsProduct)
router.delete('/delete/:id',ProductController.deleteProduct)
router.get('/getAllProduct',ProductController.getAllProduct)


module.exports = router