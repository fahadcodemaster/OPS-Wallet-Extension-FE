import { connect } from 'react-redux';

import {
  setPendingTokens,
  clearPendingTokens,
  getTokenStandardAndDetails,
} from '../../store/actions';
import { getMostRecentOverviewPage } from '../../ducks/history/history';
import {
  getRpcPrefsForCurrentProvider,
  getIsMainnet,
} from '../../selectors/selectors';
import ImportToken from './import-token.component';

const mapStateToProps = (state) => {
  const {
    metamask: {
      identities,
      tokens,
      pendingTokens,
      provider: { chainId },
      useTokenDetection,
      tokenList,
      selectedAddress,
    },
  } = state;
  const showSearchTabCustomNetwork =
    useTokenDetection && Boolean(Object.keys(tokenList).length);
  const showSearchTab =
    getIsMainnet(state) || showSearchTabCustomNetwork || process.env.IN_TEST;
  return {
    identities,
    mostRecentOverviewPage: getMostRecentOverviewPage(state),
    tokens,
    pendingTokens,
    showSearchTab,
    chainId,
    rpcPrefs: getRpcPrefsForCurrentProvider(state),
    tokenList,
    useTokenDetection,
    selectedAddress,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setPendingTokens: (tokens) => dispatch(setPendingTokens(tokens)),
    clearPendingTokens: () => dispatch(clearPendingTokens()),
    getTokenStandardAndDetails: (address, selectedAddress) =>
      getTokenStandardAndDetails(address, selectedAddress, null),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportToken);
