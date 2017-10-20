import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'

const TextField = ({ required, label, value, ...restProps }) => {
	// restProps: name, defaultValue, onChange, readOnly, className, placeholder
	const style = value ? { backgroundColor: "#e7e7e7" } : {}
	return(
		<FormGroup bsSize="small">
			{label &&
				(<ControlLabel>
					{required
						? <span className="app-input-asterisk">* </span>
						: null}
					{label}:
				</ControlLabel>)
			}
			<FormControl style={style} value={value} {...restProps}/>
		</FormGroup>
	)
};

TextField.propTypes = {
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
};

export default TextField
