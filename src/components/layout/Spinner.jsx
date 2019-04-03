import React, { memo } from 'react'

const Spinner = memo(() => (
	<div style={{ textAlign: 'center' }}>
		<i className="fas fa-spinner fa-2x fa-spin" />
	</div>
));

export default Spinner
