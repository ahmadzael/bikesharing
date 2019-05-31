import React from 'react'
import LoadingOverlay from 'react-loading-overlay'

import { MenuWrapper } from '../../components'

import './riwayat.style.css'
import 'react-datepicker/dist/react-datepicker.css'

class Riwayat extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: []
		}
	}

	componentWillMount() {
		this._getTransaksi()
	}

	_getTransaksi() {
		fetch(`/api/transaksi`, {
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

	render() {
		const { data } = this.state
		const user = JSON.parse(localStorage.getItem('login'))
		const path = this.props.location.pathname.split('/')[1]
		return (
			<LoadingOverlay active={this.state.loading} spinner text='Loading ...'>
				<MenuWrapper path={path}>
					<div className='input-container'>
						<div className='box'>
							<div className='box-header'>
								<h4>
									<strong>Riwayat</strong>
								</h4>
							</div>
							<div className='box-body'>
								<table id='tableData' className='table table-striped table-responsive table-bordered'>
									<thead>
										<tr>
											<td>No</td>
											<td>Tanggal</td>
											<td>Jenis Transaksi</td>
											<td>Nominal</td>
										</tr>
									</thead>
									<tbody>
										{data
											.filter((data) => data.no_kartu_anggota === user.no_kartu)
											.map((dt, index) => {
												return (
													<tr key={index}>
														<td className='center'>{index + 1}</td>
														<td>{dt.tgl_transaksi.replace('T', '-').replace('Z','')}</td>
														<td>{dt.jenis}</td>
														<td>{dt.nominal}</td>
													</tr>
												)
											})}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</MenuWrapper>
			</LoadingOverlay>
		)
	}
}

export default Riwayat
