import { useState } from "react";

import { Alert } from "antd";

import apis from "../../components/APIs";

const { addProductApi } = apis;

const AddProduct = ({ onOk }) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productCompany, setProductCompany] = useState("");
  const [fillFieldsNoti, setFillFieldsNoti] = useState(false);

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
      const token = JSON.parse(localStorage.getItem("token"));

      if (productName && productPrice && productCategory && productCompany) {
        await fetch(addProductApi, {
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
            authorization: token,
          },
        });

        setProductName("");
        setProductPrice("");
        setProductCategory("");
        setProductCompany("");

        onOk();

        setFillFieldsNoti(false);
      } else {
        setFillFieldsNoti(true);
        setTimeout(() => setFillFieldsNoti(false), 3000);
      }
    } catch (error) {
      console.error("Error in AddProduct.jsx; handleSubmit() function", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-20 relative py-10rounded-xl">
      {fillFieldsNoti && (
        <Alert
          message="Fill in the required fields!"
          type="warning"
          className="absolute top-0 left-0 font-medium text-xs"
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
          className={`outline-none ${
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
    </div>
  );
};

export default AddProduct;
