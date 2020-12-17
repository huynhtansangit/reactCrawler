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
import Storage from './Index/Storage/Storage';
import Admin from './layouts/DashboardLayout'


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
      <ProtectedRoute path="/admin" component={Admin}></ProtectedRoute>
      <Route path="/" component ={Index}/>
    </Switch>
    </div>
    </Router>

  );
}
export default App;
