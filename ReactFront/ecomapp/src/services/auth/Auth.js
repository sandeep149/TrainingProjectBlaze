import React, { useEffect, useState } from 'react'
import axios from 'axios'

class Auth {
    login = async (data) => {
        const result = await axios.post('http://localhost:9001/api/login', data)
        // console.log(result);
        return result.data;
    }

    register = (data) => {
        // 
        const result = axios.post('http://localhost:9001/api/users', data)
        // alert("sdfjb");
        // console.log(result);
        return result;
    }
}
export default Auth;

