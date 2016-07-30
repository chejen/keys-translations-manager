import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import timingUtil from 'keys-translations-manager-core/lib/timingUtil'

export default class Tooltip extends React.Component {
	static propTypes = {
		children: React.PropTypes.node,
		display: React.PropTypes.string.isRequired,
		top: React.PropTypes.number.isRequired,
		left: React.PropTypes.number.isRequired,
		ComponentActions: React.PropTypes.object.isRequired
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
