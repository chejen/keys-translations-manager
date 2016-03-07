import React from 'react'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import LocaleUtil from '../../../util/LocaleUtil'

const ConfirmModal = React.createClass({
	mixins: [PureRenderMixin],
	getInitialState() {
		return {
			confirmMsg: '',
			confirmFunc: function(){},
			show: false
		};
	},
	open(confirmMsg, confirmFunc) {
		this.setState({
			show: true,
			confirmMsg: confirmMsg,
			confirmFunc: confirmFunc
		});
	},
	close() {
		this.setState({
			show: false
		});
	},
	confirmFunc() {
		this.state.confirmFunc();
		this.close();
	},
	render() {
		return (
			<Modal backdrop='static' show={this.state.show} onHide={this.close}>
				<Modal.Header>
					<Modal.Title>
						{LocaleUtil.getMsg("ui.confirm.header")}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{this.state.confirmMsg}
				</Modal.Body>
				<Modal.Footer>
					<Button bsSize="small" bsStyle='primary' onClick={this.confirmFunc}>
						{LocaleUtil.getMsg("ui.confirm.yes")}
					</Button>
					&nbsp;&nbsp;
					<Button bsSize="small" bsStyle='default' onClick={this.close}>
						{LocaleUtil.getMsg("ui.confirm.no")}
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
});

module.exports = ConfirmModal;
