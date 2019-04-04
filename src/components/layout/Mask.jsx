import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/lib/Modal'
import Spinner from './Spinner'

const Mask = memo(({ show }) => (
	<Modal backdrop='static' keyboard={false} bsSize='small' show={show}>
		<Modal.Body>
			<Spinner />
		</Modal.Body>
	</Modal>
));

Mask.propTypes = {
	show: PropTypes.bool.isRequired
};

export default Mask
