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
import Reset_Password from './Pages/User/Reset_Password';
import history from '../src/utils/history'
import { ProtectedRoute } from './auth/protectedRoute' // This one for middleware
import Storage from './Index/Storage/Storage';

function App() {
  return (
    <Router history={history}>
    <div className="App">
    <Switch>
      <ProtectedRoute path="/Testing" exact component={ThuNghiem}></ProtectedRoute>
      <Route path="/Login" exact component={Login}></Route>
      <Route path="/Register" exact component={Register}></Route>
      <Route path="/reset" exact component={Reset_Password}></Route>
      <Route path="/personal" exact component ={Storage}></Route>
      <Route path="/" component ={Index}/>
    </Switch>
    </div>
    </Router>

  );
}
export default App;
