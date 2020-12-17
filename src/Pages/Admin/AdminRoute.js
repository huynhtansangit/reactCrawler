import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import ListUser from '../Admin/ListUser/ListUser'
import Chart from '../Admin/Chart/Chart'
import SearchHistory from '../Admin/SearchHistory/SearchHistory'
import { ThemeProvider } from '@material-ui/core';
import theme from '../../theme/index';
import GlobalStyles from '../../components/GlobalStyles'


class AdminRoute extends Component {
    render() {
        return <div>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <Route exact path={`${this.props.match.path}/users`} component={ListUser} />
                <Route exact path={`${this.props.match.path}/search-history`} component={SearchHistory} />
                <Route exact path={`${this.props.match.path}/chart`} component={Chart} />
            </ThemeProvider>
            
        </div>
    }
}

export default AdminRoute;