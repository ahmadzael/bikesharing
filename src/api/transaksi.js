var db = require('../database');

module.exports = {
  getAllStasiun: getAllTransaksi,

  
  //getAllSepeda:getAllSepeda
};


function getAllStasiun(req, res, next) {
  db.result('select * from Transaksi')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL stasiun'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

