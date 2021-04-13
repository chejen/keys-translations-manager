import React, { memo } from 'react'
import PropTypes from 'prop-types'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'

const TextField = memo(({ required, label, value, style = {}, ...restProps }) => {
	// restProps: name, defaultValue, onChange, readOnly, className, placeholder
	const custStyle = value ? { backgroundColor: "#e7e7e7", ...style } : style
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
			<FormControl style={custStyle} value={value} {...restProps}/>
		</FormGroup>
	)
});

TextField.propTypes = {
	style: PropTypes.object,
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
