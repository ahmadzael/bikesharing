import React from 'react'
import DatePicker from 'react-datepicker'
import LoadingOverlay from 'react-loading-overlay'

import './register.style.css'
import 'react-datepicker/dist/react-datepicker.css'

class Register extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			ktp: '',
			nama: '',
			email: '',
			tanggal: new Date(),
			telepon: '',
			alamat: '',
			role: 'Anggota'
		}
	}

	_onSave() {
		fetch('/api/person', {
			method: 'POST',
			body: JSON.stringify({
				ktp: this.state.ktp,
				nama: this.state.nama,
				email: this.state.email,
				tanggal: this.state.tanggal,
				telepon: this.state.telepon,
				alamat: this.state.alamat,
				role: this.state.role
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((result) => {
				window.location.pathname = '/'
			})
			.catch((err) => {
				alert('error: ' + err)
			})
	}

	_onChange(value, type) {
		const component = type === 'tanggal' ? value : value.target
		switch (type) {
			case 'ktp':
				return this.setState({ ktp: component.value })
			case 'nama':
				return this.setState({ nama: component.value })
			case 'email':
				return this.setState({ email: component.value })
			case 'tanggal':
				return this.setState({ tanggal: component })
			case 'telepon':
				return this.setState({ telepon: component.value })
			case 'alamat':
				return this.setState({ alamat: component.value })
			case 'role':
				return this.setState({ role: component.value })
			default:
				return null
		}
	}

	render() {
		return (
			<LoadingOverlay active={this.state.loading} spinner text='Loading ...'>
				<div>
					<div className='box col-xs-4'>
						<div className='box-header'>
							<h4>
								<strong>Register</strong>
							</h4>
						</div>
						<div className='box-body col-xs-3' />
						<div className='box-body col-xs-6'>
							<div className='form-group'>
								<label className='col-sm-3 control-label' htmlFor='txtKTP'>
									KTP
								</label>
								<div className='col-sm-9 margin-bottom-triple'>
									<input
										type='text'
										id='txtKTP'
										value={this.state.ktp}
										placeholder='No KTP'
										onChange={(val) => this._onChange(val, 'ktp')}
										className='form-control'
									/>
								</div>
							</div>
							<div className='form-group'>
								<label className='col-sm-3 control-label' htmlFor='txtNamaLengkap'>
									Nama Lengkap
								</label>
								<div className='col-sm-9 margin-bottom-triple'>
									<input
										type='text'
										id='txtNamaLengkap'
										value={this.state.nama}
										placeholder='Nama Lengkap'
										onChange={(val) => this._onChange(val, 'nama')}
										className='form-control'
									/>
								</div>
							</div>
							<div className='form-group'>
								<label className='col-sm-3 control-label' htmlFor='txtEmail'>
									Email
								</label>
								<div className='col-sm-9 margin-bottom-triple'>
									<input
										type='text'
										id='txtEmail'
										value={this.state.email}
										placeholder='Email'
										onChange={(val) => this._onChange(val, 'email')}
										className='form-control'
									/>
								</div>
							</div>
							<div className='form-group'>
								<label className='col-sm-3 control-label' htmlFor='txtTanggal'>
									Tanggal Lahir
								</label>
								<div className='col-sm-9 margin-bottom-triple'>
									<DatePicker
										className='form-control margin-top-default'
										selected={this.state.tanggal}
										placeholderText={'Tanggal Lahir'}
										onChange={(val) => this._onChange(val, 'tanggal')}
									/>
								</div>
							</div>
							<div className='form-group'>
								<label className='col-sm-3 control-label' htmlFor='txtTelepon'>
									Telepon
								</label>
								<div className='col-sm-9 margin-bottom-triple'>
									<input
										type='text'
										id='txtTelepon'
										value={this.state.telepon}
										placeholder='Telepon'
										onChange={(val) => this._onChange(val, 'telepon')}
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
								<label className='col-sm-3 control-label' htmlFor='ddlRole'>
									Role
								</label>
								<div className='col-sm-9 margin-bottom-triple'>
									<select
										id='ddlRole'
										value={this.state.role}
										className='form-control'
										onChange={(val) => this._onChange(val, 'role')}
									>
										<option value='anggota'>Anggota</option>
										<option value='petugas'>Petugas</option>
									</select>
								</div>
							</div>
							<div className='row'>
								<div className='col-xs-4 pull-right'>
									<a className='btn btn-block btn-flat login-title background-semi-blue' href='/'>
										<span className='fa fa-sign-in margin-icon' />
										Masuk
									</a>
								</div>
								<div className='col-xs-4 pull-left'>
									<button
										className='btn btn-block btn-flat login-title background-semi-blue'
										onClick={() => this._onSave()}
									>
										<span className='fa fa-sign-in margin-icon' />
										Daftar
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</LoadingOverlay>
		)
	}
}

export default Register
