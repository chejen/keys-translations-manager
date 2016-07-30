import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import timingUtil from 'keys-translations-manager-core/lib/timingUtil'

export default class Tooltip extends React.Component {
	static propTypes = {
		children: React.PropTypes.node
	};

	constructor() {
		super();
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			"display": "none",
			"top": 0,
			"left": 0
		};
	}

	componentWillReceiveProps(nextProps) {
		const { display, top, left } = nextProps;
		this.setState({
			display, top, left
		});
	}

	onMouseOver() {
		clearInterval(timingUtil.getTimeoutId());
/* 		this.setState({
			display: "inline"
		}); */
	}

	onMouseOut() {
		const me = this;
		const timeoutId = setTimeout(() => {
			me.setState({
				display: "none"
			});
		}, 200);
		timingUtil.setTimeoutId(timeoutId);
	}

	render() {
		const { display, top, left } = this.state;
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
