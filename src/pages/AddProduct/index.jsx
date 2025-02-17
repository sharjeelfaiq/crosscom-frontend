import { useState } from "react";

import dataProvider from "../../providers/data";

const AddProduct = ({ onOk }) => {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productCompany, setProductCompany] = useState("");

    const handleChange = (inputName, e) => {
        try {
            switch (inputName) {
                case "product-name":
                    setProductName(e.target.value);
                    break;
                case "product-price":
                    setProductPrice(e.target.value);
                    break;
                case "product-category":
                    setProductCategory(e.target.value);
                    break;
                case "product-company":
                    setProductCompany(e.target.value);
                    break;

                default:
                    break;
            }
        } catch (error) {
            console.error(
                "Error in AddProduct.jsx; handleChange() function",
                error
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userId = JSON.parse(
                localStorage.getItem("user")
            ).id;

            if (
                productName &&
                productPrice &&
                productCategory &&
                productCompany
            ) {
                const response = await dataProvider.add_product({
                    userId,
                    productName,
                    productPrice,
                    productCategory,
                    productCompany,
                });

                console.log("Add Product Response:", response);

                setProductName("");
                setProductPrice("");
                setProductCategory("");
                setProductCompany("");

                onOk();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center gap-20 relative py-10rounded-xl">
            <h1 className="text-4xl text-slate-800 font-bold">
                Add Product
            </h1>
            <form className="flex flex-col items-center gap-4">
                <input
                    type="text"
                    placeholder="Enter Product Name"
                    value={productName}
                    onChange={(e) => handleChange("product-name", e)}
                    className={`outline-none w-60 border-b-2 border-b-slate-300 focus:border-b-slate-400 p-1  text-lg`}
                    autoFocus
                    required
                />
                <input
                    type="number"
                    placeholder="Enter Product Price"
                    value={productPrice}
                    onChange={(e) => handleChange("product-price", e)}
                    className={`outline-none w-60 border-b-2 border-b-slate-300 focus:border-b-slate-400 p-1 text-lg`}
                    required
                />
                <input
                    type="text"
                    placeholder="Enter Product Category"
                    value={productCategory}
                    onChange={(e) =>
                        handleChange("product-category", e)
                    }
                    className={`outline-none w-60 border-b-2 border-b-slate-300 focus:border-b-slate-400 p-1 text-lg`}
                    required
                />
                <input
                    type="text"
                    placeholder="Enter Product Company"
                    value={productCompany}
                    onChange={(e) =>
                        handleChange("product-company", e)
                    }
                    className={`outline-none w-60 border-b-2 border-b-slate-300 focus:border-b-slate-400 p-1 text-lg`}
                    required
                />
                <button
                    type="submit"
                    className="mt-5 outline-none bg-slate-500 text-white w-24 px-1 py-1.5 font-medium rounded-full active:bg-slate-400"
                    onClick={handleSubmit}
                >
                    Add
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
