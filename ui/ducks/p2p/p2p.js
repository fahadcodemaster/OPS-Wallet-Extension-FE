import * as actionConstants from '../../store/actionConstants';
import API from '../API';
import http from '../API/http';

export default function reducep2p(state = {}, action) {
  const p2p = {
    connectP2P: {},
    validateSignatureP2P: {},
    moveBalance: {},
    getAllCurrency: {},
    ...state,
  };

  switch (action.type) {
    case actionConstants.CONNECT_P2P:
      return {
        ...p2p,
        connectP2P: action.value,
      };

    case actionConstants.VALIDATESIGNATURE_P2P:
      return {
        ...p2p,
        validateSignatureP2P: action.value,
      };

    case actionConstants.MOVE_BALANCE:
      return {
        ...p2p,
        moveBalance: action.value,
      };

    case actionConstants.GET_ALL_CURRENCY:
      return {
        ...p2p,
        getAllCurrency: action.value,
      };

    default:
      return p2p;
  }
}

export const ConnectAction = (body) => async (dispatch) => {
  try {
    const ConnectResponse = await API.Connect.ConnectApi(body);

    dispatch(ValidateSignatureAction(ConnectResponse.data));
    dispatch({
      type: actionConstants.CONNECT_P2P,
      value: ConnectResponse.data,
    });
  } catch (e) {
    dispatch({ type: actionConstants.CONNECT_P2P, value: {} });
  }
};

export const ValidateSignatureAction = (body) => async (dispatch) => {
  try {
    const ValidateSignaturePayload = {
      address: body.data[0].address,
      signature: body.data[0].message,
    };

    const ValidateSignatureResponse = await API.ValidateSignature.ValidateSignatureApi(
      ValidateSignaturePayload,
    );

    http.setAuthorizationHeader(ValidateSignatureResponse.data.data.token);

    dispatch({
      type: actionConstants.VALIDATESIGNATURE_P2P,
      value: ValidateSignatureResponse.data,
    });
  } catch (e) {
    dispatch({ type: actionConstants.VALIDATESIGNATURE_P2P, value: {} });
  }
};

export const MoveBalanceAction = (body) => async (dispatch) => {
  try {
    const MoveBalanceResponse = await API.MoveBalance.MoveBalanceApi(body);

    dispatch({
      type: actionConstants.MOVE_BALANCE,
      value: MoveBalanceResponse.data,
    });
  } catch (e) {
    dispatch({ type: actionConstants.MOVE_BALANCE, value: {} });
  }
};

export const GetAllCurrencyAction = (body) => async (dispatch) => {
  try {
    const GetAllCurrencyResponse = await API.GetAllCurrency.GetAllCurrencyApi(
      body,
    );

    dispatch({
      type: actionConstants.GET_ALL_CURRENCY,
      value: GetAllCurrencyResponse.data,
    });
  } catch (e) {
    dispatch({ type: actionConstants.GET_ALL_CURRENCY, value: {} });
  }
};
