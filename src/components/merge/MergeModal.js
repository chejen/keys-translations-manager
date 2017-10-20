import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'

const num = 10

const MergeModal = ({
	keys, mergeable, showmergemodal, closeMergeModal, mergeTranslations
}) => {
	const k = Object.keys(keys).map(key => key)
	const submit = () => {
		mergeTranslations(mergeable)
	}

	return (
		<Modal show={showmergemodal} onHide={closeMergeModal}>
			<Modal.Header>
				<Modal.Title>
					{localeUtil.getMsg("ui.common.merge")}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{
				k.length > 0
				? (<div>
					<b>{localeUtil.getMsg("ui.merge.match")} </b>
						{k.length >= (num + 2)
						? `${k.slice(0, num).join(", ")} ${localeUtil.getMsg("ui.common.others", k.length - num)}`
						: k.join(", ")}
					<br/><br/>
					<b>{localeUtil.getMsg("ui.confirm.continue")}</b>
				</div>)
				: localeUtil.getMsg("ui.merge.nomatch")
				}
			</Modal.Body>
			{k.length > 0 ?
				<Modal.Footer>
					<Button bsSize="small" bsStyle="primary" onClick={submit}>
						{localeUtil.getMsg("ui.confirm.yes")}
					</Button>
					<Button bsSize="small" onClick={closeMergeModal}>
						{localeUtil.getMsg("ui.confirm.no")}
					</Button>
				</Modal.Footer> :
				<Modal.Footer>
					<Button bsSize="small" bsStyle="primary" onClick={closeMergeModal}>
						{localeUtil.getMsg("ui.common.close")}
					</Button>
				</Modal.Footer>
			}
		</Modal>
	);
};

MergeModal.propTypes = {
	keys: PropTypes.object.isRequired,
	mergeable: PropTypes.array.isRequired,
	showmergemodal: PropTypes.bool.isRequired,
	closeMergeModal: PropTypes.func.isRequired,
	mergeTranslations: PropTypes.func.isRequired
};

export default MergeModal;
