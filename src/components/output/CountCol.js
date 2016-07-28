import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'
import Col from 'react-bootstrap/lib/Col'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'

export default class CountCol extends React.Component {
	static propTypes = {
		projectId: React.PropTypes.string.isRequired,
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
		const { projectId, header, onClick, count, desc } = this.props
		return(
			<Col lg={2} md={3} sm={4}>
				<div className="panel panel-count">
					<div className="panel-heading">
						{/*<div className="text-center">{this.props.header}</div>*/}
						<span className="pull-left">{header}</span>
						<span className="pull-right">
							<Glyphicon glyph="download-alt"
								title={localeUtil.getMsg("ui.common.download")}
								style={{cursor:"pointer"}}
								onClick={onClick}/>
						</span>
						<div className="clearfix"></div>
					</div>
					<div className="row">
						<div className="huge text-center">
							<b>
							{count ? <Link to={`/vis/${projectId}`}>{count}</Link> : count}
							</b>
						</div>
						<div className="panel-desc text-center">
							{desc}
						</div>
					</div>
				</div>
			</Col>
		);
	}
}
