const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//define path
const publicDirectoryPath = path.join(__dirname,'../public')
const bower_components = path.join(__dirname ,'../bower_components')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partial')

//Setup Handlebar
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory
app.use(express.static(publicDirectoryPath))
app.use(express.static(bower_components))

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

app.get('/laporan',(req,res) =>{
    res.render('laporan')
})

app.get('/register',(req,res) =>{
    res.render('register')
})

app.listen(port,() => {
    console.log('server is running on port'+ port)
})