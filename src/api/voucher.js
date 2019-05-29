var db = require('../database');

module.exports = {
  getAllVoucher: getAllVoucher,
  getSingleVoucher: getSingleVoucher,
  createVoucher: createVoucher,
  updateVoucher: updateVoucher,
  removeVoucher: removeVoucher
};


function getAllVoucher(req, res, next) {
  db.result('select * from Voucher')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL Data'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleVoucher(req, res, next) {
  var VoucherID = req.params.id;
  db.one('select * from Voucher where ktp = $1', VoucherID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE Voucher'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createVoucher(req, res, next) {
  db.none('insert into Voucher(email, nama, alamat, tgl_lahir , no_telp , ktp)' +
      'values(${email}, ${nama}, ${alamat}, ${tgl_lahir}, ${no_telp}, ${ktp})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one Voucher'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function updateVoucher(req, res, next) {
  db.none('update Voucher set email=$1, nama=$2, alamat=$3, tgl_lahir=$4, no_telp=$5 statsiun=$6 where ktp=$7',
    [req.body.email,
      req.body.nama, req.body.alamat,
      req.body.tgl_lahir, req.body.no_telp, req.params.id])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated Voucher'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeVoucher(req, res, next) {
  var VoucherID = req.params.id;
  db.result('delete from Voucher where ktp = $1', VoucherID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} Voucher`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

