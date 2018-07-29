import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'
import historyUtil from 'keys-translations-manager-core/lib/historyUtil'
import * as Status from '../../constants/Status'
import Spinner from '../layout/Spinner'
import DiffPanel from './DiffPanel'

export default class HistoryModal extends React.PureComponent {
	static propTypes = {
		showhistorymodal: PropTypes.bool.isRequired,
		closeHistoryModal: PropTypes.func.isRequired,
		loadHistory: PropTypes.func.isRequired,
		historylog: PropTypes.array.isRequired,
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
			historylog,
			historystatus,
		} = this.props;
		const logs = [];
		let len = historylog ? historylog.length : 0,
			i = len - 1,
			prev;

		for (; i >= 0; i--) {
			prev = i === 0 ? null : historylog[i - 1].translation;
			historylog[i].diff = historyUtil.differentiate(prev, historylog[i].translation);
			logs.push(historylog[i]);
		}

		return (
			<Modal show={showhistorymodal} bsSize="lg" onHide={this.close}>
				<Modal.Header>
					<Modal.Title>
						{`${localeUtil.getMsg('ui.common.history')} (ID: ${translationId})`}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{
						historystatus === Status.STATUS_FETCHING
						? <Spinner />
						: (logs.length
							// Can't use el._id as a key (cause 'MERGE' have no log._id)
							? logs.map((log, i) => <DiffPanel key={`log-${i}`} log={log} />)
							: localeUtil.getMsg('ui.history.none')
						)
					}
				</Modal.Body>
				<Modal.Footer>
					<Button bsSize="small" onClick={this.close}>
						{localeUtil.getMsg('ui.common.close')}
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}
