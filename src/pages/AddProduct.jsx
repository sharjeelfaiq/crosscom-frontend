import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Alert } from "antd";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productCompany, setProductCompany] = useState("");
  const [fillFieldsNoti, setFillFieldsNoti] = useState(false);
  const [productSuccessNoti, setProductSuccessNoti] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const user = !localStorage.getItem("user");
      user && navigate("/signup");
    } catch (error) {
      console.error("Error in AddProduct.jsx; useEffect() hook", error);
    }
  });

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
      console.error("Error in AddProduct.jsx; handleChange() function", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = JSON.parse(localStorage.getItem("user"))._id;

      if (productName && productPrice && productCategory && productCompany) {
        await fetch("https://crosscom-backend.onrender.com/add-product", {
          method: "post",
          body: JSON.stringify({
            userId,
            productName,
            productPrice,
            productCategory,
            productCompany,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        setProductName("");
        setProductPrice("");
        setProductCategory("");
        setProductCompany("");

        setFillFieldsNoti(false);
        setProductSuccessNoti(true);
        setTimeout(() => setProductSuccessNoti(false), 5000);
      } else {
        setFillFieldsNoti(true);
        setTimeout(() => setFillFieldsNoti(false), 5000);
      }
    } catch (error) {
      console.error("Error in AddProduct.jsx; handleSubmit() function", error);
    }
  };

  return (
    <div
      className="flex flex-col items-center gap-20 mx-20 pt-10 pb-28 relative"
      style={{ height: "calc(100dvh - 5rem)" }}
    >
      {productSuccessNoti && (
        <Alert
          message="Product Created Successfully"
          type="success"
          className="absolute top-5 right-0 text-right font-medium text-lg"
          showIcon
        />
      )}
      {fillFieldsNoti && (
        <Alert
          message="Fill in the required fields!"
          type="warning"
          className="absolute top-5 right-0 text-right font-medium text-lg"
          showIcon
          closable
        />
      )}
      <h1 className="text-4xl text-slate-800 font-bold">Add Product</h1>
      <form className="flex flex-col items-center gap-4">
        <input
          type="text"
          placeholder="Enter Product Name"
          value={productName}
          onChange={(e) => handleChange("product-name", e)}
          className={`${
            fillFieldsNoti === true && "border-b-2 border-b-red-300"
          }outline-none w-60 border-b-2 border-b-slate-300 focus:border-b-slate-400 p-1  text-lg`}
          autoFocus
          required
        />
        <input
          type="number"
          placeholder="Enter Product Price"
          value={productPrice}
          onChange={(e) => handleChange("product-price", e)}
          className={`outline-none w-60 border-b-2 border-b-slate-300 focus:border-b-slate-400 p-1 ${
            fillFieldsNoti === true && "border-b-2 border-b-red-300"
          } text-lg`}
          required
        />
        <input
          type="text"
          placeholder="Enter Product Category"
          value={productCategory}
          onChange={(e) => handleChange("product-category", e)}
          className={`outline-none w-60 border-b-2 border-b-slate-300 focus:border-b-slate-400 p-1 ${
            fillFieldsNoti === true && "border-b-2 border-b-red-300"
          } text-lg`}
          required
        />
        <input
          type="text"
          placeholder="Enter Product Company"
          value={productCompany}
          onChange={(e) => handleChange("product-company", e)}
          className={`outline-none w-60 border-b-2 border-b-slate-300 focus:border-b-slate-400 p-1 ${
            fillFieldsNoti === true && "border-b-2 border-b-red-300"
          } text-lg`}
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
      <h3 className="mt-[-20px]">
          See your products on{" "}
          <Link
            to="/"
            className="text-slate-400 hover:text-slate-500 hover:underline"
          >
            products
          </Link>{" "} 
          page.
        </h3>
    </div>
  );
};

export default AddProduct;
