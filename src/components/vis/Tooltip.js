import React from 'react'
import PropTypes from 'prop-types'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import timingUtil from 'keys-translations-manager-core/lib/timingUtil'

export default class Tooltip extends React.Component {
	static propTypes = {
		children: PropTypes.node,
		display: PropTypes.string.isRequired,
		top: PropTypes.number.isRequired,
		left: PropTypes.number.isRequired,
		ComponentActions: PropTypes.object.isRequired
	};

	constructor() {
		super();
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	onMouseOver() {
		clearInterval(timingUtil.getTimeoutId());
		// this.props.ComponentActions.hideTooltip(0, 0);
	}

	onMouseOut() {
		const me = this;
		const timeoutId = setTimeout(() => {
			me.props.ComponentActions.hideTooltip();
		}, 200);
		timingUtil.setTimeoutId(timeoutId);
	}

	render() {
		const { display, top, left } = this.props;
		const style = { display, top, left };
		return (
			<span className="app-tooltip" style={style}
					onMouseOver={this.onMouseOver.bind(this)}
					onMouseOut={this.onMouseOut.bind(this)}>
				{this.props.children}
			</span>
		);
	}
}
