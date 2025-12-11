import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// IMPORTAMOS EL GUARDIA DE SEGURIDAD
import ProtectedRoute from "./components/ProtectedRoute"; // <--- NUEVO

// Layouts
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Paginas Generales
import PageAbout from "./pages/PageAbout";
import PageLogin from "./pages/auth/PageLogin";

// ... (Tus otros imports de páginas se mantienen igual) ...
// Paginas de Empleados, Productos, Clientes, etc.
import PagePersonList from "./pages/person/PagePersonList";
import PagePersonNew from "./pages/person/PagePersonNew";
import PageProductNewCapa from "./pages/product/PageProductNew";
import PageProductList from "./pages/product/PageProductList";
import PageCategoryNew from "./pages/category/PageCategoryNew";
import PageCustomerNew from "./pages/customer/PageCustomernew";
import PageCustomerList from "./pages/customer/PageCustomerList";
import PageSupplierNew from "./pages/supplier/PageSupplierNew";
import PageSupplierList from "./pages/supplier/PageSupplierList";
import PagePostNew from "./pages/Post/PagePostNew";
import PagePostList from "./pages/Post/PagePostList";
import PageSaleNew from "./pages/sale/PageSaleNew";


const router = createBrowserRouter([
  // 1. LOGIN (Pública, cualquiera puede entrar)
  { 
    path: "/login", 
    element: <PageLogin /> 
  },

  // 2. RUTAS PROTEGIDAS (Privadas)
  {
    path: "/",
    // AQUI ESTA EL TRUCO:
    // Envolvemos el MainLayout con ProtectedRoute.
    // Si no hay login, ProtectedRoute no dejará cargar MainLayout y te mandará a /login
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ), 
    children: [
      { path: "/", element: <DashboardLayout /> }, // Esta será la primera que intentará cargar
      { path: "about", element: <PageAbout /> },

      // --- EMPLEADOS ---
      { path: "Empleados-list", element: <PagePersonList /> }, 
      { path: "Empleados", element: <PagePersonNew /> },       
      { path: "Empleados/editar/:id", element: <PagePersonNew /> }, 

      // --- CLIENTES ---
      { path: "Clientes-list", element: <PageCustomerList /> }, 
      { path: "Clientes", element: <PageCustomerNew /> },
      { path: "Clientes/editar/:id", element: <PageCustomerNew /> },

      // --- PROVEEDORES ---
      { path: "Proveedor-list", element: <PageSupplierList /> }, 
      { path: "Proveedor", element: <PageSupplierNew /> },
      { path: "Proveedor/editar/:id", element: <PageSupplierNew /> },

      // --- CARGOS ---
      { path: "Cargo-list", element: <PagePostList /> }, 
      { path: "Cargo", element: <PagePostNew /> },
      { path: "Cargo/editar/:id", element: <PagePostNew /> },

      // --- PRODUCTOS ---
      { path: "Productos-list", element: <PageProductList /> }, 
      { path: "Productos", element: <PageProductNewCapa /> }, 
      { path: "Productos/editar/:id", element: <PageProductNewCapa /> },

      // --- OTROS ---
      { path: "Categorias", element: <PageCategoryNew /> },
      { path: "Ventas", element: <PageSaleNew /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;