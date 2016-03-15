import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

export default class UpperPanel extends React.Component {
	constructor() {
		super();
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render() {
		return(
			<Row>
				<Col lg={12}>
					{/*<div className="panel panel-default">
						<div className="panel-body"></div>
					</div>*/}
					{this.props.children}
				</Col>
			</Row>
		);
	}
}
