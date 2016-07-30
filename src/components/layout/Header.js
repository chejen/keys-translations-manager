import React from 'react'

export default function Header() {
	return (
		<div className="navbar-header">
			<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
				<span className="sr-only">Toggle navigation</span>
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
			</button>
			<a className="navbar-brand" href="https://github.com/chejen/keys-translations-manager">
				<i className="fa fa-github fa-fw fa-lg"/>
				{' '}
				Keys-Translations Manager
			</a>
		</div>
	);
}
