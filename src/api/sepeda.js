var db = require('../database');

module.exports = {
  getAllSepeda: getAllSepeda,
  getSingleSepeda: getSingleSepeda,
  createSepeda: createSepeda,
  updateSepeda: updateSepeda,
  removeSepeda: removeSepeda
};


function getAllSepeda(req, res, next) {
  db.result('select * from Sepeda')
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

function getSingleSepeda(req, res, next) {
  var SepedaID = req.params.id;
  db.one('select * from Sepeda where ktp = $1', SepedaID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE Sepeda'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createSepeda(req, res, next) {
  db.none('insert into Sepeda(email, nama, alamat, tgl_lahir , no_telp , ktp)' +
      'values(${email}, ${nama}, ${alamat}, ${tgl_lahir}, ${no_telp}, ${ktp})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one Sepeda'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function updateSepeda(req, res, next) {
  db.none('update Sepeda set email=$1, nama=$2, alamat=$3, tgl_lahir=$4, no_telp=$5 statsiun=$6 where ktp=$7',
    [req.body.email,
      req.body.nama, req.body.alamat,
      req.body.tgl_lahir, req.body.no_telp, req.params.id])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated Sepeda'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeSepeda(req, res, next) {
  var SepedaID = req.params.id;
  db.result('delete from Sepeda where ktp = $1', SepedaID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} Sepeda`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

