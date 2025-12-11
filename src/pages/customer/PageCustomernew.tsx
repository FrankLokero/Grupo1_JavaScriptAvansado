import { useCustomerForm } from "../../hooks/useCustomerForm";
import { ChangeEvent } from "react";

const PageCustomerNew = () => {
  const {
    formData,
    errores,
    enviado,
    enviando,
    handleChange,
    handleSubmit,
    handleReset,
  } = useCustomerForm();

  const handleInputChange =
    (campo: keyof typeof formData) => (e: ChangeEvent<HTMLInputElement>) => {
      const valor =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      handleChange(campo, valor);
    };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-success bg-gradient text-white p-4 rounded-top-4">
              <h3 className="mb-0 fw-bold">
                <i className="bi bi-people-fill me-2"></i> Nuevo Cliente
              </h3>
              <small className="opacity-75">
                Registro de información de clientes
              </small>
            </div>

            <div className="card-body p-5">
              {enviado && (
                <div
                  className="alert alert-success d-flex align-items-center shadow-sm"
                  role="alert"
                >
                  <i className="bi bi-check-circle-fill fs-4 me-2"></i>
                  <div className="flex-grow-1">
                    <strong>¡Éxito!</strong> Cliente guardado correctamente.
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => handleChange("enviado" as any, false)}
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* DNI */}
                  <div className="col-12">
                    <label className="form-label fw-semibold text-secondary">
                      DNI / Identificación
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <i className="bi bi-card-heading"></i>
                      </span>
                      <input
                        type="text"
                        value={formData.dni}
                        onChange={handleInputChange("dni")}
                        className={`form-control ${
                          errores.dni ? "is-invalid" : ""
                        }`}
                        placeholder="Ingrese DNI"
                        disabled={enviando}
                      />
                      {errores.dni && (
                        <div className="invalid-feedback">{errores.dni}</div>
                      )}
                    </div>
                  </div>

                  {/* NOMBRE */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={handleInputChange("nombre")}
                      className={`form-control ${
                        errores.nombre ? "is-invalid" : ""
                      }`}
                      disabled={enviando}
                    />
                    {errores.nombre && (
                      <div className="invalid-feedback">{errores.nombre}</div>
                    )}
                  </div>

                  {/* APELLIDO */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary">
                      Apellido
                    </label>
                    <input
                      type="text"
                      value={formData.apellido}
                      onChange={handleInputChange("apellido")}
                      className={`form-control ${
                        errores.apellido ? "is-invalid" : ""
                      }`}
                      disabled={enviando}
                    />
                    {errores.apellido && (
                      <div className="invalid-feedback">{errores.apellido}</div>
                    )}
                  </div>

                  {/* GENERO Y CORREO */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold text-secondary">
                      Género
                    </label>
                    <select
                      className={`form-select ${
                        errores.genero ? "is-invalid" : ""
                      }`}
                      value={formData.genero}
                      onChange={(e: any) =>
                        handleChange("genero", e.target.value)
                      }
                      disabled={enviando}
                    >
                      <option value="">Seleccione...</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                    </select>
                    {errores.genero && (
                      <div className="invalid-feedback">{errores.genero}</div>
                    )}
                  </div>

                  <div className="col-md-8">
                    <label className="form-label fw-semibold text-secondary">
                      Correo
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white">@</span>
                      <input
                        type="text"
                        value={formData.correo}
                        onChange={handleInputChange("correo")}
                        className={`form-control ${
                          errores.correo ? "is-invalid" : ""
                        }`}
                        disabled={enviando}
                      />
                    </div>
                    {errores.correo && (
                      <div className="invalid-feedback">{errores.correo}</div>
                    )}
                  </div>

                  <div className="col-12 mt-4">
                    <div className="d-flex gap-2">
                      <button
                        type="submit"
                        disabled={enviando}
                        className="btn btn-success flex-fill shadow-sm"
                      >
                        {enviando ? "Guardando..." : "Guardar Cliente"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={handleReset}
                        disabled={enviando}
                      >
                        Limpiar
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

export default PageCustomerNew;
