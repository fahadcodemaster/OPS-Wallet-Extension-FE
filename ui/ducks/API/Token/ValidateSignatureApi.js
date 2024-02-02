import { P2P_URL } from '../../URL/URL';
import http from '../http';
const httpUrl = P2P_URL;

export default class ValidateSignature {
  static ValidateSignatureApi(body) {
    return http.post(httpUrl + '/api/v1/auth/validateSignature', body);
  }
}
