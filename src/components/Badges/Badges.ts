import { styled } from '@mui/material/styles';

export const OnlineBadge = styled('span')(({ theme }) => ({
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: '#03fc5e',
    display: 'inline-block',
    marginLeft: 5,
    position: 'relative',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));