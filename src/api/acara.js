var db = require('../database');

module.exports = {
  getAllAcara: getAllAcara,
  getSingleAcara: getSingleAcara,
  createAcara: createAcara,
  updateAcara: updateAcara,
  removeAcara: removeAcara
};


function getAllAcara(req, res, next) {
  db.result(`
      SELECT 
        ac.id_acara as id, 
        ac.judul as judul, 
        ac.deskripsi as deskripsi, 
        ac.tgl_mulai as mulai,
        ac.tgl_akhir as selesai, 
        ac.is_free as gratis,
        string_agg(st.nama, ', ') as stasiun,
        string_agg(st.id_statsiun, ', ') as id_statsiun
      FROM acara as ac
      JOIN acara_statsiun as ast
      ON ac.id_acara = ast.id_acara
      JOIN statsiun as st
      ON st.id_statsiun = ast.id_statsiun
      GROUP BY id`)
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
  db.tx(t => {
    // this.ctx = transaction config + state context;
    return t.batch([
        t.none('insert into acara(judul, deskripsi, tgl_mulai, tgl_akhir , is_free , id_acara)' +
            'values(${judul}, ${deskripsi}, ${tgl_mulai}, ${tgl_akhir}, ${is_free}, ${id_acara})',
           req.body),
        t.none('INSERT INTO acara_statsiun(id_acara, id_statsiun)' + 'VALUES(${id_acara}, ${id_stasiun})',req.body)
    ]);
      })
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

