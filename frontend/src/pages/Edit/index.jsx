import { useEffect, useState } from "react";
import Input from "../../components/Input";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
    const navigator = useNavigate();
    const params = useParams();
    const [product, setProduct] = useState({
        name: "",
        price: 0,
        stock: 0,
        status: false,
    });
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(product);
        (async () => {
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_BACKEND_URL}/api/v2/product/${params.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(product),
                    }
                );
                const resJson = await res.json();
                console.log(resJson);
                if (res.status == 200) {
                    window.sessionStorage.setItem(
                        "msg",
                        "Produk berhasil di edit"
                    );
                    navigator("/");
                }
            } catch (error) {
                console.log(error);
            }
        })();
    };
    return (
        <>
            {loading ? (
                <p>Loading</p>
            ) : (
                <div className="main">
                    <div className="card">
                        <h2>Edit Produk</h2>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <Input
                                name="name"
                                type="text"
                                placeholder="Nama Produk..."
                                label="Nama"
                                value={product.name}
                                onChange={(e) => {
                                    setProduct({
                                        ...product,
                                        name: e.target.value,
                                    });
                                }}
                            />
                            <Input
                                name="price"
                                type="number"
                                placeholder="Harga Produk..."
                                label="Harga"
                                value={product.price}
                                onChange={(e) => {
                                    setProduct({
                                        ...product,
                                        price: Number(e.target.value),
                                    });
                                }}
                            />
                            <Input
                                name="Stock"
                                type="number"
                                placeholder="Stock Produk..."
                                label="Stock"
                                value={product.stock}
                                onChange={(e) => {
                                    setProduct({
                                        ...product,
                                        stock: Number(e.target.value),
                                    });
                                }}
                            />
                            <Input
                                name="status"
                                type="checkbox"
                                label="Active"
                                checked={product.status}
                                onChange={(e) => {
                                    setProduct({
                                        ...product,
                                        status: e.target.checked,
                                    });
                                }}
                            />
                            <button type="submit" className="btn btn-primary">
                                Simpan
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Edit;
