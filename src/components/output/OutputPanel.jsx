import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import Well from 'react-bootstrap/lib/Well';
import Row from 'react-bootstrap/lib/Row';
import localeUtil from 'keys-translations-manager-core/lib/localeUtil';
import configUtil from '../../configUtil';
import CountCol from './CountCol';
import Select from '../common/Select';

const OutputPanel = (props) => {
  const { currentRelease, projectCounts } = props;

  const fileTypeOptions = [
    {
      value: 'nj',
      label: `Nested JSON (${localeUtil.getMsg('ui.json.mini')})`,
    },
    {
      value: 'njf',
      label: `Nested JSON (${localeUtil.getMsg('ui.json.format')})`,
    },
    {
      value: 'fj',
      label: `Flat JSON (${localeUtil.getMsg('ui.json.mini')})`,
    },
    {
      value: 'fjf',
      label: `Flat JSON (${localeUtil.getMsg('ui.json.format')})`,
    },
    {
      value: 'p',
      label: 'Properties',
    },
  ];

  const [fileType, setFileType] = useState();

  const download = (project) => {
    if (!fileType) {
      const alertMsg =
        localeUtil.getMsg('ui.common.pleaseSelect') +
        localeUtil.getMsg('ui.common.exportType');

      // eslint-disable-next-line no-alert
      window.alert(alertMsg);
      return;
    }
		let url = `/api/${currentRelease}/download/`

    /* istanbul ignore next */
    if (fileType === 'njf' || fileType === 'fjf') {
      url += 'f/';
    } else {
      url += 'n/';
    }

    /* istanbul ignore next */
    if (fileType === 'p') {
      url += 'properties/';
    } else if (fileType === 'fj' || fileType === 'fjf') {
      url += 'flat/';
    } else {
      url += 'json/';
    }

    /* istanbul ignore next */
    location.href = url + project.id;
  };

  return (
    <>
      <Well>
        <div className="app-toolbar" style={{ alignItems: 'center' }}>
          <div style={{ marginRight: 4 }}>
            {localeUtil.getMsg('ui.common.exportType')}:
          </div>
          <Select
            id="export-type"
            options={fileTypeOptions}
            width={250}
            onChange={({ value } = {}) => {
              setFileType(value);
            }}
            placeholder={localeUtil.getMsg('ui.common.pleaseSelect')}
          />
        </div>
        <Row>
          {configUtil.getProjects().map((e) => (
            <CountCol
              key={e.id}
              onClick={() => {
                download(e);
              }}
              header={e.name}
              projectId={e.id}
              desc={projectCounts && projectCounts[e.id] === 1 ? 'key' : 'keys'}
              count={projectCounts ? projectCounts[e.id] || 0 : 0}
            />
          ))}
        </Row>
      </Well>
    </>
  );
};

OutputPanel.propTypes = {
  currentRelease: PropTypes.string.isRequired,
  projectCounts: PropTypes.object.isRequired,
};

export default memo(OutputPanel);
