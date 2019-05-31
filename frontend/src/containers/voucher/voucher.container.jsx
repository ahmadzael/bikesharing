import React from 'react'
import { connect } from 'react-redux'

import LoadingOverlay from 'react-loading-overlay'

import { MenuWrapper } from '../../components'

import './voucher.style.css'
import 'react-datepicker/dist/react-datepicker.css'

class Voucher extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			lastid: 0,
			id: 0,
			nama: '',
			kategori: '',
			nilai: 0,
			deskripsi: '',
			jumlah: 0,
			data: []
		}
	}

	componentWillMount() {
		this._getVoucher()
	}

	_getVoucher() {
		fetch(`/api/voucher`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((result) => {
				let ids = []
				result.map((res) => {
					ids.push(parseInt(res.id_voucher.slice(1, 2)))
				})
				this.setState({ data: result, lastid: Math.max.apply(Math, ids) })
			})
			.catch((err) => {
				alert('error: ' + err)
			})
	}

	_onChange(value, type) {
		const component = value.target
		switch (type) {
			case 'nama':
				return this.setState({ nama: component.value })
			case 'kategori':
				return this.setState({ kategori: component.value })
			case 'nilai':
				return this.setState({ nilai: component.value })
			case 'deskripsi':
				return this.setState({ deskripsi: component.value })
			case 'jumlah':
				return this.setState({ jumlah: component.value })
			default:
				return null
		}
	}

	_onAdd() {
		this.setState({
			actionType: 'add',
			title: 'Tambah Data'
		})
	}

	_onEdit(data) {
		this.setState({
			actionType: 'edit',
			title: 'Rubah Data',
			id: data.id_voucher,
			nama: data.nama,
			kategori: data.kategori,
			nilai: data.nilai,
			deskripsi: data.deskripsi,
			jumlah: data.jumlah
		})
	}

	_onDelete(id) {
		this.setState({
			actionType: 'delete',
			title: 'Hapus Data',
			id
		})
	}

	_onSave() {
		switch (this.state.actionType) {
			case 'add':
				return this._onSaveAdd()
			case 'edit':
				return this._onSaveEdit()
			case 'delete':
				return this._onSaveDelete()
			default:
				return null
		}
	}

	_onSaveAdd() {
		fetch('/api/voucher', {
			method: 'POST',
			body: JSON.stringify({
				id: this.state.lastid + 1,
				nama: this.state.nama,
				kategori: this.state.kategori,
				nilai: this.state.nilai,
				deskripsi: this.state.deskripsi,
				jumlah: this.state.jumlah
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((result) => {
				alert(result.message)
				window.location.reload()
			})
			.catch((err) => {
				alert('error: ' + err)
			})
	}

	_onSaveEdit() {
		fetch(`/api/voucher/${this.state.id}`, {
			method: 'PATCH',
			body: JSON.stringify({
				nama: this.state.nama,
				kategori: this.state.kategori,
				nilai: this.state.nilai,
				deskripsi: this.state.deskripsi,
				jumlah: this.state.jumlah
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((result) => {
				alert(result.message)
				window.location.reload()
			})
			.catch((err) => {
				alert('error: ' + err)
			})
	}

	_onSaveDelete() {
		fetch(`/api/voucher/${this.state.id}`, {
			method: 'DELETE'
		})
			.then((res) => res.json())
			.then((result) => {
				alert(result.message)
			})
			.catch((err) => {
				alert('error: ' + err)
				window.location.reload()
			})
	}

	_onClaim(id, user) {
		fetch('/api/voucher/klaim', {
			method: 'POST',
			body: JSON.stringify({
				no_kartu_anggota: user.no_kartu,
				id_voucher: id
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((result) => {
				alert(result.message)
				window.location.reload()
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
								{user.role === 'admin' && (
									<span
										className='btn btn-download pull-right'
										data-toggle='modal'
										data-target='#modal-default'
										onClick={() => this._onAdd()}
									>
										<span className='fa fa-plus margin-icon' />
										Create
									</span>
								)}
								<h4>
									<strong>Voucher</strong>
								</h4>
							</div>
							<div className='box-body'>
								<table id='tableData' className='table table-striped table-responsive table-bordered'>
									<thead>
										<tr>
											<td>No</td>
											<td>Nama</td>
											<td>Kategori</td>
											<td>Nilai</td>
											<td>Deskripsi</td>
											<td>Jumlah</td>
											<td>Action</td>
										</tr>
									</thead>
									<tbody>
										{data.map((dt, index) => {
											return (
												<tr key={index}>
													<td className='center'>{index + 1}</td>
													<td>{dt.nama}</td>
													<td>{dt.kategori}</td>
													<td>{dt.nilai}</td>
													<td>{dt.deskripsi}</td>
													<td>{dt.jumlah}</td>
													<td className='center'>
														{user.role === 'anggota' && (
															<button
																className='btn btn-danger btn-download-long button-green'
																onClick={() => this._onClaim(dt.id_voucher, user)}
															>
																<span className='fa fa-lock margin-icon' />
																Klaim
															</button>
														)}
														{user.role === 'admin' && (
														<button
															className='btn btn-primary btn-download-long button-orange'
															data-toggle='modal'
															data-target='#modal-default'
															onClick={() => this._onEdit(dt)}
														>
															<span className='fa fa-edit margin-icon' />
															Edit
														</button>
														)}
														{user.role === 'admin' && (
														<button
															className='btn btn-danger btn-download-long button-green'
															data-toggle='modal'
															data-target='#modal-delete'
															onClick={() => this._onDelete(dt.id_voucher)}
														>
															<span className='fa fa-trash margin-icon' />
															Delete
														</button>
														)}
													</td>
												</tr>
											)
										})}
									</tbody>
								</table>
								<div className='modal fade' id='modal-default'>
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
												<input
													type='hidden'
													id='voucherid'
													name='voucherid'
													value={this.state.voucherid}
												/>
												<div className='form-group'>
													<label className='col-sm-3 control-label' htmlFor='txtNama'>
														Nama
													</label>
													<div className='col-sm-9 margin-bottom-triple'>
														<input
															type='text'
															id='txtNama'
															value={this.state.nama}
															placeholder='Nama'
															onChange={(val) => this._onChange(val, 'nama')}
															className='form-control'
														/>
													</div>
												</div>
												<div className='form-group'>
													<label className='col-sm-3 control-label' htmlFor='txtKategori'>
														Kategori
													</label>
													<div className='col-sm-9 margin-bottom-triple'>
														<input
															type='text'
															id='txtKategori'
															value={this.state.kategori}
															placeholder='Kategori'
															onChange={(val) => this._onChange(val, 'kategori')}
															className='form-control'
														/>
													</div>
												</div>
												<div className='form-group'>
													<label className='col-sm-3 control-label' htmlFor='txtNilai'>
														Nilai
													</label>
													<div className='col-sm-9 margin-bottom-triple'>
														<input
															type='number'
															id='txtNilai'
															value={this.state.nilai}
															placeholder='Nilai'
															onChange={(val) => this._onChange(val, 'nilai')}
															className='form-control'
														/>
													</div>
												</div>
												<div className='form-group'>
													<label className='col-sm-3 control-label' htmlFor='txtDeskripsi'>
														Deskripsi
													</label>
													<div className='col-sm-9 margin-bottom-triple'>
														<input
															type='text'
															id='txtDeskripsi'
															value={this.state.deskripsi}
															placeholder='Deskripsi'
															onChange={(val) => this._onChange(val, 'deskripsi')}
															className='form-control'
														/>
													</div>
												</div>
												<div className='form-group'>
													<label className='col-sm-3 control-label' htmlFor='txtJumlah'>
														Jumlah
													</label>
													<div className='col-sm-9 margin-bottom-triple'>
														<input
															type='number'
															id='txtJumlah'
															value={this.state.jumlah}
															placeholder='Jumlah'
															onChange={(val) => this._onChange(val, 'jumlah')}
															className='form-control'
														/>
													</div>
												</div>
											</div>
											<div className='modal-footer'>
												<button
													type='button'
													className='btn btn-default pull-left'
													data-dismiss='modal'
												>
													Cancel
												</button>
												<button
													type='button'
													className='btn btn-primary'
													onClick={() => this._onSave()}
													data-dismiss='modal'
												>
													Save changes
												</button>
											</div>
										</div>
									</div>
								</div>
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
												<p>Are you sure want to delete this data ?</p>
											</div>
											<div className='modal-footer'>
												<button
													type='button'
													className='btn btn-default pull-left'
													data-dismiss='modal'
												>
													Cancel
												</button>
												<button
													type='button'
													className='btn btn-primary'
													onClick={() => this._onSave()}
													data-dismiss='modal'
												>
													Delete
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

const mapStateToProps = (state) => ({
	user: state.user
})

export default connect(mapStateToProps)(Voucher)
