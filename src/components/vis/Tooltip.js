import React from 'react'
import PropTypes from 'prop-types'
import timingUtil from 'keys-translations-manager-core/lib/timingUtil'

const Tooltip = ({ children, display, top, left, ComponentActions }) => {
	const style = { display, top, left }
	const onMouseOver = () => {
		clearInterval(timingUtil.getTimeoutId());
		// ComponentActions.hideTooltip(0, 0);
	}
	const onMouseOut = () => {
		const timeoutId = setTimeout(() => {
			ComponentActions.hideTooltip();
		}, 200);
		timingUtil.setTimeoutId(timeoutId);
	}

	return (
		<span
			className="app-tooltip"
			style={style}
			onMouseOver={onMouseOver}
			onMouseOut={onMouseOut}
		>
			{children}
		</span>
	);
};

Tooltip.propTypes = {
	children: PropTypes.node,
	display: PropTypes.string.isRequired,
	top: PropTypes.number.isRequired,
	left: PropTypes.number.isRequired,
	ComponentActions: PropTypes.object.isRequired
};

export default Tooltip
