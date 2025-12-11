import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Si no tienes el type creado, usa 'any' por ahora, o crea supplier.d.ts similar a customer
import { Supplier } from "../../types/supplier"; 

function PageSupplierList() {
  const [proveedores, setProveedores] = useState<Supplier[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Endpoint asumido: proveedores
    fetch("http://localhost:3001/proveedores")
      .then((res) => res.json())
      .then((data) => {
        setProveedores(data);
        setCargando(false);
      });
  }, []);

  const handleEliminar = async (id: any) => {
    if (window.confirm("¿Eliminar proveedor?")) {
      await fetch(`http://localhost:3001/proveedores/${id}`, { method: "DELETE" });
      setProveedores((prev) => prev.filter((p: any) => p.id !== id));
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header bg-warning text-dark p-3 d-flex justify-content-between align-items-center rounded-top-4">
          <h4 className="mb-0"><i className="bi bi-truck me-2"></i> Proveedores</h4>
          <Link to="/Proveedor" className="btn btn-dark btn-sm">
            <i className="bi bi-plus-lg me-1"></i> Nuevo
          </Link>
        </div>
        <div className="card-body p-0">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">ID</th>
                {/* Ajusta estos campos según tu db.json real */}
                <th>Empresa / Nombre</th> 
                <th>RUC / DNI</th>
                <th>Teléfono</th>
                <th className="text-end pe-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {!cargando && proveedores.map((prov: any) => (
                <tr key={prov.id}>
                  <td className="ps-4">#{prov.id}</td>
                  <td className="fw-bold">{prov.nombre}</td>
                  <td>{prov.ruc || prov.dni}</td>
                  <td>{prov.telefono}</td>
                  <td className="text-end pe-4">
                    <button onClick={() => navigate(`/Proveedor/editar/${prov.id}`)} className="btn btn-outline-primary btn-sm me-2">
                        <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button onClick={() => handleEliminar(prov.id)} className="btn btn-outline-danger btn-sm">
                        <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default PageSupplierList;