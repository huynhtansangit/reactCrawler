import React, { useState } from 'react';
// import { Outlet } from '../../../node_modules/react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import ListUser from '../../Pages/Admin/ListUser/ListUser';
import TopBar from './TopBar';
import {Route} from 'react-router-dom';
import Chart from '../../Pages/Admin/Chart/Chart'
import ActivityHistory from '../../Pages/Admin/ActivityHistory/ActivityHistory'
import { ThemeProvider } from '@material-ui/core';
import theme from '../../theme/index';
import GlobalStyles from '../../components/GlobalStyles'


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const DashboardLayout = (props) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className={classes.root}>
      <TopBar history={props.history} onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <ThemeProvider theme={theme}>
              <GlobalStyles />
              <Route exact path={`${props.match.path}/users`} component={ListUser} />
              <Route exact path={`${props.match.path}/activity-history`} component={ActivityHistory} />
              <Route exact path={`${props.match.path}/chart`} component={Chart} />
            </ThemeProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
