import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

const MainPanel = (props) => (
	<Row>
		<Col lg={12}>
			{/*<div className="panel panel-default">
				<div className="panel-body"></div>
			</div>*/}
			{props.children}
		</Col>
	</Row>
);

MainPanel.propTypes = {
	children: React.PropTypes.node
};

export default MainPanel
