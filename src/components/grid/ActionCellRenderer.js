import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'

const ActionCellRenderer = ({ data, ComponentActions }) => (
	<Fragment>
		<Glyphicon
			glyph="edit"
			className="app-action-icon"
			title={localeUtil.getMsg("ui.common.edit")}
			onClick={ComponentActions.showEditModal.bind(ComponentActions, data)}
		/>
		<Glyphicon
			glyph="trash"
			className="app-action-icon"
			title={localeUtil.getMsg("ui.common.delete")}
			onClick={ComponentActions.showConfirmModal.bind(ComponentActions, data)}
		/>
	</Fragment>
)

ActionCellRenderer.propTypes = {
	data: PropTypes.object,
	ComponentActions: PropTypes.object.isRequired,
};

export default ActionCellRenderer
