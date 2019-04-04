import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Col from 'react-bootstrap/lib/Col'

const FileTypeCol = memo(({ value, fileType, label, onChange }) => (
	<Col lg={3} md={4} sm={6}>
		<input
			type="radio"
			name="fileType"
			value={value}
			checked={fileType === value}
			onChange={onChange}
		/>
		{' '}
		<b>{label}</b>
	</Col>
));

FileTypeCol.propTypes = {
	value: PropTypes.string.isRequired,
	fileType: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};

export default FileTypeCol;
