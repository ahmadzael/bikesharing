var db = require('../database');


module.exports = {
    getAllLaporan: getAllLaporan
};  


function getAllLaporan(req, res, next) {
    db.result('select * from Sepeda')
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

