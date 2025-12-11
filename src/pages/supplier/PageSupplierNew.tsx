import { useSupplierForm } from "../../hooks/useSupplierForm";
import { ChangeEvent } from "react";

const PageSupplierNew = () => {
  const {
    formData,
    errores,
    enviado,
    enviando,
    handleChange,
    handleSubmit,
    handleReset,
  } = useSupplierForm();

  const handleInputChange =
    (campo: keyof typeof formData) => (e: ChangeEvent<HTMLInputElement>) => {
      const valor =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      handleChange(campo, valor);
    };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-dark text-white p-4 rounded-top-4">
              <h3 className="mb-0 fw-bold">
                <i className="bi bi-truck me-2"></i> Nuevo Proveedor
              </h3>
              <small className="text-secondary-emphasis">
                Registro de aliados estratégicos
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
                    <strong>¡Hecho!</strong> Proveedor registrado con éxito.
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
                  <div className="col-12">
                    <label className="form-label fw-semibold text-secondary">
                      Código / RUC
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <i className="bi bi-qr-code"></i>
                      </span>
                      <input
                        type="text"
                        value={formData.codigo}
                        onChange={handleInputChange("codigo")}
                        className={`form-control ${
                          errores.codigo ? "is-invalid" : ""
                        }`}
                        placeholder="ID del proveedor"
                        disabled={enviando}
                      />
                      {errores.codigo && (
                        <div className="invalid-feedback">{errores.codigo}</div>
                      )}
                    </div>
                  </div>

                  {/* NOMBRE */}
                  <div className="col-12">
                    <label className="form-label fw-semibold text-secondary">
                      Razón Social / Nombre
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <i className="bi bi-building"></i>
                      </span>
                      <input
                        type="text"
                        value={formData.nombre}
                        onChange={handleInputChange("nombre")}
                        className={`form-control ${
                          errores.nombre ? "is-invalid" : ""
                        }`}
                        placeholder="Nombre de la empresa"
                        disabled={enviando}
                      />
                      {errores.nombre && (
                        <div className="invalid-feedback">{errores.nombre}</div>
                      )}
                    </div>
                  </div>

                  {/* CORREO */}
                  <div className="col-12">
                    <label className="form-label fw-semibold text-secondary">
                      Correo de Contacto
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <i className="bi bi-envelope-at"></i>
                      </span>
                      <input
                        type="text"
                        value={formData.correo}
                        onChange={handleInputChange("correo")}
                        className={`form-control ${
                          errores.correo ? "is-invalid" : ""
                        }`}
                        placeholder="contacto@empresa.com"
                        disabled={enviando}
                      />
                      {errores.correo && (
                        <div className="invalid-feedback">{errores.correo}</div>
                      )}
                    </div>
                  </div>

                  {/* BOTONES */}
                  <div className="col-12 mt-4 pt-2">
                    <div className="d-grid gap-2 d-md-flex">
                      <button
                        type="submit"
                        disabled={enviando}
                        className="btn btn-dark flex-fill shadow-sm"
                      >
                        {enviando ? "Guardando..." : "Guardar Proveedor"}
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

export default PageSupplierNew;
