import { useLoginForm } from "../../hooks/useLoginForm";

const PageLogin = () => {
  const {
    formData,
    errores,
    enviando,
    handleChange,
    handleSubmit,
  } = useLoginForm();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg border-0 rounded-4" style={{ width: "400px" }}>
        <div className="card-body p-5">
          
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">Iniciar Sesión</h2>
            <p className="text-muted">Ingresa tus credenciales para acceder</p>
          </div>

          {/* Alerta de Error General (Login fallido) */}
          {errores.submit && (
            <div className="alert alert-danger d-flex align-items-center" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              <div>{errores.submit}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* USUARIO */}
            <div className="mb-3">
              <label className="form-label fw-bold">Usuario</label>
              <div className="input-group">
                <span className="input-group-text bg-white"><i className="bi bi-person"></i></span>
                <input
                  type="text"
                  className={`form-control ${errores.usuario ? "is-invalid" : ""}`}
                  placeholder="Ej: admin"
                  value={formData.usuario}
                  onChange={(e) => handleChange("usuario", e.target.value)}
                  disabled={enviando}
                />
              </div>
              {errores.usuario && <div className="text-danger small mt-1">{errores.usuario}</div>}
            </div>

            {/* CONTRASEÑA */}
            <div className="mb-4">
              <label className="form-label fw-bold">Contraseña</label>
              <div className="input-group">
                <span className="input-group-text bg-white"><i className="bi bi-key"></i></span>
                <input
                  type="password"
                  className={`form-control ${errores.contraseña ? "is-invalid" : ""}`}
                  placeholder="******"
                  value={formData.contraseña}
                  onChange={(e) => handleChange("contraseña", e.target.value)}
                  disabled={enviando}
                />
              </div>
              {errores.contraseña && <div className="text-danger small mt-1">{errores.contraseña}</div>}
            </div>

            {/* BOTÓN */}
            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-bold shadow-sm"
              disabled={enviando}
            >
              {enviando ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Ingresando...
                </>
              ) : (
                "Acceder al Sistema"
              )}
            </button>
          </form>
        </div>
        <div className="card-footer bg-white text-center py-3 rounded-bottom-4">
          <small className="text-muted">Sistema de Gestión &copy; 2025</small>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;