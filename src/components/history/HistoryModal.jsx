import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'
import * as Status from '../../constants/Status'
import Spinner from '../layout/Spinner'

export default class HistoryModal extends React.PureComponent {
	static propTypes = {
		showhistorymodal: PropTypes.bool.isRequired,
		closeHistoryModal: PropTypes.func.isRequired,
		loadHistory: PropTypes.func.isRequired,
		history: PropTypes.array.isRequired,
		historystatus: PropTypes.string.isRequired,
		translationId: PropTypes.string.isRequired,
	};

	constructor() {
		super();
		this.close = this.close.bind(this);
	}

	componentDidUpdate(prevProps) {
		const {
			showhistorymodal,
			translationId,
			loadHistory,
		} = this.props;

		if (
			showhistorymodal && translationId &&
			showhistorymodal !== prevProps.showhistorymodal
		) {
			loadHistory(translationId);
		}
	}

	close() {
		this.props.closeHistoryModal()
	}

	render() {
		const {
			showhistorymodal,
			translationId,
			history,
			historystatus,
		} = this.props;

		return (
			<Modal show={showhistorymodal} onHide={this.close}>
				<Modal.Header>
					<Modal.Title>
						{`${localeUtil.getMsg("ui.common.history")} (ID: ${translationId})`}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{
						historystatus === Status.STATUS_FETCHING
						? <Spinner />
						: JSON.stringify(history)
					}
				</Modal.Body>
				<Modal.Footer>
					<Button bsSize="small" onClick={this.close}>
						{localeUtil.getMsg("ui.common.close")}
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}
