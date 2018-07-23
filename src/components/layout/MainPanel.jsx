import React from 'react'
import PropTypes from 'prop-types'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

const MainPanel = props => (
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
	children: PropTypes.node
};

export default MainPanel
