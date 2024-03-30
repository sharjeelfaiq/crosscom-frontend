import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Products from "./pages/Products/Products";
import UpdateProduct from "./pages/UpdateProduct//UpdateProduct";
import Signin from "./pages/Signin/Signin";

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
        path: "/update/:pid",
        element: <UpdateProduct />,
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
