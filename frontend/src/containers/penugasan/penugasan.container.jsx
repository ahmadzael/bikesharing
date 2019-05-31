import React from 'react'
import DatePicker from 'react-datepicker'
import LoadingOverlay from 'react-loading-overlay'
import Select from 'react-select'

import { MenuWrapper } from '../../components'

import './penugasan.style.css'
import 'react-datepicker/dist/react-datepicker.css'

class Penugasan extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			ktp: '0',
			action: '',
			title: '',
			petugas: '',
			tglmulai: new Date(),
			tglselesai: new Date(),
			stasiun: [],
			data: [],
			ddl: [],
			petugasddl: []
		}
	}

	componentWillMount() {
		this._getPenugasan()
		this._getStasiun()
		this._getPetugas()
	}

	_getPetugas() {
		fetch(`/api/person/petugas`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((result) => {
				this.setState({ petugasddl: result, petugas: result[0].ktp })
			})
			.catch((err) => {
				alert('error: ' + err)
			})
	}

	_getPenugasan() {
		fetch(`/api/penugasan`, {
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
			action: 'add',
			title: 'Tambah Data'
		})
	}

	_onEdit(data) {
		this.setState({
			ktp: data.ktp,
			action: 'edit',
			title: 'Rubah Data',
			petugas: data.petugas,
			tglmulai: new Date(data.mulai),
			tglselesai: new Date(data.selesai),
			stasiun: data.stasiun
		})
	}

	_onDelete(ktp) {
		this.setState({
			ktp: ktp,
			action: 'delete',
			title: 'Hapus Data'
		})
	}

	_onSave() {
		switch (this.state.action) {
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
		fetch(`/api/penugasan`, {
			method: 'POST',
			body: JSON.stringify({
				ktp: this.state.petugas,
				tgl_mulai: this.state.tglmulai,
				tgl_selesai: this.state.tglselesai,
				id_stasiun: this.state.stasiun
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
		fetch(`/api/penugasan/${this.state.ktp}`, {
			method: 'PATCH',
			body: JSON.stringify({
				tgl_mulai: this.state.tglmulai,
				tgl_selesai: this.state.tglselesai,
				id_stasiun: this.state.stasiun
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
		fetch(`/api/penugasan/${this.state.ktp}`, {
			method: 'DELETE',
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

	_onChange(value, type) {
		const component = type === 'petugas' ? value.target : value
		switch (type) {
			case 'petugas':
				return this.setState({ petugas: component.value })
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
									<strong>Penugasan</strong>
								</h4>
							</div>
							<div className='box-body'>
								<table id='tableData' className='table table-striped table-responsive table-bordered'>
									<thead>
										<tr>
											<td>No</td>
											<td>Petugas</td>
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
												<td className="center">
													{index + 1}
												</td>
												<td>{dt.petugas}</td>
												<td className="center">
													{dt.mulai.replace('T', '-').replace('Z','')}
												</td>
												<td className="center">
													{dt.selesai.replace('T', '-').replace('Z','')}
												</td>
												<td>{dt.stasiun}</td>
												<td className="center">
													{/* {user.role === "admin" && (
													<button
														className="btn btn-primary btn-download-long button-orange"
														data-toggle="modal"
														data-target="#modal-default"
														onClick={() =>
														this._onEdit(dt)
														}
													>
														<span className="fa fa-edit margin-icon" />
														Edit
													</button>
													)} */}
													{user.role === "admin" && (
													<button
														className="btn btn-danger btn-download-long button-green"
														data-toggle="modal"
														data-target="#modal-delete"
														onClick={() =>
														this._onDelete(dt.ktp)
														}
													>
														<span className="fa fa-trash margin-icon" />
														Delete
													</button>
													)}
												</td>
												</tr>
											);
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
													<label className='col-sm-3 control-label' htmlFor='txtPetugas'>
														Nama Petugas
													</label>
													<div className='col-sm-9 margin-bottom-triple'>
														<select
																id='ddlPenyumbang'
																value={this.state.petugas}
																className='form-control'
																onChange={(val) => this._onChange(val, 'petugas')}
															>
																{
																this.state.petugasddl.map((pts) => {
																	return <option value={pts.ktp}>{pts.nama}</option>
																	})
																}
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

export default Penugasan
