import '../app.less';
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

const Counter = React.createClass({
	mixins: [PureRenderMixin],

	render() {
		return(
			<div className="app-project-wrapper">
				<div className="app-project-name">
					{this.props.name}
				</div>
				<div className="app-project-count" onClick={this.props.onClick}>
					{this.props.count}
					<div className="app-project-unit">
						keys
					</div>
				</div>
			</div>
		);
	}
})

module.exports = Counter
