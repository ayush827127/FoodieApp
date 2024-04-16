import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthProvider";

function Main() {
  const { loading } = useContext(AuthContext);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Navbar />
          <div className="min-h-screen">
          <Outlet />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}
export default Main;
