import { useCategoryForm } from "../../hooks/useCategoryForm";
import { ChangeEvent } from "react";

const PageCategoryNew = () => {
  const {
    formData,
    errores,
    enviado,
    enviando,
    handleChange,
    handleSubmit,
    handleReset,
  } = useCategoryForm();

  const handleInputChange =
    (campo: keyof typeof formData) => (e: ChangeEvent<HTMLInputElement>) => {
      const valor =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      handleChange(campo, valor);
    };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-warning bg-gradient text-dark p-4 rounded-top-4 border-bottom-0">
              <h3 className="mb-0 fw-bold">
                <i className="bi bi-tags-fill me-2"></i> Categoría
              </h3>
              <small className="text-dark opacity-75">
                Crear nueva clasificación
              </small>
            </div>

            <div className="card-body p-5 pt-4">
              {enviado && (
                <div
                  className="alert alert-success d-flex align-items-center shadow-sm rounded-3 mb-4"
                  role="alert"
                >
                  <i className="bi bi-check-circle-fill fs-4 me-2"></i>
                  <div className="flex-grow-1">
                    <strong>¡Hecho!</strong> Categoría guardada.
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
                  {/* 🔥 CAMPO QUE FALTABA: CÓDIGO */}
                  <div className="col-12">
                    <label
                      htmlFor="codigo"
                      className="form-label fw-semibold text-secondary"
                    >
                      Código
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-qr-code text-warning"></i>
                      </span>
                      <input
                        type="text"
                        value={formData.codigo}
                        onChange={handleInputChange("codigo")}
                        className={`form-control border-start-0 ps-0 ${
                          errores.codigo ? "is-invalid" : ""
                        }`}
                        id="codigo"
                        placeholder="CAT-01"
                        disabled={enviando}
                      />
                      {errores.codigo && (
                        <div className="invalid-feedback ms-2">
                          {errores.codigo}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CAMPO CATEGORIA */}
                  <div className="col-12">
                    <label
                      htmlFor="categoria"
                      className="form-label fw-semibold text-secondary"
                    >
                      Nombre
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-bookmark-star text-warning"></i>
                      </span>
                      <input
                        type="text"
                        value={formData.categoria}
                        onChange={handleInputChange("categoria")}
                        className={`form-control border-start-0 ps-0 ${
                          errores.categoria ? "is-invalid" : ""
                        }`}
                        id="categoria"
                        placeholder="Ej: Electrónica"
                        disabled={enviando}
                      />
                      {errores.categoria && (
                        <div className="invalid-feedback ms-2">
                          {errores.categoria}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-12 mt-4 pt-3">
                    <div className="d-grid gap-2">
                      <button
                        type="submit"
                        disabled={enviando}
                        className="btn btn-dark btn-lg rounded-3 shadow-sm"
                      >
                        {enviando ? (
                          <>
                            {" "}
                            <span className="spinner-border spinner-border-sm me-2"></span>{" "}
                            Guardando...{" "}
                          </>
                        ) : (
                          "Guardar Categoría"
                        )}
                      </button>
                      <button
                        type="button"
                        className="btn btn-link text-decoration-none text-secondary"
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

export default PageCategoryNew;
