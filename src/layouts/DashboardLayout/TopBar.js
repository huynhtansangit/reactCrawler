import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar
} from 'ver-4-11';
import {makeStyles} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import auth from '../../auth/auth'
// import Logo from 'src/components/Logo';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  history,
  ...rest
}) => {
  const classes = useStyles();
  // const [notifications] = useState([]);

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}>
      <Toolbar>
        <RouterLink to="/">
          {/* <Logo /> */}
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          {/* <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <IconButton color="inherit">
            <InputIcon onClick={()=>{auth.logout(()=>history.push('/admin/login'))}}/>
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
