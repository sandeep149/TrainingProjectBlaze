import './App.css';

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";

import LoginForm from "./hooks/loginForm";
import Navbar from "./hooks/navbar";
import RegisterForm from './hooks/registerForm'
import ProductComponent from "./hooks/prodeuctcomponent";
import Home from "./components/home";

function App() {

  const [str, setstr] = useState("");

  const [authStatus, setauthStatus] = useState({
    islogin: false,
    isAdmin: false
  })

  function sendStatus(status) {
    setauthStatus(status);
    //console.log(status);
  }

  function searchProduct(str) {
    setstr(str);
  }

  function logout() {
    setauthStatus({
      islogin: false,
      isAdmin: false
    })
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar searchProduct={searchProduct} authStatus={authStatus} logout={logout} />
        <Switch >
          <Route exact path="/">
            <Home searchStr={str} />
          </Route>
          <Route path="/register">
            <RegisterForm />
          </Route>
          <Route path="/login">
            <LoginForm sendStatus={sendStatus} />
          </Route>
          <Route path="/addproduct">
            <ProductComponent />
          </Route>
          <Route path="/logout">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
