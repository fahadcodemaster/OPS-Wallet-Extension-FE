import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { BiRefresh } from 'react-icons/bi';

import Identicon from '../../ui/identicon';
import { I18nContext } from '../../../contexts/i18n';
import {
  SEND_ROUTE,
  BUILD_QUOTE_ROUTE,
} from '../../../helpers/constants/routes';
import {
  useMetricEvent,
  useNewMetricEvent,
} from '../../../hooks/useMetricEvent';
import Tooltip from '../../ui/tooltip';
import UserPreferencedCurrencyDisplay from '../user-preferenced-currency-display';
import { PRIMARY, SECONDARY } from '../../../helpers/constants/common';
import { showModal } from '../../../store/actions';
import {
  isBalanceCached,
  getSelectedAccount,
  getShouldShowFiat,
  getCurrentKeyring,
  getSwapsDefaultToken,
  getIsSwapsChain,
  getIsBuyableChain,
  getNativeCurrencyImage,
} from '../../../selectors/selectors';
import SwapIcon from '../../ui/icon/swap-icon.component';
import BuyIcon from '../../ui/icon/overview-buy-icon.component';
import SendIcon from '../../ui/icon/overview-send-icon.component';
import { setSwapsFromToken } from '../../../ducks/swaps/swaps';
import IconButton from '../../ui/icon-button';
import { isHardwareKeyring } from '../../../helpers/utils/hardware';
import WalletOverview from './wallet-overview';
import Button from '../../ui/button';

const EthOverview = ({ className }) => {
  const dispatch = useDispatch();
  const t = useContext(I18nContext);
  const sendEvent = useMetricEvent({
    eventOpts: {
      category: 'Navigation',
      action: 'Home',
      name: 'Clicked Send: Eth',
    },
  });
  const depositEvent = useMetricEvent({
    eventOpts: {
      category: 'Navigation',
      action: 'Home',
      name: 'Clicked Deposit',
    },
  });
  const history = useHistory();
  const keyring = useSelector(getCurrentKeyring);
  const usingHardwareWallet = isHardwareKeyring(keyring?.type);
  const balanceIsCached = useSelector(isBalanceCached);
  const showFiat = useSelector(getShouldShowFiat);
  const selectedAccount = useSelector(getSelectedAccount);
  const { balance } = selectedAccount;
  const isSwapsChain = useSelector(getIsSwapsChain);
  const isBuyableChain = useSelector(getIsBuyableChain);
  const primaryTokenImage = useSelector(getNativeCurrencyImage);

  const enteredSwapsEvent = useNewMetricEvent({
    event: 'Swaps Opened',
    properties: { source: 'Main View', active_currency: 'ETH' },
    category: 'swaps',
  });
  const defaultSwapsToken = useSelector(getSwapsDefaultToken);

  return (
    <WalletOverview
      balance={
        <Tooltip
          position="top"
          title={t('balanceOutdated')}
          disabled={!balanceIsCached}
        >
          <div className="eth-overview__balance">
            <div className="eth-overview__primary-container">
              <UserPreferencedCurrencyDisplay
                className={classnames('eth-overview__primary-balance', {
                  'eth-overview__cached-balance': balanceIsCached,
                })}
                data-testid="eth-overview__primary-currency"
                value={balance}
                type={PRIMARY}
                ethNumberOfDecimals={4}
                hideTitle
              />
              {balanceIsCached ? (
                <span className="eth-overview__cached-star">*</span>
              ) : null}
            </div>
            {showFiat && (
              <UserPreferencedCurrencyDisplay
                className={classnames({
                  'eth-overview__cached-secondary-balance': balanceIsCached,
                  'eth-overview__secondary-balance': !balanceIsCached,
                })}
                data-testid="eth-overview__secondary-currency"
                value={balance}
                type={SECONDARY}
                ethNumberOfDecimals={4}
                hideTitle
              />
            )}
          </div>
        </Tooltip>
      }
      buttons={
        <>
          {/* <IconButton
            className="eth-overview__button"
            Icon={BuyIcon}
            disabled={!isBuyableChain}
            label={t('buy')}
            onClick={() => {
              depositEvent();
              dispatch(showModal({ name: 'DEPOSIT_ETHER' }));
            }}
          /> */}
          {/* <Button
            className="custom-button margin-right5"
            rounded={false}
            disabled={!isBuyableChain}
            onClick={() => {
              depositEvent();
              dispatch(showModal({ name: 'DEPOSIT_ETHER' }));
            }}
          >
            {t('buy')} <FaArrowRight className="icon-color-one" />
          </Button>{' '} */}
          {/* <IconButton
            className="eth-overview__button"
            data-testid="eth-overview-send"
            Icon={SendIcon}
            label={t('send')}
            onClick={() => {
              sendEvent();
              history.push(SEND_ROUTE);
            }}
          /> */}
          <Button
            className="custom-button margin-right5"
            data-testid="eth-overview-send"
            rounded={false}
            onClick={() => {
              sendEvent();
              history.push(SEND_ROUTE);
            }}
          >
            {t('send')} <FaArrowRight className="icon-color-one" />
          </Button>
          {/* <IconButton
            className="eth-overview__button"
            disabled={!isSwapsChain}
            Icon={SwapIcon}
            onClick={() => {
              if (isSwapsChain) {
                enteredSwapsEvent();
                dispatch(setSwapsFromToken(defaultSwapsToken));
                if (usingHardwareWallet) {
                  global.platform.openExtensionInBrowser(BUILD_QUOTE_ROUTE);
                } else {
                  history.push(BUILD_QUOTE_ROUTE);
                }
              }
            }}
            label={t('swap')}
            tooltipRender={(contents) => (
              <Tooltip
                title={t('currentlyUnavailable')}
                position="bottom"
                disabled={isSwapsChain}
              >
                {contents}
              </Tooltip>
            )}
          /> */}
          {/* <Button
            className="custom-button margin-right5"
            disabled={!isSwapsChain}
            data-testid="eth-overview-send"
            rounded={false}
            onClick={() => {
              if (isSwapsChain) {
                enteredSwapsEvent();
                dispatch(setSwapsFromToken(defaultSwapsToken));
                if (usingHardwareWallet) {
                  global.platform.openExtensionInBrowser(BUILD_QUOTE_ROUTE);
                } else {
                  history.push(BUILD_QUOTE_ROUTE);
                }
              }
            }}
          >
            {t('swap')} <BiRefresh className="icon-color-one" />
          </Button> */}
        </>
      }
      className={className}
      icon={<Identicon diameter={32} image={primaryTokenImage} imageBorder />}
    />
  );
};

EthOverview.propTypes = {
  className: PropTypes.string,
};

EthOverview.defaultProps = {
  className: undefined,
};

export default EthOverview;
