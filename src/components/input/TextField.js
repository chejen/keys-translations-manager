import React from 'react'
import PropTypes from 'prop-types'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'

export default class TextField extends React.Component {
	static propTypes = {
		required: PropTypes.bool,
		readOnly: PropTypes.bool,
		label: PropTypes.string,
		name: PropTypes.string.isRequired,
		value: PropTypes.string,
		defaultValue: PropTypes.string,
		placeholder: PropTypes.string,
		className: PropTypes.string,
		componentClass: PropTypes.string,
		onChange:  PropTypes.func
	}

	constructor(props, context) {
		super(props, context)
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
	}

	render() {
		{/* restProps: name, defaultValue, onChange, readOnly, className, placeholder */}
		const { required, label, value, ...restProps } = this.props
		const style = value ? {backgroundColor: "#e7e7e7"} : {}
		return(
			<FormGroup bsSize="small">
				{label
					? (<ControlLabel>
						{required
							? <span className="app-input-asterisk">* </span>
							: null}
						{label}:
					</ControlLabel>)
					: null
				}
				<FormControl style={style} value={value} {...restProps}/>
			</FormGroup>
		)
	}
}
