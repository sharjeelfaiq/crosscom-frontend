import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { Alert } from "antd";

const Products = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(null);
  const [productDeletedNoti, setProductDeletedNoti] = useState(false);
  const [productsDeletedNoti, setProductsDeletedNoti] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const user = localStorage.getItem("user");
      !user && navigate("/signup");
      setUser(JSON.parse(user).name);
    } catch (error) {
      console.error("Error in Products.jsx; 1st useEffect() hook", error);
    }
  }, [navigate, user]);

  useEffect(() => {
    try {
      getProducts();
    } catch (error) {
      console.error("Error in Products.jsx; 2nd useEffect() hook", error);
    }
  }, []);

  useEffect(() => {
    try {
      if (searchKey.length > 0 && /^\s+$/.test(searchKey) !== true) {
        const searchData = async () => {
          let res = await fetch(`https://crosscom-backend.onrender.com/${searchKey}`);
          res = await res.json();
          res.result !== "No Product Found" && setProducts(res);
        };

        searchData();
      }
    } catch (error) {
      console.error(error);
    }
  }, [searchKey]);

  const getProducts = async () => {
    try {
      const res = await fetch("https://crosscom-backend.onrender.com/get-products");
      const data = await res.json();

      let userData = localStorage.getItem("user");
      userData = JSON.parse(userData);

      let productsArr = [];

      if (data && userData && data.message !== "No product found") {
        data.forEach((product) => {
          if (product.userId === userData._id) {
            productsArr.push(product);
          }
        });
        setProducts(productsArr);
      }
    } catch (error) {
      console.error("Error in Product.jsx; getProducts function.", error);
    }
  };

  const handleDeleteProduct = async (pid) => {
    try {
      let res = await fetch(`https://crosscom-backend.onrender.com/delete-product/${pid}`, {
        method: "delete",
      });
      res = await res.json();
      if (res) {
        setProductDeletedNoti(true);
        setTimeout(() => setProductDeletedNoti(false), 5000);
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p._id !== pid)
        );
      }
    } catch (error) {
      console.error("Error in Product.jsx;handleDeleteProduct", error);
    }
  };

  const handleDeleteAll = async (uid) => {
    try {
      let res = await fetch(
        `https://crosscom-backend.onrender.com/delete-all-products/${uid}`,
        {
          method: "delete",
        }
      );
      res = await res.json();
      setProducts([]);
      if (res) {
        setProductsDeletedNoti(true);
        setTimeout(() => setProductsDeletedNoti(false), 5000);
      }
    } catch (error) {
      console.error("Error in Product.jsx; handleDeleteAll", error);
    }
  };

  const handleSearchKeyChange = (e) => {
    if (e.target.value.length > 0) {
      setSearchKey(e.target.value);
    } else {
      setSearchKey("");
      getProducts();
    }
  };

  return (
    <div className="relative h-auto flex flex-col items-center gap-6 xl:gap-10 2xl:gap-10 mx-3 md:mx-14 lg:mx-20 xl:mx-20 2xl:mx-20 pt-6 md:pt-8 lg:pt-8 xl:pt-10 2xl:pt-10 pb-24">
      {productDeletedNoti && (
        <Alert
          message="Product Deleted Successfully"
          type="success"
          className="absolute top-5 right-0 text-right font-medium text-xs md:text-sm lg:text-lg xl:text-lg 2xl:text-lg"
          showIcon
        />
      )}

      {productsDeletedNoti && (
        <Alert
          message="All Products Deleted Successfully"
          type="success"
          className="absolute top-5 right-0 text-right font-medium text-xs md:text-sm lg:text-lg xl:text-lg 2xl:text-lg"
          showIcon
        />
      )}
      <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-4xl text-slate-800 font-medium">
        Hello {user && user.split(" ")[0]}.{" "}
        {products && products.length > 0
          ? `This is your products list.`
          : `Add products to your list.`}
      </h1>
      {products && products.length > 0 ? (
        <>
          <div className="max-h-96 container overflow-y-auto flex justify-center customScrollBar">
            {products && products.length > 0 && (
              <div className="absolute top-16 right-0 flex flex-row justify-end items-center gap-3">
                <input
                  type="text"
                  placeholder="Search Product"
                  value={searchKey}
                  className="outline-none w-60 border-b-2 border-b-slate-300 focus:border-b-slate-400 p-1 text-lg"
                  onChange={handleSearchKeyChange}
                />
                <Link to="/add">
                  <IoMdAddCircleOutline title="Add product" size={20} />
                </Link>
              </div>
            )}
            <table className="table-auto w-full text-xs md:text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="sticky top-0 left-0 z-50 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="p-1 md:px-6 md:py-3 lg:px-6 lg:py-3 xl:px-6 xl:py-3 2xl:px-6 2xl:py-3 text-xs md:text-sm lg:text-lg xl:text-lg 2xl:text-lg"
                  >
                    SN
                  </th>
                  <th
                    scope="col"
                    className=" p-1 md:px-6 md:py-3 lg:px-6 lg:py-3 xl:px-6 xl:py-3 2xl:px-6 2xl:py-3 text-xs md:text-sm lg:text-lg xl:text-lg 2xl:text-lg"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className=" p-1 md:px-6 md:py-3 lg:px-6 lg:py-3 xl:px-6 xl:py-3 2xl:px-6 2xl:py-3 text-xs md:text-sm lg:text-lg xl:text-lg 2xl:text-lg"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className=" p-1 md:px-6 md:py-3 lg:px-6 lg:py-3 xl:px-6 xl:py-3 2xl:px-6 2xl:py-3 text-xs md:text-sm lg:text-lg xl:text-lg 2xl:text-lg"
                  >
                    Company
                  </th>
                  <th
                    scope="col"
                    className=" p-1 md:px-6 md:py-3 lg:px-6 lg:py-3 xl:px-6 xl:py-3 2xl:px-6 2xl:py-3 text-xs md:text-sm lg:text-lg xl:text-lg 2xl:text-lg"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className=" p-1 md:px-6 md:py-3 lg:px-6 lg:py-3 xl:px-6 xl:py-3 2xl:px-6 2xl:py-3 text-xs md:text-sm lg:text-lg xl:text-lg 2xl:text-lg"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product, index) => (
                    <tr
                      key={index + 1}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        key={index}
                        className="px-3 py-2 lg:px-4 lg:py-3 xl:px-4 xl:py-3 2xl:px-4 2xl:py-3 font-medium text-gray-900 whitespace-nowrap text-xs md:text-sm lg:text-lg xl:text-lg 2xl:text-lg"
                      >
                        #{index + 1}
                      </th>
                      <td
                        key={product.productName}
                        className="px-3 py-2 lg:px-4 lg:py-3 xl:px-4 xl:py-3 2xl:px-4 2xl:py-3 text-xs md:text-sm lg:text-lg xl:text-lg 2xl:text-lg"
                      >
                        {product.productName}
                      </td>
                      <td
                        key={product.productPrice}
                        className="px-3 py-2 lg:px-4 lg:py-3 xl:px-4 xl:py-3 2xl:px-4 2xl:py-3 text-xs md:text-sm lg:text-lg xl:text-lg 2xl:text-lg"
                      >
                        ${product.productPrice}
                      </td>
                      <td
                        key={product.productCompany}
                        className="px-3 py-2 lg:px-4 lg:py-3 xl:px-4 xl:py-3 2xl:px-4 2xl:py-3 text-xs md:text-sm lg:text-lg xl:text-lg 2xl:text-lg"
                      >
                        {product.productCompany}
                      </td>
                      <td
                        key={product.productCategory}
                        className="px-3 py-2 lg:px-4 lg:py-3 xl:px-4 xl:py-3 2xl:px-4 2xl:py-3 text-xs md:text-sm lg:text-lg xl:text-lg 2xl:text-lg"
                      >
                        {product.productCategory}
                      </td>
                      <td key={product._id} className="text-center text-base">
                        <Link to={`/update/${product._id}`}>
                          <FaEdit
                            size={20}
                            color="gray"
                            className="inline mx-3 opacity-70 hover:opacity-100"
                            title="Edit Product"
                          />
                        </Link>
                        <MdDeleteForever
                          onClick={() => handleDeleteProduct(product._id)}
                          className="cursor-pointer inline mx-3 opacity-70 hover:opacity-100"
                          size={20}
                          color="red"
                          title="Delete Product"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <button
            type="submit"
            className="mt-[-15px] outline-none bg-red-500 text-white w-24 px-1 py-1.5 font-medium rounded-full active:bg-red-400"
            onClick={() =>
              handleDeleteAll(JSON.parse(localStorage.getItem("user"))._id)
            }
          >
            Delete All
          </button>
        </>
      ) : (
        <h3 className="mt-[-20px]">
          No product found.{" "}
          <Link
            to="/add"
            className="text-slate-400 hover:text-slate-500 hover:underline"
          >
            Add a product
          </Link>
        </h3>
      )}
    </div>
  );
};

export default Products;
