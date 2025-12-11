import { useSaleForm } from "../../hooks/useSaleForm";
import { ChangeEvent } from "react";

const PageSaleNew = () => {
  const {
    formData,
    errores,
    enviado,
    enviando,
    handleChange,
    handleSubmit,
    handleReset,
  } = useSaleForm();

  const handleInputChange =
    (campo: string) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      handleChange(campo, e.target.value);
    };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            {/* CABECERA ESTILO TICKET */}
            <div className="card-header bg-success bg-gradient text-white p-4 d-flex justify-content-between align-items-center">
              <div>
                <h3 className="mb-0 fw-bold">
                  <i className="bi bi-receipt me-2"></i> Registrar Venta
                </h3>
                <small className="opacity-75">Nueva transacción</small>
              </div>
              <div className="bg-white bg-opacity-25 p-2 rounded text-center">
                <small>FECHA HOY</small>
                <div className="fw-bold">{new Date().toLocaleDateString()}</div>
              </div>
            </div>

            <div className="card-body p-5">
              {enviado && (
                <div
                  className="alert alert-success d-flex align-items-center shadow-sm"
                  role="alert"
                >
                  <i className="bi bi-check-circle-fill fs-4 me-2"></i>
                  <div className="flex-grow-1">
                    <strong>¡Venta Registrada!</strong> La transacción se guardó
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
                <div className="row g-4">
                  {/* SECCION 1: DATOS DEL COMPROBANTE */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-secondary text-uppercase small">
                      Nro Comprobante
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <i className="bi bi-hash"></i>
                      </span>
                      <input
                        type="text"
                        value={formData.nro_comprobante}
                        onChange={handleInputChange("nro_comprobante")}
                        className={`form-control ${
                          errores.nro_comprobante ? "is-invalid" : ""
                        }`}
                        placeholder="001-00001"
                        disabled={enviando}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold text-secondary text-uppercase small">
                      Cliente
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <i className="bi bi-person-badge"></i>
                      </span>
                      <input
                        type="text"
                        value={formData.cliente}
                        onChange={handleInputChange("cliente")}
                        className={`form-control ${
                          errores.cliente ? "is-invalid" : ""
                        }`}
                        placeholder="Nombre del cliente"
                        disabled={enviando}
                      />
                    </div>
                  </div>

                  {/* SECCION 2: TOTALES (DESTACADO) */}
                  <div className="col-12">
                    <div className="p-4 bg-light rounded-3 border border-success border-opacity-25">
                      <label className="form-label fw-bold text-success text-uppercase">
                        Monto Total
                      </label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-success text-white border-0">
                          S/.
                        </span>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.total}
                          onChange={handleInputChange("total")}
                          className={`form-control fs-2 fw-bold text-success ${
                            errores.total ? "is-invalid" : ""
                          }`}
                          placeholder="0.00"
                          disabled={enviando}
                        />
                      </div>
                      {errores.total && (
                        <div className="text-danger small mt-1">
                          {errores.total}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* BOTONES */}
                  <div className="col-12 mt-4 pt-2 border-top">
                    <div className="d-flex gap-3">
                      <button
                        type="submit"
                        disabled={enviando}
                        className="btn btn-success btn-lg flex-fill shadow fw-bold"
                      >
                        {enviando ? (
                          "Procesando..."
                        ) : (
                          <>
                            {" "}
                            <i className="bi bi-cash-coin me-2"></i> Cobrar y
                            Guardar{" "}
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-lg px-4"
                        onClick={handleReset}
                        disabled={enviando}
                      >
                        <i className="bi bi-x-lg"></i>
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

export default PageSaleNew;
