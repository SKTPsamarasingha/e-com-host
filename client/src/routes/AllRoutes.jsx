import {Route, Routes} from "react-router-dom";
import LandingPage from "../pages/LandingPage.jsx";
import MainLayout from "../layouts/mainLayout.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import ProductsPage from "../pages/ProductsPage.jsx";
import CartPage from "../pages/CartPage.jsx";
import CheckoutForm from "../pages/CheckoutForm.jsx";

export default function AllRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/products" element={<ProductsPage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/checkout" element={<CheckoutForm/>}/>

                <Route path="/auth/login" element={<LoginPage/>}/>
                <Route path="/auth/register" element={<RegisterPage/>}/>
            </Route>


            <Route element={<ProtectedRoute/>}>
                <Route element={<MainLayout/>}>
                </Route>
            </Route>
        </Routes>
    );
}
