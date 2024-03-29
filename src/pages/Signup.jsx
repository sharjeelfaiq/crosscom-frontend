import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Alert } from "antd";

const Signup = ({onOk}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [typePassword, setTypePassword] = useState("password");
  const [typeConfirmPassword, setTypeConfirmPassword] = useState("password");
  const [emailFormat, setEmailFormat] = useState(false);
  const [passwordUnmatchedNoti, setPasswordUnmatchedNoti] = useState(false);
  const [fillFieldsNoti, setFillFieldsNoti] = useState(false);
  const [incorrectEmailNoti, setIncorrectEmailNoti] = useState(false);
  const [alreadyExistNoti, setAlreadyExistNoti] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (localStorage.getItem("user")) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error in Signup.jsx; useEffect() hook", error);
    }
  });

  const checkEmailFormat = (email) => {
    try {
      const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailFormat.test(email);
    } catch (error) {
      console.error("Error in Signup.jsx; checkEmailFormat() function", error);
    }
  };

  const handleChange = (inputName, e) => {
    try {
      switch (inputName) {
        case "name":
          setName(e.target.value);
          break;
        case "email":
          setEmail(e.target.value);
          setEmailFormat(checkEmailFormat(e.target.value));
          break;
        case "password":
          setPassword(e.target.value);
          break;
        case "confirm-password":
          setConfirmPassword(e.target.value);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error in Signup.jsx; handleChange() function", error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (name && email && password && confirmPassword) {
        if (emailFormat) {
          if (password === confirmPassword) {
            let res = await fetch(
              "https://crosscom-backend.onrender.com/register",
              {
                method: "post",
                body: JSON.stringify({ name, email, password }),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            res = await res.json();

            if (res.status !== 409) {
                localStorage.setItem("user", JSON.stringify(res.body));
                localStorage.setItem("token", JSON.stringify(res.auth));

                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                
                navigate("/");

                onOk();
            } else {
              setName("");
              setEmail("");
              setPassword("");
              setConfirmPassword("");

              setAlreadyExistNoti(true);
              setTimeout(() => setAlreadyExistNoti(false), 5000);
            }
          } else {
            setPasswordUnmatchedNoti(true);
            setTimeout(() => setPasswordUnmatchedNoti(false), 5000);
          }
        } else {
          setIncorrectEmailNoti(true);
          setTimeout(() => setIncorrectEmailNoti(false), 5000);
        }
      } else {
        setFillFieldsNoti(true);
        setTimeout(() => setFillFieldsNoti(false), 5000);
      }
    } catch (error) {
      console.error("Error in Signup.jsx; handleSubmit() function", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-20 relative rounded-xl">
      {passwordUnmatchedNoti && (
        <Alert
          message="Passwords do not match."
          type="error"
          className="absolute top-0 left-0 text-right font-medium text-xs md:text-sm lg:text-lg xl:text-lg 2xl:text-lg"
          showIcon
        />
      )}
      {fillFieldsNoti && (
        <Alert
          message="Fill in the required fields!"
          type="warning"
          className="absolute top-0 left-0 text-right font-medium text-xs md:text-sm lg:text-lg xl:text-lg 2xl:text-lg"
          showIcon
        />
      )}
      {incorrectEmailNoti && (
        <Alert
          message="Enter Correct Email."
          type="error"
          className="absolute top-0 left-0 text-right font-medium text-xs md:text-sm lg:text-lg xl:text-lg 2xl:text-lg"
          showIcon
        />
      )}
      {alreadyExistNoti && (
        <Alert
          message="User Already Exist."
          type="error"
          className="absolute top-0 left-0 text-right font-medium text-xs md:text-sm lg:text-lg xl:text-lg 2xl:text-lg"
          showIcon
        />
      )}
      <h1 className="text-4xl text-slate-800 font-bold">Register</h1>
      <form className="flex flex-col items-center  gap-4">
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => handleChange("name", e)}
          className={`outline-none w-60 border-b-2 border-b-slate-300 focus:border-b-slate-400 p-1 ${
            fillFieldsNoti && "border-b-red-300"
          } text-lg`}
          autoFocus
          required
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
          onChange={(e) => handleChange("email", e)}
          className={`outline-none w-60 border-b-2 border-b-slate-300 focus:border-b-slate-400 p-1 ${
            fillFieldsNoti && "border-b-red-300"
          } text-lg`}
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
                typePassword === "password"
                  ? setTypePassword("text")
                  : setTypePassword("password")
              }
            />
          ) : (
            <FaRegEye
              className="absolute right-0 bottom-3 cursor-pointer"
              onClick={() =>
                typePassword === "password"
                  ? setTypePassword("text")
                  : setTypePassword("password")
              }
            />
          )}
        </div>
        <div className="relative">
          <input
            type={typeConfirmPassword}
            placeholder="Re-enter Password"
            value={confirmPassword}
            onChange={(e) => handleChange("confirm-password", e)}
            className={`outline-none w-60 border-b-2 border-b-slate-300 focus:border-b-slate-400 p-1 ${
              fillFieldsNoti && "border-b-red-300"
            } text-lg`}
            required
          />

          {typeConfirmPassword === "password" ? (
            <FaRegEyeSlash
              className="absolute right-0 bottom-3 cursor-pointer"
              onClick={() =>
                setTypeConfirmPassword(
                  typeConfirmPassword === "password" ? "text" : "password"
                )
              }
            />
          ) : (
            <FaRegEye
              className="absolute right-0 bottom-3 cursor-pointer"
              onClick={() =>
                setTypeConfirmPassword(
                  typeConfirmPassword === "password" ? "text" : "password"
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
            Sign Up
          </button>
      </form>
    </div>
  );
};

export default Signup;
