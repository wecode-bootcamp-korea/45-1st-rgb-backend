const express = require('express');
const productsController = require('../controllers/productsController')

const router = express.Router();

router.get('', productsController.getAllProducts);
router.get('/:productsId', productsController.getSpecificProducts);

module.exports = {
  router
}