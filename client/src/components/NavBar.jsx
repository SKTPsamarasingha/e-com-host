import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthProvider.jsx";

const Navbar = () => {
    const {logout, user} = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/auth/login");
    };

    return (
        <nav className="w-full bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex h-16 items-center justify-between">

                    {/* Brand */}
                    <Link to="/" className="text-xl font-bold text-gray-800">
                        Clothify
                    </Link>

                    {/* Categories */}
                    <div className="hidden md:flex gap-6">
                        <Link to="/products?category=Men">Men</Link>
                        <Link to="/products?category=Women">Women</Link>
                        <Link to="/products?category=Kids">Kids</Link>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">

                        <Link to="/cart">Cart</Link>

                        {!user ? (
                            <>
                                <Link
                                    to="/auth/login"
                                    className="px-4 py-2 bg-black text-white rounded-md"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/auth/register"
                                    className="px-4 py-2 bg-black text-white rounded-md"
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-600 text-white rounded-md"
                            >
                                Logout
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
