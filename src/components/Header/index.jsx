import logo from "../../assets/images/logo.png";
import { useAuth } from "../../context";

const Header = () => {
    const { setIsAuthenticated, isAuthenticated } = useAuth();

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.clear();
    };

    return (
        <header
            className={`bg-slate-400 h-20 w-full flex items-center ${
                isAuthenticated && `justify-between`
            } px-5 mdpx-10`}
        >
            <div className="h-14 flex items-center">
                <img src={logo} alt="logo" className="h-full w-16" />
            </div>
            {isAuthenticated && (
                <nav>
                    <ul className="flex items-center gap-5">
                        <li
                            className="w-20 text-center text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 md:px-2 md:py-2.5 focus:outline-none cursor-pointer"
                            onClick={logout}
                        >
                            Log out
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;
