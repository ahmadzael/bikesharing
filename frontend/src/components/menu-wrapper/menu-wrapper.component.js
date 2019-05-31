import React from 'react'

import Header from '../header'
import Sidebar from '../sidebar'

import './menu-wrapper.style.css'

class MenuWrapper extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<Sidebar 
					path={this.props.path}
				/>
				<div className='content-wrapper'>
					<section className='content-header'>
						<div className='row'>
							<div className='col-md-12'>
								<div className='box'>
									<div className='box-body'>{this.props.children}</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		)
	}
}

export default MenuWrapper
