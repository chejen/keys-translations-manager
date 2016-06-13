import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default class MessagePopup extends React.Component {
	static propTypes = {
		children: React.PropTypes.node,
		msg: React.PropTypes.string.isRequired,
		showmessagepopup: React.PropTypes.bool.isRequired,
		closeMessagePopup: React.PropTypes.func.isRequired
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
