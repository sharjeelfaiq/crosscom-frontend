import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function Template() {
  return (
    <>
      <Header />
      <div style={{ height: "calc(100dvh - 10rem)" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    children: [
      {
        path: "/",
        element: <Products />,
      },
      {
        path: "/add",
        element: <AddProduct />,
      },
      {
        path: "/update/:pid",
        element: <UpdateProduct />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
