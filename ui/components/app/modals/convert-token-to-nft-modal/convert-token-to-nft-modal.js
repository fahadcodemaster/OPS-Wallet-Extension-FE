import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Modal from '../../modal';
import Typography from '../../../ui/typography';
import { TYPOGRAPHY } from '../../../../helpers/constants/design-system';
import withModalProps from '../../../../helpers/higher-order-components/with-modal-props';
import { useI18nContext } from '../../../../hooks/useI18nContext';
import { ADD_COLLECTIBLE_ROUTE } from '../../../../helpers/constants/routes';

const ConvertTokenToNFTModal = ({ hideModal, tokenAddress }) => {
  const history = useHistory();
  const t = useI18nContext();
  return (
    <Modal
      onSubmit={() => {
        history.push({
          pathname: ADD_COLLECTIBLE_ROUTE,
          state: { tokenAddress },
        });
        hideModal();
      }}
      submitText={t('yes')}
      onCancel={() => hideModal()}
      cancelText={t('cancel')}
    >
      <div className="convert-token-to-nft-modal">
        <Typography
          variant={TYPOGRAPHY.H6}
          boxProps={{
            marginTop: 2,
          }}
        >
          {t('convertTokenToNFTDescription')}
        </Typography>
      </div>
    </Modal>
  );
};

ConvertTokenToNFTModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  tokenAddress: PropTypes.string,
};

export default withModalProps(ConvertTokenToNFTModal);
