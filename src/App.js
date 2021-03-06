import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Index from './Index/Home';
import ThuNghiem from './Pages/Editor/ThuNghiem';
import Login from './Pages/User/Login';
import Register from './Pages/User/Register';
import ResetPassword from './Pages/User/ResetPassword';
import history from '../src/utils/history'
import { ProtectedRoute } from './auth/protectedRoute' // This one for middleware
import { ProtectedAdminRoute } from './auth/protectedAdminRoute' // This one for admin middleware
import Storage from './Index/Storage/Storage';
import History from './Index/UserHistory/UserHistory';
import Admin from './layouts/DashboardLayout';
import NotFound from './Pages/NotFound'


function App() {
  return (
    <Router history={history}>
    <div className="App">
    <Switch>
      <ProtectedRoute path="/editor" exact component={ThuNghiem}></ProtectedRoute>
      <Route path="/login" exact component={Login}></Route>
      <Route path="/register" exact component={Register}></Route>
      <Route path="/reset" exact component={ResetPassword}></Route>
      <ProtectedRoute path="/me" exact component ={Storage}></ProtectedRoute>
      <ProtectedRoute path="/history" exact component ={History}></ProtectedRoute>
      <Route path="/admin/login" exact component={()=><Login loginAsAdmin={true}/>}></Route>
      <ProtectedAdminRoute path="/admin" component={Admin}></ProtectedAdminRoute>
      <Route path="/" exact component ={Index}/>
      <Route path="*" component ={NotFound}/>
    </Switch>
    </div>
    </Router>

  );
}
export default App;
