import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Col from 'react-bootstrap/lib/Col'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'

export default class CountCol extends React.Component {
	static propTypes = {
		header: React.PropTypes.string.isRequired,
		onClick: React.PropTypes.func.isRequired,
		count: React.PropTypes.number.isRequired,
		desc: React.PropTypes.string.isRequired
	};

	constructor() {
		super();
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render() {
		return(
			<Col lg={2} md={3} sm={4}>
				<div className="panel panel-count">
					<div className="panel-heading">
						{/*<div className="text-center">{this.props.header}</div>*/}
						<span className="pull-left">{this.props.header}</span>
						<span className="pull-right">
							<Glyphicon glyph="download-alt"
								title={localeUtil.getMsg("ui.common.download")}
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
}
