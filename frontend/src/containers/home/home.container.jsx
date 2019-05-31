import React from 'react'

import { connect } from 'react-redux'
import { MenuWrapper } from '../../components'

import './home.style.css'

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			ktp: '',
			nominal: 0
		}
	}

	_onClick(user) {
		fetch('/api/person/topup', {
			method: 'POST',
			body: JSON.stringify({
				ktp: user.ktp,
				saldo: this.state.nominal
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((result) => {
				alert('Sukses topup saldo')
			})
			.catch((err) => {
				alert("error: " + err)
			})
	}

	render() {
		const path = this.props.location.pathname.split('/')[1]
		const user = JSON.parse(localStorage.getItem('login'))
		return (
			<MenuWrapper path={path}>
				<div className='input-container'>
					<div className='box'>
						<div className='box-header'>
							{user && user.role === 'anggota' && (
								<span
									className='btn btn-download pull-right'
									data-toggle='modal'
									data-target='#modal-default'
								>
									<span className='fa fa-plus margin-icon' />
									Top Up
								</span>
							)}
							<h4>Selamat Datang di Bike Sharing</h4>
						</div>
						<div className='modal fade' id='modal-default'>
							<div className='modal-dialog'>
								<div className='modal-content'>
									<div className='modal-header'>
										<button type='button' className='close' data-dismiss='modal' aria-label='Close'>
											<span aria-hidden='true'>&times;</span>
										</button>
										<h4 className='modal-title'>Top Up</h4>
									</div>
									<div className='modal-body'>
										<input
											type='number'
											className='form-control'
											value={this.state.nominal}
											placeholder='Nominal'
											onChange={(val) => this.setState({ nominal: val })}
										/>
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
											onClick={() => this._onClick(user)}
											data-dismiss='modal'
										>
											Submit
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</MenuWrapper>
		)
	}
}

const mapStateToProps = (state) => ({
	user: state.user
})

export default connect(mapStateToProps)(Home)
