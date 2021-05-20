import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import axios from 'axios';
function Home(props) {

    // console.log(props.searchStr);
    const [isloading, setisloading] = useState(true);

    const [product, setproduct] = useState([]);

    /*   if (props.searchStr != "") {
          getProduct(props.searchStr);
      }
   */
    function getProduct(params) {
        axios.get('http://localhost:9001/api/product/' + params).then((result) => {

            setisloading(false);
            setproduct(result.data.rows);
            //console.log(result.data.rows);
        })
    }
    // if (props.searchStr) {
    //     alert("");
    // }
    useEffect(() => {
        getProduct(props.searchStr);

    }, [props.searchStr])

    if (isloading) {
        return <div>
            is loading...
        </div>
    }
    else {
        return (
            <div>
                <div className="row">
                    {product.map((p) => {
                        return <div className="col-sm-4 col-md-3">
                            <div classnam="card">
                                <img src={p.productImg.match(/https/) ? p.productImg : "http://localhost:9001/" + p.productImg} style={{ height: "180px" }} className="card-img-top img-fluid" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{p.productName}</h5>
                                    <p className="card-text">RS.{p.price}</p>
                                    <a href="#" className="btn btn-primary">Add To Cart</a>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        );
    }
}
export default Home;