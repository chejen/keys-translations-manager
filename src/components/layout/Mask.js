import React from 'react'
import Modal from 'react-bootstrap/lib/Modal'

const Mask = (props) => (
	<Modal backdrop='static' keyboard={false} bsSize='small' show={props.show}>
		<Modal.Body style={{"textAlign": "center"}}>
			<i className="fa fa-spinner fa-pulse fa-2x"/>
		</Modal.Body>
	</Modal>
);

Mask.propTypes = {
	show: React.PropTypes.bool.isRequired
};

export default Mask
