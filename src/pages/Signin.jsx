import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Alert } from "antd";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typePassword, setTypePassword] = useState("password");
  const [fillFieldsNoti, setFillFieldsNoti] = useState(false);
  const [noUserFoundNoti, setNoUserFoundNoti] = useState(false);

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
        let result = await fetch("http://localhost:8080/signin", {
          method: "post",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        result = await result.json();
        console.log(result)
        if (result.name) {
          localStorage.setItem("user", JSON.stringify(result));
        } else if (result.message === "No user found") {
          setFillFieldsNoti(false);
          setNoUserFoundNoti(true);
          setTimeout(() => setNoUserFoundNoti(false), 10000);
        } else {
          console.error("Unexpected response:", result);
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

  return (
    <div className="flex flex-col items-center gap-20 mx-20 pt-10 pb-28 relative">
      {fillFieldsNoti && (
        <Alert
          message="Fill in the required fields!"
          type="warning"
          className="absolute top-5 right-0 text-right font-medium text-lg"
          showIcon
          closable
        />
      )}
      {noUserFoundNoti && (
        <Alert
          message="User not found."
          type="error"
          className="absolute top-5 right-0 text-right font-medium text-lg"
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
          className={`outline-none w-60 border-b-2 border-b-slate-300 focus:border-b-slate-400 p-1 ${fillFieldsNoti && 'border-b-red-300'} text-lg`}
          autoFocus
          required
        />
        <div className="relative">
          <input
            type={typePassword}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => handleChange("password", e)}
            className={`outline-none w-60 border-b-2 border-b-slate-300 focus:border-b-slate-400 p-1 ${fillFieldsNoti && 'border-b-red-300'} text-lg`}
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
        <Link
          to="/signup"
          className="text-slate-400 hover:text-slate-500  hover:underline"
        >
          Register here.
        </Link>
      </h3>
    </div>
  );
};

export default Signin;
