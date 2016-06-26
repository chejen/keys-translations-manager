import React from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default class Mask extends React.Component {
	static propTypes = {
		show: React.PropTypes.bool.isRequired
	};

	constructor() {
		super();
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render() {
		return (
			<Modal backdrop='static' keyboard={false} bsSize='small' show={this.props.show}>
				<Modal.Body style={{"textAlign": "center"}}>
					<i className="fa fa-spinner fa-pulse fa-2x"/>
				</Modal.Body>
			</Modal>
		);
	}
}
