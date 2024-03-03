import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/images/logo.png";

const Header = () => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    setUser(savedUser);

    const savedUserName =
      savedUser && JSON.parse(localStorage.getItem("user")).name;
    setUserName(savedUserName);
  });

  const logout = () => {
    localStorage.clear();
    navigate("/signin");
  };
  return (
    <header className="bg-slate-400 h-20 w-full flex items-center justify-between px-3 mdpx-10">
      <Link to="/">
        <img src={logo} alt="logo" className="h-full w-44" />
      </Link>
      <nav className="px-5">
        <ul className="flex items-center gap-5">
          {user ? (
            <>
              <li className="hidden md:block text-white focus:ring-4 focus:ring-gray-300 font-medium text-lg rounded-lg focus:outline-none">
                <Link to="/profile">{userName}</Link>
              </li>
              <li
                className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 focus:outline-none"
                onClick={logout}
              >
                <Link to="/signup">Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 focus:outline-none">
                <Link to="/signin">Sign in</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
