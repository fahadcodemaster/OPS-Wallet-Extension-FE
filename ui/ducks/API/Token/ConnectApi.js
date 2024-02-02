import { P2P_URL } from '../../URL/URL';
import http from '../http';
const httpUrl = P2P_URL;

export default class Connect {
  static ConnectApi(body) {
    return http.post(httpUrl + '/api/v1/auth/connect', body);
  }
}
