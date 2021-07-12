const {Toko, Kategori, Motor} = require("../models");

class Controller {
  static viewAllToko(req, res, next) {
    Toko.findAll({include: [{model: Kategori}, {model: Motor}]})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static createToko(req, res, next) {
    const data = {
      nama: req.body.nama,
      telp: req.body.telp,
      long: parseFloat(req.body.long),
      lat: parseFloat(req.body.lat),
      mapUrl: `https://www.google.com/maps?q=${req.body.lat},${req.body.long}`,
      MotorId: Number(req.body.motorId),
      KategoriId: Number(req.body.kategoriId),
      status: req.body.status
    }
    console.log(data)
    Toko.create(data)
      .then(() => res.status(200).json({message: "Success Create"}))
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static viewAllToko(req, res, next) {
    let result = {}
    Promise.all([Toko.findAll({include: [{model: Kategori}, {model: Motor}]}), Kategori.findAll(), Motor.findAll()])
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static filterToko(req, res, next) {
    
  }

}

module.exports = Controller