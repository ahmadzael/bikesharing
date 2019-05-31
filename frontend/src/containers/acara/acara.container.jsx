import React from 'react'
import DatePicker from 'react-datepicker'
import LoadingOverlay from 'react-loading-overlay'
import Select from 'react-select'

import { MenuWrapper } from '../../components'

import './acara.style.css'
import 'react-datepicker/dist/react-datepicker.css'

class Acara extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			lastid: 0,
			id: 0,
			action: '',
			title: '',
			judul: '',
			deskripsi: '',
			gratis: 'Ya',
			tglmulai: new Date(),
			tglselesai: new Date(),
			stasiun: [],
			data: [],
			ddl: []
		}
	}

	componentWillMount() {
		this._getAcara()
		this._getStasiun()
	}

	_getAcara() {
		fetch(`/api/acara`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((result) => {
				let ids = []
				result.map((res) => {
					ids.push(parseInt(res.id.split('ACR')[1],10))
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
					return data = [...data, dt]
				})
				this.setState({ ddl: data })
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
		let stasiuns = []
		data.stasiun.split(',').map((st, index) => {
			const sta = {
				label: st.replace(' S','S'),
				value: data.id_stasiun.split(',')[index].replace(' ','')
			}
			stasiuns.push(sta)
		})
		this.setState({
			id: data.id,
			actionType: 'edit',
			title: 'Rubah Data',
			judul: data.judul,
			deskripsi: data.deskripsi,
			gratis: data.gratis,
			tglmulai: data.mulai,
			tglselesai: data.selesai,
			stasiun: stasiuns
		})
	}

	_onDelete(id) {
		this.setState({
			id,
			actionType: 'delete',
			title: 'Hapus Data'
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
		fetch(`/api/acara`, {
			method: 'POST',
			body: JSON.stringify({
				id: this.state.lastid + 1,
				judul: this.state.judul,
				deskripsi: this.state.deskripsi,
				gratis: this.state.gratis === 'Ya' ? true : false,
				mulai: this.state.tglmulai,
				selesai: this.state.tglselesai,
				stasiun: this.state.stasiun
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
		fetch(`/api/acara/${this.state.id}`, {
			method: 'PATCH',
			body: JSON.stringify({
				judul: this.state.judul,
				deskripsi: this.state.deskripsi,
				gratis: this.state.gratis === 'Ya' ? true : false,
				mulai: this.state.tglmulai,
				selesai: this.state.tglselesai,
				stasiun: this.state.stasiun
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
		fetch(`/api/acara/${this.state.id}`, {
			method: 'DELETE',
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

	_onChange(value, type) {
		const component = type === 'judul' || type === 'deskripsi' || type === 'gratis' ? value.target : value
		switch (type) {
			case 'judul':
				return this.setState({ judul: component.value })
			case 'deskripsi':
				return this.setState({ deskripsi: component.value })
			case 'gratis':
				return this.setState({ gratis: component.value })
			case 'tglmulai':
				return this.setState({ tglmulai: component })
			case 'tglselesai':
				return this.setState({ tglselesai: component })
			case 'stasiun':
				return this.setState({ stasiun: component })
			default:
				return null
		}
	}

	render() {
		const { data, ddl } = this.state
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
									<strong>Acara</strong>
								</h4>
							</div>
							<div className='box-body'>
								<table id='tableData' className='table table-striped table-responsive table-bordered'>
									<thead>
										<tr>
											<td>No</td>
											<td>Judul</td>
											<td>Deskripsi</td>
											<td>Gratis</td>
											<td>Tanggal Mulai</td>
											<td>Tanggal Selesai</td>
											<td>Stasiun</td>
											<td>Action</td>
										</tr>
									</thead>
									<tbody>
										{data.map((dt, index) => {
											return (
												<tr key={index}>
													<td className='center'>{index + 1}</td>
													<td>{dt.judul}</td>
													<td>{dt.deskripsi}</td>
													<td>{dt.gratis ? 'Ya' : 'Tidak'}</td>
													<td className='center'>{dt.mulai.replace('T', '-').replace('Z','')}</td>
													<td className='center'>{dt.selesai.replace('T', '-').replace('Z','')}</td>
													<td>{dt.stasiun}</td>
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
															onClick={() => this._onDelete(dt.id)}
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
													<label className='col-sm-3 control-label' htmlFor='txtJudul'>
														Judul
													</label>
													<div className='col-sm-9 margin-bottom-triple'>
														<input
															type='text'
															id='txtJudul'
															value={this.state.judul}
															placeholder='Judul'
															onChange={(val) => this._onChange(val, 'judul')}
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
													<label className='col-sm-3 control-label' htmlFor='ddlGratis'>
														Gratis
													</label>
													<div className='col-sm-9 margin-bottom-triple'>
														<select
															id='ddlGratis'
															value={this.state.gratis}
															className='form-control'
															onChange={(val) => this._onChange(val, 'gratis')}
														>
															<option value='Ya'>Ya</option>
															<option value='Tidak'>Tidak</option>
														</select>
													</div>
												</div>
												<div className='form-group'>
													<label className='col-sm-3 control-label' htmlFor='tglMulai'>
														Tanggal Mulai
													</label>
													<div className='col-sm-3 margin-bottom-triple'>
														<DatePicker
															className='form-control margin-top-default'
															minDate={new Date()}
															selected={this.state.tglmulai}
															placeholderText={'Tanggal Mulai'}
															onChange={(value) => this._onChange(value, 'tglmulai')}
														/>
													</div>
													<label className='col-sm-3 control-label' htmlFor='tglSelesai'>
														Tanggal Selesai
													</label>
													<div className='col-sm-3 margin-bottom-triple'>
														<DatePicker
															className='form-control margin-top-default'
															minDate={this.state.tglmulai}
															selected={this.state.tglselesai}
															placeholderText={'Tanggal Selesai'}
															onChange={(value) => this._onChange(value, 'tglselesai')}
														/>
													</div>
												</div>
												<div className='form-group'>
													<label className='col-sm-3 control-label' htmlFor='ddlstasiun'>
														Stasiun
													</label>
													<div className='col-sm-9 margin-bottom-triple'>
														<Select options={ ddl }
															onChange={(value) => this._onChange(value, 'stasiun')}
															isMulti
															defaultValue={this.state.stasiun}
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
							</div>
						</div>
					</div>
				</MenuWrapper>
			</LoadingOverlay>
		)
	}
}

export default Acara
