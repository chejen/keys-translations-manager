import React, { Fragment, memo } from 'react'
import PropTypes from 'prop-types'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'

const ActionCellRenderer = memo(({ data, ComponentActions }) => (
	<Fragment>
		<i className="fas fa-pen app-action-icon"
			title={localeUtil.getMsg("ui.common.edit")}
			onClick={ComponentActions.showEditModal.bind(ComponentActions, data)}
		/>
		<i className="far fa-trash-alt app-action-icon"
			title={localeUtil.getMsg("ui.common.delete")}
			onClick={ComponentActions.showConfirmModal.bind(ComponentActions, data)}
		/>
		<i className="fas fa-list-ul app-action-icon"
			title={localeUtil.getMsg("ui.common.history")}
			onClick={ComponentActions.showHistoryModal.bind(ComponentActions, data)}
		/>
	</Fragment>
));

ActionCellRenderer.propTypes = {
	data: PropTypes.object,
	ComponentActions: PropTypes.object.isRequired,
};

export default ActionCellRenderer
