import React, { useEffect, useState } from 'react'
import axios from 'axios'
import getToken from '../../hooks/utils';

class GetProduct {

    async FetchProduct(vendorId) {
        const getpd = axios.post('http://localhost:9001/api/productByVendorId', { vendorId });
        // console.log(getpd.data);
        return getpd;

    }

    AddpPoduct(data) {

        const result = axios.post('http://localhost:9001/api/product', data, {
            headers: {
                "x-acess-token": getToken().token
            }
        });
        //  console.log(result.data, "sandeep");
        return result;
    }

    DeleteProduct(id) {
        const result = axios.delete('http://localhost:9001/api/product/' + id, {
            headers: {
                "x-acess-token": getToken().token
            }
        });
        // console.log("sandeep");
        return result;

    }
    UpdatePoduct(id, data) {

        const result = axios.put('http://localhost:9001/api/product/' + id, data, {
            headers: {
                "x-acess-token": getToken().token
            }
        });
        //  console.log(result.data, "sandeep");
        return result;
    }

}
export default GetProduct;
