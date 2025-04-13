import { useState } from "react";
import { OrderSummary } from "./orderSummary";

const Cart = () => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart") || [])
  );

  const [quantity, setQuantity] = useState(1);

  const addItem = (id) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: (item.quantity || 1) + 1 };
      }
      return item;
    });
    setQuantity(quantity + 1);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const removeItem = (id) => {
    const updatedItems = cartItems
      .map((item) => {
        if (item.id === id) {
          const newQuantity = (item.quantity || 1) - 1;
          if (newQuantity >= 1) {
            setQuantity(quantity - 1);
            return { ...item, quantity: newQuantity };
          } else {
            return null;
          }
        }
        return item;
      })
      .filter(Boolean);

    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  return (
    <div className=" m-5 h-200 flex gap-4 grid grid-cols-2">
        <div>
            <div className=" border border-gray-400 m-4 h-170 rounded-md shadow-lg overflow-y-scroll">
        {cartItems.length === 0 ? (
          <div className="text-xl flex items-center justify-center">
            <strong>No items in Cart!!</strong>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="m-2 ">
              <div className="flex gap-25 border border-gray-400 rounded-md h-40">
                <div className="flex flex-col justify-between h-full items-center ml-3">
                  <img className="mt-5 h-18 w-18" src={item.image} alt={item.name} />

                  <div className="mb-3 justify-end text-xl flex gap-4">
                    <button
                      className="cursor-pointer"
                      onClick={() => removeItem(item.id)}
                    >
                      -
                    </button>

                    <p className="">{item.quantity}</p>
                    <button
                      className="cursor-pointer"
                      onClick={() => addItem(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="items-center mt-5">
                  <div>
                    <p className="text-2xl font-bold">{item.name}</p>
                  </div>

                  <div>
                    <p className="font-semibold">{item.category}</p>
                  </div>

                  <div className="">
                    <p className="text-l">
                      <strong>Rs. {item.price}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>


      
        </div>
        <div className="border border-gray-400 m-4 h-170 rounded-md shadow-lg">
            <OrderSummary />
</div>
    </div>
  );
};

export default Cart;
