import { useEffect, useState, useCallback } from "react";

import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { Modal } from "antd";

import AddProduct from "../AddProduct";
import Search from "../../components/Search/Search";
import dataProvider from "../../providers/data";

const savedUser = localStorage.getItem("user");
const Dashboard = () => {
    const [user] = useState(savedUser);
    const [products, setProducts] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await dataProvider.get_products();
            const { data } = response;

            if (data && user) {
                const userProducts = data.filter(
                    (product) => product.userId === user._id
                );
                setProducts(userProducts);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }, [user]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts, isModalOpen]);

    const handleSearch = async (e) => {
        try {
            const searchTerm = e.target.value.trim();
            setSearchKey(searchTerm);

            if (!searchTerm) {
                fetchProducts();
                return;
            }

            const response = await dataProvider.search(searchTerm);
            const products = await response.json();

            const filteredProducts = products.filter(
                (product) => product.userId === user?._id
            );
            setProducts(filteredProducts);
        } catch (error) {
            console.error("Search Error:", error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await dataProvider.delete_product(
                productId
            );

            if (response.success) {
                setProducts((prev) =>
                    prev.filter(
                        (product) => product._id !== productId
                    )
                );
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleDeleteAll = async () => {
        try {
            await dataProvider.delete_all_products(user._id);
            setProducts([]);
        } catch (error) {
            console.error("Error deleting all products:", error);
        }
    };

    // Modal handlers
    const showModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="relative h-auto flex flex-col items-center gap-6 mx-3 md:mx-14 pt-6 pb-24">
            <div className="w-full flex flex-col md:flex-row justify-between items-start gap-5">
                <Search
                    searchKey={searchKey}
                    setSearchKey={setSearchKey}
                    handleSearch={handleSearch}
                />

                <div className="text-center flex flex-col items-center justify-start gap-3">
                    <h1 className="text-2xl text-slate-800 font-medium">
                        Hi, {user}.{" "}
                        {products.length > 0
                            ? "This is your product list."
                            : "Add products to your list."}
                    </h1>
                    {!products.length && (
                        <h3>No product found. Add a product.</h3>
                    )}
                </div>

                <IoMdAddCircleOutline
                    title="Add product"
                    size={20}
                    onClick={showModal}
                    className="cursor-pointer mt-2 absolute sm:relative right-5"
                />
                <Modal open={isModalOpen} onCancel={closeModal}>
                    <AddProduct onOk={closeModal} />
                </Modal>
            </div>

            {products.length > 0 ? (
                <div className="max-h-96 container overflow-y-auto flex justify-center customScrollBar">
                    <table className="table-auto w-full text-left text-gray-500">
                        <thead className="sticky top-0 bg-gray-50">
                            <tr>
                                {[
                                    "SN",
                                    "Name",
                                    "Price",
                                    "Company",
                                    "Category",
                                    "Actions",
                                ].map((header, idx) => (
                                    <th
                                        key={idx}
                                        className="p-2 text-xs md:text-sm lg:text-lg"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr
                                    key={product._id}
                                    className="bg-white border-b"
                                >
                                    <td className="px-4 py-3 font-medium text-gray-900">
                                        {index + 1}
                                    </td>
                                    <td className="px-4 py-3">
                                        {product.productName}
                                    </td>
                                    <td className="px-4 py-3">
                                        ${product.productPrice}
                                    </td>
                                    <td className="px-4 py-3">
                                        {product.productCompany}
                                    </td>
                                    <td className="px-4 py-3">
                                        {product.productCategory}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <Link
                                            to={`/update/${product._id}`}
                                        >
                                            <FaEdit
                                                size={20}
                                                className="inline mx-3 opacity-70 hover:opacity-100"
                                            />
                                        </Link>
                                        <MdDeleteForever
                                            onClick={() =>
                                                handleDeleteProduct(
                                                    product._id
                                                )
                                            }
                                            className="cursor-pointer inline mx-3 opacity-70 hover:opacity-100"
                                            size={20}
                                            color="red"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : null}

            {products.length > 0 && (
                <button
                    onClick={handleDeleteAll}
                    className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Delete All Products
                </button>
            )}
        </div>
    );
};

export default Dashboard;
