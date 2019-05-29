var db = require('../database');

module.exports = {
  getAllAcara: getAllAcara,
  getSingleAcara: getSingleAcara,
  createAcara: createAcara,
  updateAcara: updateAcara,
  removeAcara: removeAcara
};


function getAllAcara(req, res, next) {
  db.result('select * from acara')
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

function getSingleAcara(req, res, next) {
  var acaraID = req.params.id;
  db.one('select * from acara where id_acara = $1', acaraID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE Acara'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createAcara(req, res, next) {
  db.none('insert into acara(judul, deskripsi, tgl_mulai, tgl_akhir , is_free , id_acara)' +
      'values(${judul}, ${deskripsi}, ${tgl_mulai}, ${tgl_akhir}, ${is_free}, ${id_acara})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one Acara'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateAcara(req, res, next) {
  db.none('update acara set judul=$1, deskripsi=$2, tgl_mulai=$3, tgl_akhir=$4, is_free=$5 statsiun=$6 where id_acara=$7',
    [req.body.judul, req.params.id,
      req.body.deskripsi, req.body.tgl_mulai,
      req.body.tgl_akhir, req.body.is_free, req.body.statsiun, req.params.id])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated Acara'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeAcara(req, res, next) {
  var acaraID = req.params.id;
  db.result('delete from acara where id_acara = $1', acaraID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} Acara`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

