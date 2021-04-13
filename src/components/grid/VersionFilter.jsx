import React from 'react';
import PropTypes from 'prop-types'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'
import configUtil from '../../configUtil'
import Select from '../common/Select';

const projects = configUtil.getProjects();

const VersionFilter = (props) => {
  const options = projects.map(({id, name}) => ({
    label: name,
    value: id,
  }))

  return (
    <Select
      id="version-filter"
      options={options}
      onChange={props.onChange}
      placeholder={localeUtil.getMsg("ui.common.version")}
    />
  );
};

VersionFilter.propTypes = {
  onChange: PropTypes.func,
}

export default VersionFilter;