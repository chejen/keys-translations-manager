import React from 'react'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import LocaleUtil from '../../../util/LocaleUtil'

export default class ConfirmModal extends React.Component {
	constructor() {
		super();
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			confirmMsg: '',
			confirmFunc: function(){},
			show: false
		};
	}

	open(confirmTitle, confirmMsg, confirmFunc) {
		this.setState({
			show: true,
			confirmTitle: confirmTitle,
			confirmMsg: confirmMsg,
			confirmFunc: confirmFunc
		});
	}

	close() {
		this.setState({
			show: false
		});
	}

	confirmFunc() {
		this.state.confirmFunc();
		this.close();
	}

	render() {
		return (
			<Modal backdrop='static' show={this.state.show} onHide={this.close.bind(this)}>
				<Modal.Header>
					<Modal.Title>
						{this.state.confirmTitle}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{this.state.confirmMsg}
				</Modal.Body>
				<Modal.Footer>
					<Button bsSize="small" bsStyle='primary' onClick={this.confirmFunc.bind(this)}>
						{LocaleUtil.getMsg("ui.confirm.yes")}
					</Button>
					&nbsp;&nbsp;
					<Button bsSize="small" bsStyle='default' onClick={this.close.bind(this)}>
						{LocaleUtil.getMsg("ui.confirm.no")}
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}
