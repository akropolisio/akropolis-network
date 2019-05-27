import * as React from 'react';
import * as moment from 'moment';
import * as R from 'ramda';

import { Typography } from 'shared/view/elements';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { StylesProps, provideStyles } from './PersonalInformation.style';
import AccessCard from './AccessCard/AccessCard';

const tKeys = tKeysAll.features.cooperativeOverview;

const tKeysShared = tKeysAll.shared;

const FIRST_SEPTEMBER = moment('2019-9-1');

const TOTAL_WAITING_DAYS_COUNT = 92;

const getDayLeft = () => {
  const diffWithSeptember = FIRST_SEPTEMBER.diff(moment(), 'days', true);

  return R.clamp(0, TOTAL_WAITING_DAYS_COUNT, Math.ceil(diffWithSeptember));
};

type IProps = StylesProps;

const PersonalInformation = (props: IProps) => {
  const { classes } = props;
  const { t } = useTranslate();

  const dayLeft = getDayLeft();
  const dayPassed = TOTAL_WAITING_DAYS_COUNT - dayLeft;

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" weight="medium" className={classes.title}>
        {t(tKeys.personalInformation.getKey())}
      </Typography>
      <div className={classes.metricRow}>
        <Typography component="div" variant="overline" className={classes.subTitle}>
          {t(tKeys.deposit.getKey())}
        </Typography>
        <Typography component="div" variant="h6">
          {'$192.22'}
        </Typography>
      </div>
      <div className={classes.metricRow}>

        <Typography component="div" variant="overline" className={classes.subTitle}>
          {t(tKeys.earn.getKey())}
        </Typography>
        <Typography component="div" variant="h6">
          {'$16.49'}
        </Typography>
      </div>
      <div className={classes.accessCards}>
        <AccessCard
          total={TOTAL_WAITING_DAYS_COUNT}
          current={dayPassed}
          description={t(tKeys.accessToLoan.getKey(), { date: '3 months' })}
          timeLeft={t(tKeysShared.daysAmount.getKey(), dayLeft)}
          hint={t(tKeys.accessToLoanHint.getKey())}
        />
        <AccessCard
          total={TOTAL_WAITING_DAYS_COUNT}
          current={dayPassed}
          description={t(tKeys.accessToInsurance.getKey(), { date: '3 months' })}
          timeLeft={t(tKeysShared.daysAmount.getKey(), dayLeft)}
          hint={t(tKeys.accessToInsuranceHint.getKey())}
        />
      </div>
    </div>
  );
};

export default React.memo(provideStyles(PersonalInformation));