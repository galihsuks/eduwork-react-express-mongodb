import { Link } from "react-router-dom";
import "./index.scss";
import { useEffect, useState } from "react";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (search == "") {
            (async () => {
                try {
                    const res = await fetch(
                        "http://localhost:8083/api/mongoose/product"
                    );
                    const resJson = await res.json();
                    console.log(resJson);
                    setProducts(resJson);
                } catch (error) {
                    console.log(error);
                }
            })();
        } else {
            (async () => {
                try {
                    const res = await fetch(
                        `http://localhost:8083/api/mongoose/product/search`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ search }),
                        }
                    );
                    const resJson = await res.json();
                    console.log(resJson);
                    //qwdqwd
                    setProducts(resJson);
                } catch (error) {
                    console.log(error);
                }
            })();
        }
        const msgSession = window.sessionStorage.getItem("msg");
        if (msgSession) {
            window.alert(msgSession);
            window.sessionStorage.removeItem("msg");
        }
    }, [search]);

    const handleDelete = (id, name) => {
        const hasilConfirm = window.confirm(`Produk ${name} akan dihapus?`);
        if (hasilConfirm) {
            (async () => {
                try {
                    const res = await fetch(
                        `http://localhost:8083/api/mongoose/product/${id}`,
                        {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    const resJson = await res.json();
                    console.log(resJson);
                    if (res.status == 200) {
                        setProducts(
                            products.filter((p) => {
                                return p._id != id;
                            })
                        );
                    }
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    };

    return (
        <div className="main">
            <Link to="/tambah" className="btn btn-primary">
                Tamah Produk
            </Link>
            <div className="search">
                <input
                    type="text"
                    placeholder="Masukan kata kunci..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th className="text-right">Price</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p, ind_p) => (
                        <tr key={ind_p}>
                            <td>{ind_p + 1}</td>
                            <td>{p.name}</td>
                            <td className="text-right">
                                RP {p.price.toLocaleString()}
                            </td>
                            <td className="text-center">
                                <Link
                                    to={`/detail/${p._id}`}
                                    className="btn btn-sm btn-info"
                                >
                                    Detail
                                </Link>
                                <Link
                                    to={`/edit/${p._id}`}
                                    className="btn btn-sm btn-warning"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => {
                                        handleDelete(p._id, p.name);
                                    }}
                                    className="btn btn-sm btn-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
