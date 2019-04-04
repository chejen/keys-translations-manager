import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/lib/Col'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'

const CountCol = memo(({ projectId, header, onClick, count, desc }) => (
	<Col lg={2} md={3} sm={4}>
		<div className="panel panel-container">
			<div className="panel-heading">
				<div className="panel-title app-ellipsis" title={header}>
					{header}
				</div>
				<div className="panel-glyph">
					<i
						className="fas fa-arrow-circle-down fa-lg"
						title={localeUtil.getMsg("ui.common.download")}
						style={{cursor:"pointer"}}
						onClick={onClick}
					/>
				</div>
			</div>
			<div className="row">
				<div className="panel-count text-center">
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
));

CountCol.propTypes = {
	projectId: PropTypes.string.isRequired,
	header: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	count: PropTypes.number.isRequired,
	desc: PropTypes.string.isRequired
};

export default CountCol;
