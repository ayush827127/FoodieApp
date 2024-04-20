import React, { useContext, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import useCart from "../../hooks/useCart";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const [cartItem, setCartItems] = useState([]);

  const calculatedPrice = (item) => {
    return item.price * item.quantity;
    // subTotalFinal();
  };

  const subTotalFinal = () => {
    if (user) {
      const subTotal = cart.reduce((total, item) => {
        return total + calculatedPrice(item);
      }, 0);
      return subTotal;
    }
    else{
      return 0;
    }
  };
  
  const orderTotal = subTotalFinal().toFixed(2);
  // console.log("orderTotal"+ orderTotal)

  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      try {
        const response = await fetch(
          `https://foodieserver-9u62.onrender.com/carts/${item._id}`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({ quantity: item.quantity - 1 }),
          }
        );
        if (response.ok) {
          const updateCarts = cartItem.map((cartItem) => {
            if (cartItem._id === item._id) {
              return { ...cartItem, quantity: cartItem.quantity - 1 };
            }
            return cartItem;
          });
          await refetch();
          setCartItems(updateCarts);
        } else {
          console.error("Failed to update quantity");
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    } else {
      alert("Item Can't be Zero");
    }
  };
  const handleIncrease = async (item) => {
    try {
      const response = await fetch(`https://foodieserver-9u62.onrender.com/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ quantity: item.quantity + 1 }),
      });
      if (response.ok) {
        const updateCarts = cartItem.map((cartItem) => {
          if (cartItem._id === item._id) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        });
        await refetch();
        setCartItems(updateCarts);
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you Sure",
      text: "You won't be able to revert it.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://foodieserver-9u62.onrender.com/carts/${item._id}`)
          .then((response) => {
            if (response) {
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* banner */}
      <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-36 flex flex-col justify-center items-center gap-8">
          {/* texts */}
          <div className="px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Items Added to The <span className="text-green"> Cart</span>
            </h2>
          </div>
        </div>
      </div>
      \{/* table- for cart content */}
      {cart.length > 0 ? (
        <div>
          <div className="">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead className="bg-green text-white rounded-sm">
                  <tr>
                    <th>#</th>
                    <th>Food</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {cart.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={item.image}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="font-medium">{item.name}</td>
                      <td>
                        <button
                          className="btn btn-xs"
                          onClick={() => handleDecrease(item)}
                        >
                          -{" "}
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleChange(e, item)}
                          className="w-10 mx-2 text-center overflow-hidden appearance-none "
                        />
                        <button
                          className="btn btn-xs"
                          onClick={() => handleIncrease(item)}
                        >
                          +
                        </button>
                      </td>
                      <td>${calculatedPrice(item).toFixed(2)}</td>
                      <th>
                        <button
                          className="btn btn-ghost btn-xs text-red"
                          onClick={() => handleDelete(item)}
                        >
                          <FaTrash />
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Customer ddetails */}
          <div className="my-12 flex flex-col md:flex-row justify-between items-start">
            <div className="md:w-1/2 space-y-3">
              <h3 className="font-medium">Customer Details </h3>
              <p>Name: {user.displayName} </p>
              <p>email: {user.email} </p>
              <p>User_id: {user.uid} </p>
            </div>
            <div className="md:w-1/2 space-y-3">
              <h3 className="font-medium">Shooping Details </h3>
              <p>Total items: {cart.length} </p>
              <p>Total Price: ${orderTotal} </p>
              <button className="btn bg-green text-white">
                Proceed Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-20">
          <p>Cart is empty. Please add products.</p>
          <Link to="/menu">
            <button className="btn bg-green text-white mt-3">
              Back to Menu
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
