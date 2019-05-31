const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars');
const hbs = require('hbs')
const bodyParser = require('body-parser')


var router = express.Router();
var db = require('./database');
// var requireDir = require('require-dir',{recurse:true});
// var api = requireDir('./api');

var apiLaporan = require('./api/laporan');
var apiAcara = require('./api/acara');
var apiPenugasan = require('./api/penugasan');
var apiSepeda = require('./api/sepeda');
var apiStasiun = require('./api/stasiun');
var apiVoucher = require('./api/voucher');
var apiPerson = require('./api/person')


const app = express()
const port = process.env.PORT || 4000

//define path
const publicDirectoryPath = path.join(__dirname,'../public')
const bower_components = path.join(__dirname ,'../bower_components')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partial')

app.use((res, req, next) => {
	req.header('Access-Control-Allow-Origin', 'http://localhost:3000')
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE')
		return res.status(200).json({})
	}
	next()
})

//Setup Handlebar
app.engine('handlebars', exphbs());
// Use Handlebars view engine
app.set('view engine', 'handlebars');

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory
app.use(express.static(publicDirectoryPath))
app.use(express.static(bower_components))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('',(req,res)=>{
    res.render('login')
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/admin/penugasan',(req,res) =>{
    res.render('admin/penugasan')
})

app.get('/admin/acara',(req,res) =>{
    res.render('admin/acara')
})

app.get('/admin/transaksi',(req,res) =>{
    res.render('admin/transaksi')
})

app.get('/admin/statsiun',(req,res) =>{
    res.render('admin/statsiun')
})

app.get('/admin/sepeda',(req,res) =>{
    res.render('admin/sepeda')
})

app.get('/admin/voucher',(req,res) =>{
    res.render('admin/voucher')
})

app.get('/petugas/laporan',(req,res) =>{
    res.render('petugas/laporan')
})

app.get('/petugas/penugasan',(req,res) =>{
    res.render('petugas/penugasan')
})

app.get('/anggota/topup',(req,res) =>{
    res.render('anggota/topup')
})

app.get('/anggota/daftar_transaksi',(req,res) =>{
    res.render('anggota/daftar_transaksi')
})

app.get('/anggota/peminjaman',(req,res) =>{
    res.render('anggota/peminjaman')
})

app.get('/anggota/daftar_acara',(req,res) =>{
    res.render('anggota/daftar_acara')
})

app.get('/anggota/daftar_sepeda',(req,res) =>{
    res.render('anggota/daftar_sepeda')
})

app.get('/anggota/daftar_stasiun',(req,res) =>{
    res.render('anggota/daftar_stasiun')
})

app.get('/anggota/daftar_voucher',(req,res) =>{
    res.render('anggota/daftar_voucher')
})

// app.get('/laporan',(req,res) =>{
//     res.render('laporan')
// })

app.get('/register',(req,res) =>{
    res.render('register')
})

//Rest API
app.get('/api/acara', apiAcara.getAllAcara);
app.get('/api/acara/:id', apiAcara.getSingleAcara);
app.put('/api/acara/:id', apiAcara.updateAcara);
app.post('/api/acara', apiAcara.createAcara);
app.delete('/api/acara/:id', apiAcara.removeAcara);

app.get('/api/penugasan', apiPenugasan.getAllPenugasan);
app.get('/api/penugasan/:id', apiPenugasan.getSinglePenugasan);
app.put('/api/penugasan/:id', apiPenugasan.updatePenugasan);
app.post('/api/penugasan', apiPenugasan.createPenugasan);
app.delete('/api/penugasan/:id', apiPenugasan.removePenugasan);

app.get('/api/sepeda', apiSepeda.getAllSepeda);
app.get('/api/sepeda/:id', apiSepeda.getSingleSepeda);
app.put('/api/sepeda/:id', apiSepeda.updateSepeda);
app.post('/api/sepeda', apiSepeda.createSepeda);
app.delete('/api/Sepeda/:id', apiSepeda.removeSepeda);

app.get('/api/stasiun', apiStasiun.getAllStasiun);
app.get('/api/stasiun/:id', apiStasiun.getSingleStasiun);
app.put('/api/stasiun/:id', apiStasiun.updateStasiun);
app.post('/api/stasiun', apiStasiun.createStasiun);
app.delete('/api/stasiun/:id', apiStasiun.removeStasiun);

app.get('/api/Voucher', apiVoucher.getAllVoucher);
app.get('/api/Voucher/:id', apiVoucher.getSingleVoucher);
app.put('/api/Voucher/:id', apiVoucher.updateVoucher);
app.post('/api/Voucher', apiVoucher.createVoucher);
app.delete('/api/Voucher/:id', apiVoucher.removeVoucher);

app.get('/api/acara', apiAcara.getAllAcara);
app.get('/api/acara/:id', apiAcara.getSingleAcara);
app.put('/api/acara/:id', apiAcara.updateAcara);
app.post('/api/acara', apiAcara.createAcara);
app.delete('/api/acara/:id', apiAcara.removeAcara);

//app.get('/api/person/:login', apiAcara.getPersonLogin);

// app.get('/api/sepeda',db.getAllSepeda);

//routing
//app.use('/api/laporan', require('./api/laporan'))

app.get('/api/laporan',apiLaporan.getAllLaporan);


//router.get('/api/acara', db.getAllAcara);
// router.get('/api/acara/:id', db.getSingleAcara);
// router.post('/api/acara', db.createAcara);
// router.put('/api/acara/:id', db.updateAcara);
// router.delete('/api/acara/:id', db.removeAcara);


module.exports = router;

app.listen(port,() => {
    console.log('server is running on port'+ port)
})