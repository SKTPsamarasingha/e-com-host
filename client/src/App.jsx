import AllRoutes from "./routes/AllRoutes.jsx";
import {AuthProvider} from "./context/AuthProvider.jsx";
import {StrictMode} from "react";
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {CartProvider, useCart} from "./context/CartContext.jsx";

function App() {
    return (<>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        <StrictMode>
            <BrowserRouter>
                <AuthProvider>
                    <CartProvider>
                        <AllRoutes/>
                    </CartProvider>
                </AuthProvider>
            </BrowserRouter>
        </StrictMode>
    </>)
}

export default App

