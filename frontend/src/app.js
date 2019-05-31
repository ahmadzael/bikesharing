import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import {
	Home,
	Login,
	Register,
	Penugasan,
	Acara,
	Riwayat,
	Laporan,
	Stasiun,
	Sepeda,
	Voucher,
	Peminjaman
} from './containers'

class App extends Component {
	render() {
		const user = JSON.parse(localStorage.getItem('login'))        
        const auth = user !== null
		return (
			<Router>
				<Switch>
					{/* all user */}
					<Route exact path='/' component={Login} />
					{/* if anggota can topup  */}
					<Route exact path='/register' component={Register} />
					<Route exact path='/home' component={!auth ? Login : Home} />
					
					{/* admin */}
					<Route exact path='/acara' component={!auth ? Login : Acara} />
					{/* if petugas can read self data  */}
					<Route exact path='/penugasan' component={!auth ? Login : Penugasan} />
					<Route exact path='/stasiun' component={!auth ? Login : Stasiun} />
					{/* if anggota can pinjam sepeda  */}
					<Route exact path='/sepeda' component={!auth ? Login : Sepeda} />
					{/* if anggota can claim voucher  */}
					<Route exact path='/voucher' component={!auth ? Login : Voucher} />
					
					{/* anggota */}
					<Route exact path='/riwayat' component={!auth ? Login : Riwayat} />
					<Route exact path='/peminjaman' component={!auth ? Login : Peminjaman} />
					
					{/* admin - petugas */}
					<Route exact path='/laporan' component={!auth ? Login : Laporan} />
				</Switch>
			</Router>
		)
	}
}

const mapStateToProps = (state) => ({
	user: state.user
})

export default connect(mapStateToProps)(App)
