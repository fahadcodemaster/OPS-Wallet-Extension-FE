import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import DropdownInputPair from '../dropdown-input-pair';
import DropdownSearchList from '../dropdown-search-list';

const tokens = [
  {
    primaryLabel: 'MetaMark (META)',
    name: 'MetaMark',
    iconUrl: '.storybook/images/metamark.svg',
    erc20: true,
    decimals: 18,
    symbol: 'META',
    address: '0x617b3f8050a0BD94b6b1da02B4384eE5B4DF13F4',
  },
  {
    primaryLabel: '0x (ZRX)',
    name: '0x',
    iconUrl: '.storybook/images/0x.svg',
    erc20: true,
    symbol: 'ZRX',
    decimals: 18,
    address: '0xE41d2489571d322189246DaFA5ebDe1F4699F498',
  },
  {
    primaryLabel: 'AirSwap Token (AST)',
    name: 'AirSwap Token',
    iconUrl: '.storybook/images/AST.png',
    erc20: true,
    symbol: 'AST',
    decimals: 4,
    address: '0x27054b13b1B798B345b591a4d22e6562d47eA75a',
  },
  {
    primaryLabel: 'Basic Attention Token (BAT)',
    name: 'Basic Attention Token',
    iconUrl: '.storybook/images/BAT_icon.svg',
    erc20: true,
    symbol: 'BAT',
    decimals: 18,
    address: '0x0D8775F648430679A709E98d2b0Cb6250d2887EF',
  },
  {
    primaryLabel: 'Civil Token (CVL)',
    name: 'Civil Token',
    iconUrl: '.storybook/images/CVL_token.svg',
    erc20: true,
    symbol: 'CVL',
    decimals: 18,
    address: '0x01FA555c97D7958Fa6f771f3BbD5CCD508f81e22',
  },
  {
    primaryLabel: 'Gladius (GLA)',
    name: 'Gladius',
    iconUrl: '.storybook/images/gladius.svg',
    erc20: true,
    symbol: 'GLA',
    decimals: 8,
    address: '0x71D01dB8d6a2fBEa7f8d434599C237980C234e4C',
  },
  {
    primaryLabel: 'Gnosis Token (GNO)',
    name: 'Gnosis Token',
    iconUrl: '.storybook/images/gnosis.svg',
    erc20: true,
    symbol: 'GNO',
    decimals: 18,
    address: '0x6810e776880C02933D47DB1b9fc05908e5386b96',
  },
  {
    primaryLabel: 'OmiseGO (OMG)',
    name: 'OmiseGO',
    iconUrl: '.storybook/images/omg.jpg',
    erc20: true,
    symbol: 'OMG',
    decimals: 18,
    address: '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07',
  },
  {
    primaryLabel: 'Sai Stablecoin v1.0 (SAI)',
    name: 'Sai Stablecoin v1.0',
    iconUrl: '.storybook/images/sai.svg',
    erc20: true,
    symbol: 'SAI',
    decimals: 18,
    address: '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359',
  },
  {
    primaryLabel: 'Tether USD (USDT)',
    name: 'Tether USD',
    iconUrl: '.storybook/images/tether_usd.png',
    erc20: true,
    symbol: 'USDT',
    decimals: 6,
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  },
  {
    primaryLabel: 'WednesdayCoin (WED)',
    name: 'WednesdayCoin',
    iconUrl: '.storybook/images/wed.png',
    erc20: true,
    symbol: 'WED',
    decimals: 18,
    address: '0x7848ae8F19671Dc05966dafBeFbBbb0308BDfAbD',
  },
  {
    primaryLabel: 'Wrapped BTC (WBTC)',
    name: 'Wrapped BTC',
    iconUrl: '.storybook/images/wbtc.png',
    erc20: true,
    symbol: 'WBTC',
    decimals: 8,
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  },
];

const tokensToSearch = tokens.map((token) => ({
  ...token,
  primaryLabel: token.symbol,
  secondaryLabel: token.name,
  rightPrimaryLabel: `${(Math.random() * 100).toFixed(
    Math.floor(Math.random() * 6),
  )} ${token.symbol}`,
  rightSecondaryLabel: `$${(Math.random() * 1000).toFixed(2)}`,
}));

export default {
  title: 'Pages/Swaps/BuildQuote',
  id: __filename,
};

export const DefaultStory = () => {
  const [inputValue, onInputChange] = useState(null);
  const [selectedFromToken, setSelectedFromToken] = useState(null);
  const formattedSwapFromFiatValue = `$${(Number(inputValue) * 4).toFixed(2)}`;
  const loading = boolean('loading', false);
  const selectedFromTokenIsNull = boolean('selectedFromTokenIsNull', false);
  return (
    <div
      style={{
        height: '415px',
        width: '357px',
        border: '1px solid grey',
        paddingLeft: '24px',
        paddingRight: '24px',
        overflow: 'hidden',
      }}
    >
      <div className="build-quote">
        <div className="build-quote__dropdown-input-pair-header">
          <div className="build-quote__input-label">Swap from</div>
          <div
            className="build-quote__max-button"
            onClick={action('clickedMax')}
          >
            Max
          </div>
        </div>
        <DropdownInputPair
          itemsToSearch={tokensToSearch}
          onInputChange={onInputChange}
          inputValue={inputValue}
          leftValue={formattedSwapFromFiatValue}
          onSelect={setSelectedFromToken}
          selectedItem={selectedFromTokenIsNull ? null : selectedFromToken}
          maxListItems={30}
          loading={loading}
          hideItemIf={(tokenListItem) => tokenListItem.decimals !== 18}
          selectPlaceHolderText="Select"
        />
        <div className="build-quote__swap-arrows-row">
          <div className="build-quote__swap-arrows" />
        </div>
        <div className="build-quote__dropdown-swap-to-header">
          <div className="build-quote__input-label">Swap to</div>
        </div>
        <DropdownSearchList
          itemsToSearch={tokensToSearch}
          listContainerClassName="build-quote__open-to-dropdown"
          searchPlaceholderText="Search for a token"
          fuseSearchKeys={[
            { name: 'name', weight: 0.499 },
            { name: 'symbol', weight: 0.499 },
            { name: 'address', weight: 0.002 },
          ]}
          maxListItems={30}
          onSelect={action('onToSelect')}
          selectPlaceHolderText="Select a token"
          loading={loading}
          hideRightLabels
          defaultToAll
        />
      </div>
    </div>
  );
};

DefaultStory.storyName = 'Default';
