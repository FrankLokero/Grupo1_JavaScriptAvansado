import { usePostForm } from "../../hooks/usePostForm";
import { ChangeEvent } from "react";

const PagePostNew = () => {
  const {
    formData,
    errores,
    enviado,
    enviando,
    handleChange,
    handleSubmit,
    handleReset,
  } = usePostForm();

  const handleInputChange =
    (campo: keyof typeof formData) => (e: ChangeEvent<HTMLInputElement>) => {
      const valor =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      handleChange(campo, valor);
    };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-info bg-gradient text-white p-4 rounded-top-4">
              <h3 className="mb-0 fw-bold text-shadow">
                <i className="bi bi-briefcase-fill me-2"></i> Nuevo Cargo
              </h3>
              <small className="text-white opacity-75">
                Definición de puestos laborales
              </small>
            </div>

            <div className="card-body p-5">
              {enviado && (
                <div
                  className="alert alert-success d-flex align-items-center shadow-sm"
                  role="alert"
                >
                  <i className="bi bi-check-circle-fill fs-4 me-2"></i>
                  <div>
                    <strong>¡Correcto!</strong> Cargo registrado.
                  </div>
                  <button
                    type="button"
                    className="btn-close ms-auto"
                    onClick={() => handleChange("enviado" as any, false)}
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* CODIGO */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold text-secondary">
                      Código
                    </label>
                    <input
                      type="text"
                      value={formData.codigo}
                      onChange={handleInputChange("codigo")}
                      className={`form-control ${
                        errores.codigo ? "is-invalid" : ""
                      }`}
                      placeholder="C-01"
                      disabled={enviando}
                    />
                    {errores.codigo && (
                      <div className="invalid-feedback">{errores.codigo}</div>
                    )}
                  </div>

                  {/* NOMBRE DEL CARGO */}
                  <div className="col-md-8">
                    <label className="form-label fw-semibold text-secondary">
                      Nombre del Cargo
                    </label>
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={handleInputChange("nombre")}
                      className={`form-control ${
                        errores.nombre ? "is-invalid" : ""
                      }`}
                      placeholder="Ej: Gerente de Ventas"
                      disabled={enviando}
                    />
                    {errores.nombre && (
                      <div className="invalid-feedback">{errores.nombre}</div>
                    )}
                  </div>

                  {/* DESCRIPCION / APELLIDO (Asumo que 'apellido' es un error de copy-paste en tu original y debería ser descripción, pero lo dejo como apellido por seguridad) */}
                  <div className="col-12">
                    <label className="form-label fw-semibold text-secondary">
                      Descripción / Detalle
                    </label>
                    <input
                      type="text"
                      value={formData.apellido} // OJO: Tu hook original usa 'apellido', quizás quieras cambiar esto luego
                      onChange={handleInputChange("apellido")}
                      className={`form-control ${
                        errores.apellido ? "is-invalid" : ""
                      }`}
                      placeholder="Descripción del puesto"
                      disabled={enviando}
                    />
                    {errores.apellido && (
                      <div className="invalid-feedback">{errores.apellido}</div>
                    )}
                  </div>

                  {/* PRIVILEGIO */}
                  <div className="col-12">
                    <label className="form-label fw-semibold text-secondary">
                      Nivel de Privilegio
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <i className="bi bi-shield-check"></i>
                      </span>
                      <input
                        type="text"
                        value={formData.privilegio}
                        onChange={handleInputChange("privilegio")}
                        className={`form-control ${
                          errores.privilegio ? "is-invalid" : ""
                        }`}
                        placeholder="Alto / Medio / Bajo"
                        disabled={enviando}
                      />
                      {errores.privilegio && (
                        <div className="invalid-feedback">
                          {errores.privilegio}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* BOTONES */}
                  <div className="col-12 mt-4 pt-2">
                    <div className="d-grid gap-2">
                      <button
                        type="submit"
                        disabled={enviando}
                        className="btn btn-info text-white fw-bold shadow-sm"
                      >
                        {enviando ? "Guardando..." : "Guardar Cargo"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-light border"
                        onClick={handleReset}
                        disabled={enviando}
                      >
                        Limpiar formulario
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagePostNew;
