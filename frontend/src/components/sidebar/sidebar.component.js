import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Images } from '../../assets'

import './sidebar.style.css'

class Sidebar extends React.Component {
	render() {
		const user = JSON.parse(localStorage.getItem('login')) 
		const isadmin = user && user.role === 'admin'
		const ispetugas = user && user.role === 'petugas'
		const isanggota = user && user.role === 'anggota'
		return (
			<aside className='main-sidebar'>
				<section className='sidebar'>
					<div className='user-panel'>
						<div className='pull-left image'>
							<img src={Images.user_icon} className='img-circle' alt='users' />
						</div>
						<div className='pull-left info'>
							<p>{user && user.nama}</p>
							<Link to='/home'>
								<i className='fa fa-circle text-success' /> Online
							</Link>
						</div>
					</div>
					<ul className='sidebar-menu' data-widget='tree'>
						<li className='header'>MENU UTAMA</li>

						{isadmin && (
							<li className={this.props.path === 'acara' ? 'active' : null}>
								<Link to='/acara' className='active-border'>
									<i className='fa fa-bar-chart' />
									<span>Acara</span>
									<span className='pull-right-container'>
										<span className='label label-primary pull-right' />
									</span>
								</Link>
							</li>
						)}
						{isadmin && (
							<li className={this.props.path === 'stasiun' ? 'active' : null}>
								<Link to='/stasiun' className='active-border'>
									<i className='fa fa-taxi' />
									<span>Stasiun</span>
									<span className='pull-right-container'>
										<span className='label label-primary pull-right' />
									</span>
								</Link>
							</li>
						)}
						{(isadmin || ispetugas) && (
							<li className={this.props.path === 'penugasan' ? 'active' : null}>
								<Link to='/penugasan' className='active-border'>
									<i className='fa fa-files-o' />
									<span>Penugasan</span>
									<span className='pull-right-container'>
										<span className='label label-primary pull-right' />
									</span>
								</Link>
							</li>
						)}
						{(isadmin || isanggota) && (
							<li className={this.props.path === 'sepeda' ? 'active' : null}>
								<Link to='/sepeda' className='active-border'>
									<i className='fa fa-bicycle' />
									<span>Sepeda</span>
									<span className='pull-right-container'>
										<span className='label label-primary pull-right' />
									</span>
								</Link>
							</li>
						)}
						{(isadmin || isanggota) && (
							<li className={this.props.path === 'voucher' ? 'active' : null}>
								<Link to='/voucher' className='active-border'>
									<i className='fa fa-send' />
									<span>Voucher</span>
									<span className='pull-right-container'>
										<span className='label label-primary pull-right' />
									</span>
								</Link>
							</li>
						)}

						{isanggota && (
							<li className={this.props.path === 'riwayat' ? 'active' : null}>
								<Link to='/riwayat' className='active-border'>
									<i className='fa fa-balance-scale' />
									<span>Riwayat Transaksi</span>
									<span className='pull-right-container'>
										<span className='label label-primary pull-right' />
									</span>
								</Link>
							</li>
						)}
						{isanggota && (
							<li className={this.props.path === 'peminjaman' ? 'active' : null}>
								<Link to='/peminjaman' className='active-border'>
									<i className='fa fa-tags' />
									<span>Peminjaman</span>
									<span className='pull-right-container'>
										<span className='label label-primary pull-right' />
									</span>
								</Link>
							</li>
						)}

						{(isadmin || ispetugas) && (
							<li className={this.props.path === 'laporan' ? 'active' : null}>
								<Link to='/laporan' className='active-border'>
									<i className='fa fa-file' />
									<span>Daftar Laporan</span>
									<span className='pull-right-container'>
										<span className='label label-primary pull-right' />
									</span>
								</Link>
							</li>
						)}
					</ul>
				</section>
			</aside>
		)
	}
}

const mapStateToProps = (state) => ({
	user: state.user
})

export default connect(mapStateToProps)(Sidebar)
