import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { useI18nContext } from '../../../hooks/useI18nContext';
import Box from '../../ui/box';
import { BLOCK_SIZES } from '../../../helpers/constants/design-system';

export const threeStepStages = {
  PASSWORD_CREATE: 1,
  RECOVERY_PHRASE_VIDEO: 2,
  RECOVERY_PHRASE_REVIEW: 3,
  RECOVERY_PHRASE_CONFIRM: 4,
  ONBOARDING_COMPLETE: 5,
};

export const twoStepStages = {
  RECOVERY_PHRASE_CONFIRM: 1,
  PASSWORD_CREATE: 2,
};

export function ThreeStepProgressBar({ stage }) {
  const t = useI18nContext();
  return (
    <Box>
      <ul className="progressbar">
        <li
          className={classnames({
            active: stage >= 1,
            complete: stage >= 1,
          })}
        >
          {t('createPassword')}
        </li>
        <li
          className={classnames({
            active: stage >= 2,
            complete: stage >= 3,
          })}
        >
          {t('secureWallet')}
        </li>
        <li
          className={classnames({
            active: stage >= 4,
            complete: stage >= 5,
          })}
        >
          {t('confirmRecoveryPhrase')}
        </li>
      </ul>
    </Box>
  );
}

export function TwoStepProgressBar({ stage }) {
  const t = useI18nContext();
  return (
    <Box margin={4} width={BLOCK_SIZES.FULL}>
      <ul className="progressbar two-steps">
        <li
          className={classnames({
            active: stage >= 1,
            complete: stage > 1,
          })}
        >
          {t('confirmRecoveryPhrase')}
        </li>
        <li
          className={classnames('two-steps', {
            active: stage >= 2,
            complete: stage > 2,
          })}
        >
          {t('createPassword')}
        </li>
      </ul>
    </Box>
  );
}

ThreeStepProgressBar.propTypes = {
  stage: PropTypes.number,
};

TwoStepProgressBar.propTypes = {
  stage: PropTypes.number,
};
