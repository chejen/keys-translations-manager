import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'

const ConfirmModal = memo(({
	showconfirmmodal,
	closeConfirmModal,
	data,
	removeTranslation,
}) => (
	<Modal backdrop='static' show={showconfirmmodal} onHide={closeConfirmModal}>
		<Modal.Header>
			<Modal.Title>
				{localeUtil.getMsg("ui.common.delete")}
			</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			{localeUtil.getMsg("ui.confirm.delete", data.key)}
		</Modal.Body>
		<Modal.Footer>
			<Button bsSize="small" bsStyle='primary' onClick={() => {
				removeTranslation(data._id);
			}}>
				{localeUtil.getMsg("ui.confirm.yes")}
			</Button>
			&nbsp;&nbsp;
			<Button bsSize="small" bsStyle='default' onClick={closeConfirmModal}>
				{localeUtil.getMsg("ui.confirm.no")}
			</Button>
		</Modal.Footer>
	</Modal>
));

ConfirmModal.propTypes = {
	data: PropTypes.object.isRequired,
	showconfirmmodal: PropTypes.bool.isRequired,
	removeTranslation: PropTypes.func.isRequired,
	closeConfirmModal: PropTypes.func.isRequired,
};

export default ConfirmModal
