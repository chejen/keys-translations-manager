import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import TextField from './TextField';
import localeUtil from 'keys-translations-manager-core/lib/localeUtil';

const ReleaseModal = (props) => {
  const {
    currentRelease,
    showreleasemodal,
    closeReleaseModal,
    newRelease,
  } = props;

  const [version, setVersion] = useState('');

  useEffect(() => {
    if (!showreleasemodal) {
      setVersion('');
    }
  }, [showreleasemodal]);

  const close = () => {
    closeReleaseModal();
  };

  const onChange = ({ target: { value } }) => {
    setVersion(value);
  };

  const onRelease = () => {
    if (!version) {
      return;
    }

    newRelease(version);
    close();
  };

  return (
    <Modal show={showreleasemodal} onHide={close}>
      <Modal.Header>
        <Modal.Title>{localeUtil.getMsg('ui.common.release')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TextField
          name="from"
          type="text"
          label="Base Version"
          value={currentRelease}
          disabled
        />
        <TextField
          name="version"
          type="text"
          style={{ backgroundColor: '#fff' }}
          label="New Version"
          value={version}
          onChange={onChange}
          required
        />
      </Modal.Body>
      <Modal.Footer>
        <Button bsSize="small" bsStyle="primary" onClick={onRelease}>
          {localeUtil.getMsg('ui.common.ok')}
        </Button>
        <Button bsSize="small" onClick={close}>
          {localeUtil.getMsg('ui.common.cancel')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ReleaseModal.propTypes = {
  closeReleaseModal: PropTypes.func.isRequired,
  newRelease: PropTypes.func.isRequired,
  showreleasemodal: PropTypes.bool,
  currentRelease: PropTypes.string,
};

export default memo(ReleaseModal);
