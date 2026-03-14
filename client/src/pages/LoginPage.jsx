import {useForm} from "react-hook-form";
import {loginSchema} from "../../validators/userSchema.js";
import {joiResolver} from "@hookform/resolvers/joi";
import {useAuth} from "../context/AuthProvider.jsx";
import {toast} from "react-toastify";

import {useNavigate} from "react-router-dom";


const LoginPage = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({resolver: joiResolver(loginSchema)});
    const {login} = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const message = await login(data);
            toast.success(message);
            navigate('/products')
        } catch (err) {
            toast.error(err.message || "Invalid credentials");
        }
    };

    return (<div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded shadow">

            <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        {...register("email", {required: "Email is required"})}
                        className="w-full border px-3 py-2 rounded"
                    />
                    {errors.email && (<p className="text-red-500 text-sm">{errors.email.message}</p>)}
                </div>

                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input
                        type="password"
                        {...register("password", {required: "Password is required"})}
                        className="w-full border px-3 py-2 rounded"
                    />
                    {errors.password && (<p className="text-red-500 text-sm">{errors.password.message}</p>)}
                </div>

                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                >
                    Login
                </button>

            </form>
        </div>
    </div>);
};

export default LoginPage;
