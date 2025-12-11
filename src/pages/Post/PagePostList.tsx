import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Asumiendo interface Post
import { Post } from "../../types/post"; 

function PagePostList() {
  const [cargos, setCargos] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/cargos")
      .then((res) => res.json())
      .then((data) => setCargos(data));
  }, []);

  const handleEliminar = async (id: any) => {
    if (window.confirm("¿Eliminar cargo?")) {
      await fetch(`http://localhost:3001/cargos/${id}`, { method: "DELETE" });
      setCargos((prev) => prev.filter((c: any) => c.id !== id));
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow rounded-4">
            <div className="card-header bg-info text-white p-3 d-flex justify-content-between align-items-center">
              <h4 className="mb-0"><i className="bi bi-briefcase-fill me-2"></i> Lista de Cargos</h4>
              <Link to="/Cargo" className="btn btn-light text-info fw-bold btn-sm">Nuevo</Link>
            </div>
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                {cargos.map((cargo: any) => (
                  <li key={cargo.id} className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <div>
                      <span className="fw-bold fs-5">{cargo.nombre}</span>
                      <div className="small text-muted">ID: {cargo.id}</div>
                    </div>
                    <div>
                        <button onClick={() => navigate(`/Cargo/editar/${cargo.id}`)} className="btn btn-outline-primary btn-sm me-2">
                            <i className="bi bi-pencil"></i>
                        </button>
                        <button onClick={() => handleEliminar(cargo.id)} className="btn btn-outline-danger btn-sm">
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PagePostList;