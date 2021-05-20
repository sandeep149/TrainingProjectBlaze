import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import getToken from "./../hooks/utils";


function Navbar(props) {


    const [search, setSearch] = useState("");

    let history = useHistory();

    const onlogout = () => {
        localStorage.removeItem('userdata');

        props.logout();

        history.replace('/Login');
    }

    // if (props?.authStatus?.islogin) {
    //     alert("");
    // }
    function searchProduct() {
        props.searchProduct(search);
    }
    //  console.log(props?.authStatus?.islogin);
    // const [islogin, setIslogin] = useState(getToken().islogin)


    let gt = getToken();
    if (gt) {
        props["authStatus"]["isAdmin"] = gt.data.isAdmin;
        props["authStatus"]["islogin"] = gt.islogin;
        // console.log(props);
        // alert(props);
    }
    else
        props["authStatus"]["islogin"] = false;

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>

                        {props?.authStatus?.isAdmin ? <li className="nav-item active">
                            <Link className="nav-link" to="/addproduct">Addproduct</Link>
                        </li> : ""}

                        {props?.authStatus?.islogin ? <li className="nav-item active">
                            <a className="nav-link" onClick={onlogout}>logout</a>
                        </li>
                            :
                            <li className="nav-item active">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>}


                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input value={search} className="form-control mr-sm-2" type="text" onChange={e => setSearch(e.target.value)} placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={searchProduct}>Search</button>
                    </form>
                </div>
            </nav >

        </div >
    )
}


export default Navbar;