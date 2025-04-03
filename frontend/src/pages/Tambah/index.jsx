import { useState } from "react";
import Input from "../../components/Input";
import "./index.scss";
import { useNavigate } from "react-router-dom";

const Tambah = () => {
    const navigator = useNavigate();
    const [product, setProduct] = useState({
        name: "",
        price: 0,
        stock: 0,
        status: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(product);
        (async () => {
            try {
                const res = await fetch(
                    `http://localhost:8083/api/mongoose/product`,
                    {
                        method: "POST",
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
                        "Produk berhasil di tambahkan"
                    );
                    navigator("/");
                }
            } catch (error) {
                console.log(error);
            }
        })();
    };

    return (
        <div className="main">
            <div className="card">
                <h2>Tambah Produk</h2>
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
    );
};

export default Tambah;
