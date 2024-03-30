import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "antd";
import logo from "../../assets/images/logo.png";
import Signup from "../../pages/Signup/Signup";

const Header = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    setUser(savedUser);
  });

  const logout = () => {
    localStorage.clear();
    navigate("/signin");
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
    <header className="bg-slate-400 h-20 w-full flex items-center justify-between px-5 mdpx-10">
      <Link to="/">
        <img src={logo} alt="logo" className="h-full w-16" />
      </Link>
      <nav>
        <ul className="flex items-center gap-5">
          {user ? (
            <Link to="/signin">
              <li
                className="w-20 text-center text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 md:px-2 md:py-2.5 focus:outline-none cursor-pointer"
                onClick={logout}
              >
                Log out
              </li>
            </Link>
          ) : (
            <li
              className="w-20 text-white text-center bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 md:px-2 md:py-2.5 focus:outline-none cursor-pointer"
              onClick={showModal}
            >
              Sign Up
            </li>
          )}
        </ul>
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Signup onOk={handleOk} />
        </Modal>
      </nav>
    </header>
  );
};

export default Header;
