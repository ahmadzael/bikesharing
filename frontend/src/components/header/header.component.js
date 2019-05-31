import React from 'react'
import { Link } from 'react-router-dom'

import './header.style.css'

class Header extends React.Component {

	_logout(){
		localStorage.clear()
	}

	render() {
		return (
			<header className='main-header'>
				<div className='logo background-blue'>
					<span className='logo-mini'>
						<Link to='/home' className='text-white'>BS</Link>
					</span>
					<Link to='/home' className='logo-lg text-white'>
						<b>Bike</b>
						&nbsp;Sharing
					</Link>
				</div>
				<nav className='navbar navbar-static-top background-semi-blue'>
					<div className='sidebar-toggle' data-toggle='push-menu' role='button'>
						<span className='sr-only'>Toggle navigation</span>
					</div>
					<div className='navbar-custom-menu'>
						<ul className='nav navbar-nav'>
							<li className='dropdown user user-menu'>
								<Link to='/' onClick={()=> this._logout()}>
									<span className='hidden-xs'>Keluar</span>
									&nbsp;
									<span className='fa fa-sign-out' />
								</Link>
							</li>
						</ul>
					</div>
				</nav>
			</header>
		)
	}
}

export default Header
