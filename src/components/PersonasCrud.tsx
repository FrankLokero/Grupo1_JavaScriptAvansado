import { useState, useEffect } from "react";

// 1. Definimos la estructura de los datos según tu db.json
interface Persona {
  id?: string;
  codigo: number;
  nombre: string;
  apellido: string;
  genero: string;
  correo: string;
  privilegio: string;
}

const PersonasCrud = () => {
  // Estado para la lista de personas (viene de la BD)
  const [personas, setPersonas] = useState<Persona[]>([]);

  // Estado para el formulario (lo que escribe el usuario)
  const [formData, setFormData] = useState<Persona>({
    codigo: 0,
    nombre: "",
    apellido: "",
    genero: "Masculino",
    correo: "",
    privilegio: "User",
  });

  // 2. FUNCIÓN CARGAR: Pide los datos al backend cuando arranca la página
  const cargarPersonas = async () => {
    try {
      const respuesta = await fetch("http://localhost:3001/personas");
      const datos = await respuesta.json();
      setPersonas(datos);
    } catch (error) {
      console.error("Error cargando personas:", error);
    }
  };

  // Usamos useEffect para cargar al inicio
  useEffect(() => {
    cargarPersonas();
  }, []);

  // 3. FUNCIÓN GUARDAR: Envía los datos al backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que se recargue la página

    try {
      await fetch("http://localhost:3001/personas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Limpiamos el form y recargamos la lista
      setFormData({
        codigo: 0,
        nombre: "",
        apellido: "",
        genero: "Masculino",
        correo: "",
        privilegio: "User",
      });
      cargarPersonas();
      alert("¡Persona guardada con éxito!");
    } catch (error) {
      console.error("Error guardando:", error);
    }
  };

  // Maneja los cambios en los inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        {/* COLUMNA IZQUIERDA: FORMULARIO */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-dark text-white">Nueva Persona</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label className="form-label">Código</label>
                  <input
                    type="number"
                    name="codigo"
                    className="form-control"
                    value={formData.codigo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Apellido</label>
                  <input
                    type="text"
                    name="apellido"
                    className="form-control"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Correo</label>
                  <input
                    type="email"
                    name="correo"
                    className="form-control"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Género</label>
                  <select
                    name="genero"
                    className="form-select"
                    value={formData.genero}
                    onChange={handleChange}
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Privilegio</label>
                  <select
                    name="privilegio"
                    className="form-select"
                    value={formData.privilegio}
                    onChange={handleChange}
                  >
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Guardar
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: TABLA LISTA */}
        <div className="col-md-8">
          <h3 className="mb-3">Listado de Personas (desde db.json)</h3>
          <table className="table table-striped table-hover border">
            <thead className="table-dark">
              <tr>
                <th>Cód</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {personas.map((p) => (
                <tr key={p.id}>
                  <td>{p.codigo}</td>
                  <td>
                    {p.nombre} {p.apellido}
                  </td>
                  <td>{p.correo}</td>
                  <td>
                    <span
                      className={`badge ${
                        p.privilegio === "Admin" ? "bg-danger" : "bg-success"
                      }`}
                    >
                      {p.privilegio}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PersonasCrud;
