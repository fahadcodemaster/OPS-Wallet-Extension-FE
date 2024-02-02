import { P2P_URL } from '../../URL/URL';
import http from '../http';
const httpUrl = P2P_URL;

export default class GetAllCurrency {
  static GetAllCurrencyApi(body) {
    return http.get(httpUrl + '/api/v1/BlockChain/GetAllCurrency', body);
  }
}
