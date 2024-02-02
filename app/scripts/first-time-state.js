/**
 * @typedef {Object} FirstTimeState
 * @property {Object} config Initial configuration parameters
 * @property {Object} NetworkController Network controller state
 */

import {
  AVALANCHE_CHAIN_ID,
  AVALANCHE_TEST_CHAIN_ID,
  NETWORK_TYPE_RPC,
} from '../../shared/constants/network';

/**
 * @type {FirstTimeState}
 */
const initialState = {
  config: {},
  PreferencesController: {
    frequentRpcListDetail: [
      // {
      //   rpcUrl: 'http://localhost:8545',
      //   chainId: '0x539',
      //   ticker: 'ETH',
      //   nickname: 'Localhost 8545',
      //   rpcPrefs: {},
      // },
      {
        rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
        chainId: AVALANCHE_CHAIN_ID,
        ticker: 'AVAX',
        type: NETWORK_TYPE_RPC, // for testing
        nickname: 'Avalaunch Main',
        rpcPrefs: {
          blockExplorerUrl: 'https://snowtrace.io/',
        },
      },
      {
        rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
        chainId: AVALANCHE_TEST_CHAIN_ID,
        ticker: 'AVAX',
        type: NETWORK_TYPE_RPC, // for testing
        nickname: 'Avalaunch Test',
        rpcPrefs: {
          blockExplorerUrl: 'https://testnet.snowtrace.io/',
        },
      },
    ],
  },
};

export default initialState;
