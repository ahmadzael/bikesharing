var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
// var connectionString = 'postgresql://postgress:@localhost:5432/tugas';
// var db = pgp(connectionString);
var db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'tugas',
  user: 'postgres'
});

// add query functions

module.exports = {
  getAllAcara: getAllAcara,
  getSingleAcara: getSingleAcara,
  // createAcara: createAcara,
  updateAcara: updateAcara
  // removeAcara: removeAcara
};

function getAllAcara(req, res, next) {
  db.result('select * from acara')
    .then(function (data) {
      res.status(200)
        .json({
          data: data
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
//'update acara set judul=$1, deskripsi=$2, tgl_mulai=$3, tgl_akhir=$4, is_free=$5 where id_acara=$6'

function updateAcara(req, res, next) {
  db.none('update acara set judul=$1 where id_acara=$2',
    [req.body.judul, req.params.id])
      //req.body.deskripsi, req.body.tgl_mulai,
      //req.body.tgl_akhir, req.body.is_free, req.params.id])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}