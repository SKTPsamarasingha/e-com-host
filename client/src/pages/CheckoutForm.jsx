import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { checkoutSchema } from "../../validators/checkoutSchema.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { orderService } from "../api/orderService.js";

const CheckoutPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(checkoutSchema),
    defaultValues: {
      payment: { method: "CARD" },
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await orderService.checkout(data);
      console.log(res);

      toast.success("Order placed successfully");
      navigate("/orders");
    } catch (err) {
      console.warn(err);
      toast.error(err.message || "Checkout failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Shipping */}
          <h2 className="font-semibold text-lg">Shipping Address</h2>

          <input
            {...register("shippingData.fullName")}
            placeholder="Full Name"
            className="w-full border px-3 py-2 rounded"
          />
          {errors.shippingData?.fullName && (
            <p className="text-red-500 text-sm">
              {errors.shippingData.fullName.message}
            </p>
          )}

          <input
            {...register("shippingData.addressLine1")}
            placeholder="Address Line"
            className="w-full border px-3 py-2 rounded"
          />
          {errors.shippingData?.addressLine1 && (
            <p className="text-red-500 text-sm">
              {errors.shippingData.addressLine1.message}
            </p>
          )}

          <input
            {...register("shippingData.city")}
            placeholder="City"
            className="w-full border px-3 py-2 rounded"
          />
          {errors.shippingData?.city && (
            <p className="text-red-500 text-sm">
              {errors.shippingData.city.message}
            </p>
          )}

          <input
            {...register("shippingData.postalCode")}
            placeholder="Postal Code"
            className="w-full border px-3 py-2 rounded"
          />
          {errors.shippingData?.postalCode && (
            <p className="text-red-500 text-sm">
              {errors.shippingData.postalCode.message}
            </p>
          )}

          <input
            {...register("shippingData.country")}
            placeholder="Country"
            className="w-full border px-3 py-2 rounded"
          />
          {errors.shippingData?.country && (
            <p className="text-red-500 text-sm">
              {errors.shippingData.country.message}
            </p>
          )}

          {/* Payment */}
          <h2 className="font-semibold text-lg mt-4">Payment</h2>

          <select
            {...register("payment.method")}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="CARD">Card</option>
            <option value="CASH_ON_DELIVERY">Cash on Delivery</option>
          </select>

          {errors.payment?.method && (
            <p className="text-red-500 text-sm">
              {errors.payment.method.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
