import React from 'react'
import LoadingOverlay from 'react-loading-overlay'

import { MenuWrapper } from '../../components'

import './peminjaman.style.css'
import 'react-datepicker/dist/react-datepicker.css'

class Peminjaman extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			dt: {}
		}
	}

	componentWillMount() {
		this._getDenda()
		this._getPeminjaman()
	}

	_getDenda() {
		fetch(`/api/peminjaman/spupdatedenda`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((result) => {})
			.catch((err) => {
				alert('error: ' + err)
			})
	}

	_getPeminjaman() {
		fetch(`/api/peminjaman`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((result) => {
				this.setState({ data: result })
			})
			.catch((err) => {
				alert('error: ' + err)
			})
	}

	_onKembali(data, user) {
		fetch(`/api/peminjaman/${data.nomor}`, {
			method: 'PATCH',
			body: JSON.stringify({
				no_kartu: user.no_kartu,
				id_stasiun: data.id_stasiun,
				tgl_pinjam: data.pinjam
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((result) => {
				alert(result.message)
			})
			.catch((err) => {
				alert('error: ' + err)
			})
	}

	render() {
		const { data } = this.state
		const path = this.props.location.pathname.split('/')[1]
		const user = JSON.parse(localStorage.getItem('login'))        
		return (
			<LoadingOverlay active={this.state.loading} spinner text='Loading ...'>
				<MenuWrapper path={path}>
					<div className='input-container'>
						<div className='box'>
							<div className='box-header'>
								<h4>
									<strong>Peminjaman</strong>
								</h4>
							</div>
							<div className='box-body'>
								<table id='tableData' className='table table-striped table-responsive table-bordered'>
									<thead>
										<tr>
											<td>No</td>
											<td>Nomor</td>
											<td>Sepeda</td>
											<td>Tanggal Pinjam</td>
											<td>Tanggal Kembali</td>
											<td>Stasiun</td>
											<td>Biaya</td>
											<td>Denda</td>
											<td>Action</td>
										</tr>
									</thead>
									<tbody>
										{data.map((dt, index) => {
											return (
												<tr key={index}>
													<td className='center'>{index + 1}</td>
													<td>{dt.nomor}</td>
													<td>{dt.merk}</td>
													<td>{dt.pinjam.replace('T', '-').replace('Z','')}</td>
													<td>{dt.kembali ? dt.kembali.replace('T', '-').replace('Z','') : null}</td>
													<td>{dt.stasiun}</td>
													<td>{dt.biaya}</td>
													<td>{dt.denda}</td>
													<td className='center'>
														{
															dt.kembali === null && <button
																className='btn btn-danger btn-download-long button-green'
																data-toggle='modal'
																data-target='#modal-delete'
																onClick={()=>this.setState({ dt })}
															>
																<span className='fa fa-edit margin-icon' />
																Kembalikan
															</button>
														}
													</td>
												</tr>
											)
										})}
									</tbody>
								</table>
								<div className='modal fade' id='modal-delete'>
									<div className='modal-dialog'>
										<div className='modal-content'>
											<div className='modal-header'>
												<button
													type='button'
													className='close'
													data-dismiss='modal'
													aria-label='Close'
												>
													<span aria-hidden='true'>&times;</span>
												</button>
												<h4 className='modal-title'>{this.state.title}</h4>
											</div>
											<div className='modal-body'>
												<p>Anda yakin mau mengembalikannya ?</p>
											</div>
											<div className='modal-footer'>
												<button
													type='button'
													className='btn btn-default pull-left'
													data-dismiss='modal'
												>
													Batal
												</button>
												<button
													type='button'
													className='btn btn-primary'
													onClick={() => this._onKembali(this.state.dt, user)}
													data-dismiss='modal'
												>
													Kembalikan
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</MenuWrapper>
			</LoadingOverlay>
		)
	}
}

export default Peminjaman
