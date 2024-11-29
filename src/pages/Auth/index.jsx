import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../../context";

const Auth = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "", // Included for registration
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    const { register, login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password, name } = formData;

        if (!email || !password || (isRegister && !name)) {
            toast.error("Please fill in all required fields!");
            return;
        }

        if (isRegister && password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const response = isRegister
                ? await register({ email, password, name })
                : await login({ email, password });

            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error(error.message || "An error occurred.");
        }
    };

    const renderPasswordInput = (name, value, onChange, toggleVisibility, isVisible) => (
        <div className="relative">
            <input
                type={isVisible ? "text" : "password"}
                name={name}
                placeholder={name === "password" ? "Enter Password" : "Re-enter Password"}
                value={value}
                onChange={onChange}
                className="outline-none w-60 border-b-2 border-b-slate-300 focus:border-b-slate-400 p-1 text-lg"
                required
            />
            {isVisible ? (
                <FaRegEye
                    className="absolute right-0 bottom-3 cursor-pointer"
                    onClick={toggleVisibility}
                />
            ) : (
                <FaRegEyeSlash
                    className="absolute right-0 bottom-3 cursor-pointer"
                    onClick={toggleVisibility}
                />
            )}
        </div>
    );

    return (
        <div className="flex flex-col items-center gap-20 mx-10 py-10 relative">
            <h1 className="text-4xl text-slate-800 font-bold">
                {isRegister ? "Sign Up" : "Sign In"}
            </h1>
            <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
                {isRegister && (
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="outline-none w-60 border-b-2 border-b-slate-300 focus:border-b-slate-400 p-1 text-lg"
                        required
                    />
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="outline-none w-60 border-b-2 border-b-slate-300 focus:border-b-slate-400 p-1 text-lg"
                    autoFocus
                    required
                />
                {renderPasswordInput(
                    "password",
                    formData.password,
                    handleChange,
                    () => setShowPassword((prev) => !prev),
                    showPassword
                )}
                {isRegister &&
                    renderPasswordInput(
                        "confirmPassword",
                        confirmPassword,
                        (e) => setConfirmPassword(e.target.value),
                        () => setShowConfirmPassword((prev) => !prev),
                        showConfirmPassword
                    )}
                <button
                    type="submit"
                    className="mt-5 outline-none bg-slate-500 text-white w-24 px-1 py-1.5 font-medium rounded-full active:bg-slate-400"
                >
                    {isRegister ? "Sign Up" : "Sign In"}
                </button>
            </form>
            <h3 className="mt-[-20px]">
                {isRegister ? "Already" : "Don't"} have an account?{" "}
                <span
                    className="cursor-pointer text-slate-400 hover:text-slate-500 hover:underline"
                    onClick={() => setIsRegister((prev) => !prev)}
                >
                    {isRegister ? "Sign In" : "Register"} here.
                </span>
            </h3>
        </div>
    );
};

export default Auth;
