var db = require('../database');

module.exports = {
  getAllPerson: getAllPerson,
  getPetugas:getPetugas,
  getAnggota:getAnggota,
  getSinglePerson: getSinglePerson,
  createPerson: createPerson,
  updatePerson: updatePerson,
  removePerson: removePerson
};


function getAllPerson(req, res, next) {
  db.result('select * from Person')
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

function getPetugas(req, res, next) {
  db.result('select * from Person , Pertugas where person.ktp = petugas.ktp')
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

function getAnggota(req, res, next) {
  db.result('select * from Person , Anggota where person.ktp = anggota.ktp')
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

function getSinglePerson(req, res, next) {
  var PersonID = req.params.id;
  db.one('select * from Person where ktp = $1', PersonID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE Person'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createPerson(req, res, next) {
  db.none('insert into Person(email, nama, alamat, tgl_lahir , no_telp , ktp)' +
      'values(${email}, ${nama}, ${alamat}, ${tgl_lahir}, ${no_telp}, ${ktp})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one Person'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function updatePerson(req, res, next) {
  db.none('update Person set email=$1, nama=$2, alamat=$3, tgl_lahir=$4, no_telp=$5 statsiun=$6 where ktp=$7',
    [req.body.email,
      req.body.nama, req.body.alamat,
      req.body.tgl_lahir, req.body.no_telp, req.params.id])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated Person'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removePerson(req, res, next) {
  var PersonID = req.params.id;
  db.result('delete from Person where ktp = $1', PersonID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} Person`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

