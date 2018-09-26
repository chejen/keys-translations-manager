import React from 'react'

export default function Header() {
	return (
		<div className="navbar-header">
			<button
				type="button"
				className="navbar-toggle"
				data-toggle="collapse"
				data-target=".navbar-collapse"
			>
				<span className="sr-only">Toggle navigation</span>
				<span className="icon-bar"/>
				<span className="icon-bar"/>
				<span className="icon-bar"/>
			</button>
			<a className="navbar-brand" href="https://github.com/chejen/keys-translations-manager">
				<i className="fab fa-github fa-fw"/>
				{' '}
				Keys-Translations Manager
			</a>
		</div>
	);
}
