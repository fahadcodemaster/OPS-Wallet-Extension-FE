import React, { useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import Popover from '../popover';
import Button from '../button';
import TextField from '../text-field';

import { I18nContext } from '../../../contexts/i18n';

import Identicon from '../identicon/identicon.component';

export default function UpdateNicknamePopover({
  nickname,
  address,
  onAdd,
  memo,
  onClose,
}) {
  const t = useContext(I18nContext);

  const [nicknameInput, setNicknameInput] = useState(nickname);
  const [memoInput, setMemoInput] = useState(memo);

  const handleNicknameChange = (event) => {
    setNicknameInput(event.target.value);
  };

  const handleMemoChange = (event) => {
    setMemoInput(event.target.value);
  };

  const closePopover = useCallback(() => {
    onClose();
  }, [onClose]);

  const onCancel = () => {
    onClose();
  };

  const onSubmit = () => {
    onAdd(address, nicknameInput, memoInput);
    onClose();
  };

  return (
    <Popover
      title={nickname ? t('editAddressNickname') : t('addANickname')}
      onClose={closePopover}
      className="update-nickname__wrapper"
      footer={
        <>
          <Button
            className="update-nickname__cancel"
            type="secondary"
            onClick={onCancel}
          >
            {t('cancel')}
          </Button>
          <Button
            className="update-nickname__save"
            type="primary"
            onClick={onSubmit}
            disabled={!nicknameInput}
          >
            {t('save')}
          </Button>
        </>
      }
    >
      <div className="update-nickname__content">
        <Identicon
          className="update-nickname__content__indenticon"
          address={address}
          diameter={36}
        />
        <label className="update-nickname__content__label--capitalized">
          {t('address')}
        </label>
        <div className="update-nickname__content__address">{address}</div>
        <div className="update-nickname__content__nickname-label">
          {t('nickname')}
        </div>
        <TextField
          className="update-nickname__content__text-field"
          value={nicknameInput}
          onChange={handleNicknameChange}
          placeholder={t('addANickname')}
          fullWidth
        />
        <div className="update-nickname__content__label--capitalized">
          {t('memo')}
        </div>
        <TextField
          type="text"
          id="memo"
          value={memoInput}
          onChange={handleMemoChange}
          placeholder={t('addMemo')}
          fullWidth
          margin="dense"
          multiline
          rows={3}
          classes={{
            inputMultiline: 'update-nickname__content__text-area',
            inputRoot: 'update-nickname__content__text-area-wrapper',
          }}
        />
      </div>
    </Popover>
  );
}

UpdateNicknamePopover.propTypes = {
  nickname: PropTypes.string,
  address: PropTypes.string,
  memo: PropTypes.string,
  onAdd: PropTypes.func,
  onClose: PropTypes.func,
};
