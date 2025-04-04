import { Link, useParams } from "react-router-dom";
import "./index.scss";
import { useEffect, useState } from "react";

const Detail = () => {
    const params = useParams();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_BACKEND_URL}/api/v2/product/${params.id}`
                );
                const resJson = await res.json();
                console.log(resJson);
                setProduct(resJson);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <>
            {loading ? (
                <div>
                    <p>Loading</p>
                </div>
            ) : (
                <div className="main">
                    <Link to="/" className="btn btn-primary">
                        Kembali
                    </Link>

                    <table className="table">
                        <tbody>
                            <tr>
                                <td>ID</td>
                                <td>: {product._id}</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>: {product.name}</td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>: Rp {product.price.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>Stock</td>
                                <td>: {product.stock}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default Detail;
