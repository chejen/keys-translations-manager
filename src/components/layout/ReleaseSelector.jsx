import React, { memo } from 'react';
import localeUtil from 'keys-translations-manager-core/lib/localeUtil';
import PropTypes from 'prop-types';
import Select from '../common/Select';

const ReleaseSelector = (props) => {
  const { selectRelease, currentRelease, releaseLoading, releases } = props;

  const releaseOptions = ['latest', ...releases]
    .map((value) => ({ label: value, value }));

  return (
    <div className="app-release-selector">
      <Select
        id="export-type"
        options={releaseOptions}
        loading={releaseLoading}
        width={150}
        onChange={({ value } = {}) => {
          selectRelease(value);
        }}
        value={{ label: currentRelease, value: currentRelease }}
        placeholder={localeUtil.getMsg('ui.common.pleaseSelect')}
      />
    </div>
  );
};

ReleaseSelector.propTypes = {
  selectRelease: PropTypes.func.isRequired,
  findMergeable: PropTypes.func.isRequired,
  releaseLoading: PropTypes.bool.isRequired,
  releases: PropTypes.array.isRequired,
  currentRelease: PropTypes.string.isRequired,
};

export default memo(ReleaseSelector);
