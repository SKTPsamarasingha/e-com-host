import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {registrationSchema} from "../../validators/userSchema.js";
import {useAuth} from "../context/AuthProvider.jsx";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const RegisterPage = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: joiResolver(registrationSchema),
        defaultValues: {
            role: "user",
            name: "",
            email: "",
            password: ""
        }
    });

    const {register: userRegister} = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const message = await userRegister(data);
            toast.success(message || "Account created successfully!");
            navigate('/');
        } catch (err) {
            toast.error(err.message || "Registration failed");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <input type="hidden" {...register("role")} />

                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            {...register("name")}
                            className={`w-full border px-3 py-2 rounded ${errors.name ? 'border-red-500' : ''}`}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            {...register("email")}
                            className={`w-full border px-3 py-2 rounded ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            {...register("password")}
                            className={`w-full border px-3 py-2 rounded ${errors.password ? 'border-red-500' : ''}`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
                    >
                        Register
                    </button>

                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
