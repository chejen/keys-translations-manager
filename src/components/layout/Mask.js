import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/lib/Modal'

const Mask = (props) => (
	<Modal backdrop='static' keyboard={false} bsSize='small' show={props.show}>
		<Modal.Body style={{"textAlign": "center"}}>
			<i className="fa fa-spinner fa-pulse fa-2x"/>
		</Modal.Body>
	</Modal>
);

Mask.propTypes = {
	show: PropTypes.bool.isRequired
};

export default Mask
