import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Editor from './Pages/Editor/Editor';
import Index from './Index/Home';
import ThuNghiem from './Pages/Editor/ThuNghiem';

function App() {
  return (
    <Router>
    <div className="App">
    <Switch>
      <Route path="/Editor" exact component ={Editor}/>
      <Route path="/Testing" exact component={ThuNghiem}></Route>
      <Route path="/" component ={Index}/>
    </Switch>
    </div>
    </Router>

  );
}
export default App;
