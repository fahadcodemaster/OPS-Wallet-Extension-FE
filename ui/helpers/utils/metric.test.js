import { getMethodName } from './metrics';

describe('getMethodName', () => {
  it('should get correct method names', () => {
    expect(getMethodName(undefined)).toStrictEqual('');
    expect(getMethodName({})).toStrictEqual('');
    expect(getMethodName('confirm')).toStrictEqual('confirm');
    expect(getMethodName('balanceOf')).toStrictEqual('balance Of');
    expect(getMethodName('ethToTokenSwapInput')).toStrictEqual(
      'eth To Token Swap Input',
    );
  });
});
