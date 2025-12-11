import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "../../types/product";

function PageProductList() {
  const [productos, setProductos] = useState<Product[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    fetch("http://localhost:3001/productos")
      .then((response) => response.json())
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error cargando productos:", error);
        setCargando(false);
      });
  };

  const handleEliminar = async (id: string | undefined) => {
    if (!id) return;
    
    if (window.confirm("¿Estás seguro de eliminar este producto del inventario?")) {
      try {
        await fetch(`http://localhost:3001/productos/${id}`, {
          method: "DELETE",
        });
        // Actualizamos la tabla filtrando el eliminado
        setProductos((prev) => prev.filter((prod) => prod.id !== id));
      } catch (error) {
        alert("Error al eliminar el producto");
      }
    }
  };

  // Función auxiliar para formatear dinero (Ej: 1500 -> $ 1,500.00)
  const formatoMoneda = (valor: number) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN", // Puedes cambiar a USD si prefieres dólares
    }).format(valor);
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header bg-danger bg-gradient text-white p-3 d-flex justify-content-between align-items-center rounded-top-4">
          <h4 className="mb-0">
            <i className="bi bi-box-seam me-2"></i> Inventario de Productos
          </h4>
          <Link to="/Productos" className="btn btn-light text-danger fw-bold btn-sm">
            <i className="bi bi-plus-lg me-1"></i> Nuevo Producto
          </Link>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">Código</th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Descripción</th>
                  <th className="text-end pe-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {!cargando && productos.map((prod) => (
                  <tr key={prod.id}>
                    <td className="ps-4 font-monospace fw-bold text-secondary">
                      {prod.codigo}
                    </td>
                    <td className="fw-bold">{prod.nombre}</td>
                    <td className="text-success fw-bold">
                      {formatoMoneda(Number(prod.precio))}
                    </td>
                    <td>
                      {prod.activo ? (
                        <span className="badge bg-success bg-opacity-10 text-success border border-success px-3 py-2 rounded-pill">
                          <i className="bi bi-check-circle-fill me-1"></i> Activo
                        </span>
                      ) : (
                        <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary px-3 py-2 rounded-pill">
                          <i className="bi bi-slash-circle me-1"></i> Inactivo
                        </span>
                      )}
                    </td>
                    <td className="text-muted small text-truncate" style={{ maxWidth: "200px" }}>
                      {prod.descripcion}
                    </td>
                    <td className="text-end pe-4">
                      <div className="btn-group">
                        <button
                          onClick={() => navigate(`/Productos/editar/${prod.id}`)}
                          className="btn btn-outline-primary btn-sm"
                          title="Editar"
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button
                          onClick={() => handleEliminar(prod.id)}
                          className="btn btn-outline-danger btn-sm"
                          title="Eliminar"
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mensaje de carga o vacío */}
            {cargando && (
              <div className="text-center p-5">
                <div className="spinner-border text-danger" role="status"></div>
                <p className="mt-2 text-muted">Cargando inventario...</p>
              </div>
            )}
            
            {!cargando && productos.length === 0 && (
              <div className="text-center p-5 text-muted">
                <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                No hay productos registrados.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageProductList;