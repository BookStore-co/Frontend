import React, { useEffect, useState } from "react";
import API from "../api/axiosInstance"; // ✅ your axios setup file

const CheckoutPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🏠 Fetch all saved addresses
  const fetchAddresses = async () => {
    try {
      const res = await API.get("address/showAddress");
      // handle multiple possible response shapes
      if (Array.isArray(res.data)) {
        setAddresses(res.data);
      } else if (Array.isArray(res.data.addresses)) {
        setAddresses(res.data.addresses);
      } else if (res.data && (res.data._id || res.data.street)) {
        setAddresses([res.data]);
      } else {
        setAddresses([]);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setMessage("Failed to load addresses.");
      setAddresses([]);
    }
  };

  // 🛒 Fetch items in cart
  const fetchCartItems = async () => {
    try {
      const res = await API.get("cart/showInCart");
      // handle possible shapes: { items: [...] } or { Items: [...] } or cart object
      if (Array.isArray(res.data.items)) {
        setCartItems(res.data.items);
      } else if (Array.isArray(res.data.Items)) {
        setCartItems(res.data.Items);
      } else if (res.data && Array.isArray(res.data.Items)) {
        setCartItems(res.data.Items);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      // treat 404 as empty cart
      const status = error?.response?.status;
      if (status === 404) {
        setCartItems([]);
      } else {
        console.error("Error fetching cart:", error);
        setMessage("Failed to load cart items.");
      }
      setCartItems([]);
    }
  };

  // ⚙️ Fetch addresses + cart on component mount
  useEffect(() => {
    fetchAddresses();
    fetchCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 🧾 Handle checkout
  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!selectedAddress) return alert("Please select an address!");

    const addrObj = addresses.find((a) => a._id === selectedAddress);
    if (!addrObj) return alert("Selected address not found.");

    setLoading(true);
    setMessage("");

    try {
      // backend expects shippingAddress object for /cart/checkout
      const payload = {
        shippingAddress: {
          fullName: addrObj.fullName || addrObj.name || "",
          email: addrObj.email || "",
          phone: addrObj.phone || "",
          street: addrObj.street,
          city: addrObj.city,
          state: addrObj.state,
          zipCode: addrObj.zipCode || addrObj.zip || "",
          country: addrObj.country || "India",
        },
        paymentMethod,
      };

      // call cart checkout endpoint
      const res = await API.post("cart/checkout", payload);

      setMessage("✅ Order placed successfully!");
      console.log("Order:", res.data.order || res.data);

      // Optional: Clear cart UI after placing order
      setCartItems([]);
    } catch (error) {
      console.error("Checkout error:", error);
      const errMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to place order. Try again.";
      setMessage(`❌ ${errMsg}`);
    } finally {
      setLoading(false);
    }
  };

  // 🧱 Component UI
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      {/* ADDRESS SECTION */}
      <div className="border rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">Select Shipping Address</h2>
        {addresses.length === 0 ? (
          <p>No addresses found.</p>
        ) : (
          addresses.map((addr) => (
            <div
              key={addr._id}
              className="flex items-center border-b py-2 cursor-pointer"
              onClick={() => setSelectedAddress(addr._id)}
            >
              <input
                type="radio"
                name="selectedAddress"
                checked={selectedAddress === addr._id}
                onChange={() => setSelectedAddress(addr._id)}
                className="mr-3 accent-blue-600"
              />
              <label>
                <span className="font-medium">{addr.street}</span>
                {addr.city || addr.state || addr.zip ? (
                  <>
                    , {addr.city} {addr.city && addr.state ? "," : ""}{" "}
                    {addr.state} - {addr.zip || addr.zipCode}
                  </>
                ) : null}
              </label>
            </div>
          ))
        )}
      </div>

      {/* CART SECTION */}
      <div className="border rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item, i) => (
              <li key={i} className="mb-2">
                {item.BookId?.title || item?.BookId?.title} × {item.quantity}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* PAYMENT SECTION */}
      <div className="border rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">Payment Method</h2>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border p-2 rounded-md w-full"
        >
          <option value="cash_on_delivery">Cash on Delivery</option>
          <option value="razorpay">Razorpay</option>
        </select>
      </div>

      {/* BUTTON */}
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="bg-blue-600 text-white w-full py-3 rounded-md font-semibold hover:bg-blue-700 transition"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>

      {/* MESSAGE */}
      {message && (
        <p
          className={`text-center mt-4 font-medium ${
            message.includes("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default CheckoutPage;
