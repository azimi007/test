import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Main from "../pages/Main";
import AddEditForm from "../pages/AddEditForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Main />,
  },
  {
    path: "/form/:id",
    element: <AddEditForm />,
  },
  {
    path: "/form",
    element: <AddEditForm />,
  },
]);
