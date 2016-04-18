import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
// import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
// import FormPanel from './FormPanel'
// import AlertPanel from './AlertPanel'
// import localeUtil from 'keys-translations-manager-core/lib/localeUtil'

export default class ImportModal extends React.Component {
	static propTypes = {
		showimportmodal: React.PropTypes.bool.isRequired,
		closeImportModal: React.PropTypes.func.isRequired
		// data: React.PropTypes.object.isRequired,
		// errors: React.PropTypes.array.isRequired,
		// updateTranslation: React.PropTypes.func.isRequired,
		// alertErrors: React.PropTypes.func.isRequired,
		// clearErrors: React.PropTypes.func.isRequired
	};
	static contextTypes = {
		config: React.PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	close() {
		this.props.closeImportModal()
	}

	render() {
		//const { data, errors, clearErrors } = this.props;

		return (
			<Modal show={this.props.showimportmodal} onHide={this.close.bind(this)}>
				<Modal.Header>
					<Modal.Title>
						testing
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					under construction
				</Modal.Body>
				<Modal.Footer>
					to be continued
				</Modal.Footer>
			</Modal>
		);
	}
}
