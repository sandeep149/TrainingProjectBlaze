import { data } from "jquery";
import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Auth from "../services/auth/Auth";


const authobj = new Auth();

const RegisterForm = () => {

    const history = useHistory();

    const [userRegister, setuserRegister] = useState({
        // userid: "",
        name: "",
        email: "",
        phone: "",
        password: ""
    });


    const [errors, setErrors] = useState({
        // userid: "",
        name: "",
        email: "",
        phone: "",
        password: ""
    });
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        console.log(name, value);

        setuserRegister({ ...userRegister, [name]: value });
    };
    const handelSubmit = async () => {
        if (validate()) {

            let response = await authobj.register({
                // userId: userRegister.userid,
                userName: userRegister.name,
                password: userRegister.password,
                email: userRegister.email,
                phone: userRegister.phone,
            }).then(data => {
                //console.log(data.data);
                if (data.data.success) {

                    history.replace("/login")

                } else {

                    alert(data.data.statusMessage)
                }
                console.log("Sign Up Successfully")
            }).catch(error => {

                alert("something went wrong");
            });

        }
    };
    const validate = () => {
        // if (!userRegister.userid) {
        //     setErrors({...errors, 'userid': "user id field is required" })
        //     return false;
        // }
        if (!userRegister.name) {
            setErrors({ ...errors, 'name': "name field is required" })
            return false;
        }
        if (!userRegister.email) {
            setErrors({ ...errors, 'email': "email field is required" })
            return false;
        }
        if (!userRegister.phone) {
            setErrors({ ...errors, 'phone': "phone field is required" })
            alert("ef");


            return false;
        }
        if (userRegister.phone && userRegister.phone.length < 10) {
            // alert("sdfs");
            setErrors({ ...errors, 'phone': "phone no. should be 10 digit" })
            // errors["phone"] = "phone no. should be 10 digit"
            return false;
        }
        if (userRegister.phone && Number.isNaN(Number(userRegister.phone))) {
            // alert("234235");
            setErrors({ ...errors, 'phone': "please enter valid number" })
            // errors["phone"] = "please enter valid number"
            return false;
        }
        if (!userRegister.password) {
            setErrors({ ...errors, 'password': "password field is required" })
            return false;
        }

        return true
    }
    return (
        <div id="login">
            <div className="conatiner" className="text-center">
                <div>
                    <h3 className="text-center text-white pt-5">Register here</h3>
                </div>
                <div className="container">
                    <div id="login-row" className="row justify-content-center align-items-center">
                        <div id="login-column" className="col-md-6">
                            <div id="login-box" className="col-md-12">
                                <form id="login-form" className="form">
                                    <div className="form-element">
                                        <label className="text-info">Name:</label>
                                        <br />
                                        <input
                                            id="name"
                                            name="name"
                                            value={userRegister.name}
                                            type="text"
                                            onChange={handleInput}
                                            className="form-control"
                                        ></input>
                                        <div className="alet alert-danger" hidden={userRegister.name}>
                                            {errors.name}
                                        </div>
                                    </div>
                                    <div className="form-element">
                                        <label className="text-info">Email:</label>
                                        <br />
                                        <input
                                            id="email"
                                            name="email"
                                            value={userRegister.email}
                                            type="text"
                                            onChange={handleInput}
                                            className="form-control"
                                        ></input>
                                        <div className="alet alert-danger" hidden={userRegister.email}>
                                            {errors.email}
                                        </div>
                                    </div>
                                    <div className="form-element">
                                        <label className="text-info">Phone</label>
                                        <br />
                                        <input
                                            id="phone"
                                            name="phone"
                                            value={userRegister.phone}
                                            type="text"
                                            onChange={handleInput}
                                            className="form-control"
                                        ></input>
                                        <div className="alet alert-danger" >
                                            {errors.phone}
                                        </div>
                                    </div>

                                    <div className="form-element">
                                        <label className="text-info">Password</label>
                                        <br />
                                        <input
                                            id="password"
                                            name="password"
                                            value={userRegister.password}
                                            type="password"
                                            onChange={handleInput}
                                            className="form-control"
                                        ></input>
                                        <div className="alet alert-danger" hidden={userRegister.password}>
                                            {errors.password}

                                        </div>
                                    </div>

                                    <div>
                                        <button className="btn btn-info btn-md" type="button" onClick={handelSubmit}>Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        </div >

    );
};
export default RegisterForm;




{/* <div className="form-element">
                    <label>userid:</label>
                    <br />
                    <input
                        id="userid"
                        name="userid"
                        value={userRegister.userid}
                        type="text"
                        onChange={handleInput}
                    ></input>
                    <div className="alet alert-danger" hidden={userRegister.userid}>
                        {errors.userid}
                    </div> */}
{/* </div> */ }