const router = require('express').Router();
const Controller = require("../controllers");

router.get('/toko', Controller.viewSearchAndPositionToko);
router.get('/toko/:page', Controller.viewTokoPagination);
router.post('/cariToko/:page', Controller.cariToko);
router.post('/filterToko/:page', Controller.filterToko);
router.get('/motor', Controller.viewAllMotor);
router.get('/kategori', Controller.viewAllKategori);
router.post('/toko', Controller.createToko);

module.exports = router