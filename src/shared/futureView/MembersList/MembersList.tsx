import * as React from 'react';
import { Table, TableBody, TableRow, TableCell, TableHead, Typography, Grid, Avatar } from 'shared/view/elements';
import { IMember } from 'shared/types/models/Member';
import getIdenticonSrc from 'shared/helpers/getIdenticonSrc';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { StylesProps, provideStyles } from './MembersList.style';

const tKeys = tKeysAll.features.members;
const tKeysShared = tKeysAll.shared;

interface IOwnProps {
  members: IMember[];
  userAccountAddress: string;
}

type IProps = StylesProps & IOwnProps;

export default React.memo(provideStyles((props: IProps) => {
  const { classes, members, userAccountAddress } = props;
  const { t } = useTranslate();

  const headerCells = [
    '#',
    t(tKeys.address.getKey()),
    t(tKeys.balance.getKey()),
    t(tKeys.debit.getKey()),
    t(tKeys.credit.getKey()),
  ];

  const cellsAlign: Array<'left' | 'center' | 'right'> = ['center', 'left', 'right', 'right', 'right'];

  const userMember = members.find(item => item.address === userAccountAddress);
  const rows = userMember ? [userMember, ...members.filter(item => item.address !== userAccountAddress)] : members;

  return (
    <Table separated>
      <TableHead>
        <TableRow className={classes.header}>
          {headerCells.map((title, i) => (
            <TableCell key={i} align={cellsAlign[i]} className={classes.headerCell}>
              <Typography variant="subtitle1" className={classes.headerTitle}>{title}</Typography>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          const indexOrYou = userMember && i === 0 ? (
            <Typography variant="caption" weight="medium" className={classes.userTag}>
              {t(tKeysShared.you.getKey())}
            </Typography>) : i + 1;

          // tslint:disable:jsx-key
          const cells = [
            <Typography variant="body1" className={classes.memberNumber}>
              {indexOrYou}
            </Typography>,
            <Grid container wrap="nowrap" alignItems="center">
              <Avatar src={getIdenticonSrc(row.address)} className={classes.avatar} />
              <Typography variant="body2">{row.address}</Typography>
            </Grid>,
            <Typography variant="body2">{`${row.balance} DAI`}</Typography>,
            <Typography variant="body2">{`${row.debit} DAI`}</Typography>,
            <Typography variant="body2">{`${row.credit} DAI`}</Typography>,
          ];
          // tslint:enable:jsx-key

          return (
            <TableRow key={i} className={classes.row}>
              {
                cells.map((cell, k) =>
                  <TableCell
                    key={k}
                    className={classes.cell}
                    align={cellsAlign[k]}
                  >
                    {cell}
                  </TableCell>)}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}));
