import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Col from 'react-bootstrap/lib/Col'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import LocaleUtil from '../../../util/LocaleUtil'

const CountCol = React.createClass({
	mixins: [PureRenderMixin],

	render() {
		return(
			<Col lg={2} md={3} sm={4}>
				<div className="panel panel-count">
					<div className="panel-heading">
						{/*<div className="text-center">{this.props.header}</div>*/}
						<span className="pull-left">{this.props.header}</span>
						<span className="pull-right">
							<Glyphicon glyph="download-alt"
								title={LocaleUtil.getMsg("ui.common.download")}
								style={{cursor:"pointer"}}
								onClick={this.props.onClick}/>
						</span>
						<div className="clearfix"></div>
					</div>
					<div className="row">
						<div className="huge text-center">
							<b>{this.props.count}</b>
						</div>
						<div className="panel-desc text-center">
							{this.props.desc}
						</div>
					</div>
				</div>
			</Col>
		);
	}
})

module.exports = CountCol
