const router = require('express').Router();
const Controller = require("../controllers");

router.get('/toko', Controller.viewAllToko);
router.post('/toko', Controller.createToko);

module.exports = router