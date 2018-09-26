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
		translation: PropTypes.object.isRequired,
		historylog: PropTypes.array.isRequired,
		historystatus: PropTypes.string.isRequired,
	};

	constructor() {
		super();
		this.close = this.close.bind(this);
	}

	componentDidUpdate(prevProps) {
		const {
			showhistorymodal,
			translation,
			loadHistory,
		} = this.props;

		if (
			showhistorymodal && translation && translation._id &&
			showhistorymodal !== prevProps.showhistorymodal
		) {
			loadHistory(translation._id);
		}
	}

	close() {
		this.props.closeHistoryModal()
	}

	render() {
		const {
			showhistorymodal,
			translation,
			historylog,
			historystatus,
		} = this.props;
		const logs = [];
		let len = historylog ? historylog.length : 0,
			i = len - 1,
			diff,
			prev;

		for (; i >= 0; i--) {
			if (i === 0) {
				prev = historylog[0].action === 'ADD' ? null : translation;
			} else {
				prev = historylog[i - 1].translation;
			}
			diff = historyUtil.differentiate(prev, historylog[i].translation);
			if (diff) {
				historylog[i].diff = diff;
				logs.push(historylog[i]);
			}
		}

		return (
			<Modal show={showhistorymodal} bsSize="lg" onHide={this.close}>
				<Modal.Header>
					<Modal.Title>
						{`${localeUtil.getMsg('ui.common.history')} (ID: ${translation._id})`}
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
