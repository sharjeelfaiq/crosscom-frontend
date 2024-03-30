import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Alert, Modal } from "antd";
import Signup from "../Signup/Signup";

import apis from "../../components/APIs";

const { signInApi } = apis;

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typePassword, setTypePassword] = useState("password");
  const [fillFieldsNoti, setFillFieldsNoti] = useState(false);
  const [noUserFoundNoti, setNoUserFoundNoti] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      localStorage.getItem("user") && navigate("/");
    } catch (error) {
      console.error(error);
    }
  });

  const handleChange = (inputName, e) => {
    try {
      switch (inputName) {
        case "email":
          setEmail(e.target.value);
          break;
        case "password":
          setPassword(e.target.value);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (email && password) {
        let res = await fetch(signInApi, {
          method: "post",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        res = await res.json();

        if (res.auth) {
          localStorage.setItem("user", JSON.stringify(res.body));
          localStorage.setItem("token", JSON.stringify(res.auth));
        } else if (res.body.message === "No user found") {
          setFillFieldsNoti(false);
          setNoUserFoundNoti(true);
          setTimeout(() => setNoUserFoundNoti(false), 10000);
        } else {
          console.error("Unexpected response:", res.body);
          throw new Error("Something went wrong"); // Trigger catch block
        }

        setEmail("");
        setPassword("");
      } else {
        setNoUserFoundNoti(false);
        setFillFieldsNoti(true);
        setTimeout(() => setFillFieldsNoti(false), 5000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center gap-20 mx-10 py-10 relative">
      {fillFieldsNoti && (
        <Alert
          message="Fill in the required fields!"
          type="warning"
          className="absolute top-0 right-0 text-right font-medium text-xs md:text-sm lg:text-lg xl:text-lg 2xl:text-lg"
          showIcon
          closable
        />
      )}
      {noUserFoundNoti && (
        <Alert
          message="User not found."
          type="error"
          className="absolute top-0 right-0 text-right font-medium text-xs md:text-sm lg:text-lg xl:text-lg 2xl:text-lg"
          showIcon
        />
      )}
      <h1 className="text-4xl text-slate-800 font-bold">Sign in</h1>
      <form className="flex flex-col items-center  gap-4">
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => handleChange("email", e)}
          className={`outline-none w-60 border-b-2 border-b-slate-300 focus:border-b-slate-400 p-1 ${
            fillFieldsNoti && "border-b-red-300"
          } text-lg`}
          autoFocus
          required
        />
        <div className="relative">
          <input
            type={typePassword}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => handleChange("password", e)}
            className={`outline-none w-60 border-b-2 border-b-slate-300 focus:border-b-slate-400 p-1 ${
              fillFieldsNoti && "border-b-red-300"
            } text-lg`}
            required
          />
          {typePassword === "password" ? (
            <FaRegEyeSlash
              className="absolute right-0 bottom-3 cursor-pointer"
              onClick={() =>
                setTypePassword(
                  typePassword === "password" ? "text" : "password"
                )
              }
            />
          ) : (
            <FaRegEye
              className="absolute right-0 bottom-3 cursor-pointer"
              onClick={() =>
                setTypePassword(
                  typePassword === "password" ? "text" : "password"
                )
              }
            />
          )}
        </div>
        <button
          type="submit"
          className="mt-5 outline-none bg-slate-500 text-white w-24 px-1 py-1.5 font-medium rounded-full active:bg-slate-400"
          onClick={handleSubmit}
        >
          Sign In
        </button>
      </form>
      <h3 className="mt-[-20px]">
        Don't have an account?{" "}
        <span
          className="cursor-pointer text-slate-400 hover:text-slate-500  hover:underline"
          onClick={showModal}
        >
          Register here.
        </span>
      </h3>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Signup onOk={handleOk} />
      </Modal>
    </div>
  );
};

export default Signin;
