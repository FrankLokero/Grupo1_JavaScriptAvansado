import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Customer } from "../../types/customer";

function PageCustomerList() {
  const [clientes, setClientes] = useState<Customer[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = () => {
    // Asegúrate que tu db.json tenga "clientes"
    fetch("http://localhost:3001/clientes")
      .then((response) => response.json())
      .then((data) => {
        setClientes(data);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setCargando(false);
      });
  };

  const handleEliminar = async (id: string | number | undefined) => {
    if (!id) return;
    if (!window.confirm("¿Seguro que deseas eliminar este cliente?")) return;

    try {
      await fetch(`http://localhost:3001/clientes/${id}`, { method: "DELETE" });
      setClientes((prev) => prev.filter((item) => item.id !== id)); // Asumiendo que JSON-Server agrega un campo "id"
    } catch (error) {
      alert("Error al eliminar");
    }
  };

  const handleEditar = (id: string | number | undefined) => {
    if (id) navigate(`/Clientes/editar/${id}`);
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header bg-success text-white p-3 d-flex justify-content-between align-items-center rounded-top-4">
          <h4 className="mb-0"><i className="bi bi-people-fill me-2"></i> Clientes</h4>
          <Link to="/Clientes" className="btn btn-light text-success btn-sm fw-bold">
            <i className="bi bi-plus-lg me-1"></i> Nuevo
          </Link>
        </div>
        <div className="card-body p-0">
          <table className="table table-hover table-striped mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th className="ps-4">DNI</th>
                <th>Nombre Completo</th>
                <th>Género</th>
                <th>Correo</th>
                <th className="text-end pe-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {!cargando && clientes.map((cliente: any) => ( // Usamos any temporalmente por si el ID autogenerado no está en tu interface
                <tr key={cliente.id}>
                  <td className="ps-4 fw-bold">{cliente.dni}</td>
                  <td>{cliente.nombre} {cliente.apellido}</td>
                  <td>{cliente.genero}</td>
                  <td>{cliente.correo}</td>
                  <td className="text-end pe-4">
                    <button onClick={() => handleEditar(cliente.id)} className="btn btn-outline-primary btn-sm me-2">
                        <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button onClick={() => handleEliminar(cliente.id)} className="btn btn-outline-danger btn-sm">
                        <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {cargando && <div className="p-3 text-center">Cargando clientes...</div>}
        </div>
      </div>
    </div>
  );
}
export default PageCustomerList;