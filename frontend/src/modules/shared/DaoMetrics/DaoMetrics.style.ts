import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule, hexToRGBA } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({

  root: {},

  metric: rule({
    padding: `0 ${theme.spacing.unit * 2.5}px 0 ${theme.spacing.unit * 0.75}px `,
    borderLeft: `solid ${hexToRGBA(theme.colors.white, 0.2)} 1px`,

    '&:first-child': {
      paddingLeft: 0,
      borderLeft: 'none',
    },
  }),

  title: rule({
    lineHeight: '1rem',
    color: theme.colors.moonRaker,
  }),

  value: rule({
    marginRight: theme.spacing.unit,
    lineHeight: '1.75rem',
    color: theme.colors.white,
  }),

  actions: rule({
    marginLeft: 'auto',
  }),

});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
