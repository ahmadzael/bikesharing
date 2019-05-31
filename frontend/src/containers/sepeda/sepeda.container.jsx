import React from 'react'
import { connect } from 'react-redux'

import Select from 'react-select'
import LoadingOverlay from 'react-loading-overlay'

import { MenuWrapper } from '../../components'

import './sepeda.style.css'
import 'react-datepicker/dist/react-datepicker.css'

class Sepeda extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			lastid: 0,
			sepedaid: 0,
			merk: '',
			jenis: '',
			status: true,
			stasiun: '',
			penyumbang: '',
			anggota: [],
			data: [],
			ddl: []
		}
	}

	componentWillMount() {
		this._getSepeda()
		this._getStasiun()
		this._getPenyumbang()
	}

	_getPenyumbang() {
		fetch(`/api/person/anggota`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((result) => {
				this.setState({ anggota: result, penyumbang: result[0].no_kartu })
			})
			.catch((err) => {
				alert('error: ' + err)
			})
	}

	_getSepeda() {
		fetch(`/api/sepeda`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((result) => {
				let ids = []
				result.map((res) => {
					ids.push(parseInt(res.id.slice(2, 3)))
				})
				this.setState({ data: result, lastid: Math.max.apply(Math, ids) })
			})
			.catch((err) => {
				alert('error: ' + err)
			})
	}

	_getStasiun() {
		fetch(`/api/stasiun`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((result) => {
				let data = []
				result.map((ress) => {
					const dt = {
						label: ress.nama,
						value: ress.id_stasiun
					}
					data.push(dt)
				})
				this.setState({ ddl: data, stasiun: result[0].id_stasiun })
			})
			.catch((err) => {
				alert('error: ' + err)
			})
	}

	_onAdd() {
		this.setState({
			actionType: 'ddd',
			title: 'Tambah Data'
		})
	}

	_onEdit(data) {
		this.setState({
			actionType: 'edit',
			title: 'Rubah Data',
			merk: data.merk,
			jenis: data.jenis,
			status: data.status,
			stasiun: data.stasiun,
			penyumbang: data.no_kartu,
			sepedaid: data.id
		})
	}

	_onDelete(id) {
		this.setState({
			sepedaid: id,
			actionType: 'delete',
			title: 'Hapus Data'
		})
	}

	_onSave() {
		switch (this.state.actionType) {
			case 'ddd':
				return this._onSaveAdd()
			case 'edit':
				return this._onSaveEdit()
			case 'delete':
				return this._onSaveDelete()
			default:
				return null
		}
	}

	_onChange(value, type) {
		const component = value.target
		switch (type) {
			case 'merk':
				return this.setState({ merk: component.value })
			case 'jenis':
				return this.setState({ jenis: component.value })
			case 'stasiun':
				return this.setState({ stasiun: component.value })
			case 'status':
				return this.setState({ status: component.value })
			case 'penyumbang':
				return this.setState({ penyumbang: component.value })
			default:
				return null
		}
	}

	_onSaveAdd() {
		fetch('/api/sepeda', {
			method: 'POST',
			body: JSON.stringify({
				nomor: this.state.lastid + 1,
				merk: this.state.merk,
				jenis: this.state.jenis,
				stasiun: this.state.stasiun,
				status: this.state.status,
				penyumbang: this.state.penyumbang
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

	_onSaveEdit() {
		fetch(`/api/sepeda/${this.state.sepedaid}`, {
			method: 'PATCH',
			body: JSON.stringify({
				merk: this.state.merk,
				jenis: this.state.jenis,
				stasiun: this.state.stasiun,
				status: this.state.status,
				penyumbang: this.state.penyumbang
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

	_onSaveDelete() {
		fetch(`/api/sepeda/${this.state.sepedaid}`, {
			method: 'DELETE'
		})
			.then((res) => res.json())
			.then((result) => {
				alert(result.message)
			})
			.catch((err) => {
				alert('error: ' + err)
			})
	}

	_onPinjam(data, user) {
		fetch('/api/sepeda/pinjam', {
			method: 'POST',
			body: JSON.stringify({
				no_kartu: user.no_kartu,
				id_sepeda: data.id,
				id_stasiun: data.id_stasiun
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
		const { data, ddl } = this.state
		const path = this.props.location.pathname.split('/')[1]
		const user = JSON.parse(localStorage.getItem('login'))
		return (
			<LoadingOverlay active={this.state.loading} spinner text='Loading ...'>
				<MenuWrapper path={path}>
					<div className='input-container'>
						<div className='box'>
							<div className='box-header'>
								{	
									user.role === 'admin' && <span
										className='btn btn-download pull-right'
										data-toggle='modal'
										data-target='#modal-default'
										onClick={() => this._onAdd()}
									>
										<span className='fa fa-plus margin-icon' />
										Create
									</span>
								}
								<h4>
									<strong>Sepeda</strong>
								</h4>
							</div>
							<div className='box-body'>
								<table id='tableData' className='table table-striped table-responsive table-bordered'>
									<thead>
										<tr>
											<td>No</td>
											<td>Merk</td>
											<td>Jenis</td>
											<td>Status</td>
											<td>Stasiun</td>
											<td>Penyumbang</td>
											<td>Action</td>
										</tr>
									</thead>
									<tbody>
										{data.map((dt, index) => {
											return (
												<tr key={index}>
													<td className='center'>{index + 1}</td>
													<td>{dt.merk}</td>
													<td>{dt.jenis}</td>
													<td>{dt.status ? 'Ya' : 'Tidak'}</td>
													<td>{dt.stasiun}</td>
													<td>{dt.penyumbang}</td>
													<td className='center'>
														{dt.status &&
															user.role === 'anggota' && <button
																className='btn btn-danger btn-download-long button-green'
																onClick={() => this._onPinjam(dt, user)}
															>
																<span className='fa fa-lock margin-icon' />
																Pinjam
															</button>
														}
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
																onClick={() => this._onDelete(dt.id)}
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
													id='sepedaid'
													name='sepedaid'
													value={this.state.sepedaid}
												/>
												<div className='form-group'>
													<label className='col-sm-3 control-label' htmlFor='txtMerk'>
														Merk
													</label>
													<div className='col-sm-9 margin-bottom-triple'>
														<input
															type='text'
															id='txtMerk'
															value={this.state.merk}
															placeholder='Merk'
															onChange={(val) => this._onChange(val, 'merk')}
															className='form-control'
														/>
													</div>
												</div>
												<div className='form-group'>
													<label className='col-sm-3 control-label' htmlFor='txtJenis'>
														Jenis
													</label>
													<div className='col-sm-9 margin-bottom-triple'>
														<input
															type='text'
															id='txtJenis'
															value={this.state.jenis}
															placeholder='Jenis'
															onChange={(val) => this._onChange(val, 'jenis')}
															className='form-control'
														/>
													</div>
												</div>
												<div className='form-group'>
													<label className='col-sm-3 control-label' htmlFor='ddlStatus'>
														Status
													</label>
													<div className='col-sm-9 margin-bottom-triple'>
														<select
															id='ddlStatus'
															value={this.state.status}
															className='form-control'
															onChange={(val) => this._onChange(val, 'status')}
														>
															<option value={true}>Ya</option>
															<option value={false}>Tidak</option>
														</select>
													</div>
												</div>
												<div className='form-group'>
													<label className='col-sm-3 control-label' htmlFor='ddlstasiun'>
														Stasiun
													</label>
													<div className='col-sm-9 margin-bottom-triple'>
														<select
															id='ddlstasiun'
															value={this.state.stasiun}
															className='form-control'
															onChange={(val) => this._onChange(val, 'stasiun')}
														>
															{
																this.state.ddl.map((dd)=> {
																	return <option value={dd.value}>{dd.label}</option>
																})
															}
														</select>
													</div>
												</div>
												<div className='form-group'>
													<label className='col-sm-3 control-label' htmlFor='ddlPenyumbang'>
														Penyumbang
													</label>
													<div className='col-sm-9 margin-bottom-triple'>
														<select
															id='ddlPenyumbang'
															value={this.state.penyumbang}
															className='form-control'
															onChange={(val) => this._onChange(val, 'penyumbang')}
														>
															{
																this.state.anggota.map((ang) => {
																	return <option value={ang.no_kartu}>{ang.nama}</option>
																})
															}
														</select>
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

export default connect(mapStateToProps)(Sepeda)
