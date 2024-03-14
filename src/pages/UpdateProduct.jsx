import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Alert } from "antd";

const UpdateProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productCompany, setProductCompany] = useState("");
  const [fillFieldsNoti, setFillFieldsNoti] = useState(false);
  const [productSuccessNoti, setProductSuccessNoti] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    try {
      const user = !localStorage.getItem("user");
      user && navigate("/signup");
    } catch (error) {
      console.error("Error in UpdateProduct.jsx; useEffect() hook", error);
    }
  });

  useEffect(() => {
    try {
      getProducts();
    } catch (error) {
      console.error("Error in UpdateProduct.jsx; 2nd useEffect() hook", error);
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getProducts = async () => {
    try {
      const res = await fetch("https://pink-frantic-buffalo.cyclic.app/get-products");
      let data = await res.json();
      /* eslint-disable-next-line array-callback-return */
      data = data.find((product) => {
        if (product._id === params.pid) return product;
      });
      setProductName(data.productName);
      setProductPrice(data.productPrice);
      setProductCategory(data.productCategory);
      setProductCompany(data.productCompany);
    } catch (error) {
      console.error("Error in UpdateProduct.jsx; getProducts function.", error);
    }
  };

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
        "Error in UpdateProduct.jsx; handleChange() function",
        error
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (productName && productPrice && productCategory && productCompany) {
        await fetch(`https://pink-frantic-buffalo.cyclic.app/update-product/${params.pid}`, {
          method: "put",
          body: JSON.stringify({
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

        navigate("/");
      } else {
        setFillFieldsNoti(true);
        setTimeout(() => setFillFieldsNoti(false), 5000);
      }
    } catch (error) {
      console.error(
        "Error in UpdateProduct.jsx; handleSubmit() function",
        error
      );
    }
  };

  return (
    <div
      className="flex flex-col items-center gap-20 mx-20 pb-28 pt-10 relative"
      style={{ height: "calc(100dvh - 5rem)" }}
    >
      {productSuccessNoti && (
        <Alert
          message="Product Updated Successfully"
          type="success"
          className="absolute top-0 right-0 text-right font-medium text-xs md:text-sm lg:text-lg xl:text-lg 2xl:text-lg"
          showIcon
        />
      )}
      {fillFieldsNoti && (
        <Alert
          message="Fill in the required fields!"
          type="warning"
          className="absolute top-0 right-0 text-right font-medium text-xs md:text-sm lg:text-lg xl:text-lg 2xl:text-lg"
          showIcon
          closable
        />
      )}
      <h1 className="text-4xl text-slate-800 font-bold">Update Product</h1>
      <form className="flex flex-col items-center gap-4">
        <input
          type="text"
          placeholder="Enter Product Name"
          value={productName}
          onChange={(e) => handleChange("product-name", e)}
          className={`outline-none w-60 border-b-2 border-b-slate-300 focus:border-b-slate-400 p-1 ${
            fillFieldsNoti && "border-b-red-300"
          } text-lg`}
          autoFocus
          required
        />
        <input
          type="number"
          placeholder="Enter Product Price"
          value={productPrice}
          onChange={(e) => handleChange("product-price", e)}
          className={`outline-none w-60 border-b-2 border-b-slate-300 focus:border-b-slate-400 p-1 ${
            fillFieldsNoti && "border-b-red-300"
          } text-lg`}
          required
        />
        <input
          type="text"
          placeholder="Enter Product Category"
          value={productCategory}
          onChange={(e) => handleChange("product-category", e)}
          className={`outline-none w-60 border-b-2 border-b-slate-300 focus:border-b-slate-400 p-1 ${
            fillFieldsNoti && "border-b-red-300"
          } text-lg`}
          required
        />
        <input
          type="text"
          placeholder="Enter Product Company"
          value={productCompany}
          onChange={(e) => handleChange("product-company", e)}
          className={`outline-none w-60 border-b-2 border-b-slate-300 focus:border-b-slate-400 p-1 ${
            fillFieldsNoti && "border-b-red-300"
          } text-lg`}
          required
        />
        <button
          type="submit"
          className="mt-5 outline-none bg-slate-500 text-white w-24 px-1 py-1.5 font-medium rounded-full active:bg-slate-400"
          onClick={handleSubmit}
        >
          Update
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

export default UpdateProduct;
