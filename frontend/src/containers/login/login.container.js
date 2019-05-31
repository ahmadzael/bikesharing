import React from 'react'
import { connect } from 'react-redux'

import { USER_ACTION } from '../../actions'

import './login.style.css'

class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user: []
		}
	}

	componentWillMount() {
		const user = JSON.parse(localStorage.getItem('login'))
		if (user !== null) {
			const currentDate = new Date()
			const userDate = new Date(user.date)
			const diff = (currentDate - userDate) / (1000 * 60)
			if(diff <= 60) {
				this.props.history.push('/home')
			}
		}
	}

	_onLoginClick() {
		const ktp = document.getElementById('ktp').value
		const email = document.getElementById('email').value
		fetch('/api/person/login', {
			method: 'POST',
			body: JSON.stringify({
				ktp: ktp,
				email: email
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((result) => {
				if(result.length !== 0) {
					const users = {
						ktp: result.ktp,
						email: result.email,
						role: result.role,
						nama: result.nama,
						date: new Date(),
						no_kartu: result.no_kartu
					}
					window.location.pathname = '/home'
					localStorage.setItem('login', JSON.stringify(users))
				} else {
					alert('ktp atau email tidak sesuai')
				}
			})
			.catch((err) => {
				alert("error: " + err)
			})
	}

	render() {
		return (
			<div>
				<div className='hold-transition login-page'>
					<div className='login-box'>
						<div className='login-logo'>
							<a href='/'>
								<b>Bike</b>Sharing
							</a>
						</div>
						<div className='login-box-body background-blue'>
							<p className='login-box-msg login-title'>Masuk untuk memulai</p>
							<div className='form-group has-feedback'>
								<input type='text' className='form-control' placeholder='Nomor KTP' id='ktp' />
								<span className='fa fa-user form-control-feedback' />
							</div>
							<div className='form-group has-feedback'>
								<input type='text' className='form-control' placeholder='Email' id='email' />
								<span className='fa fa-lock form-control-feedback' />
							</div>
							<div className='row'>
								<div className='col-xs-4 pull-right'>
									<button
										className='btn btn-block btn-flat login-title background-semi-blue'
										onClick={() => this._onLoginClick()}
									>
										<span className='fa fa-sign-in margin-icon' />
										Masuk
									</button>
								</div>
								<div className='col-xs-4 pull-left'>
									<a
										className='btn btn-block btn-flat login-title background-semi-blue'
										href='/register'
									>
										<span className='fa fa-sign-in margin-icon' />
										Daftar
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	user: state.user
})

const mapDispatchToProps = (dispatch) => ({
	updateUser: (user) => {
		return dispatch({
			type: USER_ACTION.UPDATE_USER,
			payload: { user }
		})
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
