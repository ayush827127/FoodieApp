import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";
import DashBoardLayout from "../layout/DashBoardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import User from "../pages/dashboard/admin/User"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "/cart-items",
        element: <CartPage />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <DashBoardLayout />,
    children: [
      {
        path: '',
        element: <Dashboard/>
      },
      {
        path: "user",
        element: <User/>
      }
    ]
  },
]);

export default router;
