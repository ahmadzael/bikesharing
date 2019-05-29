var db = require('../database');

module.exports = {
  getAllPenugasan: getAllPenugasan,
  getSinglePenugasan: getSinglePenugasan,
  createPenugasan: createPenugasan,
  updatePenugasan: updatePenugasan,
  removePenugasan: removePenugasan
};


function getAllPenugasan(req, res, next) {
  db.result('select * from Penugasan')
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

function getSinglePenugasan(req, res, next) {
  var PenugasanID = req.params.id;
  db.one('select * from Penugasan where ktp = $1', PenugasanID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE Penugasan'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createPenugasan(req, res, next) {
  db.none('insert into Penugasan(email, nama, alamat, tgl_lahir , no_telp , ktp)' +
      'values(${email}, ${nama}, ${alamat}, ${tgl_lahir}, ${no_telp}, ${ktp})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one Penugasan'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function updatePenugasan(req, res, next) {
  db.none('update Penugasan set email=$1, nama=$2, alamat=$3, tgl_lahir=$4, no_telp=$5 statsiun=$6 where ktp=$7',
    [req.body.email,
      req.body.nama, req.body.alamat,
      req.body.tgl_lahir, req.body.no_telp, req.params.id])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated Penugasan'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removePenugasan(req, res, next) {
  var PenugasanID = req.params.id;
  db.result('delete from Penugasan where ktp = $1', PenugasanID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} Penugasan`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

