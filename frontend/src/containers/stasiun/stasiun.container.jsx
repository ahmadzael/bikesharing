import React from 'react'
import LoadingOverlay from 'react-loading-overlay'
import { MenuWrapper } from '../../components'

import './stasiun.style.css'
import 'react-datepicker/dist/react-datepicker.css'

class Stasiun extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			lastid: 0,
			id: 0,
			nama: '',
			latitude: '',
			longitude: '',
			alamat: '',
			data: []
		}
	}

	componentWillMount() {
		this._getStasiun()
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
				let ids = []
				result.map((res) => {
					ids.push(parseInt(res.id_stasiun.split('ST')[1],10))
				})
				this.setState({ data: result, lastid: Math.max.apply(Math, ids) })
			})
			.catch((err) => {
				alert('error: ' + err)
			})
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
			id: data.id_stasiun,
			nama: data.nama,
			latitude: data.latitude,
			longitude: data.longitude,
			alamat: data.alamat
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
		fetch('/api/stasiun', {
			method: 'POST',
			body: JSON.stringify({
				id: this.state.lastid + 1,
				nama: this.state.nama,
				latitude: this.state.latitude,
				longitude: this.state.longitude,
				alamat: this.state.alamat
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
		fetch(`/api/stasiun/${this.state.id}`, {
			method: 'PATCH',
			body: JSON.stringify({
				nama: this.state.nama,
				latitude: this.state.latitude,
				longitude: this.state.longitude,
				alamat: this.state.alamat
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
		fetch(`/api/stasiun/${this.state.id}`, {
			method: 'DELETE'
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

	_onChange(value, type) {
		const component = value.target
		switch (type) {
			case 'nama':
				return this.setState({ nama: component.value })
			case 'alamat':
				return this.setState({ alamat: component.value })
			case 'latitude':
				return this.setState({ latitude: component.value })
			case 'longitude':
				return this.setState({ longitude: component.value })
			default:
				return null
		}
	}

	render() {
		const { data } = this.state
		const path = this.props.location.pathname.split('/')[1]
		return (
			<LoadingOverlay active={this.state.loading} spinner text='Loading ...'>
				<MenuWrapper path={path}>
					<div className='input-container'>
						<div className='box'>
							<div className='box-header'>
								<span
									className='btn btn-download pull-right'
									data-toggle='modal'
									data-target='#modal-default'
									onClick={() => this._onAdd()}
								>
									<span className='fa fa-plus margin-icon' />
									Create
								</span>
								<h4>
									<strong>Stasiun</strong>
								</h4>
							</div>
							<div className='box-body'>
								<table id='tableData' className='table table-striped table-responsive table-bordered'>
									<thead>
										<tr>
											<td>No</td>
											<td>Nama</td>
											<td>Alamat</td>
											<td>Latitude</td>
											<td>Longitude</td>
											<td>Action</td>
										</tr>
									</thead>
									<tbody>
										{data.map((dt, index) => {
											return (
												<tr key={index}>
													<td className='center'>{index + 1}</td>
													<td>{dt.nama}</td>
													<td>{dt.alamat}</td>
													<td>{dt.latitude}</td>
													<td>{dt.longitude}</td>
													<td className='center'>
														<button
															className='btn btn-primary btn-download-long button-orange'
															data-toggle='modal'
															data-target='#modal-default'
															onClick={() => this._onEdit(dt)}
														>
															<span className='fa fa-edit margin-icon' />
															Edit
														</button>
														<button
															className='btn btn-danger btn-download-long button-green'
															data-toggle='modal'
															data-target='#modal-delete'
															onClick={() => this._onDelete(dt.id_stasiun)}
														>
															<span className='fa fa-trash margin-icon' />
															Delete
														</button>
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
												<input type='hidden' id='kpiId' name='kpiId' value={this.state.id} />
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
													<label className='col-sm-3 control-label' htmlFor='txtAlamat'>
														Alamat
													</label>
													<div className='col-sm-9 margin-bottom-triple'>
														<input
															type='text'
															id='txtAlamat'
															value={this.state.alamat}
															placeholder='Alamat'
															onChange={(val) => this._onChange(val, 'alamat')}
															className='form-control'
														/>
													</div>
												</div>
												<div className='form-group'>
													<label className='col-sm-3 control-label' htmlFor='txtLatitude'>
														Latitude
													</label>
													<div className='col-sm-9 margin-bottom-triple'>
														<input
															type='text'
															id='txtLatitude'
															value={this.state.latitude}
															placeholder='Latitude'
															onChange={(val) => this._onChange(val, 'latitude')}
															className='form-control'
														/>
													</div>
												</div>
												<div className='form-group'>
													<label className='col-sm-3 control-label' htmlFor='txtLongitude'>
														Longitude
													</label>
													<div className='col-sm-9 margin-bottom-triple'>
														<input
															type='text'
															id='txtLongitude'
															value={this.state.longitude}
															placeholder='Longitude'
															onChange={(val) => this._onChange(val, 'longitude')}
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

export default Stasiun
