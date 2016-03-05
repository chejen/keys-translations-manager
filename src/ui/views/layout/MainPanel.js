import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

const UpperPanel = React.createClass({
	mixins: [PureRenderMixin],

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
})

module.exports = UpperPanel
