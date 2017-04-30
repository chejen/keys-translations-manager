import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Col from 'react-bootstrap/lib/Col'

export default class FileTypeCol extends React.Component {
	static propTypes = {
		value: React.PropTypes.string.isRequired,
		fileType: React.PropTypes.string.isRequired,
		label: React.PropTypes.string.isRequired,
		onChange: React.PropTypes.func.isRequired
	};

	constructor() {
		super();
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render() {
		const { value, fileType, label, onChange } = this.props
		return(
			<Col lg={3} md={4} sm={6}>
				<input
					type="radio" name="fileType" value={value}
					checked={fileType === value}
					onChange={onChange}
				/>
				{` ${label}`}
			</Col>
		);
	}
}
