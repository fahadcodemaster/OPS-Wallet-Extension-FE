import Connect from './Token/ConnectApi';
import ValidateSignature from './Token/ValidateSignatureApi';
import MoveBalance from './UserWalletApi/MoveBalanceApi';
import GetAllCurrency from './BlockChain/GetAllCurrencyApi';

const API = {
  Connect,
  ValidateSignature,
  MoveBalance,
  GetAllCurrency,
};
export default API;
