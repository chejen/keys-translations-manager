import React, { memo } from 'react';
import PropTypes from 'prop-types'
import ReactSelect from 'react-select';

const darkYellow = '#f77f00';
const middleYellow = '#fcbf49';

const Select = (props) => (
  <ReactSelect
    styles={{
      control: (style, d) => ({
        ...style,
        width: props.width,
        height: 34,
        minHeight: 34,
        "&:hover": {
          ...style["&:hover"],
          borderColor: darkYellow,
        },
        boxShadow: darkYellow,
        borderColor: d.isFocused ? darkYellow : "#000",
        marginBottom: 2,
        marginRight: 4,
      }),
      option: (style, d) => ({
        ...style,
        color: '#000',
        backgroundColor: d.isFocused ? middleYellow : undefined,
        ":active": {
          ...style[":active"],
          backgroundColor: middleYellow,
        },
      }),
      menu: (style) => ({
        ...style,
        zIndex: 3,
        marginTop: "0px",
      }),
      multiValue: (style) => ({
        ...style,
        backgroundColor: middleYellow,
      }),
      multiValueRemove: (styles) => ({
        ...styles,
        ":hover": {
          backgroundColor: darkYellow,
          color: "white",
        },
      }),
    }}
    {...props}
  />
);

Select.propTypes = {
  width: PropTypes.any
}

export default memo(Select)