import React from 'react'
import PropTypes from 'prop-types'
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default class MessagePopup extends React.Component {
	static propTypes = {
		children: PropTypes.node,
		msg: PropTypes.string.isRequired,
		showmessagepopup: PropTypes.bool.isRequired,
		closeMessagePopup: PropTypes.func.isRequired
	};

	constructor() {
		super();
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			display: "block"
		};
	}

	close() {
		this.props.closeMessagePopup()
	}

	render() {
		const {showmessagepopup, msg} = this.props,
			style = {
				display: showmessagepopup ? "block" : "none"
			};
		return(
			<div className="app-message-popup" style={style}>
				<div className="app-message-bar">
					<i className="app-action-icon fa fa-close fa-fw"
						onClick={this.close.bind(this)}/>
					{msg}
					{' '}
					{this.props.children}
				</div>
			</div>
		);
	}
}
