import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useCart = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("access-token");

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://foodieserver-9u62.onrender.com/carts?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });
  return [cart, refetch];
};

export default useCart;
