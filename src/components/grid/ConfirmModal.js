import React from 'react'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'

export default class ConfirmModal extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			confirmMsg: '',
			confirmFunc: () => {},
			show: false
		};
		this.close = this.close.bind(this);
		this.confirmFunc = this.confirmFunc.bind(this);
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
			<Modal backdrop='static' show={this.state.show} onHide={this.close}>
				<Modal.Header>
					<Modal.Title>
						{this.state.confirmTitle}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{this.state.confirmMsg}
				</Modal.Body>
				<Modal.Footer>
					<Button bsSize="small" bsStyle='primary' onClick={this.confirmFunc}>
						{localeUtil.getMsg("ui.confirm.yes")}
					</Button>
					&nbsp;&nbsp;
					<Button bsSize="small" bsStyle='default' onClick={this.close}>
						{localeUtil.getMsg("ui.confirm.no")}
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}
