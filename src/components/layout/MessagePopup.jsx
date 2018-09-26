import React from 'react'
import PropTypes from 'prop-types'

const MessagePopup = ({
	children, msg, showmessagepopup, closeMessagePopup
}) => {
	const style = {
		display: showmessagepopup ? "block" : "none"
	}

	return (
		<div className="app-message-popup" style={style}>
			<div className="app-message-bar">
				<i className="app-action-icon fa fa-close fa-fw" onClick={closeMessagePopup} />
				{msg}
				{' '}
				{children}
			</div>
		</div>
	);
};

MessagePopup.propTypes = {
	children: PropTypes.node,
	msg: PropTypes.string.isRequired,
	showmessagepopup: PropTypes.bool.isRequired,
	closeMessagePopup: PropTypes.func.isRequired
};

export default MessagePopup
