import React, { useEffect, useState } from 'react';
import TableComponent from "./tablecomponent";
import axios from 'axios';
import GetProduct from "./../services/productServices/getProduct";
import { data } from 'jquery';
import getToken from "./../hooks/utils";
import { useHistory } from 'react-router';

const ProductComponent = () => {

    const history = useHistory();

    if (!getToken() || !getToken().data.isAdmin) {
        history.replace("/")
    }

    const pobj = new GetProduct(); // object of GetProduct class


    const [product, setproduct] = useState({
        productName: "",
        categoryId: 1,
        price: " ",
        productImg: "",
        productDescription: ""

    });
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        console.log(name, value);

        setproduct({ ...product, [name]: value });
    };

    const [isloading, setisloading] = useState(true);
    const [dataSource, setdataSource] = useState([]);
    // for image

    const [image, setImage] = useState({ preview: "", raw: "" });

    const handleChange = e => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    };

    const [edit, setedit] = useState(false);

    useEffect(() => {
        // axios.get('http://localhost:9001/api/product').then((result) => {
        getProduct();

    }, []);

    function getProduct() {

        pobj.FetchProduct(getToken()?.data?.usersId).then((result) => {

            setdataSource(result.data.rows);
            // console.log(result.data.rows);
            setisloading(false);
        })
    }

    function addproduct() {

        let fd = new FormData();
        // alert(getToken()?.data?.usersId);
        fd.append("productName", product.productName);
        fd.append("image", image.raw);
        fd.append("categoryId", product.categoryId);
        fd.append("price", product.price);
        fd.append("productDescription", product.productDescription);
        fd.append("vendorId", getToken()?.data?.usersId);

        pobj.AddpPoduct(fd).then(() => {
            getProduct();
        })
        // console.log(data);
    }
    function deleterow(id) {
        // alert(id);
        pobj.DeleteProduct(id).then((resp) => {
            console.log(resp.data);
            getProduct();
        });

    }

    function editrow(data) {
        // alert(JSON.stringify(data));
        setproduct({
            productId: data.productId,
            productName: data.productName,
            categoryId: data.categoryId,
            price: data.price,
            // image
            productDescription: data.productDescription
        })
        setedit(true);
    }

    function update() {
        let id = product.productId;
        // alert(id);
        // console.log(product);

        delete product["productId"];

        pobj.UpdatePoduct(id, product).then((resp) => {
            // console.log(resp.data);
            getProduct();
            setedit(false);

            setproduct({
                productName: "",
                categoryId: 1,
                price: "",
                productImg: "",
                productDescription: ""
            })
        });
    }
    return (
        <div>
            <div className="container"> <h3> Add Product </h3> </div>
            <div className="container">
                <div className="form-group">
                    <label>productName</label>
                    <input
                        type="text"
                        name="productName"
                        value={product.productName}
                        onChange={handleInput}
                        className="form-control" />
                </div>
                <div className="form-group">
                    <label>categoryId</label>
                    {/* {product && */}
                    <select className="form-control" onChange={handleInput} name="categoryId">
                        <option value="1" selected={product.categoryId == "1" ? "selected" : ""}>Electronic</option>
                        <option value="2" selected={product.categoryId == "2" ? "selected" : ""}>Clothes</option>
                        <option value="3" selected={product.categoryId == "3" ? "selected" : ""}>Mobiles</option>
                        <option value="4" selected={product.categoryId == "4" ? "selected" : ""}>Jewellery</option>
                    </select>
                    {/* } */}

                </div>
                <div className="form-group">
                    <label>price</label>
                    <input
                        type="text"
                        name="price"
                        value={product.price}
                        onChange={handleInput}
                        className="form-control" />
                </div>
                {/* <div className="form-group">
                    <label>productImg</label>
                    <input
                        type="text"
                        name="productImg"
                        value={product.productImg}
                        onChange={handleInput}
                        className="form-control" />
                </div> */}
                <div className="form-group">
                    <label>productDescription</label>
                    <input
                        type="text"
                        name="productDescription"
                        value={product.productDescription}
                        onChange={handleInput}
                        className="form-control" />
                </div>

                <div>
                    <label htmlFor="upload-button">
                        {image.preview ? (
                            <img src={image.preview} alt="dummy" width="300" height="300" />
                        ) : (
                            <>
                                <span className="fa-stack fa-2x mt-3 mb-2">
                                    <i className="fas fa-circle fa-stack-2x" />
                                    <i className="fas fa-store fa-stack-1x fa-inverse" />
                                </span>
                                <h5 className="text-center">Upload your photo</h5>
                            </>
                        )}
                    </label>
                    <input
                        type="file"
                        id="upload-button"
                        onChange={handleChange} />
                </div>



                <div className="form-group">
                    <input type="button" value="Clear" className="btn btn-primary"
                        onClick="" />
                    {!edit && <input type="button" value="Save" className="btn btn-success"
                        onClick={addproduct} />}

                    {edit && <input type="button" onClick={update} value="update" className="btn btn-success"
                    />}

                </div>
            </div>
            {!isloading && <TableComponent dataSource={dataSource} deleterow={deleterow} editrow={editrow} />}
        </div>
    )


}



export default ProductComponent;