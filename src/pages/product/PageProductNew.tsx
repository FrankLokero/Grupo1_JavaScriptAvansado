import { useProductForm } from "../../hooks/useProductForm";
import { ChangeEvent } from "react";

const PageProductNew = () => {
  const {
    formData,
    errores,
    enviado,
    enviando,
    handleChange,
    handleSubmit,
    handleReset,
  } = useProductForm();

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
            {/* CABECERA */}
            <div className="card-header bg-danger bg-gradient text-white p-4 rounded-top-4">
              <h3 className="mb-0 fw-bold">
                <i className="bi bi-box-seam me-2"></i> Nuevo Producto
              </h3>
              <small className="opacity-75">
                Ingresa los detalles del artículo para venta
              </small>
            </div>

            <div className="card-body p-5">
              {/* ALERTA */}
              {enviado && (
                <div
                  className="alert alert-success d-flex align-items-center shadow-sm"
                  role="alert"
                >
                  <i className="bi bi-check-circle-fill fs-4 me-2"></i>
                  <div className="flex-grow-1">
                    <strong>¡Excelente!</strong> Producto guardado
                    correctamente.
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
                  {/* CODIGO Y PRECIO */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary">
                      Código SKU
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <i className="bi bi-upc"></i>
                      </span>
                      <input
                        type="text"
                        value={formData.codigo}
                        onChange={handleInputChange("codigo")}
                        className={`form-control ${
                          errores.codigo ? "is-invalid" : ""
                        }`}
                        placeholder="Ej: PROD-001"
                        disabled={enviando}
                      />
                      {errores.codigo && (
                        <div className="invalid-feedback">{errores.codigo}</div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary">
                      Precio Unitario
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <i className="bi bi-currency-dollar"></i>
                      </span>
                      <input
                        type="number"
                        value={formData.precio}
                        onChange={handleInputChange("precio")}
                        className={`form-control ${
                          errores.precio ? "is-invalid" : ""
                        }`}
                        placeholder="0.00"
                        disabled={enviando}
                      />
                      {errores.precio && (
                        <div className="invalid-feedback">{errores.precio}</div>
                      )}
                    </div>
                  </div>

                  {/* NOMBRE */}
                  <div className="col-12">
                    <label className="form-label fw-semibold text-secondary">
                      Nombre del Producto
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <i className="bi bi-tag"></i>
                      </span>
                      <input
                        type="text"
                        value={formData.nombre}
                        onChange={handleInputChange("nombre")}
                        className={`form-control ${
                          errores.nombre ? "is-invalid" : ""
                        }`}
                        placeholder="Ej: Laptop HP Pavilion 15"
                        disabled={enviando}
                      />
                      {errores.nombre && (
                        <div className="invalid-feedback">{errores.nombre}</div>
                      )}
                    </div>
                  </div>

                  {/* DESCRIPCION */}
                  <div className="col-12">
                    <label className="form-label fw-semibold text-secondary">
                      Descripción
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <i className="bi bi-file-text"></i>
                      </span>
                      <input
                        type="text"
                        value={formData.descripcion}
                        onChange={handleInputChange("descripcion")}
                        className={`form-control ${
                          errores.descripcion ? "is-invalid" : ""
                        }`}
                        placeholder="Breve descripción del producto"
                        disabled={enviando}
                      />
                      {errores.descripcion && (
                        <div className="invalid-feedback">
                          {errores.descripcion}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CHECKBOX ACTIVO (SWITCH MODERNO) */}
                  <div className="col-12 mt-3">
                    <div className="form-check form-switch p-3 border rounded-3 bg-light">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="activoCheck"
                        checked={formData.activo}
                        onChange={handleInputChange("activo")}
                        style={{ cursor: "pointer" }}
                      />
                      <label
                        className="form-check-label fw-bold ms-2"
                        htmlFor="activoCheck"
                        style={{ cursor: "pointer" }}
                      >
                        Producto Activo / Visible
                      </label>
                      <div className="form-text ms-2 mt-0">
                        {formData.activo ? (
                          <span className="text-success">
                            <i className="bi bi-eye"></i> El producto está
                            visible para la venta
                          </span>
                        ) : (
                          <span className="text-danger">
                            <i className="bi bi-eye-slash"></i> El producto está
                            oculto del catálogo
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* BOTONES */}
                  <div className="col-12 mt-4 pt-2 border-top">
                    <div className="d-flex gap-2">
                      <button
                        type="submit"
                        disabled={enviando}
                        className="btn btn-primary flex-fill btn-lg shadow-sm"
                      >
                        {enviando ? "Guardando..." : "Guardar Producto"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-lg"
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

export default PageProductNew;
