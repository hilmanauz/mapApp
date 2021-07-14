const {Toko, Kategori, Motor} = require("../models");
const _ = require('lodash')
const { Op } = require("sequelize");

class Controller {
  static viewAllKategori(req, res, next) {
    Kategori.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static viewAllMotor(req, res, next) {
    Motor.findAll()
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
    Toko.create(data)
      .then(() => res.status(200).json({message: "Success Create"}))
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static viewSearchAndPositionToko(req, res, next) {
    Toko.findAll({attributes: ['nama', 'lat', 'long', 'mapUrl', 'id']})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static viewTokoPagination(req, res, next) {
    Toko.findAll({include: [{model: Kategori}, {model: Motor}],  order: [['id', 'ASC']]})
      .then(data => {
        const pagination = _.chunk(data, 5)
        const page = Number(req.params.page)
        const dataLength = pagination.length
        const result = {
          data: pagination[page-1],
          length: dataLength,
          currentPage: Number(req.params.page),
        }
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static cariToko(req, res, next) {
    Toko.findAll({
      include: [{model: Kategori}, {model: Motor}],  
      order: [['id', 'ASC']],
      where: {
      nama: {
        [Op.iLike]: '%' + req.body.search + '%'
      }
    }})
      .then(data => {
        const pagination = _.chunk(data, 5)
        const dataLength = pagination.length
        const page = Number(req.params.page)
        const result = {
          data: pagination[page-1],
          length: dataLength,
          currentPage: Number(req.params.page),
        }
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static filterToko(req, res, next) {
    // let myFunc = num => Number(num);
    // var kategoriId = Array.from(String(req.body.KategoriId), myFunc);
    // var motorId = Array.from(String(req.body.MotorId), myFunc);
    Toko.findAll({include: [{model: Kategori}, {model: Motor}],
      where: {
      MotorId: {
        [Op.or]: req.body.MotorId
      },
      KategoriId: {
        [Op.or]: req.body.KategoriId
      }
    }})
    .then(data => {
      const pagination = _.chunk(data, 5)
      const dataLength = pagination.length
      const page = Number(req.params.page)
      const result = {
        data: pagination[page-1],
        length: dataLength,
        currentPage: Number(req.params.page),
      }
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
}

module.exports = Controller