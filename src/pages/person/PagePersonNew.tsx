import { Link, useParams, useNavigate } from "react-router-dom"; // Importamos useParams y useNavigate
import { usePersonForm } from "../../hooks/usePersonForm";
import { useEffect } from "react";

function PagePersonNew() {
  // 1. Obtenemos el ID de la URL (si existe)
  const { id } = useParams(); 
  const navigate = useNavigate();

  // 2. Se lo pasamos al hook
  const {
    formData,
    errores,
    handleChange,
    handleSubmit,
    enviado, // Variable que nos dice si se guardó con éxito
    enviando,
  } = usePersonForm(id);

  // 3. EFECTO EXTRA: Si ya se guardó, regresamos a la lista automáticamente
  useEffect(() => {
    if (enviado) {
       // Esperamos 1.5 segundos para que el usuario vea el mensaje de éxito y luego redirigimos
       const timer = setTimeout(() => {
         navigate("/Empleados-list"); 
       }, 1500);
       return () => clearTimeout(timer);
    }
  }, [enviado, navigate]);

  return (
    <div className="container mt-4">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header bg-dark text-white p-3 d-flex justify-content-between align-items-center rounded-top-4">
          <h4 className="mb-0">
             {/* Cambiamos el título según si estamos editando o creando */}
            <i className="bi bi-person-plus-fill me-2"></i> 
            {id ? "Editar Empleado" : "Nuevo Empleado"}
          </h4>
          <Link to="/Empleados-list" className="btn btn-outline-light btn-sm">
            <i className="bi bi-arrow-left me-1"></i> Volver
          </Link>
        </div>

        <div className="card-body p-4">
          
          {/* Alerta de Éxito */}
          {enviado && (
            <div className="alert alert-success d-flex align-items-center" role="alert">
              <i className="bi bi-check-circle-fill me-2 fs-5"></i>
              <div>
                {id ? "¡Empleado actualizado correctamente!" : "¡Empleado registrado con éxito!"}
                Redirigiendo...
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="row g-3">
              
              {/* CAMPO CODIGO */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Código</label>
                <input
                  type="text"
                  className={`form-control ${errores.codigo ? "is-invalid" : ""}`}
                  placeholder="Ej: 77123456"
                  value={formData.codigo}
                  onChange={(e) => handleChange("codigo", e.target.value)}
                />
                {errores.codigo && <div className="invalid-feedback">{errores.codigo}</div>}
              </div>

              {/* CAMPO PRIVILEGIO */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Privilegio / Rol</label>
                <select
                  className={`form-select ${errores.privilegio ? "is-invalid" : ""}`}
                  value={formData.privilegio}
                  onChange={(e) => handleChange("privilegio", e.target.value)}
                >
                  <option value="">Seleccione...</option>
                  <option value="Admin">Administrador</option>
                  <option value="User">Usuario</option>
                  <option value="Guest">Invitado</option>
                </select>
                {errores.privilegio && <div className="invalid-feedback">{errores.privilegio}</div>}
              </div>

              {/* CAMPO NOMBRE */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Nombres</label>
                <input
                  type="text"
                  className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
                  value={formData.nombre}
                  onChange={(e) => handleChange("nombre", e.target.value)}
                />
                {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
              </div>

              {/* CAMPO APELLIDO */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Apellidos</label>
                <input
                  type="text"
                  className={`form-control ${errores.apellido ? "is-invalid" : ""}`}
                  value={formData.apellido}
                  onChange={(e) => handleChange("apellido", e.target.value)}
                />
                {errores.apellido && <div className="invalid-feedback">{errores.apellido}</div>}
              </div>

              {/* CAMPO GENERO */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Género</label>
                <div className="d-flex gap-3 mt-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="genero"
                      id="genM"
                      value="Masculino"
                      checked={formData.genero === "Masculino"}
                      onChange={(e) => handleChange("genero", e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="genM">Masculino</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="genero"
                      id="genF"
                      value="Femenino"
                      checked={formData.genero === "Femenino"}
                      onChange={(e) => handleChange("genero", e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="genF">Femenino</label>
                  </div>
                </div>
                {errores.genero && <div className="text-danger small mt-1">{errores.genero}</div>}
              </div>

              {/* CAMPO CORREO */}
              <div className="col-md-6">
                <label className="form-label fw-bold">Correo Electrónico</label>
                <input
                  type="email"
                  className={`form-control ${errores.correo ? "is-invalid" : ""}`}
                  placeholder="ejemplo@correo.com"
                  value={formData.correo}
                  onChange={(e) => handleChange("correo", e.target.value)}
                />
                {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
              </div>
            </div>

            <hr className="my-4" />

            <div className="d-flex justify-content-end gap-2">
               <Link to="/Empleados-list" className="btn btn-secondary">
                  Cancelar
               </Link>
               <button type="submit" className="btn btn-primary px-4" disabled={enviando}>
                  {enviando ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-save me-2"></i> {id ? "Actualizar" : "Guardar"}
                    </>
                  )}
               </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PagePersonNew;