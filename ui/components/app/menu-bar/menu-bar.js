import React, { useEffect, useState } from 'react';
import extension from 'extensionizer';
// import * as actionConstants from '../../../store/actionConstants';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SelectedAccount from '../selected-account';
import ConnectedStatusIndicator from '../connected-status-indicator';
import { getEnvironmentType } from '../../../../app/scripts/lib/util';
import { ENVIRONMENT_TYPE_POPUP } from '../../../../shared/constants/app';
import { CONNECTED_ACCOUNTS_ROUTE } from '../../../helpers/constants/routes';
import { useI18nContext } from '../../../hooks/useI18nContext';
import { useMetricEvent } from '../../../hooks/useMetricEvent';
import {
  getOriginOfCurrentTab,
  getNumberOfAccounts,
  getMetaMaskAccountsRaw,
  getMetaMaskAccountsOrdered,
  getMetaMaskAccounts,
} from '../../../selectors';
import AccountOptionsMenu from './account-options-menu';
import { useDispatch } from 'react-redux';
import {
  addNewAccount,
  setAccountLabel,
  setRpcTarget,
  showAccountDetail,
} from '../../../store/actions';
import {
  AVALANCHE_CHAIN_ID,
  AVALANCHE_SYMBOL,
} from '../../../../shared/constants/network';
import { ConnectAction, GetAllCurrencyAction } from '../../../ducks/p2p/p2p';

export default function MenuBar() {
  const dispatch = useDispatch();
  const previousSelectedAddress = useSelector(
    (state) => state?.metamask?.selectedAddress,
  );

  // const numberOfAccounts = useSelector(getNumberOfAccounts);
  const UserAccountDetail = useSelector((state) =>
    getMetaMaskAccountsOrdered(state),
  );

  const allIdentities = useSelector((state) => state.metamask.identities);
  const t = useI18nContext();
  const openAccountOptionsEvent = useMetricEvent({
    eventOpts: {
      category: 'Navigation',
      action: 'Home',
      name: 'Opened Account Options',
    },
  });
  const history = useHistory();
  const [
    accountOptionsButtonElement,
    setAccountOptionsButtonElement,
  ] = useState(null);
  const [accountOptionsMenuOpen, setAccountOptionsMenuOpen] = useState(false);
  const origin = useSelector(getOriginOfCurrentTab);

  const showStatus =
    getEnvironmentType() === ENVIRONMENT_TYPE_POPUP &&
    origin &&
    origin !== extension.runtime.id;

  useEffect(() => {
    initialProcess();

    // dispatch(showAccountDetail());
  }, []);

  useEffect(() => {
    AuthConnection();
  }, [previousSelectedAddress]);

  const AuthConnection = async () => {
    // const AddressNeedToDefaultSelected = previousSelectedAddress;

    // console.log(allIdentities);

    let connectPayload = {
      addresses: [],
    };

    if (Object.keys(allIdentities).length == 2) {
      for (var key in allIdentities) {
        var identities = allIdentities[key];

        connectPayload.addresses.push({
          address: identities.address,
          walletType: identities.name,
        });
      }

      await dispatch(ConnectAction(connectPayload))
        .then(() => {})
        .catch((error) => {});
    }

    await dispatch(GetAllCurrencyAction())
      .then(() => {})
      .catch((error) => {});
  };

  // useEffect(() => {

  //   const ModifyIdenties = allIdentities;
  //   if (ModifyIdenties && Object.keys(ModifyIdenties).length == 2) {

  //     // var firstKeyValue = Object.keys(ModifyIdenties)[1];
  //     // ModifyIdenties[firstKeyValue].address = previousSelectedAddress;

  //     // dispatch({type:actionConstants.ACCOUNT_MODIFICATION,action: ModifyIdenties})
  //   }
  //   console.log('ModifyIdenties', ModifyIdenties);
  //   var address = '';

  //   if (ModifyIdenties && Object.keys(ModifyIdenties).length == 2) {
  //     // var elementKey1 = Object.keys(ModifyIdenties)[0];
  //     // var element1 = ModifyIdenties[elementKey1];
  //     // var elementKey2 = Object.keys(ModifyIdenties)[1];
  //     // var element2 = ModifyIdenties[elementKey2];
  //     // var elementAddress = element1.address;

  //     var element1;
  //     var element2;

  //     var elementKey;
  //     var element;

  //     for (var i = 0; i < Object.keys(ModifyIdenties).length; i++) {
  //       elementKey = Object.keys(ModifyIdenties)[i];
  //       element = ModifyIdenties[elementKey];

  //       if (element.name === 'P2P') {
  //         element1 = element;
  //       } else {
  //         element1 = element;
  //       }
  //     }

  //     for (var i = 0; i < Object.keys(ModifyIdenties).length; i++) {
  //       elementKey = Object.keys(ModifyIdenties)[i];
  //       element = ModifyIdenties[elementKey];

  //       if (element.name === 'SPOT') {
  //         element2 = element;
  //       } else {
  //         element2 = element;
  //       }
  //     }

  //     if (element1.name === 'P2P') {
  //       element1.address = element2.address;
  //     } else if (element2.name === 'P2P') {
  //       element2.address = element1.address;
  //     }

  //     dispatch({
  //       type: actionConstants.ACCOUNT_MODIFICATION,
  //       action: { [element1.address]: element1, [element2.address]: element2 },
  //     });
  //   }

  //   // console.log(
  //   //   'Object.keys(ModifyIdenties)[0].address',
  //   //   Object.keys(ModifyIdenties)[0].address,
  //   // );
  //   console.log(ModifyIdenties);
  // }, [allIdentities]);

  const initialProcess = async () => {
    const AddressNeedToDefaultSelected = previousSelectedAddress;

    if (UserAccountDetail.length < 2) {
      await dispatch(addNewAccount()).then(async (newAccountAddress) => {
        // console.log(newAccountAddress);
        await dispatch(setAccountLabel(newAccountAddress, 'P2P'))
          .then(async () => {
            await dispatch(
              setRpcTarget(
                'https://api.avax-test.network/ext/bc/C/rpc',
                AVALANCHE_CHAIN_ID,
                AVALANCHE_SYMBOL,
                'Avalaunch Test',
              ),
            )
              .then(() => {})
              .catch(() => {});
            await dispatch(showAccountDetail(AddressNeedToDefaultSelected))
              .then(() => {})
              .catch(() => {});
          })
          .catch(() => {});
      });
    }
  };

  return (
    <div className="menu-bar">
      {showStatus ? (
        <ConnectedStatusIndicator
          onClick={() => history.push(CONNECTED_ACCOUNTS_ROUTE)}
        />
      ) : null}

      <SelectedAccount />

      <button
        className="fas fa-ellipsis-v menu-bar__account-options"
        data-testid="account-options-menu-button"
        ref={setAccountOptionsButtonElement}
        title={t('accountOptions')}
        onClick={() => {
          openAccountOptionsEvent();
          setAccountOptionsMenuOpen(true);
        }}
      />

      {accountOptionsMenuOpen && (
        <AccountOptionsMenu
          anchorElement={accountOptionsButtonElement}
          onClose={() => setAccountOptionsMenuOpen(false)}
        />
      )}
    </div>
  );
}
