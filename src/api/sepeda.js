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
  db.one('select * from Sepeda where nomor = $1', SepedaID)
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
  db.none('insert into Sepeda(merek, jenis, status, id_statsiun , no_kartu_penyumbang , nomor)' +
      'values(${merek}, ${jenis}, ${status}, ${id_statsiun}, ${no_kartu_penyumbang}, ${nomor})',
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
  db.none('update Sepeda set merek=$1, jenis=$2, status=$3, id_statsiun=$4, no_kartu_penyumbang=$5 where nomor=$6',
    [req.body.merek,
      req.body.jenis, req.body.status, 
      req.body.no_kartu_penyumbang, req.params.id])
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

