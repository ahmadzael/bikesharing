var db = require('../database');

module.exports = {
  getAllStasiun: getAllStasiun,
  getSingleStasiun: getSingleStasiun,
  createStasiun: createStasiun,
  updateStasiun: updateStasiun,
  removeStasiun: removeStasiun
  
  //getAllSepeda:getAllSepeda
};


function getAllStasiun(req, res, next) {
  db.result('select * from Stasiun')
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

function getSingleStasiun(req, res, next) {
  var StasiunID = req.params.id;
  db.one('select * from Stasiun where id_statsiun = $1', StasiunID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE Stasiun'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createStasiun(req, res, next) {
  db.none('insert into Stasiun(alamat, lat, long, nama , id_Stasiun)' +
      'values(${alamat}, ${lat}, ${long}, ${nama} ,${id_Stasiun})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one stasiun'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateStasiun(req, res, next) {
  db.none('update Stasiun set alamat=$1, lat=$2, long=$3, nama=$4 where id_statsiun=$5',
    [req.body.alamat,req.body.lat, req.body.long,req.body.nama, req.params.id])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated stasiun'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeStasiun(req, res, next) {
  var StasiunID = req.params.id;
  db.result('delete from Statsiun where id_Statsiun = $1', StasiunID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} stasiun`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

