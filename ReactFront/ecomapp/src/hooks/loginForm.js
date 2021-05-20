import React, { useState } from "react";
import Auth from "../services/auth/Auth";
import { Link, useHistory } from "react-router-dom";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import getToken from "./../hooks/utils";
import "./loginform.css";


const authobj = new Auth();
const LoginForm = (props) => {

    const history = useHistory();

    let gettoken = getToken();


    if (gettoken) {
        if (gettoken.islogin)
            history.replace("/addproduct");
    }
    const [userlogin, setlogin] = useState({
        username: "",
        password: "",
    });


    const [errors, setErrors] = useState({
        username: "",
        password: "",
    });
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setlogin({ ...userlogin, [name]: value });
        // console.log(userlogin)
        // console.log(errors)
    };
    const onLogin = async () => {
        if (validateLogin()) {
            let response = await authobj.login({ email: userlogin.username, password: userlogin.password });

            // console.log(response);

            if (response.success) {
                localStorage.setItem("userdata", JSON.stringify({
                    data: response.data,
                    token: response.token,
                    islogin: true
                }));
                props.sendStatus({
                    islogin: true,
                    isAdmin: response.data.isAdmin
                })
                if (response.data.isAdmin) {

                    history.replace("/addproduct");
                }
                else {
                    history.replace("/")
                }


            } else {
                alert(response.statusMessage)

            }

        }
    };
    const validateLogin = () => {
        if (!userlogin.username) {
            setErrors({ ...errors, username: "username field is required" });
            return false;
        }
        if (!userlogin.password) {
            setErrors({ ...errors, password: "password field is required" });
            return false;
        }
        if (userlogin.password && userlogin.username) {
            setErrors({ password: "", username: "" })
        }
        return true;
    };
    return (
        <div>
            <div id="login">
                <h3 className="text-center text-white pt-5">Login form</h3>
                <div className="container">
                    <div id="login-row" className="row justify-content-center align-items-center">
                        <div id="login-column" className="col-md-6">
                            <div id="login-box" className="col-md-12">
                                <form id="login-form" className="form">
                                    <h3 className="text-center text-info">Login</h3>
                                    <div className="form-group">
                                        <label htmlFor="username" className="text-info">Username:</label><br />
                                        <input
                                            id="username"
                                            name="username"
                                            onChange={handleInput}
                                            value={userlogin.username}
                                            className="form-control"
                                            type="Text"
                                        ></input>
                                        <br />
                                        <div className="alet alert-danger" hidden={userlogin.username}>
                                            {errors.username}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="text-info">Password:</label><br />
                                        <input
                                            id="password"
                                            name="password"
                                            onChange={handleInput}
                                            value={userlogin.password}
                                            type="password"
                                            className="form-control"
                                        ></input>
                                        <div className="alet alert-danger" hidden={userlogin.password}>
                                            {errors.password}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button
                                            id="login"
                                            type="button"
                                            className="btn btn-info btn-md"
                                            onClick={onLogin}
                                            value="login">Login</button>
                                    </div>
                                    <div id="register-link" className="text-right">
                                        <Link to="/register" className="text-info"> Register here</Link>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >



        </div >
    );
};
export default LoginForm;





{/* <div className="container" className="text-center">
                <div className="form-group">
                    <label>username:</label>
                    <input
                        id="username"
                        name="username"
                        onChange={handleInput}
                        value={userlogin.username}
                        type="Text"
                    ></input>
                    <br />
                    <div className="alet alert-danger" hidden={userlogin.username}>
                        {errors.username}
                    </div>

                </div>
                <div className="form-group">
                    <div className="form-element">
                        <label>password:</label>
                        <input
                            id="password"
                            name="password"
                            onChange={handleInput}
                            value={userlogin.password}
                            type="password"
                            className="form-control"
                        ></input>
                        <br />
                        <div className="alet alert-danger" hidden={userlogin.password}>
                            {errors.password}
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        id="login"
                        type="submit"
                        className="btn btn-primary"
                        onClick={onLogin}
                        value="login">Login</button>
                </div>

                <div>
                    <h3>Not Have SignUp yet !!! </h3>
                </div>

                <div>
                    <Link to="/register"
                        className="btn btn-primary" >
                        click here for signup</Link>
                </div>
            </div> */}
