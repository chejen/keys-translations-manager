import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'

export default class TextField extends React.Component {
	static propTypes = {
		required: React.PropTypes.bool,
		label: React.PropTypes.string,
		name: React.PropTypes.string.isRequired,
		value: React.PropTypes.string,
		defaultValue: React.PropTypes.string,
		placeholder: React.PropTypes.string,
		className: React.PropTypes.string,
		componentClass: React.PropTypes.string,
		onChange:  React.PropTypes.func
	}

	constructor(props, context) {
		super(props, context)
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
	}

	render() {
		{/* restProps: name, defaultValue, onChange, className, placeholder */}
		const { required, label, value, ...restProps } = this.props
		const style = value ? {backgroundColor: "#e7e7e7"} : {}
		return(
			<FormGroup bsSize="small">
				{label
					? (<ControlLabel>
						{required
							? <span className="app-input-asterisk">*</span>
							: null}
						{` ${label}`}:
					</ControlLabel>)
					: null
				}
				<FormControl style={style} value={value} {...restProps}/>
			</FormGroup>
		)
	}
}
