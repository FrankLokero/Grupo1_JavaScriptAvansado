import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // 1. Importamos useNavigate
import { Person } from "../../types/person"; // Tu ruta corregida

function PagePersonList() {
  const [listaPersonas, setListaPersonas] = useState<Person[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  
  // Hook para navegar a otras paginas desde funciones
  const navigate = useNavigate(); 

  useEffect(() => {
    cargarDatos();
  }, []);

  // Separé la carga en una función por si necesitamos recargar
  const cargarDatos = () => {
    fetch("http://localhost:3001/personas")
      .then((response) => response.json())
      .then((data) => {
        setListaPersonas(data);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setCargando(false);
      });
  };

  // --- FUNCIÓN PARA ELIMINAR (NUEVO) ---
  const handleEliminar = async (id: string) => {
    // 1. Preguntar confirmación
    if (!window.confirm("¿Estás seguro de eliminar este empleado?")) {
      return;
    }

    try {
      // 2. Petición DELETE al servidor
      const response = await fetch(`http://localhost:3001/personas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // 3. Actualizar la lista visualmente (filtro el que borré)
        setListaPersonas((prevLista) => 
          prevLista.filter((persona) => persona.id !== id)
        );
        alert("Empleado eliminado correctamente");
      } else {
        alert("Error al eliminar en el servidor");
      }
    } catch (error) {
      console.error("Error eliminando:", error);
      alert("Error de conexión");
    }
  };

  // --- FUNCIÓN PARA EDITAR (NUEVO) ---
  const handleEditar = (id: string) => {
    // Redirige a la ruta de edición. 
    // NOTA: Asegúrate de tener esta ruta creada en tu App.tsx o Router
    navigate(`/Empleados/editar/${id}`);
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header bg-dark text-white p-3 d-flex justify-content-between align-items-center rounded-top-4">
          <h4 className="mb-0">
            <i className="bi bi-people me-2"></i> Lista de Empleados
          </h4>
          <Link to="/Empleados" className="btn btn-success btn-sm">
            <i className="bi bi-plus-lg me-1"></i> Nuevo Empleado
          </Link>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th className="py-3 ps-4">ID</th>
                  <th className="py-3">Empleado</th>
                  <th className="py-3">DNI/Código</th>
                  <th className="py-3">Género</th>
                  <th className="py-3">Correo</th>
                  <th className="py-3 text-end pe-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cargando && (
                  <tr>
                    <td colSpan={6} className="text-center p-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                      </div>
                    </td>
                  </tr>
                )}

                {!cargando && listaPersonas.map((persona) => (
                  <tr key={persona.id || persona.codigo}>
                    <td className="ps-4 fw-bold text-secondary">#{persona.id}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div
                          className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center me-2"
                          style={{ width: "35px", height: "35px" }}
                        >
                          {persona.nombre.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="fw-bold">{persona.nombre}</div>
                          <div className="small text-muted">{persona.apellido}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge bg-secondary">{persona.codigo}</span></td>
                    <td>{persona.genero}</td>
                    <td>{persona.correo}</td>
                    <td className="text-end pe-4">
                      <div className="btn-group" role="group">
                        
                        {/* BOTÓN EDITAR CON ONCLICK */}
                        <button
                          className="btn btn-outline-primary btn-sm"
                          title="Editar"
                          onClick={() => persona.id && handleEditar(persona.id)}
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>

                        {/* BOTÓN ELIMINAR CON ONCLICK */}
                        <button
                          className="btn btn-outline-danger btn-sm"
                          title="Eliminar"
                          onClick={() => persona.id && handleEliminar(persona.id)}
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}

                {!cargando && listaPersonas.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center p-3 text-muted">
                      No hay registros disponibles.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer bg-white p-3 text-muted small text-end rounded-bottom-4">
          Mostrando {listaPersonas.length} registros del sistema
        </div>
      </div>
    </div>
  );
}

export default PagePersonList;