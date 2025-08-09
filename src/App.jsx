import "./App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";

// الصفحات والمكونات
import Layout from "../src/components/Layout/Layout";
import { Home } from "../src/components/Home/Home";
import { Products } from "../src/components/Products/Products";
import Cart from "../src/components/Cart/Cart";
import WishList from "../src/components/WishList/WishList";
import Brands from "../src/components/Brands/Brands";
import Categories from "../src/components/Categories/Categories";
import SubCategories from "../src/components/SubCategories/SubCategories";
import Login from "../src/components/Login/Login";
import NotFound from "../src/components/NotFound/NotFound";
import Register from "../src/components/Register/Register";
import OrdersPage from "./components/Order/orderpage";
import OrderDetails from "./components/Order/OrderDetails";
import ViewProduct from "../src/components/ViewProduct/ViewProduct";
import AuthContextProvider from "./Context/AuthContextProvider";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// لو عندك الكمبوننت ده موجود فعلاً استورديه
// import DetailsModal from "../src/components/DetailsModal/DetailsModal";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },

      // لو الكمبوننت مش موجود، سيب السطر ده متشال
      // { path: "modal", element: <DetailsModal /> },

      { path: "Order", element: <OrdersPage /> },
      { path: "order/:id", element: <OrderDetails /> },

      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "subcategories/:categoryId",
        element: (
          <ProtectedRoute>
            <SubCategories />
          </ProtectedRoute>
        ),
      },
      {
        path: "products/subcategory/:subcategoryId",
        element: (
          <ProtectedRoute>
            <ViewProduct />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "notfound", element: <NotFound /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}
